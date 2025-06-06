// Components/MovieDetailModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRatingComponent from './StarRatingComponent';

export default function MovieDetailModal({ movie, isOpen, onClose  , children}) {
  // const [userRating, setUserRating] = useState(0);
  // const [isWatched, setIsWatched] = useState(false);
  // const [hoverRating, setHoverRating] = useState(0); // Add this new state

  // Only render AnimatePresence if isOpen is true, otherwise it will try to animate unmounted components
  if (!isOpen && !movie) return null; // Added !movie check for safety

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 }, // Start smaller and slightly above
    visible: { opacity: 1, scale: 1, y: 0 },   // Pop to full size
    exit: { opacity: 0, scale: 0.8, y: 50 },    // Exit smaller and downwards
  };

  const posterFallback = "https://placehold.co/300x450/334155/cbd5e1?text=No+Image";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" // Slightly darker backdrop with blur
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            onClick={onClose}
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            className="relative py-5 bg-slate-800/90 backdrop-blur-lg rounded-lg border-2 border-white/10 shadow-2xl p-10 text-slate-50 max-w-[90vw] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] overflow-hidden border-sky-500 "
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }} // Slightly longer and smoother transition
            role="dialog" // ARIA role
            aria-modal="true" // ARIA modal
            aria-labelledby="modal-title" // ARIA label
          >
            {/* Static header */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 id="modal-title" className="text-3xl lg:text-4xl font-bold text-sky-400">
                {movie.Title}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-red-700 text-3xl font-bold transition-colors duration-200 outline-none border-none focus:outline-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Scrollable content */}
            <div className=" custom-scrollbar flex my-5 flex-col md:flex-row gap-6 lg:gap-8 overflow-y-auto max-h-[calc(90vh-8rem)] scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-sky-500/50 hover:scrollbar-thumb-sky-500">
              <div className="flex-shrink-0 w-full md:w-1/3">
                <img
                  src={movie.Poster !== "N/A" && movie.Poster ? movie.Poster : posterFallback}
                  alt={`${movie.Title} Poster`}
                  className="w-full h-auto rounded-lg shadow-lg object-cover border border-white/20" // Added subtle border
                  loading="lazy"
                />
                {children}
              </div>

              <div className="flex-grow flex flex-col gap-3 lg:gap-4 text-base lg:text-lg">
                {/* Movie Details with enhanced styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="bg-slate-700/50 p-3 rounded-lg">
                    <strong className="text-sky-300 block mb-1">Year</strong>
                    <span className="text-slate-100">{movie.Year}</span>
                  </p>
                  <p className="bg-slate-700/50 p-3 rounded-lg">
                    <strong className="text-sky-300 block mb-1">Rated</strong>
                    <span className="text-slate-100">{movie.Rated || 'N/A'}</span>
                  </p>
                  <p className="bg-slate-700/50 p-3 rounded-lg">
                    <strong className="text-sky-300 block mb-1">Released</strong>
                    <span className="text-slate-100">{movie.Released || 'N/A'}</span>
                  </p>
                  <p className="bg-slate-700/50 p-3 rounded-lg">
                    <strong className="text-sky-300 block mb-1">Runtime</strong>
                    <span className="text-slate-100">{movie.Runtime || 'N/A'}</span>
                  </p>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg mt-4">
                  <strong className="text-sky-300 block mb-2">Genre</strong>
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre?.split(',').map((genre, index) => (
                      <span key={index} className="px-3 py-1 bg-sky-500/20 rounded-full text-sky-300 text-sm">
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <strong className="text-sky-300 block mb-2">Plot</strong>
                  <p className="text-slate-100 leading-relaxed max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {movie.Plot || 'N/A'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <strong className="text-sky-300 block mb-2">Director</strong>
                    <p className="text-slate-100">{movie.Director || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <strong className="text-sky-300 block mb-2">Actors</strong>
                    <p className="text-slate-100">{movie.Actors || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-6 bg-slate-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl text-yellow-400">⭐</div>
                    <div>
                      <div className="text-sm text-slate-400">IMDb Rating</div>
                      <div className="text-xl font-semibold text-slate-100">{movie.imdbRating || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl text-green-400">💰</div>
                    <div className='mb-5'>
                      <div className="text-sm text-slate-400">Box Office</div>
                      <div className="text-xl font-semibold text-slate-100">{movie.BoxOffice || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}