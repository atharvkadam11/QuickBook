import axios from "axios";
import { getBookingsByUserId } from "../models/bookingModel.js";
import db from "../config/dbConfig.js";

const getTicketsByUserIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookings = await getBookingsByUserId(userId);

    console.log("bookings...", bookings);

    if (bookings) {
      res.status(200).json({ success: true, bookings });
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

export { getTicketsByUserIdController };
