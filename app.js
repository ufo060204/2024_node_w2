//app.js 像是 Vue Main.js 注入點概念
const routers = require("./routers");
require('./connections')
const app = async (req, res) => {
  routers(req, res);
};

module.exports = app;