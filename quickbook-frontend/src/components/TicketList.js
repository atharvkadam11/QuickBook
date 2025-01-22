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
} from "@mui/material";
import ChatWindow from "./ChatWindow";

const TicketList = () => {
  //   const tickets = [
  //     {
  //       id: "T1234",
  //       category: "Booking Issue",
  //       description: "Problem with booking confirmation",
  //     },
  //     {
  //       id: "T5678",
  //       category: "Payment Issue",
  //       description: "Payment not going through",
  //     },
  //     {
  //       id: "T9101",
  //       category: "Technical Issue",
  //       description: "App crashing on checkout",
  //     },
  //   ];
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Retrieve tickets from localStorage
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []); // Run only on component mount

  return (
    <Box p={3} bgcolor="white" borderRadius={2} boxShadow={3}>
      {selectedTicket ? (
        <ChatWindow
          ticket={selectedTicket}
          onBack={() => setSelectedTicket(null)}
        />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Existing Tickets
          </Typography>
          <List>
            {tickets.map((ticket) => (
              <ListItem key={ticket.id} disablePadding>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    justifyContent: "flex-start",
                    m: 1,
                    p: 2,
                    backgroundColor:
                      ticket.status === "closed" ? "lightred" : "lightgreen", // Color based on status
                    borderColor: ticket.status === "closed" ? "red" : "green", // Border color
                    "&:hover": {
                      backgroundColor:
                        ticket.status === "closed" ? "red" : "green", // Hover color
                    },
                  }}
                  onClick={() => setSelectedTicket(ticket)}
                  disabled={ticket.status === "closed"} // Disable button if status is 'closed'
                >
                  <ListItemText
                    primary={`ID: ${ticket.ticketNumber} - ${ticket.category}`}
                    secondary={`${ticket.subject} - Status: ${ticket.status}`}
                  />
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default TicketList;
