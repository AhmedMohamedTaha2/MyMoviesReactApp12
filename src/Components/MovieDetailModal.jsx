// Components/MovieDetailModal.jsx
import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StarRatingComponent from "./StarRatingComponent";

// Reusable DetailItem component
const DetailItem = ({ label, value }) => (
  <div className="bg-slate-700/50 p-[clamp(0.75rem,2vw,1rem)] rounded-lg">
    <strong className="text-sky-300 block mb-1 text-[clamp(0.875rem,1.5vw,1rem)]">
      {label}
    </strong>
    <span className="text-slate-100 text-[clamp(0.875rem,1.5vw,1rem)]">
      {value || "N/A"}
    </span>
  </div>
);

export default function MovieDetailModal({ movie, isOpen, onClose, children }) {
  // Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen && !movie) return null;

  const posterFallback =
    "https://placehold.co/300x450/334155/cbd5e1?text=No+Image";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-[clamp(0.5rem,3vw,1rem)]">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          {/* Modal Content */}
          <div
            className="relative bg-slate-800/90 backdrop-blur-lg rounded-2xl border-2 border-white/10 shadow-2xl text-slate-50 max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[1200px] max-h-[95vh] overflow-hidden border-sky-500"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-[clamp(1rem,3vw,1.5rem)] border-b border-white/10">
              <h2
                id="modal-title"
                className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold text-sky-400 leading-tight"
              >
                {movie.Title}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-red-400 text-[clamp(1.5rem,4vw,2rem)] font-bold transition-colors duration-200 outline-none border-none focus:outline-none focus:text-red-400 p-2 rounded-full hover:bg-red-500/10"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-[clamp(1rem,3vw,1.5rem)] p-[clamp(1rem,3vw,1.5rem)] max-h-[calc(95vh-8rem)] overflow-y-auto custom-scrollbar">
              {/* Left Column - Poster and Children */}
              <div className="flex-shrink-0 w-full md:w-1/3 space-y-[clamp(0.75rem,2vw,1rem)]">
                <img
                  src={
                    movie.Poster !== "N/A" && movie.Poster
                      ? movie.Poster
                      : posterFallback
                  }
                  alt={`${movie.Title} Poster`}
                  className="w-full h-auto rounded-xl shadow-lg object-cover border border-white/20"
                  loading="lazy"
                />
                {children}
              </div>

              {/* Right Column - Details */}
              <div className="flex-grow space-y-[clamp(1rem,2.5vw,1.5rem)]">
                {/* Plot - Prominent placement */}
                <div className="bg-slate-700/50 p-[clamp(1rem,2.5vw,1.25rem)] rounded-xl">
                  <strong className="text-sky-300 block mb-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(1rem,2vw,1.125rem)]">
                    Plot
                  </strong>
                  <p className="text-slate-100 leading-relaxed text-[clamp(0.875rem,1.5vw,1rem)] max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {movie.Plot || "N/A"}
                  </p>
                </div>

                {/* Genres */}
                <div className="bg-slate-700/50 p-[clamp(1rem,2.5vw,1.25rem)] rounded-xl">
                  <strong className="text-sky-300 block mb-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(1rem,2vw,1.125rem)]">
                    Genre
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre?.split(",").map((genre, index) => (
                      <span
                        key={index}
                        className="px-[clamp(0.5rem,1.5vw,0.75rem)] py-[clamp(0.25rem,1vw,0.5rem)] bg-sky-500/20 rounded-full text-sky-300 text-[clamp(0.75rem,1.5vw,0.875rem)]"
                      >
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1rem)]">
                  <DetailItem label="Year" value={movie.Year} />
                  <DetailItem label="Rated" value={movie.Rated} />
                  <DetailItem label="Released" value={movie.Released} />
                  <DetailItem label="Runtime" value={movie.Runtime} />
                </div>

                {/* Director and Actors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1rem)]">
                  <div className="bg-slate-700/50 p-[clamp(0.75rem,2vw,1rem)] rounded-lg">
                    <strong className="text-sky-300 block mb-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.5vw,1rem)]">
                      Director
                    </strong>
                    <p className="text-slate-100 text-[clamp(0.875rem,1.5vw,1rem)]">
                      {movie.Director || "N/A"}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-[clamp(0.75rem,2vw,1rem)] rounded-lg">
                    <strong className="text-sky-300 block mb-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.5vw,1rem)]">
                      Actors
                    </strong>
                    <p className="text-slate-100 text-[clamp(0.875rem,1.5vw,1rem)]">
                      {movie.Actors || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Ratings and Box Office */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[clamp(1rem,2.5vw,1.5rem)] bg-slate-700/50 p-[clamp(1rem,2.5vw,1.25rem)] rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="text-[clamp(1.5rem,3vw,2rem)] text-yellow-400">
                      ⭐
                    </div>
                    <div>
                      <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-slate-400">
                        IMDb Rating
                      </div>
                      <div className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-slate-100">
                        {movie.imdbRating || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-[clamp(1.5rem,3vw,2rem)] text-green-400">
                      💰
                    </div>
                    <div>
                      <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-slate-400">
                        Box Office
                      </div>
                      <div className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-slate-100">
                        {movie.BoxOffice || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
