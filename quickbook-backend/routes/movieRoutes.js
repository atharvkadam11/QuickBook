import express from "express";
import {
  getMovieController,
  getMovieTimingsController,
  searchMovieController,
  getMoviesController,
  getTrendingMoviesController,
  getPromotedMoviesController,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/timings/:id", getMovieTimingsController);
router.get("/search", searchMovieController);
router.get("/movies", getMoviesController);
router.get("/Trendingmovies", getTrendingMoviesController);
router.get("/Promotedmovies", getPromotedMoviesController);
router.get("/:id", getMovieController);
export default router;
