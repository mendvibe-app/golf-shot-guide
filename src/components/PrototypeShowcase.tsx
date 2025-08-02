import React, { useState } from 'react';
import FramerMotionFlip from '../prototypes/framer-motion-flip/PageFlipDemo';
import ReactSpringFlip from '../prototypes/react-spring-flip/PageFlipDemo';
import PureCSSFlip from '../prototypes/pure-css-flip/PageFlipDemo';
import PageCurlFlip from '../prototypes/page-curl-flip/PageFlipDemo';

type PrototypeType = 'framer-motion' | 'react-spring' | 'pure-css' | 'page-curl';

interface PrototypeInfo {
  id: PrototypeType;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  bundleSize: string;
  performance: string;
  complexity: string;
  component: React.ComponentType<any>;
}

const prototypes: PrototypeInfo[] = [
  {
    id: 'page-curl',
    name: 'Page Curl (Realistic)',
    description: 'Authentic paper curl effect - grab corners to peel pages like real yardage books',
    pros: [
      'Most realistic paper feel',
      'Corner grab interaction',
      'Preview next page',
      'Zero dependencies',
      'Intuitive for golfers'
    ],
    cons: [
      'More complex implementation',
      'Limited to corner interactions',
      'Requires precise targeting'
    ],
    bundleSize: '~10KB',
    performance: '60fps+',
    complexity: 'High',
    component: PageCurlFlip
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    description: 'Premium gesture-based page flip with spring physics and smooth animations',
    pros: [
      'Premium, polished feel',
      'Excellent gesture recognition', 
      'Rich animation capabilities',
      'Great developer experience'
    ],
    cons: [
      'Larger bundle size (~45KB)',
      'Additional dependency',
      'Can be overkill for simple cases'
    ],
    bundleSize: '~45KB',
    performance: '60fps',
    complexity: 'Medium',
    component: FramerMotionFlip
  },
  {
    id: 'react-spring',
    name: 'React Spring',
    description: 'Physics-based animations with progressive resistance and advanced gestures',
    pros: [
      'Excellent physics animations',
      'Smaller than Framer Motion',
      'Progressive resistance feature',
      'Flexible spring configs'
    ],
    cons: [
      'Two dependencies required',
      'Learning curve for physics',
      'More complex setup'
    ],
    bundleSize: '~25KB',
    performance: '60fps',
    complexity: 'Medium-High',
    component: ReactSpringFlip
  },
  {
    id: 'pure-css',
    name: 'Pure CSS + Web Animations',
    description: 'Maximum performance with zero dependencies using pure CSS and Web Animations API',
    pros: [
      'Zero dependencies',
      'Smallest bundle (~8KB)',
      'Maximum performance',
      'Complete control',
      'Keyboard accessible'
    ],
    cons: [
      'More manual implementation',
      'Less animation flexibility',
      'Requires more CSS knowledge'
    ],
    bundleSize: '~8KB',
    performance: '60fps+',
    complexity: 'High',
    component: PureCSSFlip
  }
];

