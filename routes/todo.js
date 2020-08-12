const express = require("express");
const {
  checkTodo,
  getAllTodo,
  unCheckTodo,
} = require("../controllers/todo.js");

const router = express.Router();

router.route("/").get(getAllTodo).put(checkTodo);
router.route("/check").put(checkTodo);
router.route("/uncheck").put(unCheckTodo);

module.exports = router;
