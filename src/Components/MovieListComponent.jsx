// MovieListComponent.jsx
import React, { useEffect, useState } from "react";
import Movie from "./MovieComponent";
import NoMovieAvailableComponent from "./NoMovieAvailableComponent";
import ConnectionFailedComponent from "./ConnectionFailedComponent";
import axios from "axios";

export default function MovieList({
  movies,
  setIsOpen,
  setSelectedMovie,
  currentPage
}) {
  const [detailedMovies, setDetailedMovies] = useState([]);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const apiKey = "f5e82cc2";

  useEffect(() => {
    const fetchDetailedMovies = async () => {
      if (!movies || movies.length === 0) {
        setDetailedMovies([]);
        return;
      }

      try {
        const detailedResponses = await Promise.all(
          movies.map((movie) => {
            if (!movie.imdbID || !movie.Title || !movie.Year) {
              console.warn("Movie data is incomplete, skipping:", movie);
              return null;
            }
            return axios.get(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
            );
          })
        );

        const validDetails = detailedResponses
          .filter((res) => res && res.data && res.data.Response === "True")
          .map((res) => res.data);

        setDetailedMovies(validDetails);
        setConnectionFailed(false);
      } catch (error) {
        console.error("Error fetching detailed movie data:", error);
        setConnectionFailed(true);
        setDetailedMovies([]);
      }
    };

    setDetailedMovies([]);
    fetchDetailedMovies();
  }, [movies, apiKey, currentPage]);

  if (connectionFailed) {
    return <ConnectionFailedComponent />;
  }

  return (
    <>
      {detailedMovies.length === 0 ? (
        <NoMovieAvailableComponent />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 place-items-center">
          {detailedMovies.map((movie) => (
            <Movie
              key={movie.imdbID}
              movie={movie}
              setIsOpen={setIsOpen}
              setSelectedMovie={setSelectedMovie}
            />
          ))}
        </div>
      )}
    </>
  );
}
