import pool from "../config/mysqlConfig.js";

const getVenuesByEventId = async (eventId) => {
  try {
    const query = `SELECT Venues.venue_id, Venues.venue_name, EventVenues.TicketPrice, EventVenues.EventTimings FROM EventVenues
    INNER JOIN Venues ON EventVenues.VenueID = Venues.venue_id
    WHERE EventVenues.EventID = ?`;
    const [rows] = await pool.query(query, [eventId]);
    return rows;
  } catch (error) {
    throw new Error(`Error while fetching venues: ${error.message}`);
  }
};

const getAllMovieIds = async () => {
  try {
    const query =
      "select EventID, Genre, Language FROM Events where EventType = 'Movie'";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error("Error while fetching venues: ${error.message}");
  }
};

const getAllTrendingMovieIds = async () => {
  try {
    const query =
      "select EventID, Genre, Language from Events where EventType = 'Movie' and Trending = 1";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error("Error while fetching venues: ${error.message}");
  }
};

const getAllPromotedMovieIds = async () => {
  try {
    const query =
      "select EventID,Genre, Language from Events where EventType = 'Movie' and Promoted = 1";
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Error while fetching venues: ${error.message}`);
  }
};

export {
  getVenuesByEventId,
  getAllMovieIds,
  getAllTrendingMovieIds,
  getAllPromotedMovieIds,
};
