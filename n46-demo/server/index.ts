import express from 'express';
import cors from 'cors';
import {
  getAllPresentations,
  getPresentation,
  addPresentation,
  updatePresentation,
  deletePresentation,
  getRecentPresentations,
  getPresentationStats,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 thumbnail images

app.get('/api/presentations', (_req, res) => {
  try {
    const presentations = getAllPresentations();
    res.json(presentations);
  } catch (error) {
    console.error('Error fetching presentations:', error);
    res.status(500).json({ error: 'Failed to fetch presentations' });
  }
});

app.get('/api/presentations/stats', (_req, res) => {
  try {
    const stats = getPresentationStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/api/presentations/recent', (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const presentations = getRecentPresentations(limit);
    res.json(presentations);
  } catch (error) {
    console.error('Error fetching recent presentations:', error);
    res.status(500).json({ error: 'Failed to fetch recent presentations' });
  }
});

app.get('/api/presentations/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const presentation = getPresentation(id);
    if (!presentation) {
      res.status(404).json({ error: 'Presentation not found' });
      return;
    }
    res.json(presentation);
  } catch (error) {
    console.error('Error fetching presentation:', error);
    res.status(500).json({ error: 'Failed to fetch presentation' });
  }
});

app.post('/api/presentations', (req, res) => {
  try {
    const now = new Date().toISOString();
    const presentation = {
      title: req.body.title,
      description: req.body.description || null,
      user_profile: req.body.userProfile,
      use_case: req.body.useCase,
      prompt: req.body.prompt,
      gamma_id: req.body.gammaId || null,
      gamma_url: req.body.gammaUrl || null,
      generation_id: req.body.generationId || null,
      status: req.body.status || 'draft',
      pdf_url: req.body.pdfUrl || null,
      pptx_url: req.body.pptxUrl || null,
      generation_params: JSON.stringify(req.body.generationParams),
      created_at: now,
      updated_at: now,
      thumbnail_url: req.body.thumbnailUrl || null,
    };
    const id = addPresentation(presentation);
    res.status(201).json({ id, ...presentation });
  } catch (error) {
    console.error('Error creating presentation:', error);
    res.status(500).json({ error: 'Failed to create presentation' });
  }
});

app.patch('/api/presentations/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates: Record<string, unknown> = {};

    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined)
      updates.description = req.body.description;
    if (req.body.userProfile !== undefined)
      updates.user_profile = req.body.userProfile;
    if (req.body.useCase !== undefined) updates.use_case = req.body.useCase;
    if (req.body.prompt !== undefined) updates.prompt = req.body.prompt;
    if (req.body.gammaId !== undefined) updates.gamma_id = req.body.gammaId;
    if (req.body.gammaUrl !== undefined) updates.gamma_url = req.body.gammaUrl;
    if (req.body.generationId !== undefined)
      updates.generation_id = req.body.generationId;
    if (req.body.status !== undefined) updates.status = req.body.status;
    if (req.body.pdfUrl !== undefined) updates.pdf_url = req.body.pdfUrl;
    if (req.body.pptxUrl !== undefined) updates.pptx_url = req.body.pptxUrl;
    if (req.body.generationParams !== undefined)
      updates.generation_params = JSON.stringify(req.body.generationParams);
    if (req.body.thumbnailUrl !== undefined)
      updates.thumbnail_url = req.body.thumbnailUrl;

    const success = updatePresentation(id, updates);
    if (!success) {
      res.status(404).json({ error: 'Presentation not found' });
      return;
    }

    const updated = getPresentation(id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating presentation:', error);
    res.status(500).json({ error: 'Failed to update presentation' });
  }
});

app.delete('/api/presentations/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = deletePresentation(id);
    if (!success) {
      res.status(404).json({ error: 'Presentation not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting presentation:', error);
    res.status(500).json({ error: 'Failed to delete presentation' });
  }
});

app.listen(PORT, () => {
  console.log(`N46 API server running on http://localhost:${PORT}`);
});

