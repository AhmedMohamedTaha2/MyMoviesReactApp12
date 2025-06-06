import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

export default function MovieGrid({ watchedMovies, onMovieSelect }) {
  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 h-[700px] custom-scrollbar overflow-y-auto overflow-x-hidden container mx-auto p-5">
      {watchedMovies.map((watchedMovie) => (
        <MovieCard
          key={watchedMovie.Movie.imdbID}
          watchedMovie={watchedMovie}
          onMovieSelect={onMovieSelect}
        />
      ))}
    </motion.div>
  );
}
