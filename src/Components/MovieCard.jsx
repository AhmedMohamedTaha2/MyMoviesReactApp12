import { motion } from "framer-motion";
import { MdRateReview } from "react-icons/md";


// MoviePoster Component
function MoviePoster({ watchedMovie, children }) {
  const fallbackPoster =
    "https://placehold.co/300x450/334155/cbd5e1?text=No+Image";

  return (
    <div className="relative w-full h-[320px] overflow-hidden">
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        src={
          watchedMovie.Movie.Poster !== "N/A"
            ? watchedMovie.Movie.Poster
            : fallbackPoster
        }
        alt={watchedMovie.Movie.Title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      {children}
    </div>
  );
}

// DateBadge Component
function DateBadge({ watchedDate }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="absolute top-4 left-4 px-4 py-2 rounded-full 
                    bg-black/70 backdrop-blur-md border border-purple-500/30
                    group-hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="text-purple-400 text-xs font-medium">Viewed on</div>
      <div className="text-white text-sm font-semibold">
        {formatDate(watchedDate)}
      </div>
    </div>
  );
}

// RatingBadges Component
function RatingBadges({ imdbRating, userRating }) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <div
        className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md 
                    border border-yellow-500/30 flex items-center gap-2"
      >
        <span className="text-yellow-500">⭐</span>
        <span className="text-white text-sm font-semibold">{imdbRating}</span>
      </div>
      <div
        className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md 
                    border border-sky-500/30 flex items-center gap-2"
      >
        <span className="text-sky-400">🌟</span>
        <span className="text-white text-sm font-semibold">{userRating}/5</span>
      </div>
    </div>
  );
}

// MovieContent Component
function MovieContent({ title, review, onSelect }) {
  return (
    <div className="p-6 space-y-4">
      <h3
        className="text-xl font-bold text-white group-hover:text-sky-400 
                    transition-colors duration-300 line-clamp-1"
      >
        {title}
      </h3>

      <div
        className="space-y-3 bg-slate-800/30 p-5 rounded-2xl 
                    border border-slate-700/30

                    "
      >
        <div className="flex items-center gap-2 text-sky-400 ">
          <span className="text-lg">
              <MdRateReview  className="text-white"/>
          </span>
          <span className="text-sm font-bold">Your Review</span>
        </div>
        <p className="text-slate-300 text-xl  line-clamp-2 font-semibold text-start p-2  w-full ">
          {review}
        </p>
      </div>

      <button
        onClick={onSelect}
        className="w-full py-3 px-4 rounded-xl
                  bg-gradient-to-r from-sky-500 to-blue-600
                  hover:from-sky-600 hover:to-blue-700
                  text-white font-semibold
                  transform transition-all duration-300
                  hover:scale-[1.02] active:scale-[0.98]
                  shadow-lg hover:shadow-sky-500/25"
      >
        View Details
      </button>
    </div>
  );
}

// Main MovieCard Component
export default function MovieCard({ watchedMovie, onMovieSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        className="relative h-[600px] rounded-3xl overflow-hidden
          bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-lg
          border border-slate-700/30
          shadow-lg
          hover:border-sky-500/50
          hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.5)]
          transition-all duration-500 ease-out"
      >
        <MoviePoster watchedMovie={watchedMovie}>
          <DateBadge watchedDate={watchedMovie.watchedDate} />
          <RatingBadges
            imdbRating={watchedMovie.Movie.imdbRating}
            userRating={watchedMovie.userRating}
          />
        </MoviePoster>
        <MovieContent
          title={watchedMovie.Movie.Title}
          review={watchedMovie.userReview}
          onSelect={() => onMovieSelect(watchedMovie.Movie)}
        />
      </motion.div>
    </motion.div>
  );
}
