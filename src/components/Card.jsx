import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Card = ({ movieId, title, description, image, rating }) => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="movie-card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h4>{title}</h4>
        <p>{description.length > 90 ? description.substring(0, 100) + "..." : description}</p>
        <div className="card-footer">
          <span className="rating">⭐ {rating}</span>
          <button className="details-button" onClick={() => navigate(`/movie/${movieId}`)}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
