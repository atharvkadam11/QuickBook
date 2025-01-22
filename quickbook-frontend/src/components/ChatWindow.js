import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const ChatWindow = ({ ticket, onBack }) => {
  const [newMessage, setNewMessage] = useState("");

  const channel = new BroadcastChannel("app-communication");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ticketNumber = ticket.ticketNumber;

    const fetchMessages = async () => {
      try {
        // Fetch messages from the API
        const response = await axios.get(
          `http://localhost:3000/customerTicket/message/${ticketNumber}`
        );

        if (response.status === 200) {
          // Set messages to the state if found
          setMessages(response.data.messages || []); // Assuming your API sends a "messages" field
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch the messages when the ticket changes
    fetchMessages();
    // Set up interval to call fetchMessages every second
    const intervalId = setInterval(fetchMessages, 500);

    // // Cleanup the interval on component unmount or when ticket changes
    return () => clearInterval(intervalId);
  }, [ticket]); // Only run once when the ticket changes

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        // Call the postMessage API to update the new message in MongoDB
        const response = await axios.post(
          "http://localhost:3000/customerTicket/message",
          {
            ticketNumber: ticket.ticketNumber, // Send ticketNumber to identify the ticket
            messages: [{ sender: "You", text: newMessage }], // Send the new message to the backend
          }
        );

        if (response.status === 200) {
          console.log("Message successfully posted to the database");
        } else {
          console.error("Failed to update message in database");
        }
      } catch (error) {
        console.error("Error sending message to the server:", error);
      }

      // Clear the input field
      setNewMessage("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Header with Ticket Info and Back Button */}
      <Box
        display="flex"
        alignItems="center"
        bgcolor="#f5f5f5"
        p={2}
        boxShadow={1}
      >
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box ml={2}>
          <Typography variant="h6">{`Ticket ID: ${ticket.ticketNumber}`}</Typography>
          <Typography variant="subtitle1">{`Category: ${ticket.category}`}</Typography>
          {/* <Typography variant="subtitle2" color="textSecondary">
            Support Agent: John Doe
          </Typography> */}
        </Box>
      </Box>

      <Divider />

      {/* Chat Messages */}
      <Box flex={1} p={2} overflow="auto" bgcolor="#fafafa">
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  message.sender === "You" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={message.text}
                secondary={message.sender}
                sx={{
                  bgcolor: message.sender === "You" ? "#e0f7fa" : "#f1f8e9",
                  borderRadius: 2,
                  p: 2,
                  maxWidth: "75%",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Message Input Box */}
      <Box display="flex" alignItems="center" p={2} bgcolor="white">
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
