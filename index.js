const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/src/"));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.listen(port, () => {
  console.log(`Сайт запущем на порте: ${port}!`);
});
