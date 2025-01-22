import axios from "axios";
import {
  getVenuesByEventId,
  getAllMovieIds,
  getAllTrendingMovieIds,
  getAllPromotedMovieIds,
} from "../models/eventVenueModel.js";
import db from "../config/dbConfig.js";
//import redisClient from "../config/redis.js";

const getMovieController = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieInfoUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?api_key=cd3b90152fe991306b189d1e8dd01428";
    const movieInfoResponse = await axios.get(movieInfoUrl);

    // Extract relevant data from the external API response
    const { id, original_title, overview, poster_path, release_date, runtime } =
      movieInfoResponse.data;
    const movieDetails = {
      id,
      original_title,
      overview,
      poster_path,
      release_date,
      runtime,
    };

    const movieTrailerUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "/videos?language=en-US&api_key=cd3b90152fe991306b189d1e8dd01428";

    const movieTrailerResponse = await axios.get(movieTrailerUrl);

    const trailer = movieTrailerResponse.data.results.find(
      (item) => item.type === "Trailer"
    );

    if (trailer) {
      movieDetails.trailerKey = trailer.key;
    } else {
      console.log("movie id", movieId);
      try {
        const moviesCollection = db.collection("movie_names");

        const dbValue = await moviesCollection.findOne({ movie_id: movieId });

        console.log("trailer key: ", dbValue.trailer_key);
        movieDetails.trailerKey = dbValue.trailer_key;
      } catch (error) {
        console.error("Error getting movie details:", error);
      }

      // const dbValue = await db
      //   .collection("movie_names")
      //   .findOne({
      //     movie_id: movieId,
      //   })
      //   .then(() => (movieDetails.trailerKey = dbValue));
      // console.log("trailer key: ", dbValue);
      // movieDetails.trailerKey = null;
    }

    const movieCastUrl =
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "/credits?api_key=cd3b90152fe991306b189d1e8dd01428";

    const movieCastResponse = await axios.get(movieCastUrl);
    // Extract the first 4 cast members
    const first4Cast = movieCastResponse.data.cast.slice(0, 4);

    // Extract the first 4 crew members
    const first4Crew = movieCastResponse.data.crew.slice(0, 4);

    movieDetails.cast = first4Cast;
    movieDetails.crew = first4Crew;

    res.status(200).json({ success: true, movie: movieDetails });
  } catch (error) {
    console.error("Error getting movie details:", error);
    res
      .status(500)
      .json({ success: false, error: "Could not fetch movie details" });
  }
};

const getMovieTimingsController = async (req, res) => {
  try {
    const movieId = req.params.id;
    const theatres = await getVenuesByEventId(movieId);
    if (theatres) {
      res.status(200).json({ success: true, theatres });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting movie timings:", error);
    res
      .status(500)
      .json({ success: false, error: "Could not fetch movie timings" });
  }
};

const searchMovieController = async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const moviesCollection = db.collection("movie_names");
  const regexQuery = { name: { $regex: `^${query}` } };
  console.log("query: ", query);
  console.log("regex: ", regexQuery);

  const docs = moviesCollection.find({
    name: {
      $regex: query,
      $options: "i",
    },
  });
  const data = await docs.toArray();
  console.log("Doc Len", data.length);
  res.status(200).json(data);
};

// const getMoviesController = async (req, res) => {
//   try {
//     const movies = await getAllMovieIds();

//     console.log(movies);
//     if (!movies || movies.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, error: "No movies found in the database" });
//     }

//     const apiKey = "cd3b90152fe991306b189d1e8dd01428";
//     const moviesData = [];

//     for (const dbmovie of movies) {
//       const movieInfoUrl = `https://api.themoviedb.org/3/movie/${dbmovie.EventID}?api_key=${apiKey}`;

//       const response = await axios.get(movieInfoUrl);
//       const movieDetails = response.data;

//       const { original_title, poster_path } = movieDetails;
//       const genreName = dbmovie.Genre;

//       const movie = {
//         id: dbmovie.EventID,
//         title: original_title,
//         language: dbmovie.Language,
//         genre: genreName,
//         poster: poster_path,
//       };

