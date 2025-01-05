// components/Pagination.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const generatePageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxVisible = 7; // Total visible pages including ellipses
    const edgeCount = 2; // Pages to show at the start and end

    if (totalPages <= maxVisible) {
      // Show all pages if totalPages is less than or equal to maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const middleCount = maxVisible - edgeCount * 2 - 1; // Pages to show around the current page
      const startPages = Array.from({ length: edgeCount }, (_, i) => i + 1);
      const endPages = Array.from(
        { length: edgeCount },
        (_, i) => totalPages - edgeCount + i + 1
      );

      const middleStart = Math.max(
        Math.min(
          currentPage - Math.floor(middleCount / 2),
          totalPages - edgeCount - middleCount
        ),
        edgeCount + 1
      );
      const middlePages = Array.from(
        { length: middleCount },
        (_, i) => middleStart + i
      );

      pageNumbers.push(...startPages);
      if (middleStart > edgeCount + 1) pageNumbers.push("...");
      pageNumbers.push(...middlePages);
      if (middleStart + middleCount < totalPages - edgeCount)
        pageNumbers.push("...");
      pageNumbers.push(...endPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between overflow-auto w-full max-w-[400px] md:container">
      <div>show entries</div>
      <div className="flex items-center p-4 mt-4 space-x-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPreviousDisabled}
          className="w-2 h-10 px-4 py-2 bg-[#F1F7FF] border border-gray-300 rounded hover:bg-gray-200 disabled:bg-gray-300"
        >
          <Icon
            icon={"fluent:ios-arrow-24-filled"}
            className="w-2 h-5 text-gray-600"
          />
        </Button>

        <div className="flex items-center space-x-2">
          {generatePageNumbers().map((page, index) => (
            <span
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-[#F1F7FF] text-gray-600"
              } border border-gray-300 rounded-2xl px-4 py-2 flex items-center justify-center cursor-pointer w-2 h-10 text-xs ${
                typeof page === "number" ? "hover:bg-muted" : "cursor-default"
              }`}
            >
              {page}
            </span>
          ))}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
          className="w-2 h-10 px-4 py-2 bg-[#F1F7FF] border border-gray-300 rounded-lg hover:bg-gray-200 disabled:bg-gray-300"
        >
          <Icon
            icon={"simple-line-icons:arrow-right"}
            className="w-2 h-5 text-gray-600"
          />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
