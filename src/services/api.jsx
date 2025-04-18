import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTNmZjUyNTFlNWUwODVlMjJjM2YxM2I5ZWMxYmFjNyIsIm5iZiI6MTc0MjA0Mzk2OC40MzEsInN1YiI6IjY3ZDU3YjQwMzE2NzhjYzNmODAxMmJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CKkyjpg9T91_5GjzikWXlVqhvRKSIBS_L9XIbPtkcYs';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
    Authorization: `Bearer ${TOKEN}`,
};

export const getPopularMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        headers,
    });
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers,
        params: { query },
    });
    return response.data.results;
};

export const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            headers,
            params: { language: 'en-US' },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};
export const getMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      headers,
    });

    const trailers = response.data.results;
    const trailer = trailers.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};