const PrototypeShowcase: React.FC = () => {
  const [selectedPrototype, setSelectedPrototype] = useState<PrototypeType>('page-curl');
  const [showComparison, setShowComparison] = useState(false);

  const currentPrototype = prototypes.find(p => p.id === selectedPrototype)!;
  const Component = currentPrototype.component;

  if (showComparison) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Prototype Comparison</h2>
            <p className="text-slate-600">Side-by-side analysis of all three implementations</p>
          </div>
          <button
            onClick={() => setShowComparison(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Demos
          </button>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                  <th className="text-center p-4 font-semibold text-orange-600">Page Curl</th>
                  <th className="text-center p-4 font-semibold text-blue-600">Framer Motion</th>
                  <th className="text-center p-4 font-semibold text-purple-600">React Spring</th>
                  <th className="text-center p-4 font-semibold text-green-600">Pure CSS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-4 font-medium text-slate-900">Bundle Size</td>
                  <td className="p-4 text-center text-slate-600">~10KB</td>
                  <td className="p-4 text-center text-slate-600">~45KB</td>
                  <td className="p-4 text-center text-slate-600">~25KB</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-green-700">~8KB</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Performance</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-orange-700">60fps+</td>
                  <td className="p-4 text-center text-slate-600">60fps</td>
                  <td className="p-4 text-center text-slate-600">60fps</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-green-700">60fps+</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Dependencies</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-orange-700">None</td>
                  <td className="p-4 text-center text-slate-600">framer-motion</td>
                  <td className="p-4 text-center text-slate-600">react-spring, @use-gesture</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-green-700">None</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Developer Experience</td>
                  <td className="p-4 text-center text-slate-600">Complex</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-blue-700">Excellent</td>
                  <td className="p-4 text-center text-slate-600">Good</td>
                  <td className="p-4 text-center text-slate-600">Requires expertise</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Gesture Quality</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-orange-700">Most Realistic</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-blue-700">Premium</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-purple-700">Excellent</td>
                  <td className="p-4 text-center text-slate-600">Good</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Cross-device Compatibility</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-orange-700">Universal</td>
                  <td className="p-4 text-center text-slate-600">Excellent</td>
                  <td className="p-4 text-center text-slate-600">Excellent</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-green-700">Universal</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Animation Flexibility</td>
                  <td className="p-4 text-center text-slate-600">Specialized</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-blue-700">Highest</td>
                  <td className="p-4 text-center text-slate-600 font-semibold text-purple-700">High</td>
                  <td className="p-4 text-center text-slate-600">Limited</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900">Best For</td>
                  <td className="p-4 text-center text-slate-600 text-sm">Realistic paper feel, yardage books</td>
                  <td className="p-4 text-center text-slate-600 text-sm">Premium apps, complex gestures</td>
                  <td className="p-4 text-center text-slate-600 text-sm">Physics-based UX, mid-size apps</td>
                  <td className="p-4 text-center text-slate-600 text-sm">Performance-critical, mobile-first</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prototypes.map((prototype) => (
            <div key={prototype.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{prototype.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{prototype.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-green-700 text-sm mb-1">Pros</h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {prototype.pros.slice(0, 2).map((pro, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 text-sm mb-1">Cons</h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {prototype.cons.slice(0, 2).map((con, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">×</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Page Flip Prototypes</h2>
          <p className="text-slate-600">Three world-class implementations for your golf yardage book</p>
        </div>
        <button
          onClick={() => setShowComparison(true)}
          className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Compare All
        </button>
      </div>

      {/* Prototype Selector */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-3 mb-4">
          {prototypes.map((prototype) => (
            <button
              key={prototype.id}
              onClick={() => setSelectedPrototype(prototype.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedPrototype === prototype.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {prototype.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Prototype Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Demo */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Live Demo</h3>
          <div className="flex justify-center">
            <Component />
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-4">{currentPrototype.name}</h3>
          <p className="text-slate-600 mb-6">{currentPrototype.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-sm font-medium text-slate-500">Bundle Size</div>
              <div className="text-lg font-bold text-slate-900">{currentPrototype.bundleSize}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-sm font-medium text-slate-500">Performance</div>
              <div className="text-lg font-bold text-slate-900">{currentPrototype.performance}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-sm font-medium text-slate-500">Complexity</div>
              <div className="text-lg font-bold text-slate-900">{currentPrototype.complexity}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-sm font-medium text-slate-500">Dependencies</div>
              <div className="text-sm font-bold text-slate-900">
                {currentPrototype.id === 'pure-css' ? 'None' : 
                 currentPrototype.id === 'framer-motion' ? '1' : '2'}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {currentPrototype.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {currentPrototype.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">×</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">How to Test</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">Gesture Controls</h4>
            <ul className="space-y-1">
              <li>• <strong>Swipe Up:</strong> Next page</li>
              <li>• <strong>Swipe Down:</strong> Previous page</li>
              <li>• <strong>Fast Flick:</strong> Auto-complete</li>
              <li>• <strong>Slow Drag:</strong> Must reach 50%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">What to Notice</h4>
            <ul className="space-y-1">
              <li>• <strong>Page Curl:</strong> Grab corners to peel</li>
              <li>• Smoothness of animations</li>
              <li>• Response to gesture speed</li>
              <li>• Visual feedback during drag</li>
              <li>• Resistance at boundaries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeShowcase;