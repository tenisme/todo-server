const express = require("express");
const { checkTodo, getAllTodo } = require("../controllers/todo.js");

const router = express.Router();

router.route("/").get(getAllTodo).post(checkTodo);

module.exports = router;
