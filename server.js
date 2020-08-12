// require module
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");

// require routes
const todo = require("./routes/todo.js");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

// run routes
app.use("/api/v1/todo", todo);

// PORT
const PORT = process.env.PORT || 5100;

app.listen(PORT, console.log(`App listening on port 5100!`));
