import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../services/api";
import "../styles/movieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);

      const key = await getMovieTrailer(id);
      setTrailerKey(key);

      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading-text">Loading...</div>;
  if (!movie) return <div className="error-message">Movie not found.</div>;

  return (
    <div className="movie-details-container">
    <div className="movie-info-section">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-details">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
        <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
      </div>
    </div>
  
    {trailerKey && (
      <div className="trailer-container">
        <h3>Watch Trailer</h3>
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )}
  </div>
  
  );
};

export default MovieDetails;
