const pool = require("../config/db");
const { generateToken } = require("../utils/jwt");

const bcrypt = require("bcrypt");

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const query = 'SELECT id, role, password FROM "User" WHERE email = $1';

  const user = await pool.query(query, [email]);

  if (user.rows.length === 0) {
    throw new Error("Invalid details");
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // return user.rows[0];/
  const token = generateToken({
    userId: user.rows[0].id,
    role: user.rows[0].role,
  });
  return token;
};

module.exports = {
  login,
};
