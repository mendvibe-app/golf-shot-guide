import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import type { PageContent, PageFlipProps, SpringConfig, GestureConfig } from './types';

// Golf yardage book mock content
const createGolfContent = (): PageContent[] => [
  {
    id: 1,
    title: 'HOLE 7 • PAR 4 • 385 YDS',
    content: (
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
        {/* Weathered paper texture effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-8 w-12 h-8 bg-amber-900 rounded-full opacity-30"></div>
          <div className="absolute bottom-12 left-6 w-8 h-6 bg-amber-800 rounded-full opacity-25"></div>
        </div>
        
        {/* Spiral binding holes */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-300 to-gray-400 border-b-2 border-gray-500">
          <div className="flex justify-center items-center h-full space-x-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-700 rounded-full shadow-inner"></div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex-1">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">HOLE 7 • PAR 4 • 385 YDS</h2>
            <p className="text-gray-600 font-medium">Slight dogleg right • Wind: 10mph SW</p>
          </div>
          
          {/* Simple hole diagram */}
          <div className="relative bg-green-100 rounded-lg p-6 mb-6 h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300 opacity-50"></div>
            {/* Fairway */}
            <div className="absolute bottom-2 left-4 right-4 h-16 bg-green-400 rounded-lg opacity-70"></div>
            {/* Green */}
            <div className="absolute top-4 right-8 w-16 h-12 bg-green-500 rounded-full"></div>
            {/* Bunker */}
            <div className="absolute bottom-8 left-8 w-8 h-6 bg-yellow-300 rounded-lg"></div>
            {/* Pin */}
            <div className="absolute top-8 right-12 w-1 h-8 bg-red-500"></div>
            <div className="absolute top-6 right-11 w-3 h-2 bg-red-400"></div>
            <span className="absolute top-16 right-6 text-4xl">🏌️</span>
          </div>
          
          {/* Yardage notes */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-gray-700">Tee to bunker:</span>
              <strong className="text-xl text-blue-700">240y</strong>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-gray-700">Fairway center:</span>
              <strong className="text-xl text-blue-700">150y to pin</strong>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <span className="text-gray-700">Water hazard:</span>
              <strong className="text-xl text-blue-700">120y to pin</strong>
            </div>
          </div>
          
          {/* Handwritten note */}
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg transform -rotate-1">
            <p className="text-gray-800 font-handwriting italic text-lg">
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
      <div className="h-full flex flex-col p-6 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Weathered paper texture effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-8 left-12 w-10 h-6 bg-blue-900 rounded-full opacity-30"></div>
          <div className="absolute bottom-16 right-8 w-6 h-8 bg-blue-800 rounded-full opacity-25"></div>
        </div>
        
        {/* Spiral binding holes */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-300 to-gray-400 border-b-2 border-gray-500">
          <div className="flex justify-center items-center h-full space-x-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-700 rounded-full shadow-inner"></div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex-1">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">UPHILL LIE SHOTS</h2>
            <p className="text-gray-600 font-medium">Ball above feet • Slope conditions</p>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⛰️</div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/60 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Ball Above Feet</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-blue-700 min-w-fit">When:</span>
                  <span className="text-gray-700">Standing below ball on upslope</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-blue-700 min-w-fit">Setup:</span>
                  <span className="text-gray-700">Ball forward, wider stance</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-blue-700 min-w-fit">Key:</span>
                  <span className="text-gray-700">Swing up the hill</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <p className="text-gray-800 font-medium italic text-lg">
                  "Swing with the hill, not against it"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

// Spring configuration presets
const springConfigs: Record<string, SpringConfig> = {
  gentle: {
    tension: 200,
    friction: 25,
    precision: 0.01
  },
  wobbly: {
    tension: 180,
    friction: 12,
    precision: 0.01
  },
  stiff: {
    tension: 300,
    friction: 30,
    precision: 0.01
  }
};

// Gesture configuration
const gestureConfig: GestureConfig = {
  threshold: 150, // pixels to trigger page change
  velocityThreshold: 0.5, // velocity threshold for quick flicks
  resistance: 0.3 // resistance when dragging beyond limits
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

  // Gesture state
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Main spring animation for page transitions
  const [{ y, rotateX, scale, opacity }, api] = useSpring(() => ({
    y: 0,
    rotateX: 0,
    scale: 1,
    opacity: 1,
    config: springConfigs.gentle
  }));

  // Shadow and overlay effects during drag
  const [{ shadowOpacity, overlayOpacity }, shadowApi] = useSpring(() => ({
    shadowOpacity: 0.2,
    overlayOpacity: 0,
    config: config.fast
  }));

  // Page change function with spring animation
  const changePage = useCallback((newPage: number, direction: 'up' | 'down') => {
    if (newPage === currentPage) return;

    const isNext = direction === 'up';
    
    // Exit animation
    api.start({
      y: isNext ? -200 : 200,
      rotateX: isNext ? -15 : 15,
      scale: 0.9,
      opacity: 0.3,
      config: springConfigs.stiff,
      onRest: () => {
        // Change page and enter animation
        onPageChange(newPage);
        api.start({
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          config: springConfigs.wobbly
        });
      }
    });
  }, [currentPage, onPageChange, api]);

  // Calculate resistance based on position and limits
  const calculateResistance = useCallback((deltaY: number): number => {
    const isAtStart = currentPage === 0 && deltaY > 0; // trying to go to previous when at first page
    const isAtEnd = currentPage === pages.length - 1 && deltaY < 0; // trying to go to next when at last page
    
    if (isAtStart || isAtEnd) {
      return gestureConfig.resistance;
    }
    return 1;
  }, [currentPage, pages.length]);

  // Drag gesture handler
  const bind = useDrag(
    ({ 
      down, 
      movement: [, my], 
      velocity: [, vy], 
      direction: [, dy],
      cancel,
      first,
      last 
    }) => {
      if (first) {
        setIsDragging(true);
        shadowApi.start({ shadowOpacity: 0.4 });
      }

      if (last) {
        setIsDragging(false);
        setDragDirection(null);
        shadowApi.start({ shadowOpacity: 0.2, overlayOpacity: 0 });

        // Determine if we should change pages
        const threshold = gestureConfig.threshold;
        const velocityThreshold = gestureConfig.velocityThreshold;
        
        const shouldFlip = Math.abs(my) > threshold || Math.abs(vy) > velocityThreshold;
        
        if (shouldFlip) {
          const direction = my > 0 ? 'down' : 'up'; // down = previous, up = next
          const newPage = direction === 'down' 
            ? Math.max(0, currentPage - 1)
            : Math.min(pages.length - 1, currentPage + 1);
          
          if (newPage !== currentPage) {
            changePage(newPage, direction);
            return;
          }
        }

        // Spring back to original position
        api.start({
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          config: springConfigs.wobbly
        });
        return;
      }

      if (down) {
        const resistance = calculateResistance(my);
        const dampedMovement = my * resistance;
        const progress = Math.abs(dampedMovement) / 300;
        const direction = my > 0 ? 'down' : 'up';
        
        setDragDirection(direction);
        
        // Update overlay opacity based on progress
        shadowApi.start({ 
          overlayOpacity: Math.min(progress * 0.3, 0.3),
          config: { tension: 300, friction: 30 }
        });

        // Update main spring values
        api.start({
          y: dampedMovement,
          rotateX: (dampedMovement / 300) * (direction === 'up' ? -15 : 15),
          scale: 1 - progress * 0.05,
          opacity: 1 - progress * 0.2,
          immediate: true
        });
      }
    },
    {
      axis: 'y',
      bounds: { top: -400, bottom: 400 },
      rubberband: true,
      filterTaps: true,
      preventScroll: true
    }
  );

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

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-900/25 overflow-hidden relative" style={{ height: '600px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 relative z-10">
        <h1 className="text-xl font-bold text-center">Golf Yardage Book</h1>
        <p className="text-center text-blue-100 text-sm">React Spring Version</p>
      </div>

      {/* Page container */}
      <div 
        ref={containerRef}
        className="relative h-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
        style={{ height: 'calc(100% - 80px)' }}
        {...bind()}
      >
        {/* Dynamic shadow based on drag */}
        <animated.div
          className="absolute inset-0 bg-black pointer-events-none z-10"
          style={{
            opacity: shadowOpacity.to(o => o * 0.1)
          }}
        />

        {/* Main page content */}
        <animated.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{
            y,
            rotateX,
            scale,
            opacity,
            transformStyle: 'preserve-3d',
            transformOrigin: 'center top'
          }}
        >
          {pages[currentPage]?.content}
          
          {/* Drag indicator overlay */}
          <animated.div
            className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none"
            style={{
              opacity: overlayOpacity
            }}
          >
            {isDragging && (
              <div className="text-4xl text-gray-600">
                {dragDirection === 'up' ? '↑' : '↓'}
              </div>
            )}
          </animated.div>
        </animated.div>

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
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Navigation hints */}
        {!isDragging && (
          <div className="absolute inset-x-4 bottom-12 text-center text-gray-500 text-sm z-20">
            Swipe up for next page • Swipe down for previous page
          </div>
        )}

        {/* Progressive resistance indicator */}
        {isDragging && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-600">
              {currentPage === 0 && dragDirection === 'down' && "First page"}
              {currentPage === pages.length - 1 && dragDirection === 'up' && "Last page"}
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
  );
};

export default PageFlipDemo;