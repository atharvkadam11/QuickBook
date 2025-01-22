import axios from "axios";
import db from "../config/dbConfig.js";

const postMessageController = async (req, res) => {
  const ticketsCollection = db.collection("tickets");
  // const { ticketNumber } = req.params;

  const {
    ticketNumber,
    category,
    subject,
    messages,
    description,
    firstName,
    bookingId,
    email,
    status,
  } = req.body;
  console.log(
    "ticket details from request body : ",
    ticketNumber,
    category,
    subject,
    messages
  );

  try {
    // Check if the ticket already exists in the database
    const existingTicket = await ticketsCollection.findOne({ ticketNumber });

    if (existingTicket) {
      // If the ticket exists, append the new messages to the existing ones
      const updatedMessages = [...existingTicket.messages, ...messages];

      // Update the ticket with the new messages
      await ticketsCollection.updateOne(
        { ticketNumber },
        { $set: { messages: updatedMessages } } // Update the messages array
      );
    } else {
      // If the ticket does not exist, create a new ticket
      const newTicket = {
        ticketNumber,
        category,
        subject,
        messages,
        description,
        firstName,
        status,
        bookingId,
        email,
      };

      // Insert the new ticket into the database
      await ticketsCollection.insertOne(newTicket);
    }

    // Send a success response
    res.status(200).json({ message: "Ticket message posted successfully!" });
  } catch (error) {
    console.error("Error posting message:", error);
    res
      .status(500)
      .json({ message: "Failed to post message", error: error.message });
  }
};

const getMessageController = async (req, res) => {
  const ticketsCollection = db.collection("tickets");

  const ticketNumber = req.params.ticketNumber.toString(); // ticketNumber from URL parameter
  try {
    // Find the ticket by ticketNumber
    const ticket = await ticketsCollection.findOne({ ticketNumber });

    if (ticket) {
      // If the ticket is found, send the ticket's messages as a response
      res.status(200).json({ messages: ticket.messages });
    } else {
      // If the ticket does not exist, return a 404 response
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch messages", error: error.message });
  }
};

const getAllMessagesController = async (req, res) => {
  try {
    const ticketsCollection = db.collection("tickets");

    // Fetch all tickets from the 'tickets' collection
    const tickets = await ticketsCollection.find().toArray();

    // Send the fetched tickets as a response
    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tickets",
    });
  }
};

export {
  postMessageController,
  getMessageController,
  getAllMessagesController,
};
