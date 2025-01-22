import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../models/userModel.js";

const createUserController = async (req, res) => {
  console.log("Entered backend");
  try {
    const userData = await createUser(req.body);
    res.status(201).json({ success: true, userData });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Could not create user" });
  }
};

const getUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ success: false, error: "Could not get user" });
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ success: false, error: "Could not get users" });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    await updateUser(userId, req.body);
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Could not update user" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Could not delete user" });
  }
};

export {
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
  createUserController,
};
