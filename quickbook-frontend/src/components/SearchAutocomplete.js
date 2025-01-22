import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";

const SearchAutocomplete = (props) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const selectMovie = (movieId) => {
    props.updateResults(null);
    console.log("selected movie id", movieId);

    navigate(`/movie/${movieId}`);
    // navigate("/movie", {
    //   state: {
    //     movieId,
    //   },
    // });
  };

  return (
    <div>
      {props.results && props.results.length > 0 && (
        <div
          style={{
            marginTop: "5px",
            marginLeft: "170px",
            marginBottom: "20px",
          }}
        >
          {props.results.map((movie, index) => (
            <Button
              variant="contained"
              onClick={() => selectMovie(movie.movie_id)} // Pass movie.id to selectMovie
              style={{
                backgroundColor: "grey",
                color: "white",
                margin: "5px",
              }}
            >
              {movie.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
