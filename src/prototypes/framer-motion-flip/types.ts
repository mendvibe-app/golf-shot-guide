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

export interface DragInfo {
  offset: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
}

export interface GestureState {
  isDragging: boolean;
  progress: number;
  direction: 'up' | 'down' | null;
}