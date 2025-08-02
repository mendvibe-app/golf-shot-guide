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

export interface TouchState {
  startY: number;
  currentY: number;
  startTime: number;
  isDragging: boolean;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  threshold: number;
  velocityThreshold: number;
}