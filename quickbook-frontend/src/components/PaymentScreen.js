import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth.context";

function PaymentScreen() {
  const [redeem, setRedeem] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const {
    id,
    theatreName,
    timing,
    totalSeats,
    movieName,
    positions,
    seatNumbersString,
    movieId,
  } = location.state;

  const [paymentDetails, setPaymentDetails] = useState({
    movieName: "Inside Out",
    showTime: "21:00",
    tickets: totalSeats,
    pricePerTicket: 12.99,
    totalPrice: 0, // Initial value, calculated by useEffect
    theatre: theatreName,
  });

  // Use useEffect to update totalPrice when tickets or pricePerTicket changes
  useEffect(() => {
    const newTotalPrice =
      paymentDetails.tickets * paymentDetails.pricePerTicket;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      totalPrice: newTotalPrice,
    }));
  }, [paymentDetails.tickets, paymentDetails.pricePerTicket]); // Recalculate when these change

  const redeemPoints = () => {
    if (!redeem && paymentDetails.totalPrice > 0) {
      const updatedTotalPrice = Math.max(paymentDetails.totalPrice - 25, 0); // Ensure total price doesn't go below zero
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        totalPrice: updatedTotalPrice,
      }));
      setRedeem(true); // Indicate that points have been redeemed
    }
  };

  const handlePayment = async () => {
    console.log("Processing payment...");
    console.log("positions", positions);
    try {
      const response = await axios.put(
        "http://localhost:3000/venue/book-seats",
        {
          booked: true,
          venueId: id,
          positions: positions,
        }
      );

      const bookingResponse = await axios.put(
        "http://localhost:3000/venue/booking-seats",
        {
          username: user.username,
          venueId: id,
          seatNumbers: seatNumbersString,
          positions: positions,
          eventId: movieId,
        }
      );

      const emailbookingResponse = await axios.post(
        "http://localhost:3000/emails/bookEvent",
        {
          name: "Mahith",
          email: "mahith.kumar1997@gmail.com",
          theatreName: paymentDetails.theatre,
          movieName: paymentDetails.movieName,
          seatNumbers: seatNumbersString,
          eventId: movieId,
        }
      );

      if (response.data.success && bookingResponse.data.success) {
        setIsBookingConfirmed(true); // Indicate booking confirmation
      }
    } catch (error) {
      console.error("Error during booking:", error);
      setError(error.message); // Store the error message
    }
  };

  const goHome = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      display="flex"
      marginTop="30px"
    >
      <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Complete Your Payment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <strong>Movie:</strong>
          </Grid>
          <Grid item xs={6}>
            {paymentDetails.movieName}
          </Grid>

          <Grid item xs={6}>
            <strong>Show Time:</strong>
          </Grid>
          <Grid item xs={6}>
            {paymentDetails.showTime}
          </Grid>

          <Grid item xs={6}>
            <strong>Theatre:</strong>
          </Grid>
          <Grid item xs={6}>
            {paymentDetails.theatre}
          </Grid>

          <Grid item xs={6}>
            <strong>Tickets:</strong>
          </Grid>
          <Grid item xs={6}>
            {paymentDetails.tickets}
          </Grid>

          <Grid item xs={6}>
            <strong>Price per Ticket:</strong>
          </Grid>
          <Grid item xs={6}>
            ${paymentDetails.pricePerTicket.toFixed(2)}
          </Grid>

          <Grid item xs={6}>
            <strong>Total Price:</strong>
          </Grid>
          <Grid item xs={6}>
            ${paymentDetails.totalPrice.toFixed(2)}
          </Grid>

          <Grid item xs={6}>
            <strong>Reward points avaialable: </strong>
          </Grid>
          <Grid item xs={6}>
            25
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={redeemPoints}>
              Redeem Points
            </Button>
          </Grid>

          {redeem && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography variant="body1">Points Redeemed!</Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePayment}
            >
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={isBookingConfirmed}>
        <DialogTitle style={{ fontWeight: "bold" }}>
          Booking Confirmed!
        </DialogTitle>
        <DialogContent>
          Your ticket will be sent to your email shortly.
          <Button
            onClick={goHome}
            style={{ fontWeight: "bold", marginTop: "20px" }}
          >
            Okay
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default PaymentScreen;
