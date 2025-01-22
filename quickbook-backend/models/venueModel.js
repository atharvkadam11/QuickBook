import pool from "../config/mysqlConfig.js";

const getVenueSeatsByVenueId = async (venueId) => {
  try {
    const query = `SELECT venue_id, venue_name, venue_type, seats FROM Venues WHERE venue_id = ?`;
    const [rows] = await pool.query(query, [venueId]);
    return rows[0];
  } catch (error) {
    throw new Error(`Error while fetching venues: ${error.message}`);
  }
};

const bookSeats = async (booked, venueId, positions) => {
  try {
    for (var i = 0; i < positions.length; i++) {
      const query = `UPDATE Venues SET seats = JSON_SET(seats, '$[${positions[i].row}][${positions[i].column}].booked', ${booked}) WHERE venue_id = ?`;
      console.log("query is: ", query);
      await pool.query(query, [venueId]);
    }
  } catch (error) {
    throw new Error(`Error while fetching venues: ${error.message}`);
  }
};

export { getVenueSeatsByVenueId, bookSeats };
