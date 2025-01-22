import React, { useState, useEffect } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

import "./Movies.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ language: "", genre: "" });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/movie/movies");
      setMovies(response.data.movies); // Set movies from API response
      setFilteredMovies(response.data.movies); // Set filteredMovies initially with all movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when component mounts
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

    const filtered = movies.filter((movie) => {
      return movie.language.includes(language) && movie.genre.includes(genre);
    });
    setFilteredMovies(filtered);
  };

  const handleClear = () => {
    setFilteredMovies(movies);
  };

  const bookTicket = (movieId) => {
    // console.log("/movie/" + index);
    navigate(`/movie/${movieId}`);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <div className="movie-booking-app">
      <div className="filters">
        <h2 style={{ paddingBottom: "20px", paddingLeft: "20px" }}>Filters</h2>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ marginLeft: 2 }}>
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="language"
              onChange={handleLanguageChange}
              sx={{ marginLeft: 2 }}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
              <MenuItem value="Telugu">Telugu</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              style={{ marginTop: "20px" }}
              sx={{ marginLeft: 2 }}
            >
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Genre"
              style={{ marginTop: "20px" }}
              onChange={handleGenreChange}
              sx={{ marginLeft: 2 }}
            >
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleFilterChange}
            sx={{ marginTop: 2, marginRight: 5, marginLeft: 2 }}
          >
            Filter
          </Button>
          <Button variant="outline" onClick={handleClear} sx={{ marginTop: 2 }}>
            Clear
          </Button>
        </div>
      </div>
      <div className="movie-posters">
        {filteredMovies
          .sort((a, b) => a.id - b.id)
          .map((movie) => (
            <div key={movie.id} className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster}`}
                alt={movie.title}
                style={{ width: 300, height: 450 }}
              />

              <Button
                variant="contained"
                onClick={() => bookTicket(movie.id)}
                sx={{ marginTop: 1, marginRight: 10 }}
              >
                Book Now
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movies;
