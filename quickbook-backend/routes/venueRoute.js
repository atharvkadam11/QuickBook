import express from "express";
import {
  getVenueSeatsController,
  bookSeatsController,
  addBooking,
  cancelBooking,
} from "../controllers/venueController.js";

const router = express.Router();

router.put("/book-seats", bookSeatsController);
router.put("/booking-seats", addBooking);
router.put("/cancel-seats", cancelBooking);
router.get("/:id", getVenueSeatsController);

export default router;