//       moviesData.push(movie);
//     }

//     res.status(200).json({ success: true, movies: moviesData });
//   } catch (error) {
//     console.error("Error getting movie details:", error);
//     res
//       .status(500)
//       .json({ success: false, error: "Could not fetch movie details" });
//   }
// };

const getMoviesController = async (req, res) => {
  try {
    // const cachedMovies = await redisClient.get("movies");
    // if (cachedMovies) {
    //   console.log("Movies found in cache");
    //   return res.status(200).json({
    //     success: true,
    //     cached: true,
    //     movies: JSON.parse(cachedMovies),
    //   });
    // }

    const movies = await getAllMovieIds();

    console.log(movies);
    if (!movies || movies.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No movies found in the database" });
    }

    const apiKey = "cd3b90152fe991306b189d1e8dd01428";
    const moviesData = [];

    for (const dbmovie of movies) {
      const movieInfoUrl = `https://api.themoviedb.org/3/movie/${dbmovie.EventID}?api_key=${apiKey}`;

      const response = await axios.get(movieInfoUrl);
      const movieDetails = response.data;

      const { original_title, poster_path } = movieDetails;
      const genreName = dbmovie.Genre;

      const movie = {
        id: dbmovie.EventID,
        title: original_title,
        language: dbmovie.Language,
        genre: genreName,
        poster: poster_path,
      };

      moviesData.push(movie);
    }

    //await redisClient.set("movies", JSON.stringify(moviesData));

    res.status(200).json({ success: true, cached: false, movies: moviesData });
  } catch (error) {
    console.error("Error getting movie details:", error);
    res
      .status(500)
      .json({ success: false, error: "Could not fetch movie details" });
  }
};

const getTrendingMoviesController = async (req, res) => {
  try {
    const movies = await getAllTrendingMovieIds();

    if (!movies || movies.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No movies found in the database" });
    }

    const apiKey = "cd3b90152fe991306b189d1e8dd01428";
    const moviesData = [];

    for (const dbmovie of movies) {
      const movieInfoUrl = `https://api.themoviedb.org/3/movie/${dbmovie.EventID}?api_key=${apiKey}`;

      const response = await axios.get(movieInfoUrl);
      const movieDetails = response.data;

      const { original_title, poster_path } = movieDetails;
      const genreName = dbmovie.Genre;

      const movie = {
        id: dbmovie.EventID,
        title: original_title,
        language: dbmovie.Language,
        genre: genreName,
        poster: poster_path,
      };

      moviesData.push(movie);
    }

    res.status(200).json({ success: true, movies: moviesData });
  } catch (error) {
    console.error("Error getting movie details:", error);
    res
      .status(500)
      .json({ success: false, error: "Could not fetch movie details" });
  }
};

const getPromotedMoviesController = async (req, res) => {
  try {
    const movies = await getAllPromotedMovieIds();

    if (!movies || movies.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No movies found in the database" });
    }

    const apiKey = "cd3b90152fe991306b189d1e8dd01428";
    const moviesData = [];

    for (const dbMovie of movies) {
      const movieInfoUrl = `https://api.themoviedb.org/3/movie/${dbMovie.EventID}?api_key=${apiKey}`;

      const response = await axios.get(movieInfoUrl);
      const movieDetails = response.data;

      const { original_title, poster_path } = movieDetails;
      const genreName = dbMovie.Genre;

      const movie = {
        id: dbMovie.EventID,
        title: original_title,
        language: dbMovie.Language,
        genre: genreName,
        poster: poster_path,
      };

      moviesData.push(movie);
    }

    res.status(200).json({ success: true, movies: moviesData });
  } catch (error) {
    console.error("Error getting movie details:", error);
    res
      .status(500)
      .json({ success: false, error: "Could not fetch movie details" });
  }
};

export {
  getMovieController,
  getMovieTimingsController,
  searchMovieController,
  getMoviesController,
  getTrendingMoviesController,
  getPromotedMoviesController,
};
