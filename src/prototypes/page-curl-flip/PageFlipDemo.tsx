import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { PageContent, PageFlipProps, CurlState, CurlConfig } from './types';
import { FaBars, FaTimes, FaGolfBall, FaBook, FaCalculator, FaUser, FaBullseye } from 'react-icons/fa';
import { TbGolf } from 'react-icons/tb';

// Web Haptic Feedback utility
const triggerHapticFeedback = (intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30]
    };
    navigator.vibrate(patterns[intensity]);
  }
};

// Ultra-realistic paper sound effects - completely organic approach
const playPaperSound = (type: 'flip' | 'rustle' = 'rustle') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (type === 'flip') {
      // Real paper flip - complex multi-layer organic sound
      const duration = 0.25 + Math.random() * 0.1;
      
      // Layer 1: Subtle air displacement (very low frequency)
      const airOsc = audioContext.createOscillator();
      const airGain = audioContext.createGain();
      const airFilter = audioContext.createBiquadFilter();
      
      airOsc.type = 'sine';
      airFilter.type = 'lowpass';
      airFilter.frequency.value = 120;
      airFilter.Q.value = 0.3;
      
      airOsc.connect(airFilter);
      airFilter.connect(airGain);
      airGain.connect(audioContext.destination);
      
      airOsc.frequency.setValueAtTime(45 + Math.random() * 15, audioContext.currentTime);
      airOsc.frequency.exponentialRampToValueAtTime(25 + Math.random() * 10, audioContext.currentTime + duration);
      
      airGain.gain.setValueAtTime(0, audioContext.currentTime);
      airGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.02);
      airGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      // Layer 2: Paper fiber friction - ultra-subtle texture
      const createOrganicNoise = (size: number, shaping: (i: number, size: number) => number) => {
        const buffer = audioContext.createBuffer(1, size, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        let prevValue = 0;
        
        for (let i = 0; i < size; i++) {
          // Create organic noise with memory (brown-ish)
          const rawNoise = (Math.random() * 2 - 1) * 0.3;
          const smoothed = prevValue * 0.85 + rawNoise * 0.15; // Heavy smoothing
          prevValue = smoothed;
          output[i] = smoothed * shaping(i, size);
        }
        return buffer;
      };
      
      const fiberBuffer = createOrganicNoise(4096, (i, size) => {
        const progress = i / size;
        // Gentle fade in/out with slight mid-emphasis
        return Math.sin(progress * Math.PI) * (0.5 + 0.5 * Math.sin(progress * Math.PI * 3));
      });
      
      const fiberSource = audioContext.createBufferSource();
      const fiberGain = audioContext.createGain();
      const fiberFilter = audioContext.createBiquadFilter();
      
      fiberFilter.type = 'bandpass';
      fiberFilter.frequency.value = 800 + Math.random() * 300;
      fiberFilter.Q.value = 0.8; // Very gentle filtering
      
      fiberSource.buffer = fiberBuffer;
      fiberSource.connect(fiberFilter);
      fiberFilter.connect(fiberGain);
      fiberGain.connect(audioContext.destination);
      
      fiberGain.gain.setValueAtTime(0.04, audioContext.currentTime);
      fiberGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration * 0.8);
      
      // Layer 3: Ultra-subtle high frequency paper texture
      const textureBuffer = createOrganicNoise(2048, (i, size) => {
        const progress = i / size;
        return Math.pow(1 - progress, 2) * (0.3 + 0.7 * Math.sin(progress * Math.PI * 7));
      });
      
      const textureSource = audioContext.createBufferSource();
      const textureGain = audioContext.createGain();
      const textureFilter = audioContext.createBiquadFilter();
      
      textureFilter.type = 'highpass';
      textureFilter.frequency.value = 2000;
      textureFilter.Q.value = 0.4;
      
      textureSource.buffer = textureBuffer;
      textureSource.connect(textureFilter);
      textureFilter.connect(textureGain);
      textureGain.connect(audioContext.destination);
      
      textureGain.gain.setValueAtTime(0.02, audioContext.currentTime);
      textureGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration * 0.4);
      
      // Start all layers with realistic timing
      airOsc.start(audioContext.currentTime);
      airOsc.stop(audioContext.currentTime + duration);
      fiberSource.start(audioContext.currentTime + 0.01);
      fiberSource.stop(audioContext.currentTime + duration);
      textureSource.start(audioContext.currentTime + 0.005);
      textureSource.stop(audioContext.currentTime + duration * 0.4);
      
    } else {
      // Ultra-subtle paper rustle - barely audible organic texture
      const duration = 0.12 + Math.random() * 0.06;
      
      // Single layer of extremely gentle organic noise
      const createSoftPaperNoise = () => {
        const bufferSize = 1024;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        let smoothValue = 0;
        
        for (let i = 0; i < bufferSize; i++) {
          // Ultra-smooth organic noise generation
          const randomStep = (Math.random() - 0.5) * 0.05; // Very small steps
          smoothValue += randomStep;
          smoothValue *= 0.98; // Gentle decay to prevent drift
          
          const progress = i / bufferSize;
          const envelope = Math.sin(progress * Math.PI); // Natural fade in/out
          
          output[i] = smoothValue * envelope * (0.5 + 0.5 * Math.random()); // Add subtle variation
        }
        return buffer;
      };
      
      const rustleBuffer = createSoftPaperNoise();
      const rustleSource = audioContext.createBufferSource();
      const rustleGain = audioContext.createGain();
      const rustleFilter1 = audioContext.createBiquadFilter();
      const rustleFilter2 = audioContext.createBiquadFilter();
      
      // Multiple gentle filters to remove any harshness
      rustleFilter1.type = 'lowpass';
      rustleFilter1.frequency.value = 1500 + Math.random() * 500;
      rustleFilter1.Q.value = 0.3;
      
      rustleFilter2.type = 'highpass';
      rustleFilter2.frequency.value = 300 + Math.random() * 200;
      rustleFilter2.Q.value = 0.3;
      
      rustleSource.buffer = rustleBuffer;
      rustleSource.connect(rustleFilter1);
      rustleFilter1.connect(rustleFilter2);
      rustleFilter2.connect(rustleGain);
      rustleGain.connect(audioContext.destination);
      
      // Audible but gentle volume
      rustleGain.gain.setValueAtTime(0.05, audioContext.currentTime);
      rustleGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      rustleSource.start(audioContext.currentTime);
      rustleSource.stop(audioContext.currentTime + duration);
    }
  } catch (error) {
    // Ultra-quiet fallback - almost no sound
    // Sound playback failed silently
  }
};

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
        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">HOLE 7 • PAR 4 • 385 YDS</h2>
            <p className="hole-subtitle">Slight dogleg right • Wind: 10mph SW</p>
          </div>
          
          <div className="hole-diagram">
            <div className="diagram-bg"></div>
            <div className="fairway"></div>
            <div className="hole-green"></div>
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
            <div className="tip-icon">FOCUS</div>
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
            <div className="tip-icon">TIP</div>
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
  onPageChange: externalOnPageChange,
  tabId = 'shots' // Add tabId prop for contextual menu
}) => {
  // Use internal state if no external props provided
  const defaultPages = useMemo(() => createGolfContent(), []);
  const pages = externalPages || defaultPages;
  const [internalCurrentPage, setInternalCurrentPage] = useState(0);
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  
  // Enhanced page change handler that resets scroll position
  const handlePageChange = useCallback((newPage: number) => {
    const originalHandler = externalOnPageChange || setInternalCurrentPage;
    originalHandler(newPage);
    
    // Reset scroll position to top when page changes
    setTimeout(() => {
      const scrollableElements = document.querySelectorAll('.page-curl-scrollable');
      scrollableElements.forEach(element => {
        element.scrollTop = 0;
      });
    }, 50); // Small delay to ensure page has rendered
  }, [externalOnPageChange]);
  
  const onPageChange = handlePageChange;

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

  // Navigation state
  const [showQuickTOC, setShowQuickTOC] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef<HTMLDivElement>(null);
  const nextPageRef = useRef<HTMLDivElement>(null);

  // Calculate curl effect values for vertical page flipping (forward and backward)
  const calculateCurlEffect = useCallback((x: number, y: number, startX: number, startY: number, corner: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right') => {
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
    
    const isTopCorner = corner === 'top-left' || corner === 'top-right';
    const isBottomCorner = corner === 'bottom-left' || corner === 'bottom-right';
    
    let verticalDistance: number;
    let curlAmount: number;
    let rotateX: number;
    let gradientAngle: number;
    
    if (isBottomCorner) {
      // FORWARD navigation: bottom corners flip UP
      verticalDistance = Math.max(0, startY - y); // Only count upward movement
      const maxVerticalDistance = rect.height * 0.8;
      curlAmount = Math.min(verticalDistance / maxVerticalDistance, 1);
      rotateX = curlAmount * 90; // Rotate around X-axis, hinging from top seam
      gradientAngle = corner === 'bottom-left' ? 45 : 135;
    } else {
      // BACKWARD navigation: top corners flip DOWN
      verticalDistance = Math.max(0, y - startY); // Only count downward movement  
      const maxVerticalDistance = rect.height * 0.8;
      curlAmount = Math.min(verticalDistance / maxVerticalDistance, 1);
      rotateX = curlAmount * -90; // Negative rotation for backward flip
      gradientAngle = corner === 'top-left' ? 225 : 315;
    }
    
    const horizontalDistance = Math.abs(deltaX);
    
    // Calculate transformations for realistic vertical paper curl
    const rotateY = (horizontalDistance / rect.width) * 10; // Slight Y rotation for corner twist
    const skewX = curlAmount * 5; // Subtle skew for perspective
    
    // Page follows the drag but hinges appropriately
    const translateX = deltaX * 0.2;
    const translateY = 0; // No Y translation - page hinges from seam
    
    // Curl radius for smooth corner rounding
    const curlRadius = curlAmount * 30;
    
    // Corner curl effect - how much the corner itself curls
    const cornerCurlX = deltaX * 0.5;
    const cornerCurlY = isBottomCorner ? 
      Math.max(0, startY - y) * 0.3 : // Bottom: curl up
      Math.max(0, y - startY) * 0.3;   // Top: curl down
    const cornerCurlRotate = curlAmount * (isBottomCorner ? 45 : -45);
    
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
    corner: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | null
  ) => {
    if (currentPageRef.current) {
      // Set transform origin based on direction
      const isTopCorner = corner === 'top-left' || corner === 'top-right';
      const transformOrigin = isTopCorner ? 'bottom center' : 'top center';
      currentPageRef.current.style.setProperty('--transform-origin', transformOrigin);
      
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
  const isInCorner = useCallback((x: number, y: number): 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | null => {
    if (!containerRef.current) return null;
    
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;
    
    // Larger corner areas for mobile (easier to grab)
    const cornerSize = Math.max(curlConfig.cornerSize, 100); // Minimum 100px for mobile

    // Bottom corners for NEXT page
    if (relativeX < cornerSize && relativeY > rect.height - cornerSize) {
      return 'bottom-left';
    }
    if (relativeX > rect.width - cornerSize && relativeY > rect.height - cornerSize) {
      return 'bottom-right';
    }

    // Top corners for PREVIOUS page (only if not on first page)
    if (currentPage > 0) {
      if (relativeX < cornerSize && relativeY < cornerSize) {
        return 'top-left';
      }
      if (relativeX > rect.width - cornerSize && relativeY < cornerSize) {
        return 'top-right';
      }
    }
    
    return null;
  }, [currentPage]);

  // Handle pointer events
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const corner = isInCorner(e.clientX, e.clientY);
    if (!corner) return;
    
    e.preventDefault();
    
    // Enhanced feedback on grab start
    triggerHapticFeedback('light');
    playPaperSound('rustle');
    
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
    
    // Progressive haptic feedback based on curl progress
    const previousCurlAmount = curlState.curlAmount;
    const curlDelta = Math.abs(curlEffect.curlAmount - previousCurlAmount);
    
    // Trigger feedback at key thresholds
    if (curlEffect.curlAmount > 0.2 && previousCurlAmount <= 0.2) {
      triggerHapticFeedback('light'); // Start curling
    } else if (curlEffect.curlAmount > 0.5 && previousCurlAmount <= 0.5) {
      triggerHapticFeedback('medium'); // Halfway point
    } else if (curlEffect.curlAmount > 0.8 && previousCurlAmount <= 0.8) {
      triggerHapticFeedback('heavy'); // Almost flipping
    }
    
    // Subtle continuous feedback for active dragging
    if (curlDelta > 0.05) {
      playPaperSound('rustle');
    }
    
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
    const isTopCorner = curlState.cornerGrabbed === 'top-left' || curlState.cornerGrabbed === 'top-right';
    const isBottomCorner = curlState.cornerGrabbed === 'bottom-left' || curlState.cornerGrabbed === 'bottom-right';
    
    if (shouldFlip) {
      if (isBottomCorner && currentPage < pages.length - 1) {
        // FORWARD navigation: bottom corners go to next page
        triggerHapticFeedback('heavy');
        playPaperSound('flip');
        onPageChange(currentPage + 1);
      } else if (isTopCorner && currentPage > 0) {
        // BACKWARD navigation: top corners go to previous page
        triggerHapticFeedback('heavy');
        playPaperSound('flip');
        onPageChange(currentPage - 1);
      } else {
        // Can't flip (at first/last page)
        triggerHapticFeedback('light');
        playPaperSound('rustle');
      }
    } else {
      // Feedback for snap-back
      triggerHapticFeedback('light');
      playPaperSound('rustle');
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
    
    // Reset CSS with smooth transition
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

  // Contextual menu data based on tab
  const getContextualMenuData = (tabId: string) => {
    switch (tabId) {
      case 'shots':
        return [
          { name: 'Uphill Lie', page: 1, description: 'Ball above feet on upslope' },
          { name: 'Downhill Lie', page: 2, description: 'Ball below feet on downslope' },
          { name: 'Ball Above Feet', page: 3, description: 'Standing below ball on sidehill' },
          { name: 'Ball Below Feet', page: 4, description: 'Standing above ball on sidehill' },
          { name: 'Fairway Bunker', page: 5, description: 'Good lie in fairway bunker' },
          { name: 'Greenside Bunker', page: 6, description: 'Short bunker shot to green' },
          { name: 'Deep Bunker', page: 7, description: 'High lip bunker' },
          { name: 'Wet Sand Bunker', page: 8, description: 'Bunker after rain' },
          { name: 'Trees/Obstacles', page: 9, description: 'Behind trees or obstacles' },
          { name: 'Low Punch Shot', page: 10, description: 'Under trees or in wind' },
          { name: 'Into the Wind', page: 11, description: 'Strong headwind' },
          { name: 'With the Wind', page: 12, description: 'Strong tailwind' },
          { name: 'Crosswind Left to Right', page: 13, description: 'Wind blowing left to right' },
          { name: 'Crosswind Right to Left', page: 14, description: 'Wind blowing right to left' },
          { name: 'Fade Shot', page: 15, description: 'Need ball to curve left to right' },
          { name: 'Draw Shot', page: 16, description: 'Need ball to curve right to left' },
          { name: 'Flop Shot', page: 17, description: 'Short distance over obstacle' },
          { name: 'Bump and Run', page: 18, description: 'Lots of green to work with' },
          { name: 'Pitch Shot', page: 19, description: '30-60 yards to pin' },
          { name: 'Chip Shot', page: 20, description: 'Just off the green' }
        ];
      case 'putting':
        return [
          { name: 'Straight Putt', page: 1, description: 'Ball directly in line with hole' },
          { name: 'Uphill Putt', page: 2, description: 'Putting uphill to the hole' },
          { name: 'Downhill Putt', page: 3, description: 'Putting downhill to the hole' },
          { name: 'Breaking Putt', page: 4, description: 'Green has significant slope' },
          { name: 'Long Lag Putt', page: 5, description: 'Long putts (20+ feet)' },
          { name: 'Short Pressure Putt', page: 6, description: '3-6 foot putts that matter' }
        ];
      case 'learn':
        return [
          { name: 'Proper Setup & Posture', page: 1, description: 'The foundation of every good golf swing' },
          { name: 'Proper Grip', page: 2, description: 'Your only connection to the club' },
          { name: 'Swing Tempo', page: 3, description: 'The rhythm that makes everything work' },
          { name: 'Weight Transfer', page: 4, description: 'Power comes from the ground up' },
          { name: 'Ball Position', page: 5, description: 'Where you place the ball determines contact quality' },
          { name: 'Alignment', page: 6, description: 'Aiming your body and club correctly' },
          { name: 'Swing Plane', page: 7, description: 'The path your club travels around your body' },
          { name: 'Impact Position', page: 8, description: 'The moment of truth in every golf swing' },
          { name: 'Follow Through', page: 9, description: 'Completing the swing with proper finish' },
          { name: 'Pre-Shot Routine', page: 10, description: 'Consistent preparation for every shot' }
        ];
      default:
        return [];
    }
  };

  const menuData = getContextualMenuData(tabId);

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
        
        /* Custom scrollbar for page content - wider and positioned at edge */
        .page-curl-scrollable::-webkit-scrollbar {
          width: 6px;
        }
        
        .page-curl-scrollable::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 3px;
          margin: 10px 0; /* Add some margin from top/bottom */
        }
        
        .page-curl-scrollable::-webkit-scrollbar-thumb {
          background: rgba(139,69,19,0.4); /* Match paper theme */
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.3); /* Subtle border */
        }
        
        .page-curl-scrollable::-webkit-scrollbar-thumb:hover {
          background: rgba(139,69,19,0.6);
        }
        
        .page-curl-scrollable::-webkit-scrollbar-thumb:active {
          background: rgba(139,69,19,0.8);
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
          transform-origin: var(--transform-origin, top center);
          transform: 
            translate3d(var(--translate-x), var(--translate-y), 0)
            rotateX(var(--rotate-x))
            rotateY(var(--rotate-y))
            skewX(var(--skew-x));
          /* Enhanced spring-like animation inspired by React Spring */
          transition: 
            transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 0.3s ease-out;
          /* Hardware acceleration for 60fps performance */
          will-change: transform, opacity;
          /* Improved filter for realistic paper feel */
          filter: 
            drop-shadow(0 4px 8px rgba(0,0,0,0.1))
            drop-shadow(0 8px 16px rgba(0,0,0,0.1));
        }

        /* Backward navigation uses different transform origin */
        .page-curl-current[data-corner^="top"] {
          transform-origin: bottom center;
        }

        .page-curl-current.dragging {
          transition: none;
          /* Enhanced drop shadow during drag */
          filter: 
            drop-shadow(0 8px 16px rgba(0,0,0,0.2))
            drop-shadow(0 16px 32px rgba(0,0,0,0.15));
        }

        .page-curl-next {
          z-index: 1;
          opacity: calc(var(--curl-amount) * 0.8 + 0.2);
        }

        .page-curl-prev {
          z-index: 0;
          opacity: calc(var(--curl-amount) * 0.8 + 0.2);
        }

        .page-curl-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          /* Enhanced paper texture inspired by React Native LinearGradient */
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0,0,0,0.05) 0%, transparent 50%),
            linear-gradient(135deg, #fef3c7 0%, #fed7aa 60%, #f5f5dc 100%);
          /* Subtle paper grain effect */
          background-size: 100% 100%, 100% 100%, 100% 100%;
          box-shadow: 
            inset 0 0 20px rgba(0,0,0,0.1),
            0 2px 10px rgba(0,0,0,0.15);
        }
        
        /* Scrollable content area that avoids corners */
        .page-curl-scrollable {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 1rem 1.5rem;
          padding-top: 1rem; /* Space for menu button */
          padding-bottom: 8rem; /* Extra bottom padding to ensure content is not hidden behind bottom nav */
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          touch-action: pan-y;
          scroll-behavior: smooth; /* Smooth scroll to top */
        }

        .page-curl-content-amber {
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139,69,19,0.1) 0%, transparent 50%),
            linear-gradient(135deg, var(--paper-cream) 0%, var(--aged-white) 60%, var(--weathered-cream) 100%);
        }

        .page-curl-content-blue {
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139,69,19,0.1) 0%, transparent 50%),
            linear-gradient(135deg, var(--paper-cream) 0%, var(--aged-white) 60%, var(--weathered-cream) 100%);
        }

        .page-curl-content-green {
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139,69,19,0.1) 0%, transparent 50%),
            linear-gradient(135deg, var(--paper-cream) 0%, var(--aged-white) 60%, var(--weathered-cream) 100%);
        }

        .page-curl-content-learn {
          background: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139,69,19,0.1) 0%, transparent 50%),
            linear-gradient(135deg, var(--paper-cream) 0%, var(--aged-white) 60%, var(--weathered-cream) 100%);
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

        .page-curl-current[data-corner="top-right"]::after {
          top: -60px;
          right: -60px;
          transform: 
            translate(var(--corner-curl-x), var(--corner-curl-y))
            rotate(var(--corner-curl-rotate))
            rotateX(calc(var(--curl-amount) * -30deg));
        }

        .page-curl-current[data-corner="top-left"]::after {
          top: -60px;
          left: -60px;
          transform: 
            translate(calc(var(--corner-curl-x) * -1), var(--corner-curl-y))
            rotate(calc(var(--corner-curl-rotate) * -1))
            rotateX(calc(var(--curl-amount) * -30deg));
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
          top: 2rem; left: 3rem; width: 2.5rem; height: 1.5rem; background: #a16207;
        }
        .coffee-stain-4 {
          bottom: 4rem; right: 2rem; width: 1.5rem; height: 2rem; background: #a16207;
        }
        .coffee-stain-5 {
          top: 1.5rem; right: 1rem; width: 2rem; height: 2.5rem; background: #a16207;
        }
        .coffee-stain-6 {
          bottom: 2rem; left: 2rem; width: 1.5rem; height: 1rem; background: #a16207;
        }

        .page-curl-body { margin-top: 1rem; flex: 1; }
        .page-curl-header { text-align: center; margin-bottom: 1.5rem; }
        .hole-title { font-size: 1.5rem; font-weight: bold; color: #374151; margin-bottom: 0.5rem; }
        .hole-subtitle { color: #6b7280; font-weight: 500; }

        .hole-diagram {
          position: relative; background: #dcfce7; border-radius: 0.5rem;
          padding: 1.5rem; margin-bottom: 1.5rem; height: 12rem; overflow: hidden;
        }
        .diagram-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #bbf7d0, #a7f3d0); opacity: 0.5; }
        .fairway { position: absolute; bottom: 0.5rem; left: 1rem; right: 1rem; height: 4rem; background: #4ade80; border-radius: 0.5rem; opacity: 0.7; }
        .hole-green { position: absolute; top: 1rem; right: 2rem; width: 4rem; height: 3rem; background: #22c55e; border-radius: 50%; }
        .bunker { position: absolute; bottom: 2rem; left: 2rem; width: 2rem; height: 1.5rem; background: #fde047; border-radius: 0.5rem; }
        .pin { position: absolute; top: 2rem; right: 3rem; width: 0.25rem; height: 2rem; background: #dc2626; }
        .flag { position: absolute; top: 1.5rem; right: 2.25rem; width: 0.75rem; height: 0.5rem; background: #dc2626; }
        .golfer { position: absolute; top: 4rem; right: 1.5rem; font-size: 2.5rem; }

        .yardage-notes { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .yardage-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: rgba(255, 255, 255, 0.5); border-radius: 0.5rem; }
        .yardage-label { color: #374151; }
        .yardage-distance { font-size: 1.25rem; color: var(--golf-green); }

        .handwritten-note { background: var(--aged-white); border-left: 4px solid var(--golf-green-medium); padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; transform: rotate(-1deg); }
        .note-text { color: #374151; font-style: italic; font-size: 1.125rem; font-weight: 500; }

        .shot-icon { text-align: center; margin-bottom: 2rem; }
        .icon-mountain { font-size: 4rem; margin-bottom: 1rem; }

        .shot-details { background: rgba(255, 255, 255, 0.6); border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem; }
        .shot-title { font-size: 1.25rem; font-weight: bold; color: var(--golf-green); margin-bottom: 1rem; }
        .shot-points { display: flex; flex-direction: column; gap: 0.75rem; }
        .shot-point { display: flex; align-items: flex-start; gap: 0.75rem; }
        .point-label { font-weight: bold; color: var(--golf-green); min-width: fit-content; }
        .point-text { color: #374151; }

        .pro-tip { background: linear-gradient(to right, var(--aged-white), var(--weathered-cream)); border-left: 4px solid var(--golf-green-medium); padding: 1.5rem; border-radius: 0 0.5rem 0.5rem 0; display: flex; align-items: center; gap: 0.75rem; }
        .tip-icon { font-size: 2rem; }
        .tip-text { color: #374151; font-weight: 500; font-style: italic; font-size: 1.125rem; }

        /* Bottom-right corner indicator (forward navigation) */
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

        /* Bottom-left corner indicator - using box-shadow approach */
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

        /* Top corners hint - only show when can go back (styled via box-shadow on after element) */
        .page-curl-container[data-can-go-back="true"]::after {
          box-shadow:
            -80px -80px 0 0 transparent,
            0 -80px 80px -40px rgba(59,130,246,0.15);
        }

        .page-curl-container[data-can-go-back="true"]:hover::after {
          box-shadow:
            -80px -80px 0 0 transparent,
            0 -80px 80px -40px rgba(59,130,246,0.25);
        }

        .menu-button {
          position: absolute;
          top: 4rem;
          right: 4rem;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 40;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          opacity: 0.8;
        }

        .menu-button:hover {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }

        .menu-button:active {
          transform: scale(0.9);
        }

        .menu-button svg {
          width: 24px;
          height: 24px;
        }

        .menu-button.active {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }

        .menu-button.active svg {
          transform: rotate(90deg);
        }

        .menu-button.active:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .menu-button.active:active {
          transform: scale(0.9) rotate(90deg);
        }

        .menu-button.active:hover svg {
          transform: rotate(90deg);
        }

        .menu-button.active:active svg {
          transform: rotate(90deg);
        }


      `}</style>

      <div className="w-full h-full bg-white overflow-hidden relative page-curl-flip">
        {/* Contextual Navigation Menu - Top Right */}
        <button
          onClick={() => setShowQuickTOC(!showQuickTOC)}
          className="menu-button"
          aria-label="Open navigation menu"
        >
          <FaBars className="text-golf-green text-lg" />
        </button>

        {/* Contextual Table of Contents Overlay */}
        {showQuickTOC && (
          <div className="fixed inset-0 overlay-glass z-[2000] flex items-center justify-center" onClick={() => setShowQuickTOC(false)}>
            <div className="bg-weathered-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto border-2 border-leather-brown-light" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-headers text-golf-green font-bold">Shot Navigation</h3>
                  <button 
                    onClick={() => setShowQuickTOC(false)}
                    className="w-8 h-8 rounded-full bg-leather-brown-light hover:bg-leather-brown flex items-center justify-center text-weathered-white transition-colors"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {menuData.map((section, index) => (
                    <button
                      key={section.name}
                      onClick={() => {
                        playPaperSound('flip');
                        triggerHapticFeedback('light');
                        onPageChange(section.page);
                        setShowQuickTOC(false);
                      }}
                      className="w-full p-3 rounded-lg border border-leather-brown-light hover:border-golf-green hover:shadow-sm transition-all duration-200 text-left bg-weathered-cream hover:bg-weathered-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-golf-green rounded-lg flex items-center justify-center text-weathered-white text-xs font-data font-bold shrink-0">
                          {section.page}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-body font-medium text-golf-green text-sm">{section.name}</div>
                          {section.description && (
                            <div className="text-xs text-pencil-gray truncate font-handwritten">{section.description}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-coffee-stain rounded-lg border border-leather-brown-light">
                  <div className="text-xs text-golf-green text-center font-handwritten">
                    TIP: Grab bottom corners to flip forward, top corners to flip back
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page container - Full height */}
        <div 
          ref={containerRef}
          className="page-curl-container relative bg-gradient-to-br from-gray-50 to-gray-100 w-full h-full"
          data-can-go-back={currentPage > 0 ? "true" : "false"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="page-curl-stack">
            {/* Previous page (underneath for backward navigation) */}
            {currentPage > 0 && (
              <div
                className="page-curl-layer page-curl-prev"
                style={{ zIndex: 0 }}
              >
                {pages[currentPage - 1]?.content}
              </div>
            )}
            
            {/* Next page (underneath for forward navigation) */}
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



          {/* Clean page indicators with distance-based opacity */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {pages.map((_, index) => {
              // Calculate opacity based on distance from current page
              const distance = Math.abs(index - currentPage);
              const getOpacity = (dist: number) => {
                if (dist === 0) return 'opacity-100'; // Current page - most visible
                if (dist === 1) return 'opacity-75';  // Adjacent pages
                if (dist === 2) return 'opacity-50';  // Two pages away
                if (dist === 3) return 'opacity-25';  // Three pages away
                return 'opacity-10';                  // Far away pages - barely visible
              };
              
              return (
                <button
                  key={index}
                  onClick={() => onPageChange(index)}
                  className={`rounded-full bg-gray-600 transition-all duration-300 
                             hover:opacity-100 hover:scale-125 ${getOpacity(distance)}
                             ${index === currentPage ? 'scale-125' : 'scale-100'}`}
                  style={{
                    width: '8px',
                    height: '8px',
                    minWidth: '8px',
                    minHeight: '8px'
                  }}
                  title={`Page ${index}`}
                />
              );
            })}
          </div>


        </div>


      </div>
    </>
  );
};

export default PageFlipDemo;