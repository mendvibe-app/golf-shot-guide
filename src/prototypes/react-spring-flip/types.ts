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

export interface SpringConfig {
  tension: number;
  friction: number;
  precision: number;
}

export interface GestureConfig {
  threshold: number;
  velocityThreshold: number;
  resistance: number;
}