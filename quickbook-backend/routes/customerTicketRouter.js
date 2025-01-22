import express from "express";
import {
  postMessageController,
  getMessageController,
  getAllMessagesController,
} from "../controllers/customerTicketController.js";

const router = express.Router();

router.post("/message", postMessageController);
router.get("/message/:ticketNumber", getMessageController);
router.get("/message", getAllMessagesController);

export default router;
