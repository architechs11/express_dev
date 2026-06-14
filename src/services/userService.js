const pool = require("../config/db");
const bcrypt = require("bcrypt");

const fetchUser = async (id) => {
  try {
    const query = `SELECT name, email, dob AS date_of_birth FROM "User" WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const query = 'SELECT name, email, dob AS date_of_birth FROM "User"';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const createUser = async (name, email, dob, password, role) => {
  try {
    if (!name || !email || !dob || !password || !role) {
      throw new Error("Missing required fields");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const query = `INSERT INTO "User" (name, email, dob, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const result = await pool.query(query, [
      name,
      email,
      dob,
      hashedPassword,
      role,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

module.exports = {
  fetchUser,
  fetchUsers,
  createUser,
};
