const pool = require("../config/db");

const fetchUser = async (id) => {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const createUser = async (name, contact, dob) => {
  try {
    if (!name || !contact || !dob) {
      throw new Error("Missing required fields");
    }

    const query = `INSERT INTO users (name, contact, dob) VALUES ($1, $2, $3) RETURNING *;`;
    const result = await pool.query(query, [name, contact, dob]);
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
