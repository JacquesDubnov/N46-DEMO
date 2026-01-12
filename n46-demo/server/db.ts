import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database types matching the frontend Presentation interface
export interface Presentation {
  id: number;
  title: string;
  description: string | null;
  user_profile: string;
  use_case: string;
  prompt: string;
  gamma_id: string | null;
  gamma_url: string | null;
  generation_id: string | null;
  status: string;
  pdf_url: string | null;
  pptx_url: string | null;
  generation_params: string;
  created_at: string;
  updated_at: string;
  thumbnail_url: string | null;
}

// Singleton database instance
let db: Database.Database | null = null;

function getDbPath() {
  const dbDir = join(dirname(__dirname), 'db');
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }
  return join(dbDir, 'n46.db');
}

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = getDbPath();
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeDatabase();
  }
  return db;
}

function initializeDatabase() {
  const database = getDb();
  database.exec(`
    CREATE TABLE IF NOT EXISTS presentations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      user_profile TEXT NOT NULL,
      use_case TEXT NOT NULL,
      prompt TEXT NOT NULL,
      gamma_id TEXT,
      gamma_url TEXT,
      generation_id TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      pdf_url TEXT,
      pptx_url TEXT,
      generation_params TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      thumbnail_url TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_presentations_user_profile ON presentations(user_profile);
    CREATE INDEX IF NOT EXISTS idx_presentations_use_case ON presentations(use_case);
    CREATE INDEX IF NOT EXISTS idx_presentations_status ON presentations(status);
    CREATE INDEX IF NOT EXISTS idx_presentations_created_at ON presentations(created_at);
  `);
}

// Helper functions for presentations
export function getAllPresentations(): Presentation[] {
  const database = getDb();
  return database
    .prepare('SELECT * FROM presentations ORDER BY created_at DESC')
    .all() as Presentation[];
}

export function getPresentation(id: number): Presentation | undefined {
  const database = getDb();
  return database
    .prepare('SELECT * FROM presentations WHERE id = ?')
    .get(id) as Presentation | undefined;
}

export function addPresentation(presentation: Omit<Presentation, 'id'>): number {
  const database = getDb();
  const result = database
    .prepare(
      `INSERT INTO presentations (
        title, description, user_profile, use_case, prompt,
        gamma_id, gamma_url, generation_id, status,
        pdf_url, pptx_url, generation_params, created_at, updated_at, thumbnail_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      presentation.title,
      presentation.description,
      presentation.user_profile,
      presentation.use_case,
      presentation.prompt,
      presentation.gamma_id,
      presentation.gamma_url,
      presentation.generation_id,
      presentation.status,
      presentation.pdf_url,
      presentation.pptx_url,
      presentation.generation_params,
      presentation.created_at,
      presentation.updated_at,
      presentation.thumbnail_url
    );
  return result.lastInsertRowid as number;
}

export function updatePresentation(
  id: number,
  updates: Partial<Omit<Presentation, 'id'>>
): boolean {
  const database = getDb();

  const fields: string[] = [];
  const values: unknown[] = [];

  if (updates.title !== undefined) {
    fields.push('title = ?');
    values.push(updates.title);
  }
  if (updates.description !== undefined) {
    fields.push('description = ?');
    values.push(updates.description);
  }
  if (updates.user_profile !== undefined) {
    fields.push('user_profile = ?');
    values.push(updates.user_profile);
  }
  if (updates.use_case !== undefined) {
    fields.push('use_case = ?');
    values.push(updates.use_case);
  }
  if (updates.prompt !== undefined) {
    fields.push('prompt = ?');
    values.push(updates.prompt);
  }
  if (updates.gamma_id !== undefined) {
    fields.push('gamma_id = ?');
    values.push(updates.gamma_id);
  }
  if (updates.gamma_url !== undefined) {
    fields.push('gamma_url = ?');
    values.push(updates.gamma_url);
  }
  if (updates.generation_id !== undefined) {
    fields.push('generation_id = ?');
    values.push(updates.generation_id);
  }
  if (updates.status !== undefined) {
    fields.push('status = ?');
    values.push(updates.status);
  }
  if (updates.pdf_url !== undefined) {
    fields.push('pdf_url = ?');
    values.push(updates.pdf_url);
  }
  if (updates.pptx_url !== undefined) {
    fields.push('pptx_url = ?');
    values.push(updates.pptx_url);
  }
  if (updates.generation_params !== undefined) {
    fields.push('generation_params = ?');
    values.push(updates.generation_params);
  }
  if (updates.thumbnail_url !== undefined) {
    fields.push('thumbnail_url = ?');
    values.push(updates.thumbnail_url);
  }

  // Always update updated_at
  fields.push('updated_at = ?');
  values.push(new Date().toISOString());

  if (fields.length === 1) {
    // Only updated_at, nothing to update
    return false;
  }

  values.push(id);
  const result = database
    .prepare(`UPDATE presentations SET ${fields.join(', ')} WHERE id = ?`)
    .run(...values);

  return result.changes > 0;
}

export function deletePresentation(id: number): boolean {
  const database = getDb();
  const result = database
    .prepare('DELETE FROM presentations WHERE id = ?')
    .run(id);
  return result.changes > 0;
}

export function getRecentPresentations(limit: number = 5): Presentation[] {
  const database = getDb();
  return database
    .prepare('SELECT * FROM presentations ORDER BY created_at DESC LIMIT ?')
    .all(limit) as Presentation[];
}

export function getPresentationStats(): {
  total: number;
  thisWeek: number;
  drafts: number;
} {
  const database = getDb();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekAgoIso = oneWeekAgo.toISOString();

  const total = (
    database.prepare('SELECT COUNT(*) as count FROM presentations').get() as {
      count: number;
    }
  ).count;

  const thisWeek = (
    database
      .prepare(
        'SELECT COUNT(*) as count FROM presentations WHERE created_at >= ?'
      )
      .get(weekAgoIso) as { count: number }
  ).count;

  const ACTIVE_STATUSES = ['draft', 'generating'];
  const drafts = (
    database
      .prepare(
        `SELECT COUNT(*) as count FROM presentations WHERE status IN (${ACTIVE_STATUSES.map(() => '?').join(', ')})`
      )
      .get(...ACTIVE_STATUSES) as { count: number }
  ).count;

  return { total, thisWeek, drafts };
}
