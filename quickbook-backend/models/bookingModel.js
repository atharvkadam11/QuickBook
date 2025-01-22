import pool from "../config/mysqlConfig.js";

const getBookingsByUserId = async (userId) => {
  try {
    const query = `SELECT Venues.venue_name, Events.EventName, UserBookings.*
      FROM quickbook.UserBookings
      JOIN Venues ON UserBookings.VenueID = Venues.venue_id
      JOIN Events ON UserBookings.EventID = Events.EventID
      WHERE UserBookings.username = ?`;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error(`Error while fetching venues: ${error.message}`);
  }
};

const cancelBookingRow = async (BookingID) => {
  try {
    const query = `UPDATE UserBookings SET Status = 'Cancelled' WHERE BookingID = ?`;

    const [rows] = await pool.query(query, [BookingID]);
    return rows;
  } catch (error) {
    throw new Error(`Error while cancelling ticket: ${error.message}`);
  }
};

const addBookingRow = async (
  username,
  venueId,
  time,
  seatNumbers,
  positions,
  eventId,
  status
) => {
  try {
    console.log(
      username,
      venueId,
      time,
      seatNumbers,
      positions,
      eventId,
      status
    );
    console.log("printing positions", positions);
    console.log("positions", positions);
    const seatPositionsString = JSON.stringify(positions);
    const query = `INSERT INTO UserBookings (username, VenueID, Time, seatNumbers, seatPositions, EventID, Status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [rows] = await pool.query(query, [
      username,
      venueId,
      time,
      seatNumbers,
      seatPositionsString,
      eventId,
      status,
    ]);
    return rows;
  } catch (error) {
    throw new Error(`Error while fetching venues: ${error.message}`);
  }
};

export { getBookingsByUserId, addBookingRow, cancelBookingRow };
