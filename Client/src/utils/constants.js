export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  READY: 'ready',
  DOWNLOADED: 'downloaded'
};

export const STATUS_COLORS = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  ready: '#10b981',
  downloaded: '#6b7280'
};

export const STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  ready: 'Ready',
  downloaded: 'Downloaded'
};

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png'
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB