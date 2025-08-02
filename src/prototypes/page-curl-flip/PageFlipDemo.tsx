import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { PageContent, PageFlipProps, CurlState, CurlConfig } from './types';

// Golf yardage book mock content
const createGolfContent = (): PageContent[] => [
  {
    id: 1,
    title: 'HOLE 7 • PAR 4 • 385 YDS',
    content: (
      <div className="page-curl-content page-curl-content-amber">
        <div className="page-curl-texture">
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
        
        <div className="page-curl-body">
          <div className="page-curl-header">
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
      <div className="page-curl-content page-curl-content-blue">
        <div className="page-curl-texture">
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
        
        <div className="page-curl-body">
          <div className="page-curl-header">
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
  },
  {
    id: 3,
    title: 'SHORT GAME TIPS',
    content: (
      <div className="page-curl-content page-curl-content-green">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-5"></div>
          <div className="coffee-stain coffee-stain-6"></div>
        </div>
        
        <div className="spiral-binding">
          <div className="spiral-holes">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="spiral-hole"></div>
            ))}
          </div>
        </div>
        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">SHORT GAME MASTERY</h2>
            <p className="hole-subtitle">Chip shots • Pitch shots • Bunker play</p>
          </div>
          
          <div className="shot-icon">
            <div className="icon-mountain">🏌️‍♂️</div>
          </div>
          
          <div className="shot-details">
            <h3 className="shot-title">Chipping Fundamentals</h3>
            <div className="shot-points">
              <div className="shot-point">
                <span className="point-label">Setup:</span>
                <span className="point-text">Ball back, weight forward</span>
              </div>
              <div className="shot-point">
                <span className="point-label">Motion:</span>
                <span className="point-text">Pendulum-like putting stroke</span>
              </div>
              <div className="shot-point">
                <span className="point-label">Club:</span>
                <span className="point-text">7-9 iron for most situations</span>
              </div>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">💡</div>
            <p className="tip-text">
              "Land it on the green and let it roll to the hole"
            </p>
          </div>
        </div>
      </div>
    )
  }
];

