import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Button from "@mui/material/Button";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../context/auth.context";
import { useNavigate, useLocation } from "react-router-dom";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";

const SupportPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [view, setView] = useState(null);

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f6f8">
      {/* Left Sidebar */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="25%"
        bgcolor="#eeeeee"
        p={3}
        gap={2}
        boxShadow={2}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setView("newTicket")}
          sx={{ fontSize: "1.2rem", padding: "1rem" }}
        >
          Raise a New Ticket
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => setView("viewTickets")}
          sx={{ fontSize: "1.2rem", padding: "1rem" }}
        >
          View Existing Tickets
        </Button>
      </Box>

      {/* Right Content */}
      <Box flex={1} p={3}>
        {view === "newTicket" && <NewTicketForm />}
        {view === "viewTickets" && <TicketList />}
        {!view && (
          <Typography variant="h4" color="textSecondary" align="center" mt={5}>
            Select an option to get started
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SupportPage;
