const Sequelize = require("sequelize");
const sequelize = new Sequelize("todo", "root", "zj159611", {
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("connect failed");
  });
const TodoList = sequelize.define("todoList", {
  id: {
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  delete: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
TodoList.sync();

module.exports = {
  TodoList,
};
