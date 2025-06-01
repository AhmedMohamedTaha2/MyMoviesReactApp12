// ContainerComponent.jsx
import React, { useRef } from "react";
import {
  HiMiniArrowTurnLeftDown,
  HiMiniArrowTurnRightDown,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import LoaderComponent from "./LoaderComponent"; // تم اختيار هذا السطر

export default function ContainerComponent({
  children,
  currentPage,
  totalPages,
  isLoading, // بنستخدم isLoading هنا
  setPage,
}) {
  const containerRef = useRef(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[700px]">
        <LoaderComponent /> {/* تم اختيار هذا السطر */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2 flex flex-col items-center justify-center gap-5">
      <div className="p-5 my-4 w-full text-center">
        <div className="flex flex-row items-end justify-center text-center gap-2 mb-10">
          <HiMiniArrowTurnLeftDown className="text-3xl text-white font-extrabold" />
          <h1 className="text-5xl font-extrabold">Your Search Result</h1>
          <HiMiniArrowTurnRightDown className="text-3xl text-white font-extrabold" />
        </div>

        <div
          ref={containerRef}
          // تم اختيار هذا السطر
          className="flex flex-wrap justify-center gap-4 h-[700px] overflow-y-auto overflow-x-hidden custom-scrollbar"
        >
          {children}
        </div>

        {totalPages > 0 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isLoading}
              className={`p-2 rounded-full ${
                currentPage === 1 || isLoading
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-sky-500 hover:bg-sky-500/20"
              }`}
              aria-label="Previous page"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>

            <span className="text-sky-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
              className={`p-2 rounded-full ${
                currentPage === totalPages || isLoading
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-sky-500 hover:bg-sky-500/20"
              }`}
              aria-label="Next page"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}