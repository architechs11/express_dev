const pool = require("../config/db");
const { generateToken } = require("../utils/jwt");

const login = async (contact, password) => {
  if (!contact || !password) {
    throw new Error("Contact and password are required");
  }
  const query =
    "SELECT id, name FROM users WHERE contact = $1 AND password = $2";

  const user = await pool.query(query, [contact, password]);

  if (user.rows.length === 0) {
    throw new Error("Invalid details");
  }

  // return user.rows[0];/
  const token = generateToken({
    userId: user.rows[0].id,
    name: user.rows[0].name,
  });
  return token;
};

module.exports = {
  login,
};
