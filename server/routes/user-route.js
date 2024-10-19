const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controller");

router.get("/:id", usersController.getUser);
router.post("/", usersController.insertUser);

module.exports = {router}