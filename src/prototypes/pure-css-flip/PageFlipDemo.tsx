import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { PageContent, PageFlipProps, TouchState, AnimationConfig } from './types';

// Golf yardage book mock content
const createGolfContent = (): PageContent[] => [
  {
    id: 1,
    title: 'HOLE 7 • PAR 4 • 385 YDS',
    content: (
      <div className="page-content">
        <div className="page-texture">
          <div className="coffee-stain coffee-stain-1"></div>
          <div className="coffee-stain coffee-stain-2"></div>
        </div>
        
        <div className="spiral-binding">
          <div className="spiral-holes">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="spiral-hole"></div>
            ))}
          </div>
        </div>
        
        <div className="page-body">
          <div className="page-header">
            <h2 className="hole-title">HOLE 7 • PAR 4 • 385 YDS</h2>
            <p className="hole-subtitle">Slight dogleg right • Wind: 10mph SW</p>
          </div>
          
          <div className="hole-diagram">
            <div className="diagram-bg"></div>
            <div className="fairway"></div>
            <div className="green"></div>
            <div className="bunker"></div>
            <div className="pin"></div>
            <div className="flag"></div>
            <span className="golfer">🏌️</span>
          </div>
          
          <div className="yardage-notes">
            <div className="yardage-item">
              <span className="yardage-label">Tee to bunker:</span>
              <strong className="yardage-distance">240y</strong>
            </div>
            <div className="yardage-item">
              <span className="yardage-label">Fairway center:</span>
              <strong className="yardage-distance">150y to pin</strong>
            </div>
            <div className="yardage-item">
              <span className="yardage-label">Water hazard:</span>
              <strong className="yardage-distance">120y to pin</strong>
            </div>
          </div>
          
          <div className="handwritten-note">
            <p className="note-text">
              "Driver right side - avoid left bunker!"
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'UPHILL LIE SHOTS',
    content: (
      <div className="page-content page-content-blue">
        <div className="page-texture">
          <div className="coffee-stain coffee-stain-3"></div>
          <div className="coffee-stain coffee-stain-4"></div>
        </div>
        
        <div className="spiral-binding">
          <div className="spiral-holes">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="spiral-hole"></div>
            ))}
          </div>
        </div>
        
        <div className="page-body">
          <div className="page-header">
            <h2 className="hole-title">UPHILL LIE SHOTS</h2>
            <p className="hole-subtitle">Ball above feet • Slope conditions</p>
          </div>
          
          <div className="shot-icon">
            <div className="icon-mountain">⛰️</div>
          </div>
          
          <div className="shot-details">
            <h3 className="shot-title">Ball Above Feet</h3>
            <div className="shot-points">
              <div className="shot-point">
                <span className="point-label">When:</span>
                <span className="point-text">Standing below ball on upslope</span>
              </div>
              <div className="shot-point">
                <span className="point-label">Setup:</span>
                <span className="point-text">Ball forward, wider stance</span>
              </div>
              <div className="shot-point">
                <span className="point-label">Key:</span>
                <span className="point-text">Swing up the hill</span>
              </div>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">🎯</div>
            <p className="tip-text">
              "Swing with the hill, not against it"
            </p>
          </div>
        </div>
      </div>
    )
  }
];

// Animation configuration
const animationConfig: AnimationConfig = {
  duration: 400,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  threshold: 150,
  velocityThreshold: 0.5
};

