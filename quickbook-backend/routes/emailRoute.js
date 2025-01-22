import express from "express";
import bodyParser from "body-parser";
//import redisClient from "../config/redis.js";
//import messageQueue from "../config/bull.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "mahit1babloo@gmail.com",
    pass: "uzogwbnvhqdtunjl",
  },
});

const router = express.Router();
router.use(bodyParser.json());

router.post("/bookEvent", async (req, res) => {
  const { name, email, theatreName, movieName, seatNumbers } = req.body;

  console.log(name, email, theatreName, movieName, seatNumbers);

  const mailOptions = {
    from: "mahit1babloo@gmail.com",
    to: email,
    subject: "Event Booking Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50; text-align: center;">Event Booking Confirmation</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for booking the event:</p>
          <p style="margin-left: 20px;"><strong>${movieName}</strong></p>
          <p>The booking venue is:</p>
          <p style="margin-left: 20px;"><strong>${theatreName}</strong></p>
          <p>Your seat number(s):</p>
          <p style="margin-left: 20px;"><strong>${seatNumbers}</strong></p>
          <p style="margin-top: 20px;">We look forward to seeing you there!</p>
          <p style="text-align: center; margin-top: 30px;">
            <em>Best regards,</em><br>
            <strong>Your Event Team</strong>
          </p>
        </div>
      </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  res.status(200).send("Okay");
});

router.post("/cancelEvent", async (req, res) => {
  const { name, email, theatreName, movieName, seatNumbers } = req.body;

  console.log(name, email, theatreName, movieName, seatNumbers);

  const mailOptions = {
    from: "mahit1babloo@gmail.com",
    to: email,
    subject: "Event Cancellation Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
          <h2 style="color: #F44336; text-align: center;">Event Booking Confirmation</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>This is to confirm that your booking has been cancelled. Please find the details below:</p>
          <p style="margin-left: 20px;"><strong>${movieName}</strong></p>
          <p>The booking venue is:</p>
          <p style="margin-left: 20px;"><strong>${theatreName}</strong></p>
          <p>Your seat number(s):</p>
          <p style="margin-left: 20px;"><strong>${seatNumbers}</strong></p>
          <p style="margin-top: 20px;">We are sorry to see you go!</p>
          <p style="text-align: center; margin-top: 30px;">
            <em>Best regards,</em><br>
            <strong>Your Event Team</strong>
          </p>
        </div>
      </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  res.status(200).send("Okay");
});

router.post("/closeTicket", async (req, res) => {
  const { name, email, ticketNumber, ticketCategory } = req.body;

  const mailOptions = {
    from: "mahit1babloo@gmail.com",
    to: email,
    subject: "Ticket resolution.",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50; text-align: center;">Ticket Resolution</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>This is to confirm that your ticket has been resolved. Please find the details below:</p>
          <p style="margin-left: 20px;"><strong>${ticketNumber}</strong></p>
          <p>Ticket Number:</p>
          <p style="margin-left: 20px;"><strong>${ticketCategory}</strong></p>
          <p>Ticket Category):</p>
          <p style="margin-top: 20px;">If you have any other issues, please re-open this ticket</p>
          <p style="text-align: center; margin-top: 30px;">
            <em>Best regards,</em><br>
            <strong>QuickBook support</strong>
          </p>
        </div>
      </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  res.status(200).send("Okay");
});

export default router;
