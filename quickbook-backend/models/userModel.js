import pool from "../config/mysqlConfig.js";

const createUser = async (userData) => {
  const { username, email, password } = userData;

  // Insert the new user into the 'users' table
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const [result] = await pool.query(query, [username, email, password]);

  // Return the inserted user data, including the new user ID
  return {
    id: result.insertId,
    username,
    email,
  };
};

const getUserByUsername = async (username) => {
  const query = "SELECT * FROM users WHERE username = ?"; // Parameterized query
  const [rows] = await pool.query(query, [username]); // Execute query with parameter

  if (rows.length > 0) {
    return rows[0]; // Return the first (and presumably only) matching user
  }

  return null; // No user found with the given username
};

const getUserById = async (userId) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await pool.query(query, [userId]);
  return rows[0];
};

const getUsers = async () => {
  const query = "SELECT * FROM users";
  const [rows] = await pool.query(query);
  return rows;
};

const updateUser = async (userId, userData) => {
  const { username, email } = userData;
  const query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  await pool.query(query, [username, email, userId]);
};

const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE id = ?";
  await pool.query(query, [userId]);
};

export {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUsername,
};
