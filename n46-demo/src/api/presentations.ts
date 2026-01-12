import type { Presentation } from '../types';

const API_BASE = '/api/presentations';

// Transform database row to frontend Presentation format
function transformFromDb(row: Record<string, unknown>): Presentation {
  return {
    id: row.id as number,
    title: row.title as string,
    description: row.description as string | undefined,
    userProfile: row.user_profile as Presentation['userProfile'],
    useCase: row.use_case as string,
    prompt: row.prompt as string,
    gammaId: row.gamma_id as string | undefined,
    gammaUrl: row.gamma_url as string | undefined,
    generationId: row.generation_id as string | undefined,
    status: row.status as Presentation['status'],
    pdfUrl: row.pdf_url as string | undefined,
    pptxUrl: row.pptx_url as string | undefined,
    generationParams: JSON.parse(row.generation_params as string),
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
    thumbnailUrl: row.thumbnail_url as string | undefined,
  };
}

export async function getAllPresentations(): Promise<Presentation[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error('Failed to fetch presentations');
  }
  const data = await response.json();
  return data.map(transformFromDb);
}

export async function getPresentation(
  id: number
): Promise<Presentation | undefined> {
  const response = await fetch(`${API_BASE}/${id}`);
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error('Failed to fetch presentation');
  }
  const data = await response.json();
  return transformFromDb(data);
}

export async function addPresentation(
  presentation: Omit<Presentation, 'id'>
): Promise<number> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(presentation),
  });
  if (!response.ok) {
    throw new Error('Failed to create presentation');
  }
  const data = await response.json();
  return data.id;
}

export async function updatePresentation(
  id: number,
  updates: Partial<Presentation>
): Promise<number> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update presentation');
  }
  return 1; // Return 1 to match Dexie interface (number of rows updated)
}

export async function deletePresentation(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok && response.status !== 404) {
    throw new Error('Failed to delete presentation');
  }
}

export async function getRecentPresentations(
  limit: number = 5
): Promise<Presentation[]> {
  const response = await fetch(`${API_BASE}/recent?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent presentations');
  }
  const data = await response.json();
  return data.map(transformFromDb);
}

export async function getPresentationStats(): Promise<{
  total: number;
  thisWeek: number;
  drafts: number;
}> {
  const response = await fetch(`${API_BASE}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
}

export async function getPresentationsByProfile(
  profile: string
): Promise<Presentation[]> {
  // For now, filter client-side since we don't have a dedicated endpoint
  const all = await getAllPresentations();
  return all.filter((p) => p.userProfile === profile);
}

export async function clearAllPresentations(): Promise<void> {
  // This would need a dedicated endpoint if needed
  const all = await getAllPresentations();
  for (const p of all) {
    if (p.id) {
      await deletePresentation(p.id);
    }
  }
}

export async function clearAllThumbnails(): Promise<void> {
  // This would need a dedicated endpoint if needed
  const all = await getAllPresentations();
  for (const p of all) {
    if (p.id && p.thumbnailUrl) {
      await updatePresentation(p.id, { thumbnailUrl: undefined });
    }
  }
}
