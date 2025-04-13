import React, { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // ✅ Import the Card component
import "../styles/home.css"; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState("");

  // Fetch movies (popular or search results)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let fetchedMovies;
        setLoading(true);
        if (isSearch && searchQuery) {
          fetchedMovies = await searchMovies(searchQuery);
          if (fetchedMovies.length === 0) {
            setError("No movies found.");
          } else {
            setError("");
          }
        } else {
          fetchedMovies = await getPopularMovies();
          setError("");
        }

        setMovies(fetchedMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("An error occurred while fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, isSearch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearch(true);
  };

  return (
    <div className="home-container">
      <Navbar onSearch={handleSearch} />

      {/* Search Section */}
      <section className="search-section">
        <h2>{isSearch ? "Search Results" : "Discover Popular Movies"}</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setIsSearch(!isSearch)}>
            {isSearch ? "Show Popular Movies" : "Search Movies"}
          </button>
        </div>
      </section>

      {/* Movie Grid Section */}
      <main className="movies-section">
        {loading ? (
          <div className="loading-text">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                movieId={movie.id} // ✅ Pass movieId to Card
                title={movie.title}
                description={movie.overview}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
