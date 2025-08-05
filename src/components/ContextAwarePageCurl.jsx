import React, { useState, useMemo } from 'react';
import PageFlipDemo from '../prototypes/page-curl-flip/PageFlipDemo';
import { getTabContentSet } from './TabContentSets';

const ContextAwarePageCurl = ({ 
  tabId, 
  tabName,
  tabIcon: TabIcon,
  className = "",
  onPageChange,
  initialPage = 0 
}) => {
  // Get content set for the current tab
  const contentSet = useMemo(() => getTabContentSet(tabId), [tabId]);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  // If no content set available, show placeholder
  if (!contentSet || contentSet.length === 0) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500 p-8">
          <TabIcon className="text-6xl mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold mb-2">Content Coming Soon</h3>
          <p className="text-sm">This section will have page-flippable content for {tabName}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Context indicator */}
      <div className="absolute top-4 left-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600 flex items-center gap-2">
          <TabIcon className="text-sm" />
          <span>{tabName}</span>
          <span className="text-gray-400">•</span>
          <span>{currentPage + 1} of {contentSet.length}</span>
        </div>
      </div>

      {/* Enhanced Page Curl Component - Full Screen */}
      <div className="w-full h-full">
        <PageFlipDemo
          pages={contentSet}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
        
      {/* Content progress indicator */}
      <div className="absolute top-4 right-4 z-50">
        <div className="flex space-x-1">
          {contentSet.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentPage 
                  ? 'bg-orange-500 scale-125' 
                  : index < currentPage
                  ? 'bg-orange-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation hints */}
      {contentSet.length > 1 && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
            {currentPage === 0 && contentSet.length > 1 && "Swipe up for more →"}
            {currentPage > 0 && currentPage < contentSet.length - 1 && "↑ Next • ↓ Previous"}
            {currentPage === contentSet.length - 1 && "↓ Swipe down to go back"}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextAwarePageCurl;