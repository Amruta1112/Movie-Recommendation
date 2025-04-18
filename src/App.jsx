    import React from "react";
    import { Routes, Route } from "react-router-dom";
    import Login from "./pages/Login";
    import Register from "./pages/Register";
    import Home from "./pages/Home";
    import MovieDetails from "./pages/MovieDetails";
    import LikedMovies from "./pages/LikedMovies";

    const App = () => {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<  Home />} />
                <Route path="/liked" element={<LikedMovies />}/>
              
                <Route path="/movie/:id" element={<MovieDetails />} /> {/* Dynamic Route */}
            </Routes>
        );
    };

    export default App;
