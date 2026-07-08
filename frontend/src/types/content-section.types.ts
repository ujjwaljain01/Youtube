import { CONTENT_GRID } from '@/constants/content-grid';

export type ContentGrid = (typeof CONTENT_GRID)[keyof typeof CONTENT_GRID];
