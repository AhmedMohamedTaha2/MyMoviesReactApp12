import React, { useState } from "react";
import MovieDetailModal from "./MovieDetailModal";
import { motion } from "framer-motion";
import StarRatingComponent from "./StarRatingComponent";
import MovieGrid from "./MovieGrid";

export default function WatchedMoviesComponent({
  watchedMovies = [],
  setWatchedMovies,
}) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      fullDate: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const fallbackPoster =
    "https://placehold.co/300x450/334155/cbd5e1?text=No+Image";

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black px-4 py-24">
      <div className="max-w-[2000px] mx-auto h-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-12 text-center"
        >
          <span
            className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 
            bg-clip-text text-transparent"
          >
            My Watched Movies
          </span>
          <div className="mt-4 text-lg font-normal text-slate-400">
            Your personal movie collection
          </div>
        </motion.h2>

        <MovieGrid
          watchedMovies={watchedMovies}
          onMovieSelect={handleMovieSelect}
        />
      </div>

      <MovieDetailModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMovie(null);
        }}
      >
        <StarRatingComponent
          selectedMovie={selectedMovie}
          hoverRating={hoverRating}
          setHoverRating={setHoverRating}
          userRating={userRating}
          setUserRating={setUserRating}
          setWatchedMovies={setWatchedMovies}
        />
      </MovieDetailModal>
    </div>
  );
}
