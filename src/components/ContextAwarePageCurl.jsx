import React, { useState, useMemo } from 'react';
import PageFlipDemo from '../prototypes/page-curl-flip/PageFlipDemo';
import { getTabContent } from './TabContentSets';

const ContextAwarePageCurl = ({ 
  tabId, 
  tabName,
  tabIcon: TabIcon,
  className = "",
  onPageChange,
  initialPage = 0 
}) => {
  // Get content set for the current tab
  const contentSet = useMemo(() => getTabContent(tabId), [tabId]);
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
      {/* Enhanced Page Curl Component - Full Screen */}
      <div className="w-full h-full">
        <PageFlipDemo
          pages={contentSet}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          tabId={tabId}
        />
      </div>
    </div>
  );
};

export default ContextAwarePageCurl;