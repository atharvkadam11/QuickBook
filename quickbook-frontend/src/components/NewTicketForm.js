import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAuth } from "../context/auth.context";
import axios from "axios";

const NewTicketForm = () => {
  const [category, setCategory] = useState("");
  const { user } = useAuth();
  const [bookingId, setBookingId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  useEffect(() => {
    if (user && user.username) {
      setFirstName("Mahith");
      setEmail("mahith.kumar1997@gmail.com");
    } else {
      setFirstName("");
      setEmail("");
    }
  }, [user]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    const generatedTicketNumber = `T${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    setTicketNumber(generatedTicketNumber);
    setDialogOpen(true);

    console.log("New Ticket Submitted:", { category, bookingId, description });

    const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];

    const newTicket = {
      id: existingTickets.length + 1,
      category,
      bookingId,
      firstName,
      email,
      description,
      ticketNumber: generatedTicketNumber,
      status: "Open",
      subject,
      messages: [
        {
          sender: "You",
          text: description, // Ticket description as the first message
        },
      ],
    };
    const updatedTickets = [...existingTickets, newTicket];
    try {
      // Send a POST request to the backend to store the new ticket in MongoDB
      const response = await axios.post(
        "http://localhost:3000/customerTicket/message",
        newTicket
      );

      if (response.status === 200) {
        console.log("Ticket successfully posted:", response.data);
        // Optionally, you can update localStorage if needed
        const existingTickets =
          JSON.parse(localStorage.getItem("tickets")) || [];
        const updatedTickets = [...existingTickets, newTicket];
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));

        // Reset form fields after submitting
        setCategory("");
        setBookingId("");
        setFirstName("");
        setEmail("");
        setDescription("");
      } else {
        console.error("Failed to submit ticket");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      p={3}
      bgcolor="white"
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h5" gutterBottom>
        Raise a New Ticket
      </Typography>
      <TextField
        select
        label="Issue Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      >
        {["Booking Issue", "Payment Issue", "Technical Issue", "Other"].map(
          (option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
        )}
      </TextField>
      <TextField
        label="Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        disabled={firstName === "Mahith"}
      />
      <TextField
        label="Email-id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        disabled={email === "mahith.kumar1997@gmail.com"}
      />
      <TextField
        label="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        fullWidth
      />
      <TextField
        label="Issue Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        fullWidth
      />
      <TextField
        label="Issue Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Ticket
      </Button>

      {/* Dialog for success message */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Ticket Generated ✅</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your ticket with number <strong>{ticketNumber}</strong> has been
            generated successfully. Please check your email for updates on the
            ticket.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewTicketForm;
