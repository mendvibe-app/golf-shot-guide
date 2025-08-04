# Page Curl Flip Prototype

## Overview
Authentic page curl implementation that simulates peeling paper from corners, just like real golf yardage books.

## Features
- **Vertical Page Flipping**: Authentic yardage book style - flip pages up like a spiral notepad
- **Corner Grab Detection**: Grab bottom-left or bottom-right corners to start curl
- **Realistic Paper Curl**: Smooth 3D transforms with X-axis rotation and perspective
- **Enhanced Paper Textures**: Multi-layered gradients inspired by React Native LinearGradient
- **Haptic Feedback**: Progressive web vibration API for tactile response
- **Audio Cues**: Paper rustle and flip sound effects (console logged for demo)
- **Peek Behind**: See the next page underneath as you curl upward
- **Progressive Feedback**: Visual indicator of curl progress and 30% threshold with haptic thresholds
- **Natural Drop**: Release before threshold to snap back realistically with feedback
- **Premium Animations**: Spring-physics inspired transitions for natural movement
- **Hardware Acceleration**: 60fps performance with optimized CSS transforms
- **Zero Dependencies**: Pure CSS and Web Animations API

## Technical Implementation

### Corner Detection (Vertical Flipping)
```typescript
const isInCorner = (x: number, y: number): 'bottom-left' | 'bottom-right' | null => {
  const rect = containerRef.current.getBoundingClientRect();
  const relativeX = x - rect.left;
  const relativeY = y - rect.top;
  
  // Bottom-left corner
  if (relativeX < cornerSize && relativeY > rect.height - cornerSize) {
    return 'bottom-left';
  }
  
  // Bottom-right corner  
  if (relativeX > rect.width - cornerSize && relativeY > rect.height - cornerSize) {
    return 'bottom-right';
  }
  
  return null;
};
```

### Curl Mathematics (Vertical)
```typescript
const calculateCurlEffect = (x, y, startX, startY, corner) => {
  const deltaX = x - startX;
  const deltaY = y - startY;
  
  // For vertical flipping, focus on upward movement
  const verticalDistance = Math.max(0, startY - y); // Only upward
  const curlAmount = Math.min(verticalDistance / maxVerticalDistance, 1);
  
  return {
    curlAmount,
    rotateX: curlAmount * -180,   // X-axis rotation for vertical curl
    rotateY: (Math.abs(deltaX) / width) * 15, // Corner twist
    skewX: curlAmount * 10,       // Perspective skew
    translateX: deltaX * 0.3,     // Follow mouse (damped)
    translateY: Math.min(deltaY * 0.5, 0), // Only upward
    curlRadius: curlAmount * 50   // Smooth corner rounding
  };
};
```

### CSS Transform System (Vertical)
```css
.page-curl-current {
  transform: 
    translate3d(var(--translate-x), var(--translate-y), 0)
    rotateX(var(--rotate-x))
    rotateY(var(--rotate-y))
    skewX(var(--skew-x));
  transform-origin: bottom center;
  border-radius: 0 0 var(--curl-radius) var(--curl-radius);
}

/* Dynamic shadow gradient */
.page-curl-content::before {
  background: linear-gradient(
    135deg,
    transparent 0%,
    transparent calc(var(--gradient-position) - 10%),
    rgba(0,0,0,0.1) var(--gradient-position),
    rgba(0,0,0,0.3) calc(var(--gradient-position) + 5%),
    transparent calc(var(--gradient-position) + 15%)
  );
  opacity: var(--curl-amount);
}
```

## Usage

```tsx
import PageFlipDemo from './PageFlipDemo';

<PageFlipDemo 
  pages={pages}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>
```

## Interaction Guide

### How to Use (Vertical Flipping)
1. **Hover**: Corner indicators appear at bottom-left and bottom-right
2. **Grab Corner**: Click and drag from bottom corners
3. **Lift Up**: Drag upward to curl the page vertically (like a notepad)
4. **Preview**: See the next page underneath as you lift
5. **Complete**: Reach 30% curl threshold to flip page
6. **Drop**: Release before threshold to snap back naturally

### Visual Feedback
- **Corner Indicators**: Subtle highlights show where to grab
- **Progress Bar**: Shows curl percentage and threshold
- **Shadow Gradient**: Dynamic shadow follows the curl
- **Next Page Preview**: Content becomes visible underneath

## Configuration

```typescript
const curlConfig = {
  threshold: 0.3,      // 30% curl to complete flip
  maxCurl: 150,        // Maximum curl distance
  cornerSize: 80,      // Grab area size
  springTension: 0.15, // Snap-back speed
  curlIntensity: 1.2   // Curl effect strength
};
```

## Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Pros
- ✅ Most realistic paper feel
- ✅ Natural corner grabbing
- ✅ Preview next page
- ✅ Zero dependencies
- ✅ Excellent performance
- ✅ Intuitive interaction

## Cons
- ❌ More complex implementation
- ❌ Limited to corner interactions
- ❌ Requires precise corner targeting

## Best For
- Authentic yardage book experience
- Applications prioritizing realism
- Touch-first interfaces
- When paper-like feel is critical

## Enhanced Features (v2.0)

### Multi-Sensory Feedback
- **Haptic Response**: Vibration patterns at 20%, 50%, and 80% curl thresholds
- **Audio Cues**: Paper rustle during drag, flip sound on completion
- **Visual Enhancement**: Improved drop shadows and spring animations

### Premium Paper Textures
Inspired by React Native's LinearGradient, now featuring:
- Multi-layered radial gradients for depth
- Subtle paper grain effects
- Enhanced shadow systems
- Hardware-accelerated filters

### Performance Optimizations
- 60fps animations with `will-change` optimization
- Spring-physics inspired easing curves
- Reduced paint operations
- Progressive enhancement patterns

### Browser Support
- **Haptics**: Chrome/Edge 79+, Safari 13.1+, Firefox (none)
- **Visuals**: All modern browsers
- **Performance**: Hardware acceleration on all major browsers

### Integration Example
```javascript
// Enable haptic feedback
triggerHapticFeedback('medium'); // light, medium, heavy

// Play audio cues
playPaperSound('flip'); // rustle, flip
```