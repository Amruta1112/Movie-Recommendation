import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const LikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("Please log in to view your liked movies.");
          setLoading(false);
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLikedMovies(data.likedMovies || []);
        } else {
          setLikedMovies([]);
        }
      } catch (err) {
        console.error("Error fetching liked movies:", err);
        setError("Something went wrong while fetching liked movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedMovies();
  }, []);

  return (
    <div className="home-container">
      <Navbar />

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Your Liked Movies ❤️</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : likedMovies.length === 0 ? (
        <p style={{ textAlign: "center" }}>You haven't liked any movies yet.</p>
      ) : (
        <div className="movies-grid">
          {likedMovies.map((movie) => (
            <Card
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              description={movie.description || "No description"}
              image={movie.image || ""}
              rating={movie.rating || "N/A"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedMovies;
