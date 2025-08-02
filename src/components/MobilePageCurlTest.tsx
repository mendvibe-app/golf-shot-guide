import React from 'react';
import PageCurlFlip from '../prototypes/page-curl-flip/PageFlipDemo';

const MobilePageCurlTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      {/* Minimal header */}
      <div className="bg-white shadow-sm border-b border-green-200 px-4 py-3">
        <h1 className="text-lg font-bold text-green-800 text-center">
          📄 Yardage Book Test
        </h1>
        <p className="text-sm text-green-600 text-center mt-1">
          Grab bottom corners • Drag up to flip
        </p>
      </div>

      {/* Full screen demo */}
      <div className="flex-1 p-4">
        <div className="h-full max-w-sm mx-auto">
          <PageCurlFlip />
        </div>
      </div>

      {/* Mobile-friendly instructions */}
      <div className="bg-white border-t border-green-200 px-4 py-3">
        <div className="max-w-sm mx-auto">
          <div className="text-xs text-green-700 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Touch bottom-left or bottom-right corner</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Drag upward to peel the page</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Release to snap back or complete flip</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePageCurlTest;