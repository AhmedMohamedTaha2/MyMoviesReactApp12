import React, { useState, useEffect } from "react";

export default function StarRatingComponent({
  hoverRating,
  setHoverRating,
  userRating,
  setUserRating,
  selectedMovie,
  setWatchedMovies,
}) {
  const [isWatched, setIsWatched] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedMovie) {
      setWatchedMovies((prev) => {
        const existingMovie = prev.find(
          (movie) => movie.Movie.imdbID === selectedMovie.imdbID
        );
        if (existingMovie) {
          setIsWatched(true);
          setUserRating(existingMovie.userRating || 0);
          setUserReview(existingMovie.userReview || "");
          setIsSubmitted(true);
        } else {
          setIsWatched(false);
          setUserRating(0);
          setUserReview("");
          setIsSubmitted(false);
        }
        return prev;
      });
    }
  }, [selectedMovie, setWatchedMovies, setUserRating]);

  function handleSubmitReview(e) {
    e.preventDefault();

    if (!userRating || !userReview.trim()) {
      alert("Please provide both a rating and a review before submitting");
      return;
    }

    const watchedMovie = {
      Movie: selectedMovie,
      userRating: userRating,
      userReview: userReview,
      watchedDate: new Date().toISOString(),
    };

    setWatchedMovies((prev) => {
      const existingIndex = prev.findIndex(
        (movie) => movie.Movie.imdbID === selectedMovie.imdbID
      );
      let updatedMovies;

      if (existingIndex !== -1) {
        updatedMovies = [...prev];
        updatedMovies[existingIndex] = watchedMovie;
      } else {
        updatedMovies = [...prev, watchedMovie];
      }

      // Save to localStorage
      localStorage.setItem("watchedMovies", JSON.stringify(updatedMovies));
      return updatedMovies;
    });
    setIsSubmitted(true);
  }

  function handleWatchedChange(e) {
    const watched = e.target.checked;
    setIsWatched(watched);

    if (!watched) {
      setWatchedMovies((prev) => {
        const filteredMovies = prev.filter(
          (movie) => movie.Movie.imdbID !== selectedMovie.imdbID
        );
        // Update localStorage when removing a movie
        localStorage.setItem("watchedMovies", JSON.stringify(filteredMovies));
        return filteredMovies;
      });
      setUserRating(0);
      setUserReview("");
      setIsSubmitted(false);
    }
  }

  if (!selectedMovie) return null;

  return (
    <>
      <div className="mt-4 space-y-5">
        <div className="bg-slate-700/50 p-4 rounded-lg flex flex-col gap-4">
          <label
            htmlFor="watched"
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              id="watched"
              checked={isWatched}
              onChange={handleWatchedChange}
              className="w-5 h-5 rounded text-sky-500 focus:ring-offset-0 focus:ring-sky-500 bg-slate-600 border-slate-500"
            />
            <span className="text-slate-100">Watched</span>
          </label>

          {isWatched && (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-slate-100">Rate this movie:</span>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setUserRating(star === userRating ? 0 : star)
                      }
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-2xl transition-all duration-200 transform 
                        hover:scale-110
                        ${
                          (
                            hoverRating
                              ? star <= hoverRating
                              : star <= userRating
                          )
                            ? "text-yellow-400"
                            : "text-slate-600"
                        }`}
                      aria-label={`Rate ${star} of 5 stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="review" className="text-slate-100">
                  Your Review:
                </label>
                <textarea
                  id="review"
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Share your thoughts about the movie..."
                  className="w-full p-2 bg-slate-600 text-white rounded-lg resize-none h-24
                    focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!userRating || !userReview.trim() || isSubmitted}
                className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg
                  hover:bg-sky-600 transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? "Review Submitted" : "Submit Review"}
              </button>
            </form>
          )}

          <a
            href={`https://www.google.com/search?q=watch+${encodeURIComponent(
              selectedMovie.Title
            )}+movie+online`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <span className="mr-2 text-xl">▶</span>
            {isWatched ? "Watch Again" : "Watch Now"}
          </a>
        </div>
      </div>
    </>
  );
}
