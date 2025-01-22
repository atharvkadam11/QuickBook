import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Button } from "@mui/material";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../images/movies/11.jpg";
import Image2 from "../images/movies/12.jpg";
import Image3 from "../images/movies/13.jpg";
import Image4 from "../images/movies/14.jpg";
import Image5 from "../images/movies/15.jpg";
import Image6 from "../images/movies/16.jpg";
import Image7 from "../images/movies/17.jpg";
import Image8 from "../images/movies/18.jpg";
import Image9 from "../images/movies/19.jpg";

import Image10 from "../images/shows/1.jpg";
import Image11 from "../images/shows/2.jpg";
import Image12 from "../images/shows/3.jpg";
import Image13 from "../images/shows/4.jpg";
import Image14 from "../images/shows/5.jpg";
import { useNavigate } from "react-router-dom";
import "./moviecarousal.css";

export default function MovieCarousal() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [promotedMovies, setPromotedMovies] = useState([]);

  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 7000, // Animation speed
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear", // Number of slides to scroll at once
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const bookTicket = (index) => {
  //   console.log("/movieeee/", index);
  //   navigate("/movie");
  //   // navigate(`/movie/${index}`);

  // }
  const settings2 = {
    dots: true, // Show dot indicators
    infinite: false, // Infinite looping
    speed: 7000, // Animation speed
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 0,
    autoplay: false,
    pauseOnHover: true,
    cssEase: "linear", // Number of slides to scroll at once
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/movie/Trendingmovies"
      );
      setMovies(response.data.movies); // Set movies from API response
      //setFilteredMovies(response.data.movies); // Set filteredMovies initially with all movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchPromotedMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/movie/Promotedmovies"
      );
      setPromotedMovies(response.data.movies); // Set movies from API response
      //setFilteredMovies(response.data.movies); // Set filteredMovies initially with all movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchPromotedMovies(); // Fetch movies when component mounts
  }, []);

  const bookTicket = (movieId) => {
    // console.log("/movie/" + index);
    navigate(`/movie/${movieId}`);
  };

  const shows = [
    { id: 1, title: "Ram Sethu", poster: Image10 },
    { id: 2, title: "Black Panther", poster: Image11 },
    { id: 3, title: "Bh", poster: Image12 },
    { id: 4, title: "Drishyam", poster: Image13 },
    { id: 5, title: "Dhrishyam 2", poster: Image14 },
  ];

  // old version(mahith)
  return (
    <div style={{ marginTop: "35px" }}>
      <div className="elevated-carousal2">
        <h3 style={{ padding: "20px", fontSize: "20px" }}>Promoted Movies</h3>
        <Slider {...settings2}>
          {promotedMovies.map((index) => (
            <div key={index} style={{}}>
              <img
                src={`https://image.tmdb.org/t/p/original${index.poster}`}
                alt={`Movie Poster ${index.title}`}
                style={{ width: "80%", height: "auto" }}
              />
              <Button
                variant="contained"
                onClick={() => bookTicket(index.id)}
                sx={{ marginTop: 1, marginRight: 5, marginLeft: 12 }}
              >
                Book Now
              </Button>
            </div>
          ))}
        </Slider>
      </div>
      <div className="elevated-carousal">
        <h3 style={{ padding: "20px", fontSize: "20px" }}>
          Now showing in theatres
        </h3>
        <Slider {...settings}>
          {movies.map((index) => (
            <div key={index} style={{}}>
              <img
                src={`https://image.tmdb.org/t/p/original${index.poster}`}
                alt={`Movie Poster ${index.title}`}
                style={{ width: "80%", height: "auto" }}
              />
              <Button
                variant="contained"
                onClick={() => bookTicket(index.id)}
                sx={{ marginTop: 1, marginRight: 5, marginLeft: 12 }}
              >
                Book Now
              </Button>
            </div>
          ))}
        </Slider>
      </div>
      <div
        className="elevated-carousal"
        // style={{ marginTop: "50px", backgroundColor: "bisque" }}
      >
        <h3 style={{ padding: "20px", fontSize: "20px" }}>Shows happening</h3>
        <Slider {...settings}>
          {shows.map((index) => (
            <div key={index} style={{}}>
              <img
                src={index.poster}
                alt={`Movie Poster ${index + 1}`}
                style={{ width: "80%", height: "auto" }}
              />
              <Button
                variant="contained"
                onClick={bookTicket}
                sx={{ marginTop: 1, marginRight: 5, marginLeft: 20 }}
              >
                Book Now
              </Button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
