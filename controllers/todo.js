const chalk = require("chalk");
const validator = require("validator");

const connection = require("../db/mysql_connection.js");

// @desc    모든 할일 목록 조회 api
// @route   GET /api/v1/todo
// @req     offset, limit
// @res     success, cnt, items : [{id, title, date, completed}]
exports.getAllTodo = async (req, res, next) => {
  console.log(chalk.bold("<<  Get all Todo API executed  >>"));

  let offset = req.query.offset;
  let limit = req.query.limit;

  if (!offset || !limit) {
    console.log("error : insert offset and limit");
    res.status(400).json({ message: "파라미터 셋팅 에러" });
    return;
  }

  let offsetIsNum = validator.isNumeric(String(offset));
  let limitIsNum = validator.isNumeric(String(limit));

  if (!offsetIsNum || !limitIsNum) {
    console.log("error : offset and limit isn't number");
    res.status(400).json({
      success: false,
      message: "offset 혹은 limit에는 숫자만 입력이 가능합니다",
    });
    return;
  }

  if (limit <= 0) {
    console.log("error : insert number upper 1");
    res
      .status(400)
      .json({ success: false, message: "1 이상의 숫자를 입력해야 합니다" });
    return;
  }

  offset = Number(offset);
  limit = Number(limit);

  let query = `select * from todo limit ${offset}, ${limit}`;

  try {
    [rows] = await connection.query(query);
  } catch (e) {
    console.log("error : " + e);
    res.status(500).json({ success: false, message: `DB ERROR`, error: e });
    return;
  }

  res.status(200).json({ success: true, cnt: rows.length, items: rows });
};

// @desc    할일 완료 체크 api
// @route   PUT /api/v1/todo/check
// @req     todo_id
// @res     success
exports.checkTodo = async (req, res, next) => {
  console.log(chalk.bold("<<  Check Todo API executed  >>"));

  let todo_id = req.body.todo_id;

  if (!todo_id) {
    console.log("error : not found todo_id");
    res.status(400).json({ message: "todo_id 입력 필수" });
    return;
  }

  let todoIdIsNum = validator.isNumeric(String(todo_id));

  if (!todoIdIsNum) {
    console.log("error : todo_id isn't number");
    res.status(400).json({
      success: false,
      message: "todo_id에는 숫자만 입력이 가능함",
    });
    return;
  }

  todo_id = Number(todo_id);

  query = `update todo set completed = true where id = ${todo_id}`;

  try {
    [result] = await connection.query(query);

    if (result.affectedRows == 0) {
      console.log("error : isn't affectedRows");
      res.status(500).json({ success: false, error: e });
      return;
    }
  } catch (e) {
    console.log("error : " + e);
    res.status(500).json({ success: false, message: `DB ERROR`, error: e });
    return;
  }

  res.status(200).json({ success: true });
};

// @desc    할일 완료 취소 api
// @route   PUT /api/v1/todo/uncheck
// @req     todo_id
// @res     success
exports.unCheckTodo = async (req, res, next) => {
  console.log(chalk.bold("<<  Uncheck Todo API executed  >>"));

  let todo_id = req.body.todo_id;

  if (!todo_id) {
    console.log("error : not found todo_id");
    res.status(400).json({ message: "todo_id 입력 필수" });
    return;
  }

  let todoIdIsNum = validator.isNumeric(String(todo_id));

  if (!todoIdIsNum) {
    console.log("error : todo_id isn't number");
    res.status(400).json({
      success: false,
      message: "todo_id에는 숫자만 입력이 가능함",
    });
    return;
  }

  todo_id = Number(todo_id);

  query = `update todo set completed = false where id = ${todo_id}`;

  try {
    [result] = await connection.query(query);

    if (result.affectedRows == 0) {
      console.log("error : isn't affectedRows");
      res.status(500).json({ success: false, error: e });
      return;
    }
  } catch (e) {
    console.log("error : " + e);
    res.status(500).json({ success: false, message: `DB ERROR`, error: e });
    return;
  }

  res.status(200).json({ success: true });
};
