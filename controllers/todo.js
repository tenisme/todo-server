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
    res.status(400).json({ message: "파라미터 셋팅 에러" });
    return;
  }

  let offsetIsNum = validator.isNumeric(String(offset));
  let limitIsNum = validator.isNumeric(String(limit));

  if (!offsetIsNum || !limitIsNum) {
    res.status(400).json({
      success: false,
      message: "offset 혹은 limit에는 숫자만 입력이 가능합니다",
    });
    return;
  }

  if (limit <= 0) {
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
    res.status(500).json({ success: false, message: `DB ERROR`, error: e });
    return;
  }
};

// @desc    할일 완료 여부 체크 api
// @route   POST /api/v1/todo
// @req     todo_id
// @res     success, result
exports.checkTodo = async (req, res, next) => {
  console.log(chalk.bold("<<  Check Todo API executed  >>"));
};
