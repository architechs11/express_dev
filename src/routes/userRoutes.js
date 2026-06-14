const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

router.get("/", authMiddleware, userController.fetchUser);
router.get("/all", authMiddleware, userController.fetchUsers);
router.post("/create", authMiddleware, userController.createUser);

module.exports = router;
