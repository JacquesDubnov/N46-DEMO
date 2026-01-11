import Dexie, { type Table } from 'dexie';
import type { Presentation, UserSettings } from '../types';

class N46Database extends Dexie {
  presentations!: Table<Presentation>;
  settings!: Table<UserSettings>;

  constructor() {
    super('n46-demo');
    this.version(1).stores({
      presentations: '++id, userProfile, useCase, status, createdAt',
      settings: '++id',
    });
  }
}

export const db = new N46Database();

// Helper functions for presentations
export async function getAllPresentations(): Promise<Presentation[]> {
  return db.presentations.orderBy('createdAt').reverse().toArray();
}

export async function getPresentation(id: number): Promise<Presentation | undefined> {
  return db.presentations.get(id);
}

export async function addPresentation(presentation: Omit<Presentation, 'id'>): Promise<number> {
  return db.presentations.add(presentation as Presentation);
}

export async function updatePresentation(
  id: number,
  updates: Partial<Presentation>
): Promise<number> {
  return db.presentations.update(id, { ...updates, updatedAt: new Date() });
}

export async function deletePresentation(id: number): Promise<void> {
  return db.presentations.delete(id);
}

export async function getPresentationsByProfile(
  profile: string
): Promise<Presentation[]> {
  return db.presentations.where('userProfile').equals(profile).reverse().sortBy('createdAt');
}

export async function getRecentPresentations(limit: number = 5): Promise<Presentation[]> {
  return db.presentations.orderBy('createdAt').reverse().limit(limit).toArray();
}

export async function getPresentationStats(): Promise<{
  total: number;
  thisWeek: number;
  drafts: number;
}> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const all = await db.presentations.toArray();
  const total = all.length;
  const thisWeek = all.filter((p) => p.createdAt >= oneWeekAgo).length;
  const drafts = all.filter((p) => p.status === 'draft' || p.status === 'generating').length;

  return { total, thisWeek, drafts };
}

// Helper functions for settings
export async function getSettings(): Promise<UserSettings | undefined> {
  const settings = await db.settings.toArray();
  return settings[0];
}

export async function saveSettings(settings: Partial<UserSettings>): Promise<void> {
  const existing = await getSettings();
  if (existing?.id) {
    await db.settings.update(existing.id, settings);
  } else {
    await db.settings.add(settings as UserSettings);
  }
}

export async function clearAllPresentations(): Promise<void> {
  await db.presentations.clear();
}

// Clear all thumbnails to force regeneration
export async function clearAllThumbnails(): Promise<void> {
  const presentations = await db.presentations.toArray();
  for (const p of presentations) {
    if (p.id && p.thumbnailUrl) {
      await db.presentations.update(p.id, { thumbnailUrl: undefined });
    }
  }
}