// Curl configuration
const curlConfig: CurlConfig = {
  threshold: 0.3, // 30% of page width/height to complete flip
  maxCurl: 150, // Maximum curl distance in pixels
  cornerSize: 80, // Size of corner grab area
  springTension: 0.15, // Spring back tension
  curlIntensity: 1.2 // How dramatic the curl effect is
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

  // Curl state
  const [curlState, setCurlState] = useState<CurlState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    curlAmount: 0,
    cornerGrabbed: null
  });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef<HTMLDivElement>(null);
  const nextPageRef = useRef<HTMLDivElement>(null);

  // Calculate curl effect values for vertical page flipping
  const calculateCurlEffect = useCallback((x: number, y: number, startX: number, startY: number, corner: 'bottom-left' | 'bottom-right') => {
    if (!containerRef.current) return { 
      curlAmount: 0, 
      rotateX: 0, 
      rotateY: 0, 
      skewX: 0, 
      translateX: 0, 
      translateY: 0, 
      gradientAngle: 0,
      curlRadius: 0,
      cornerCurlX: 0,
      cornerCurlY: 0,
      cornerCurlRotate: 0
    };

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = x - startX;
    const deltaY = y - startY;
    
    // For vertical flipping, we primarily care about upward movement
    const verticalDistance = Math.max(0, startY - y); // Only count upward movement
    const horizontalDistance = Math.abs(deltaX);
    
    // Calculate curl amount based on upward movement
    const maxVerticalDistance = rect.height * 0.8; // 80% of height
    const curlAmount = Math.min(verticalDistance / maxVerticalDistance, 1);
    
    // Calculate transformations for realistic vertical paper curl (hinge from top)
    const rotateX = curlAmount * 90; // Rotate around X-axis, hinging from top seam
    const rotateY = (horizontalDistance / rect.width) * 10; // Slight Y rotation for corner twist
    const skewX = curlAmount * 5; // Subtle skew for perspective
    
    // Page follows the drag but hinges from top
    const translateX = deltaX * 0.2;
    const translateY = 0; // No Y translation - page hinges from top
    
    // Gradient angle for shadow effect (diagonal from corner)
    const gradientAngle = corner === 'bottom-left' ? 45 : 135;
    
    // Curl radius for smooth corner rounding
    const curlRadius = curlAmount * 30;
    
    // Corner curl effect - how much the corner itself curls
    const cornerCurlX = deltaX * 0.5;
    const cornerCurlY = Math.max(0, startY - y) * 0.3;
    const cornerCurlRotate = curlAmount * 45;
    
    return {
      curlAmount,
      rotateX,
      rotateY,
      skewX,
      translateX,
      translateY,
      gradientAngle,
      curlRadius,
      cornerCurlX,
      cornerCurlY,
      cornerCurlRotate
    };
  }, []);

  // Update CSS custom properties for curl effect
  const updateCurlEffect = useCallback((
    curlAmount: number,
    rotateX: number,
    rotateY: number,
    skewX: number,
    translateX: number,
    translateY: number,
    gradientAngle: number,
    curlRadius: number,
    cornerCurlX: number,
    cornerCurlY: number,
    cornerCurlRotate: number,
    corner: 'bottom-left' | 'bottom-right' | null
  ) => {
    if (currentPageRef.current) {
      currentPageRef.current.style.setProperty('--curl-amount', curlAmount.toString());
      currentPageRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
      currentPageRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
      currentPageRef.current.style.setProperty('--skew-x', `${skewX}deg`);
      currentPageRef.current.style.setProperty('--translate-x', `${translateX}px`);
      currentPageRef.current.style.setProperty('--translate-y', `${translateY}px`);
      currentPageRef.current.style.setProperty('--gradient-angle', `${gradientAngle}deg`);
      currentPageRef.current.style.setProperty('--curl-radius', `${curlRadius}px`);
      currentPageRef.current.style.setProperty('--corner-curl-x', `${cornerCurlX}px`);
      currentPageRef.current.style.setProperty('--corner-curl-y', `${cornerCurlY}px`);
      currentPageRef.current.style.setProperty('--corner-curl-rotate', `${cornerCurlRotate}deg`);
      currentPageRef.current.style.setProperty('--corner', corner || 'none');
    }
  }, []);

  // Check if point is in corner grab area (bottom corners for vertical flipping)
  const isInCorner = useCallback((x: number, y: number): 'bottom-left' | 'bottom-right' | null => {
    if (!containerRef.current) return null;
    
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;
    
    // Larger corner areas for mobile (easier to grab)
    const cornerSize = Math.max(curlConfig.cornerSize, 100); // Minimum 100px for mobile
    
    // Bottom-left corner
    if (relativeX < cornerSize && relativeY > rect.height - cornerSize) {
      return 'bottom-left';
    }
    
    // Bottom-right corner  
    if (relativeX > rect.width - cornerSize && relativeY > rect.height - cornerSize) {
      return 'bottom-right';
    }
    
    return null;
  }, []);

  // Handle pointer events
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const corner = isInCorner(e.clientX, e.clientY);
    if (!corner) return;
    
    e.preventDefault();
    setCurlState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      curlAmount: 0,
      cornerGrabbed: corner
    });
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, [isInCorner]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    // Update cursor based on corner proximity
    if (!curlState.isDragging) {
      const corner = isInCorner(e.clientX, e.clientY);
      if (containerRef.current) {
        containerRef.current.style.cursor = corner ? 'grab' : 'default';
      }
      return;
    }
    
    e.preventDefault();
    
    const curlEffect = calculateCurlEffect(
      e.clientX, 
      e.clientY, 
      curlState.startX, 
      curlState.startY, 
      curlState.cornerGrabbed!
    );
    
    setCurlState(prev => ({
      ...prev,
      currentX: e.clientX,
      currentY: e.clientY,
      curlAmount: curlEffect.curlAmount
    }));
    
    updateCurlEffect(
      curlEffect.curlAmount,
      curlEffect.rotateX,
      curlEffect.rotateY,
      curlEffect.skewX,
      curlEffect.translateX,
      curlEffect.translateY,
      curlEffect.gradientAngle,
      curlEffect.curlRadius,
      curlEffect.cornerCurlX,
      curlEffect.cornerCurlY,
      curlEffect.cornerCurlRotate,
      curlState.cornerGrabbed
    );
  }, [curlState, calculateCurlEffect, updateCurlEffect, isInCorner]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!curlState.isDragging) return;
    
    e.preventDefault();
    
    // Determine if we should flip the page
    const shouldFlip = curlState.curlAmount > curlConfig.threshold;
    
    if (shouldFlip && currentPage < pages.length - 1) {
      // Complete the page flip
      onPageChange(currentPage + 1);
    }
    
    // Reset curl state
    setCurlState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      curlAmount: 0,
      cornerGrabbed: null
    });
    
    // Reset CSS
    updateCurlEffect(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'default';
    }
  }, [curlState, currentPage, pages.length, onPageChange, updateCurlEffect]);

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
    <>
      <style>{`
        .page-curl-flip {
          --curl-amount: 0;
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --skew-x: 0deg;
          --translate-x: 0px;
          --translate-y: 0px;
          --gradient-angle: 0deg;
          --curl-radius: 0px;
          --corner-curl-x: 0px;
          --corner-curl-y: 0px;
          --corner-curl-rotate: 0deg;
          --corner: none;
        }

        .page-curl-container {
          perspective: 1500px;
          position: relative;
          touch-action: none;
          user-select: none;
          overflow: hidden;
        }

        .page-curl-stack {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .page-curl-layer {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .page-curl-current {
          z-index: 2;
          transform-origin: top center;
          transform: 
            translate3d(var(--translate-x), var(--translate-y), 0)
            rotateX(var(--rotate-x))
            rotateY(var(--rotate-y))
            skewX(var(--skew-x));
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .page-curl-current.dragging {
          transition: none;
        }

        .page-curl-next {
          z-index: 1;
          opacity: calc(var(--curl-amount) * 0.8 + 0.2);
        }

        .page-curl-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
        }

        .page-curl-content-amber {
          background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
        }

        .page-curl-content-blue {
          background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
        }

        .page-curl-content-green {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }

        .page-curl-content {
          position: relative;
          z-index: 1;
        }

        /* Actual corner curling effect */
        .page-curl-current::after {
          content: '';
          position: absolute;
          width: 120px;
          height: 120px;
          background: 
            radial-gradient(
              ellipse at 70% 70%,
              rgba(255,255,255,0.9) 0%,
              rgba(255,255,255,0.7) 20%,
              rgba(200,200,200,0.5) 40%,
              rgba(150,150,150,0.3) 60%,
              transparent 80%
            );
          border-radius: 60px;
          opacity: var(--curl-amount);
          pointer-events: none;
          transition: none;
          transform-origin: center center;
          box-shadow: 
            inset 2px 2px 8px rgba(0,0,0,0.2),
            2px 2px 12px rgba(0,0,0,0.3);
        }

        /* Position corner curl based on which corner is grabbed */
        .page-curl-current[data-corner="bottom-right"]::after {
          bottom: -60px;
          right: -60px;
          transform: 
            translate(var(--corner-curl-x), calc(var(--corner-curl-y) * -1))
            rotate(var(--corner-curl-rotate))
            rotateX(calc(var(--curl-amount) * 30deg));
        }

        .page-curl-current[data-corner="bottom-left"]::after {
          bottom: -60px;
          left: -60px;
          transform: 
            translate(calc(var(--corner-curl-x) * -1), calc(var(--corner-curl-y) * -1))
            rotate(calc(var(--corner-curl-rotate) * -1))
            rotateX(calc(var(--curl-amount) * 30deg));
        }

        /* Additional curling shadow on the main page */
        .page-curl-current::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(
              var(--gradient-angle),
              transparent 60%,
              rgba(0,0,0,0.1) 70%,
              rgba(0,0,0,0.2) 80%,
              rgba(0,0,0,0.3) 90%,
              rgba(0,0,0,0.4) 100%
            );
          opacity: var(--curl-amount);
          pointer-events: none;
          border-radius: inherit;
        }

        .page-curl-texture {
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
          top: 1rem; right: 2rem; width: 3rem; height: 2rem; background: #a16207;
        }
        .coffee-stain-2 {
          bottom: 3rem; left: 1.5rem; width: 2rem; height: 1.5rem; background: #a16207;
        }
        .coffee-stain-3 {
          top: 2rem; left: 3rem; width: 2.5rem; height: 1.5rem; background: #1e40af;
        }
        .coffee-stain-4 {
          bottom: 4rem; right: 2rem; width: 1.5rem; height: 2rem; background: #1e40af;
        }
        .coffee-stain-5 {
          top: 1.5rem; right: 1rem; width: 2rem; height: 2.5rem; background: #059669;
        }
        .coffee-stain-6 {
          bottom: 2rem; left: 2rem; width: 1.5rem; height: 1rem; background: #059669;
        }

        .spiral-binding {
          position: absolute;
          top: 0; left: 0; right: 0; height: 2rem;
          background: linear-gradient(to bottom, #d1d5db, #9ca3af);
          border-bottom: 2px solid #6b7280;
        }

        .spiral-holes {
          display: flex; justify-content: center; align-items: center;
          height: 100%; gap: 3rem;
        }

        .spiral-hole {
          width: 0.75rem; height: 0.75rem; background: #374151;
          border-radius: 50%; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .page-curl-body { margin-top: 2rem; flex: 1; }
        .page-curl-header { text-align: center; margin-bottom: 1.5rem; }
        .hole-title { font-size: 1.5rem; font-weight: bold; color: #374151; margin-bottom: 0.5rem; }
        .hole-subtitle { color: #6b7280; font-weight: 500; }

        .hole-diagram {
          position: relative; background: #dcfce7; border-radius: 0.5rem;
          padding: 1.5rem; margin-bottom: 1.5rem; height: 12rem; overflow: hidden;
        }
        .diagram-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #bbf7d0, #a7f3d0); opacity: 0.5; }
        .fairway { position: absolute; bottom: 0.5rem; left: 1rem; right: 1rem; height: 4rem; background: #4ade80; border-radius: 0.5rem; opacity: 0.7; }
        .green { position: absolute; top: 1rem; right: 2rem; width: 4rem; height: 3rem; background: #22c55e; border-radius: 50%; }
        .bunker { position: absolute; bottom: 2rem; left: 2rem; width: 2rem; height: 1.5rem; background: #fde047; border-radius: 0.5rem; }
        .pin { position: absolute; top: 2rem; right: 3rem; width: 0.25rem; height: 2rem; background: #dc2626; }
        .flag { position: absolute; top: 1.5rem; right: 2.25rem; width: 0.75rem; height: 0.5rem; background: #dc2626; }
        .golfer { position: absolute; top: 4rem; right: 1.5rem; font-size: 2.5rem; }

        .yardage-notes { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .yardage-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: rgba(255, 255, 255, 0.5); border-radius: 0.5rem; }
        .yardage-label { color: #374151; }
        .yardage-distance { font-size: 1.25rem; color: #1d4ed8; }

        .handwritten-note { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; transform: rotate(-1deg); }
        .note-text { color: #374151; font-style: italic; font-size: 1.125rem; font-weight: 500; }

        .shot-icon { text-align: center; margin-bottom: 2rem; }
        .icon-mountain { font-size: 4rem; margin-bottom: 1rem; }

        .shot-details { background: rgba(255, 255, 255, 0.6); border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem; }
        .shot-title { font-size: 1.25rem; font-weight: bold; color: #1e40af; margin-bottom: 1rem; }
        .shot-points { display: flex; flex-direction: column; gap: 0.75rem; }
        .shot-point { display: flex; align-items: flex-start; gap: 0.75rem; }
        .point-label { font-weight: bold; color: #1d4ed8; min-width: fit-content; }
        .point-text { color: #374151; }

        .pro-tip { background: linear-gradient(to right, #fef3c7, #fed7aa); border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 0 0.5rem 0.5rem 0; display: flex; align-items: center; gap: 0.75rem; }
        .tip-icon { font-size: 2rem; }
        .tip-text { color: #374151; font-weight: 500; font-style: italic; font-size: 1.125rem; }

        /* Corner curl indicators for vertical flipping */
        .page-curl-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 80px;
          background: 
            radial-gradient(
              circle at bottom left,
              rgba(255,255,255,0.2) 0%,
              rgba(255,255,255,0.1) 40%,
              transparent 70%
            );
          border-radius: 0 50px 0 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .page-curl-container:hover::after {
          opacity: 1;
        }

        /* Bottom-right corner indicator */
        .page-curl-container::before {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: 
            radial-gradient(
              circle at bottom right,
              rgba(255,255,255,0.2) 0%,
              rgba(255,255,255,0.1) 40%,
              transparent 70%
            );
          border-radius: 50px 0 0 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .page-curl-container:hover::before {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-900/25 overflow-hidden relative page-curl-flip" style={{ height: '600px' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 relative z-10">
          <h1 className="text-xl font-bold text-center">Golf Yardage Book</h1>
          <p className="text-center text-orange-100 text-sm">Page Curl Version</p>
        </div>

        {/* Page container */}
        <div 
          ref={containerRef}
          className="page-curl-container relative h-full bg-gradient-to-br from-gray-50 to-gray-100"
          style={{ height: 'calc(100% - 80px)' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="page-curl-stack">
            {/* Next page (underneath) */}
            {currentPage < pages.length - 1 && (
              <div
                ref={nextPageRef}
                className="page-curl-layer page-curl-next"
              >
                {pages[currentPage + 1]?.content}
              </div>
            )}
            
            {/* Current page (on top) */}
            <div
              ref={currentPageRef}
              className={`page-curl-layer page-curl-current ${curlState.isDragging ? 'dragging' : ''}`}
              data-corner={curlState.cornerGrabbed || ''}
            >
              {pages[currentPage]?.content}
            </div>
          </div>

          {/* Page indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPage 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Instructions */}
          {!curlState.isDragging && (
            <div className="absolute inset-x-4 bottom-12 text-center text-gray-500 text-sm z-20">
              Touch and drag bottom corners up to flip like a real yardage book
            </div>
          )}

          {/* Curl feedback */}
          {curlState.isDragging && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-600">
                {curlState.curlAmount > curlConfig.threshold ? 
                  "Release to flip page" : 
                  `${Math.round(curlState.curlAmount * 100)}% - ${Math.round(curlConfig.threshold * 100)}% to flip`
                }
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