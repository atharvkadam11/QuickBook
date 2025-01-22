import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import Image1 from "../images/Screen/screen.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const SeatBookingTest = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setPrice] = useState(0);
  const [venueInfo, setVenueInfo] = useState(null);
  const [seatNumbers, setSeatNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { id, theatreName, timing, movieName, movieId } = location.state;

  useEffect(() => {
    console.log("movie id: ", movieId);
    const fetchTheatreSeats = async () => {
      const venueId = "1";
      console.log("venue id and name", id, theatreName);
      try {
        const response = await axios.get("http://localhost:3000/venue/" + id);
        console.log("Venue data d " + response.data.venue.id);
        setVenueInfo(response.data.venue);
        setSeatNumbers(response.data.venue.seats);
        setLoading(false);
      } catch (error) {
        console.log("Movie data d " + error.message);
        setError(error.message);
      }
    };
    fetchTheatreSeats();
  }, []);

  const handleSeatClick = (seatNumber) => {
    // Check if seat is already selected
    const isSeatSelected = selectedSeats.includes(seatNumber);

    // If selected, remove it from the array, otherwise add it
    const updatedSelectedSeats = isSeatSelected
      ? selectedSeats.filter((seat) => seat !== seatNumber)
      : [...selectedSeats, seatNumber];

    // Update the state with the new selected seats
    setSelectedSeats(updatedSelectedSeats);
    setPrice(updatedSelectedSeats.length * 12.99);
  };

  // Dummy array of seat numbers for demonstration
  const seatNumbers1 = [
    [
      { number: "A1", booked: false },
      { number: "A2", booked: true },
      { number: "A3", booked: false },
      { number: "A4", booked: false },
      { number: "NA", booked: false },
      { number: "NA", booked: false },
      { number: "A7", booked: false },
      { number: "A8", booked: false },
      { number: "A9", booked: false },
      { number: "A10", booked: false },
      // Add more seats and their booking status as needed
    ],
    [
      { number: "B1", booked: false },
      { number: "B2", booked: false },
      { number: "B3", booked: true },
      { number: "B4", booked: false },
      { number: "NA", booked: false },
      { number: "NA", booked: false },
      { number: "B7", booked: false },
      { number: "B8", booked: false },
      { number: "B9", booked: false },
      { number: "B10", booked: false },
      // Add more seats and their booking status as needed
    ],
    [
      { number: "C1", booked: false },
      { number: "C2", booked: false },
      { number: "C3", booked: true },
      { number: "C4", booked: false },
      { number: "NA", booked: false },
      { number: "NA", booked: false },
      { number: "C7", booked: false },
      { number: "C8", booked: false },
      { number: "C9", booked: false },
      { number: "C10", booked: false },
      // Add more seats and their booking status as needed
    ],
    [
      { number: "D1", booked: false },
      { number: "D2", booked: false },
      { number: "D3", booked: true },
      { number: "D4", booked: false },
      { number: "D5", booked: false },
      { number: "D6", booked: false },
      { number: "D7", booked: false },
      { number: "D8", booked: false },
      { number: "D9", booked: false },
      { number: "D10", booked: false },
      // Add more seats and their booking status as needed
    ],
    [
      { number: "E1", booked: false },
      { number: "E2", booked: false },
      { number: "E3", booked: true },
      { number: "E4", booked: false },
      { number: "E5", booked: false },
      { number: "E6", booked: false },
      { number: "E7", booked: false },
      { number: "E8", booked: false },
      { number: "E9", booked: false },
      { number: "E10", booked: false },
      // Add more seats and their booking status as needed
    ],
    [
      { number: "F1", booked: false },
      { number: "F2", booked: false },
      { number: "F3", booked: true },
      { number: "F4", booked: false },
      { number: "F5", booked: false },
      { number: "F6", booked: false },
      { number: "F7", booked: false },
      { number: "F8", booked: false },
      { number: "F9", booked: false },
      { number: "F10", booked: false },
      // Add more seats and their booking status as needed
    ],
  ];

  const handleBook = () => {
    console.log("selected seats", selectedSeats);
    var positions = [];
    for (var i = 0; i < seatNumbers.length; i++) {
      for (var j = 0; j < seatNumbers[i].length; j++) {
        if (selectedSeats.includes(seatNumbers[i][j].number)) {
          positions.push({ row: i, column: j, booked: "true" });
        }
      }
    }
    console.log(positions);
    var totalSeats = selectedSeats.length;
    var seatNumbersString = selectedSeats.join(", ");
    navigate("/payment", {
      state: {
        id,
        theatreName,
        timing,
        totalPrice,
        totalSeats,
        movieName,
        positions,
        seatNumbersString,
        movieId,
      },
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "50px",
          }}
        >
          <h2>Select your Seats</h2>
          <div
            style={{
              marginTop: "35px",
              marginBottom: "35px",
              textAlign: "center",
            }}
          >
            <img src={Image1} alt="screen" />
          </div>

          <div>
            {seatNumbers.map((seatRow) => (
              <div>
                {seatRow.map((seat) =>
                  seat.number === "NA" ? (
                    <button
                      disabled
                      style={{
                        margin: "8px",
                        width: "60px" /* Fixed width */,
                        height: "60px" /* Fixed height */,
                        padding: "18px",
                        border: "2px solid #fff",
                        borderRadius: "8px",
                        background: "white",
                        color: "white",
                      }}
                    ></button>
                  ) : (
                    <button
                      key={seat.number}
                      onClick={() => handleSeatClick(seat.number)}
                      disabled={seat.booked}
                      style={{
                        margin: "8px",
                        padding: "13px",
                        width: "60px" /* Fixed width */,
                        height: "60px" /* Fixed height */,
                        border: "2px solid #999",
                        borderRadius: "8px",
                        background: selectedSeats.includes(seat.number)
                          ? "green"
                          : seat.booked
                          ? "black" // Set text color to black if seat is booked
                          : "grey", // Default text color,
                        color: selectedSeats.includes(seat.number)
                          ? "white"
                          : seat.booked
                          ? "black" // Set text color to black if seat is booked
                          : "black", // Default text color
                      }}
                    >
                      {seat.number}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              style={{
                margin: "9px",
                padding: "7px 10px",
                background: "grey",
                color: "black",
              }}
            ></button>
            <p>Available</p>
            <button
              style={{
                margin: "9px",
                padding: "7px 10px",
                background: "green",
                color: "white",
              }}
            ></button>
            <p>Selected</p>
            <button
              style={{
                margin: "9px",
                padding: "7px 10px",
                background: "black",
              }}
            ></button>
            <p>Booked</p>
          </div>
          <p>Total Price: {totalPrice}</p>
          <p>Selected Seats: {selectedSeats.join(", ")}</p>
          <p>Number of Seats Selected: {selectedSeats.length}</p>
          <Button
            variant="contained"
            onClick={handleBook}
            sx={{ marginTop: 2 }}
          >
            Book Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeatBookingTest;
