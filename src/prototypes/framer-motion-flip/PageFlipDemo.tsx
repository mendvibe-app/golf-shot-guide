import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import type { PageContent, PageFlipProps, DragInfo, GestureState } from './types';

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

  // Motion values for smooth animations
  const dragY = useMotionValue(0);
  const dragProgress = useTransform(dragY, [-300, 0, 300], [1, 0, -1]);
  
  // Gesture state
  const [gestureState, setGestureState] = useState<GestureState>({
    isDragging: false,
    progress: 0,
    direction: null
  });

  // Animation variants
  const pageVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? -400 : 400,
      rotateX: direction > 0 ? -15 : 15,
      opacity: 0,
      scale: 0.9,
      transformOrigin: 'center top'
    }),
    center: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center top',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? 400 : -400,
      rotateX: direction > 0 ? 15 : -15,
      opacity: 0,
      scale: 0.9,
      transformOrigin: 'center top',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 35
      }
    })
  };

  // Handle drag events
  const handleDragStart = useCallback(() => {
    setGestureState(prev => ({ ...prev, isDragging: true }));
  }, []);

  const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const progress = Math.abs(offset.y) / 300; // 300px = 100% progress
    const direction = offset.y > 0 ? 'down' : 'up';
    
    setGestureState(prev => ({
      ...prev,
      progress: Math.min(progress, 1),
      direction
    }));
    
    dragY.set(offset.y);
  }, [dragY]);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const velocityThreshold = 500; // px/s
    const distanceThreshold = 150; // px
    
    const shouldFlip = Math.abs(velocity.y) > velocityThreshold || Math.abs(offset.y) > distanceThreshold;
    const direction = offset.y > 0 ? 1 : -1; // down = 1, up = -1
    
    if (shouldFlip) {
      const newPage = direction > 0 
        ? Math.max(0, currentPage - 1) // swipe down = previous page
        : Math.min(pages.length - 1, currentPage + 1); // swipe up = next page
      
      if (newPage !== currentPage) {
        onPageChange(newPage);
      }
    }
    
    // Reset gesture state
    setGestureState({
      isDragging: false,
      progress: 0,
      direction: null
    });
    
    dragY.set(0);
  }, [currentPage, pages.length, onPageChange, dragY]);

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, pages.length, onPageChange]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const resetToFirstPage = useCallback(() => {
    onPageChange(0);
  }, [onPageChange]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-900/25 overflow-hidden relative" style={{ height: '600px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 relative z-10">
        <h1 className="text-xl font-bold text-center">Golf Yardage Book</h1>
        <p className="text-center text-emerald-100 text-sm">Framer Motion Version</p>
      </div>

      {/* Page container */}
      <div className="relative h-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <AnimatePresence mode="wait" custom={gestureState.direction === 'up' ? -1 : 1}>
          <motion.div
            key={currentPage}
            custom={gestureState.direction === 'up' ? -1 : 1}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="y"
            dragConstraints={{ top: -50, bottom: 50 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              height: 'calc(100% - 80px)', // Account for header
              cursor: gestureState.isDragging ? 'grabbing' : 'grab',
              transformStyle: 'preserve-3d',
            }}
            whileDrag={{
              scale: 0.95,
              transition: { duration: 0 }
            }}
            className="absolute inset-0 top-20"
          >
            {pages[currentPage]?.content}
            
            {/* Drag indicator overlay */}
            {gestureState.isDragging && (
              <motion.div
                className="absolute inset-0 bg-black/5 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: gestureState.progress * 0.3 }}
              >
                <div className="text-4xl text-gray-600">
                  {gestureState.direction === 'up' ? '↑' : '↓'}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Page indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentPage 
                  ? 'bg-emerald-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Navigation hints */}
        {!gestureState.isDragging && (
          <div className="absolute inset-x-4 bottom-12 text-center text-gray-500 text-sm z-10">
            Swipe up for next page • Swipe down for previous page
          </div>
        )}
      </div>

      {/* Reset button */}
      <button
        onClick={resetToFirstPage}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 z-20"
      >
        Reset
      </button>
    </div>
  );
};

export default PageFlipDemo;