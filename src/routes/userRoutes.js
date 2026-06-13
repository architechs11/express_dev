const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/", userController.fetchUser);
router.get("/all", userController.fetchUsers);
router.post("/create", userController.createUser);

module.exports = router;
