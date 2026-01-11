#!/usr/bin/env python3
"""
Simple local image generation server using Hugging Face diffusers.
Uses SDXL-Turbo for fast image generation on Apple Silicon.

Usage:
    python3 image-server.py

The server runs at http://127.0.0.1:7860 with an API compatible with
the Stable Diffusion WebUI API format.
"""

import base64
import io
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import torch
from diffusers import AutoPipelineForText2Image

# Global pipeline (lazy loaded)
pipe = None

def get_pipeline():
    global pipe
    if pipe is None:
        print("Loading SDXL-Turbo model (first time may take a few minutes)...")
        pipe = AutoPipelineForText2Image.from_pretrained(
            "stabilityai/sdxl-turbo",
            torch_dtype=torch.float16 if torch.backends.mps.is_available() else torch.float32,
            variant="fp16" if torch.backends.mps.is_available() else None,
        )
        # Use MPS (Apple Silicon) if available
        if torch.backends.mps.is_available():
            pipe = pipe.to("mps")
            print("Using Apple Silicon GPU (MPS)")
        else:
            print("Using CPU (slower)")
        print("Model loaded!")
    return pipe

class ImageHandler(BaseHTTPRequestHandler):
    def send_cors_headers(self):
        """Add CORS headers to allow browser requests from localhost"""
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == "/sdapi/v1/options":
            # Health check endpoint
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/sdapi/v1/txt2img":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)

            prompt = data.get("prompt", "a beautiful landscape")
            negative_prompt = data.get("negative_prompt", "")
            width = data.get("width", 512)
            height = data.get("height", 288)
            steps = min(data.get("steps", 4), 4)  # SDXL-Turbo only needs 1-4 steps

            try:
                pipeline = get_pipeline()

                # Generate image
                image = pipeline(
                    prompt=prompt,
                    negative_prompt=negative_prompt,
                    num_inference_steps=steps,
                    guidance_scale=0.0,  # SDXL-Turbo uses guidance_scale=0
                    width=width,
                    height=height,
                ).images[0]

                # Convert to base64
                buffer = io.BytesIO()
                image.save(buffer, format="PNG")
                img_base64 = base64.b64encode(buffer.getvalue()).decode()

                response = {"images": [img_base64]}

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps(response).encode())

            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        print(f"[Server] {args[0]}")

def main():
    port = 7860
    server = HTTPServer(("127.0.0.1", port), ImageHandler)
    print(f"Image generation server starting at http://127.0.0.1:{port}")
    print("Endpoints:")
    print("  GET  /sdapi/v1/options - Health check")
    print("  POST /sdapi/v1/txt2img - Generate image")
    print("\nPress Ctrl+C to stop")

    # Pre-load the model
    get_pipeline()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        server.shutdown()

if __name__ == "__main__":
    main()
