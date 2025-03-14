"use client";

import Link from 'next/link';
import { useLocale } from 'next-intl';

interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
}

export default function BlogPagination({ 
  totalPages, 
  currentPage, 
  basePath 
}: BlogPaginationProps) {
  const locale = useLocale();
  
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include the first page
      pages.push(1);
      
      // Calculate range around current page
      let rangeStart = Math.max(2, currentPage - 1);
      let rangeEnd = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range to always show 3 pages
      if (rangeEnd - rangeStart < 2) {
        if (rangeStart === 2) {
          rangeEnd = Math.min(totalPages - 1, rangeEnd + 1);
        } else if (rangeEnd === totalPages - 1) {
          rangeStart = Math.max(2, rangeStart - 1);
        }
      }
      
      // Add ellipsis if needed before range
      if (rangeStart > 2) {
        pages.push(null); // null represents ellipsis
      }
      
      // Add range pages
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed after range
      if (rangeEnd < totalPages - 1) {
        pages.push(null); // null represents ellipsis
      }
      
      // Always include the last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pages = getPageNumbers();
  
  // Construct link for a given page number
  const getPageLink = (pageNum: number) => {
    return pageNum === 1 ? `/${locale}/${basePath}` : `/${locale}/${basePath}/page/${pageNum}`;
  };

  return (
    <nav className="flex justify-center my-10" aria-label="Pagination">
      <ul className="inline-flex space-x-1 items-center">
        {/* Previous button */}
        <li>
          {currentPage > 1 ? (
            <Link
              href={getPageLink(currentPage - 1)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sr-only md:not-sr-only">Previous</span>
            </Link>
          ) : (
            <span
              className="px-4 py-2 text-sm text-gray-400 rounded-md cursor-not-allowed flex items-center"
              aria-disabled="true"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sr-only md:not-sr-only">Previous</span>
            </span>
          )}
        </li>
        
        {/* Page numbers */}
        {pages.map((page, index) => {
          if (page === null) {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="px-3 py-2">
                  &hellip;
                </span>
              </li>
            );
          }
          
          return (
            <li key={`page-${page}`}>
              {page === currentPage ? (
                <span
                  className="px-4 py-2 text-sm text-white bg-primary-600 rounded-md"
                  aria-current="page"
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={getPageLink(page)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  {page}
                </Link>
              )}
            </li>
          );
        })}
        
        {/* Next button */}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={getPageLink(currentPage + 1)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
              aria-label="Next page"
            >
              <span className="sr-only md:not-sr-only">Next</span>
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <span
              className="px-4 py-2 text-sm text-gray-400 rounded-md cursor-not-allowed flex items-center"
              aria-disabled="true"
            >
              <span className="sr-only md:not-sr-only">Next</span>
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
} 