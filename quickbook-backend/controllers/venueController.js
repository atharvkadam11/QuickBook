import { getVenueSeatsByVenueId, bookSeats } from "../models/venueModel.js";
import { addBookingRow, cancelBookingRow } from "../models/bookingModel.js";

const getVenueSeatsController = async (req, res) => {
  try {
    const venueId = req.params.id;
    const venue = await getVenueSeatsByVenueId(venueId);
    if (venue) {
      res.status(200).json({ success: true, venue });
    } else {
      res.status(404).json({ success: false, error: "Venue not found" });
    }
  } catch (error) {
    console.error("Error getting Venue details:", error);
    res
      .status(500)
      .json({ success: false, error: "Could not fetch Venue details" });
  }
};

const bookSeatsController = async (req, res) => {
  try {
    const { booked, venueId, positions } = req.body;

    if (!venueId) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    console.log(positions);

    await bookSeats(booked, venueId, positions);
    res.status(200).json({ success: true, message: "Ticket booked success" });
  } catch (error) {
    console.error("Error updating seat booking", error);
    res
      .status(500)
      .json({ success: false, error: "Could not update seat booking" });
  }
};

const addBooking = async (req, res) => {
  try {
    const { username, venueId, seatNumbers, positions, eventId } = req.body;
    const time = new Date().toISOString().slice(0, 19).replace("T", " ");
    var status = "Booked";

    console.log("inside booking");
    await addBookingRow(
      username,
      venueId,
      time,
      seatNumbers,
      positions,
      eventId,
      status
    );
    res.status(200).json({ success: true, message: "Ticket booked success" });
  } catch (error) {
    console.error("Error updating seat booking", error);
    res
      .status(500)
      .json({ success: false, error: "Could not update seat booking" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { BookingID } = req.body;
    //const time = new Date().toISOString().slice(0, 19).replace("T", " ");
    var status = "Cancelled";

    console.log("inside cacncelling");
    await cancelBookingRow(BookingID);
    res
      .status(200)
      .json({ success: true, message: "Ticket cancelled success" });
  } catch (error) {
    console.error("Error updating seat booking", error);
    res
      .status(500)
      .json({ success: false, error: "Could not update seat booking" });
  }
};
export {
  getVenueSeatsController,
  bookSeatsController,
  addBooking,
  cancelBooking,
};
