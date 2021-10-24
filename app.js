const express = require("express");
const bodyParser = require("body-parser");
const log4js = require("log4js");
const { TodoList } = require("./model/todoList");

const app = express();
const logger = log4js.getLogger();
logger.level = "debug";
logger.debug("Some debug messages");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
});
app.use(bodyParser.json());

app.get("/items", async function (req, res) {
  const todoList = await TodoList.findAll();

  res.send(todoList);
});

app.post("/items", async function (req, res) {
  let todoItems = [];
  if (req.body.todoItem) {
    todoItems = req.body.todoItem;
    await TodoList.create(todoItems);
    const todoList = await TodoList.findAll();
    res.send(todoList);
  }
});
app.delete("/items", async (req, res) => {
  if (req.body.id || req.body.id === 0) {
    const item = await TodoList.findByPk(req.body.id);
    item.delete = true;
    item.save();
    res.send({
      status: 0,
    });
  }
});

app.put("/items", async (req, res) => {
  if (req.body.id || req.body.id === "0") {
    const item = await TodoList.findByPk(req.body.id);
    item.done = true;
    item.save();
    res.send({
      status: 0,
    });
  }
});
app.listen(8000, function () {
  console.log("Server running at http://127.0.0.1:8000/");
});
