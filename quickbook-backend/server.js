import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import emailRoute from "./routes/emailRoute.js";
import userRoute from "./routes/userRoute.js";
import movieRoutes from "./routes/movieRoutes.js";
import venueRoutes from "./routes/venueRoute.js";
import ticketRoutes from "./routes/bookTicketRouter.js";
import customerTicketRoutes from "./routes/customerTicketRouter.js";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUsername,
} from "./models/userModel.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Define your routes here
app.post("/users", async (req, res) => {
  console.log("Entered backend");
  const { username, email, password } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const user = await createUser({ username, email, password }); // Create the user
    res.status(201).json({ success: true, user }); // Return success response
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Could not create user" });
  }
});

app.post("/login", async (req, res) => {
  console.log("Entered backend");
  const { username, password } = req.body;

  try {
    // Validate required fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Username and password are required" });
    }

    // Retrieve the user by username from the database
    const user = await getUserByUsername(username); // Fetch user by username

    // Check if the user exists and the password matches
    if (user && user.password === password) {
      // If successful, return the user data
      return res.status(200).json({ success: true, user });
    } else {
      // If not successful, return an error response
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, error: "An error occurred during login" });
  }
});

app.use("/emails", emailRoute);
app.use("/users", userRoute);
app.use("/movie", movieRoutes);
app.use("/venue", venueRoutes);
app.use("/ticket", ticketRoutes);
app.use("/customerTicket", customerTicketRoutes);
// app.use("/book-ticket", bookticket);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
