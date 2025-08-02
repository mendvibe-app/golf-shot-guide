export interface PageContent {
  id: number;
  title: string;
  content: React.ReactNode;
}

export interface PageFlipProps {
  pages: PageContent[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface CurlState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  curlAmount: number;
  cornerGrabbed: 'bottom-left' | 'bottom-right' | null;
}

export interface CurlConfig {
  threshold: number;
  maxCurl: number;
  cornerSize: number;
  springTension: number;
  curlIntensity: number;
}