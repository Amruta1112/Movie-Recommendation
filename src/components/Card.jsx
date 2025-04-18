import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Import db and auth


const Card = ({ movieId, title, description, image, rating }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // Check if the movie is already liked by the user
  useEffect(() => {
    const checkIfLiked = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const likedMovies = docSnap.data().likedMovies || [];
          const alreadyLiked = likedMovies.some((movie) => movie.id === movieId);
          if (alreadyLiked) {
            setLiked(true);
          }
        }
      } catch (error) {
        console.error("Error checking liked movie:", error);
      }
    };

    checkIfLiked();
  }, [movieId]);

  // Handle Like button click
  const handleLike = async () => {
    const user = auth.currentUser;
    console.log("auth.currentUser:", user);

    if (!user) {
      alert("Please log in to like movies.");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const movieData = {
      id: movieId,
      title,
      genre_ids: [], // Optional
      likedAt: new Date(),
    };

    try {
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        // New user
        await setDoc(userDocRef, {
          likedMovies: [movieData],
        });
        console.log("New user doc created with liked movie.");
      } else {
        const likedMovies = docSnap.data().likedMovies || [];
        const alreadyLiked = likedMovies.some((movie) => movie.id === movieId);

        if (alreadyLiked) {
          alert("You already liked this movie!");
          return;
        }

        await updateDoc(userDocRef, {
          likedMovies: arrayUnion(movieData),
        });
        console.log("Movie added to existing likedMovies.");
      }

      setLiked(true);
      alert("Movie liked! ❤️");
    } catch (error) {
      console.error("Error saving liked movie:", error);
    }
  };

  return (
    <div className="movie-card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h4>{title}</h4>
        <p>
          {description.length > 90
            ? description.substring(0, 100) + "..."
            : description}
        </p>
        <div className="card-footer">
          <span className="rating">⭐ {rating}</span>
          <button
            className="details-button"
            onClick={() => navigate(`/movie/${movieId}`)}
          >
            Learn More
          </button>

          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
            disabled={liked}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
