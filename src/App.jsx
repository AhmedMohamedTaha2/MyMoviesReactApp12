// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import NavbarComponent from "./Components/NavbarComponent";
import SearchComponent from "./Components/SearchComponent";
import ContainerComponent from "./Components/ContainerComponent";
import MovieList from "./Components/MovieListComponent";
import MovieDetailModal from "./Components/MovieDetailModal";
import FooterComponent from "./Components/FooterComponent";
import HomepageComponent from "./Components/HomePageComponent";
import AboutComponent from "./Components/AboutComponent";
import StarRatingComponent from "./Components/StarRatingComponent";
import WatchedMoviesComponent from "./Components/WatchedMoviesComponent";

function AppContent() {
  const apiKey = "f5e82cc2";
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const navigate = useNavigate();

  const fetchMovies = async (pageNumber) => {
    // Skip API call if search term is empty
    if (!searchTerm) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}&page=${pageNumber}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        // Calculate total pages from results
        setTotalResults(Math.ceil(parseInt(response.data.totalResults) / 10));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search term debouncing
  useEffect(() => {
    setPage(1);

    const handler = setTimeout(() => {
      if (searchTerm) {
        navigate("/search");
      }
    }, 500);

    // Return to home page if search is empty (except when on watched page)
    if (!searchTerm && window.location.pathname !== "/watched") {
      navigate("/");
    }

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, navigate]);

  // Fetch movies when search term or page changes
  useEffect(() => {
    if (searchTerm) {
      fetchMovies(page);
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  }, [searchTerm, page]);

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  // load watched movies from local state
  useEffect(() =>
    () => {
      const storedMovies = localStorage.getItem("watchedMovies");
      if (storedMovies) {
        setWatchedMovies(JSON.parse(storedMovies));
      }
    }
  , []);
  

  return (
    <div className="w-full min-h-screen bg-gray-950 ">
      <NavbarComponent setSearchTerm={setSearchTerm}>
        <SearchComponent
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          settingSearchTerm={setSearchTerm}
        />
      </NavbarComponent>

      <Routes>
        <Route
          path="/"
          element={
            <div className="HomeDiv w-full bg-slate-950">
              <HomepageComponent />
              <AboutComponent />
            </div>
          }
        />

        <Route
          path="/search"
          element={
            <ContainerComponent
              currentPage={page}
              totalPages={totalResults}
              setPage={setPage}
              isLoading={isLoading}
            >
              <MovieList
                movies={movies}
                setIsOpen={setIsOpen}
                setSelectedMovie={setSelectedMovie}
              />
            </ContainerComponent>
          }
        />

        <Route
          path="/watched"
          element={
            <WatchedMoviesComponent
              watchedMovies={watchedMovies}
              setWatchedMovies={setWatchedMovies}
            />
          }
        />
      </Routes>

      <MovieDetailModal
        movie={selectedMovie}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
      <FooterComponent />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
