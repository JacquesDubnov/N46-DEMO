export const PRESENTATION_STATUS = {
  DRAFT: 'draft',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type PresentationStatus = typeof PRESENTATION_STATUS[keyof typeof PRESENTATION_STATUS];

export const ACTIVE_STATUSES: PresentationStatus[] = [
  PRESENTATION_STATUS.DRAFT,
  PRESENTATION_STATUS.GENERATING,
];
