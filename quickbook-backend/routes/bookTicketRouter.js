import express from "express";
import { getTicketsByUserIdController } from "../controllers/ticketController.js";

const router = express.Router();

router.get("/tickets/:id", getTicketsByUserIdController);

export default router;