const PageFlipDemo: React.FC<PageFlipProps> = ({ 
  pages: externalPages,
  currentPage: externalCurrentPage,
  onPageChange: externalOnPageChange 
}) => {
  // Use internal state if no external props provided
  const defaultPages = useMemo(() => createGolfContent(), []);
  const pages = externalPages || defaultPages;
  const [internalCurrentPage, setInternalCurrentPage] = useState(0);
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const onPageChange = externalOnPageChange || setInternalCurrentPage;

  // Touch/drag state
  const [touchState, setTouchState] = useState<TouchState>({
    startY: 0,
    currentY: 0,
    startTime: 0,
    isDragging: false
  });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  // Update CSS custom properties for smooth animation
  const updatePageTransform = useCallback((
    translateY: number = 0, 
    rotateX: number = 0, 
    scale: number = 1, 
    opacity: number = 1
  ) => {
    if (pageRef.current) {
      pageRef.current.style.setProperty('--translate-y', `${translateY}px`);
      pageRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
      pageRef.current.style.setProperty('--scale', scale.toString());
      pageRef.current.style.setProperty('--opacity', opacity.toString());
    }
  }, []);

  // Animate page transition using Web Animations API
  const animatePageTransition = useCallback((
    direction: 'up' | 'down',
    onComplete?: () => void
  ) => {
    if (!pageRef.current) return;

    // Cancel any existing animation
    if (animationRef.current) {
      animationRef.current.cancel();
    }

    const isNext = direction === 'up';
    
    // Define keyframes for exit and enter
    const exitKeyframes = [
      { 
        transform: 'translateY(0px) rotateX(0deg) scale(1)',
        opacity: 1
      },
      { 
        transform: `translateY(${isNext ? -200 : 200}px) rotateX(${isNext ? -15 : 15}deg) scale(0.9)`,
        opacity: 0.3
      }
    ];

    const enterKeyframes = [
      { 
        transform: `translateY(${isNext ? 200 : -200}px) rotateX(${isNext ? 15 : -15}deg) scale(0.9)`,
        opacity: 0.3
      },
      { 
        transform: 'translateY(0px) rotateX(0deg) scale(1)',
        opacity: 1
      }
    ];

    // Exit animation
    const exitAnimation = pageRef.current.animate(exitKeyframes, {
      duration: animationConfig.duration / 2,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'forwards'
    });

    exitAnimation.addEventListener('finish', () => {
      if (onComplete) onComplete();
      
      // Enter animation
      const enterAnimation = pageRef.current?.animate(enterKeyframes, {
        duration: animationConfig.duration / 2,
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
        fill: 'forwards'
      });

      if (enterAnimation) {
        animationRef.current = enterAnimation;
        enterAnimation.addEventListener('finish', () => {
          updatePageTransform(0, 0, 1, 1);
        });
      }
    });

    animationRef.current = exitAnimation;
  }, [updatePageTransform]);

  // Page change with animation
  const changePage = useCallback((newPage: number, direction: 'up' | 'down') => {
    if (newPage === currentPage || newPage < 0 || newPage >= pages.length) return;

    animatePageTransition(direction, () => {
      onPageChange(newPage);
    });
  }, [currentPage, pages.length, onPageChange, animatePageTransition]);

  // Calculate resistance at boundaries
  const calculateResistance = useCallback((deltaY: number): number => {
    const isAtStart = currentPage === 0 && deltaY > 0;
    const isAtEnd = currentPage === pages.length - 1 && deltaY < 0;
    
    if (isAtStart || isAtEnd) {
      return 0.3; // High resistance
    }
    return 1; // No resistance
  }, [currentPage, pages.length]);

  // Touch/Mouse event handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startTime = Date.now();
    
    setTouchState({
      startY,
      currentY: startY,
      startTime,
      isDragging: true
    });

    // Set cursor style
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!touchState.isDragging) return;
    
    e.preventDefault();
    const currentY = e.clientY;
    const deltaY = currentY - touchState.startY;
    const resistance = calculateResistance(deltaY);
    const dampedDelta = deltaY * resistance;
    
    // Update current position
    setTouchState(prev => ({ ...prev, currentY }));
    
    // Calculate progress and effects
    const progress = Math.abs(dampedDelta) / 300;
    const rotateX = (dampedDelta / 300) * (deltaY < 0 ? -15 : 15);
    const scale = 1 - progress * 0.05;
    const opacity = 1 - progress * 0.2;
    
    // Update transform
    updatePageTransform(dampedDelta, rotateX, scale, opacity);
    
    // Update container class for visual feedback
    if (containerRef.current) {
      containerRef.current.classList.toggle('dragging', true);
      containerRef.current.classList.toggle('drag-up', deltaY < 0);
      containerRef.current.classList.toggle('drag-down', deltaY > 0);
    }
  }, [touchState.isDragging, touchState.startY, calculateResistance, updatePageTransform]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!touchState.isDragging) return;
    
    e.preventDefault();
    const deltaY = e.clientY - touchState.startY;
    const deltaTime = Date.now() - touchState.startTime;
    const velocity = Math.abs(deltaY) / deltaTime;
    
    const shouldFlip = Math.abs(deltaY) > animationConfig.threshold || 
                     velocity > animationConfig.velocityThreshold;
    
    if (shouldFlip) {
      const direction = deltaY > 0 ? 'down' : 'up';
      const newPage = direction === 'down' 
        ? Math.max(0, currentPage - 1)
        : Math.min(pages.length - 1, currentPage + 1);
      
      if (newPage !== currentPage) {
        changePage(newPage, direction);
      } else {
        // Spring back animation
        springBackAnimation();
      }
    } else {
      // Spring back animation
      springBackAnimation();
    }
    
    // Reset touch state
    setTouchState({
      startY: 0,
      currentY: 0,
      startTime: 0,
      isDragging: false
    });
    
    // Reset cursor and classes
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.classList.remove('dragging', 'drag-up', 'drag-down');
    }
  }, [touchState, currentPage, pages.length, changePage, animationConfig]);

  // Spring back animation
  const springBackAnimation = useCallback(() => {
    if (!pageRef.current) return;

    const springAnimation = pageRef.current.animate([
      { 
        transform: pageRef.current.style.transform || 'translateY(0px) rotateX(0deg) scale(1)',
        opacity: pageRef.current.style.opacity || '1'
      },
      { 
        transform: 'translateY(0px) rotateX(0deg) scale(1)',
        opacity: '1'
      }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards'
    });

    springAnimation.addEventListener('finish', () => {
      updatePageTransform(0, 0, 1, 1);
    });
  }, [updatePageTransform]);

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      changePage(currentPage + 1, 'up');
    }
  }, [currentPage, pages.length, changePage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      changePage(currentPage - 1, 'down');
    }
  }, [currentPage, changePage]);

  const resetToFirstPage = useCallback(() => {
    if (currentPage !== 0) {
      changePage(0, 'down');
    }
  }, [currentPage, changePage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          goToNextPage();
          break;
        case 'ArrowDown':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'Home':
          e.preventDefault();
          resetToFirstPage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage, resetToFirstPage]);

  return (
    <>
      <style>{`
        .pure-css-page-flip {
          --translate-y: 0px;
          --rotate-x: 0deg;
          --scale: 1;
          --opacity: 1;
        }

        .page-container {
          perspective: 1000px;
          touch-action: none;
          user-select: none;
          cursor: grab;
        }

        .page-container.dragging {
          cursor: grabbing;
        }

        .page-wrapper {
          transform-style: preserve-3d;
          transform: translateY(var(--translate-y)) rotateX(var(--rotate-x)) scale(var(--scale));
          opacity: var(--opacity);
          transform-origin: center top;
          will-change: transform, opacity;
        }

        .page-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
          position: relative;
          overflow: hidden;
        }

        .page-content-blue {
          background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
        }

        .page-texture {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          pointer-events: none;
        }

        .coffee-stain {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
        }

        .coffee-stain-1 {
          top: 1rem;
          right: 2rem;
          width: 3rem;
          height: 2rem;
          background: #a16207;
        }

        .coffee-stain-2 {
          bottom: 3rem;
          left: 1.5rem;
          width: 2rem;
          height: 1.5rem;
          background: #a16207;
        }

        .coffee-stain-3 {
          top: 2rem;
          left: 3rem;
          width: 2.5rem;
          height: 1.5rem;
          background: #1e40af;
        }

        .coffee-stain-4 {
          bottom: 4rem;
          right: 2rem;
          width: 1.5rem;
          height: 2rem;
          background: #1e40af;
        }

        .spiral-binding {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2rem;
          background: linear-gradient(to bottom, #d1d5db, #9ca3af);
          border-bottom: 2px solid #6b7280;
        }

        .spiral-holes {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          gap: 3rem;
        }

        .spiral-hole {
          width: 0.75rem;
          height: 0.75rem;
          background: #374151;
          border-radius: 50%;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .page-body {
          margin-top: 2rem;
          flex: 1;
        }

        .page-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .hole-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .hole-subtitle {
          color: #6b7280;
          font-weight: 500;
        }

        .hole-diagram {
          position: relative;
          background: #dcfce7;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          height: 12rem;
          overflow: hidden;
        }

        .diagram-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #bbf7d0, #a7f3d0);
          opacity: 0.5;
        }

        .fairway {
          position: absolute;
          bottom: 0.5rem;
          left: 1rem;
          right: 1rem;
          height: 4rem;
          background: #4ade80;
          border-radius: 0.5rem;
          opacity: 0.7;
        }

        .green {
          position: absolute;
          top: 1rem;
          right: 2rem;
          width: 4rem;
          height: 3rem;
          background: #22c55e;
          border-radius: 50%;
        }

        .bunker {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          width: 2rem;
          height: 1.5rem;
          background: #fde047;
          border-radius: 0.5rem;
        }

        .pin {
          position: absolute;
          top: 2rem;
          right: 3rem;
          width: 0.25rem;
          height: 2rem;
          background: #dc2626;
        }

        .flag {
          position: absolute;
          top: 1.5rem;
          right: 2.25rem;
          width: 0.75rem;
          height: 0.5rem;
          background: #dc2626;
        }

        .golfer {
          position: absolute;
          top: 4rem;
          right: 1.5rem;
          font-size: 2.5rem;
        }

        .yardage-notes {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .yardage-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 0.5rem;
        }

        .yardage-label {
          color: #374151;
        }

        .yardage-distance {
          font-size: 1.25rem;
          color: #1d4ed8;
        }

        .handwritten-note {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
          transform: rotate(-1deg);
        }

        .note-text {
          color: #374151;
          font-style: italic;
          font-size: 1.125rem;
          font-weight: 500;
        }

        .shot-icon {
          text-align: center;
          margin-bottom: 2rem;
        }

        .icon-mountain {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .shot-details {
          background: rgba(255, 255, 255, 0.6);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .shot-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 1rem;
        }

        .shot-points {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .shot-point {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .point-label {
          font-weight: bold;
          color: #1d4ed8;
          min-width: fit-content;
        }

        .point-text {
          color: #374151;
        }

        .pro-tip {
          background: linear-gradient(to right, #fef3c7, #fed7aa);
          border-left: 4px solid #f59e0b;
          padding: 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tip-icon {
          font-size: 2rem;
        }

        .tip-text {
          color: #374151;
          font-weight: 500;
          font-style: italic;
          font-size: 1.125rem;
        }

        .drag-indicator {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }

        .page-container.dragging .drag-indicator {
          opacity: 1;
        }

        .drag-arrow {
          font-size: 2.5rem;
          color: #6b7280;
        }

        @media (prefers-reduced-motion: reduce) {
          .page-wrapper {
            transition: none;
          }
        }
      `}</style>

      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-900/25 overflow-hidden relative pure-css-page-flip" style={{ height: '600px' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 relative z-10">
          <h1 className="text-xl font-bold text-center">Golf Yardage Book</h1>
          <p className="text-center text-purple-100 text-sm">Pure CSS Version</p>
        </div>

        {/* Page container */}
        <div 
          ref={containerRef}
          className="page-container relative h-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
          style={{ height: 'calc(100% - 80px)' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Main page content */}
          <div
            ref={pageRef}
            className="page-wrapper absolute inset-0"
          >
            {pages[currentPage]?.content}
            
            {/* Drag indicator overlay */}
            <div className="drag-indicator">
              <div className="drag-arrow">
                {touchState.isDragging && (
                  touchState.currentY < touchState.startY ? '↑' : '↓'
                )}
              </div>
            </div>
          </div>

          {/* Page indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentPage) {
                    changePage(index, index > currentPage ? 'up' : 'down');
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPage 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation hints */}
          {!touchState.isDragging && (
            <div className="absolute inset-x-4 bottom-12 text-center text-gray-500 text-sm z-20">
              Swipe up for next page • Swipe down for previous page
            </div>
          )}

          {/* Boundary indicator */}
          {touchState.isDragging && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-600">
                {currentPage === 0 && touchState.currentY > touchState.startY && "First page"}
                {currentPage === pages.length - 1 && touchState.currentY < touchState.startY && "Last page"}
              </div>
            </div>
          )}
        </div>

        {/* Reset button */}
        <button
          onClick={resetToFirstPage}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 z-30"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default PageFlipDemo;