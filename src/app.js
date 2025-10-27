const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const studentController = require("./controllers/studentController");
const classController = require("./controllers/classController");
const lessonController = require("./controllers/lessonController");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/api/users", userController);
app.use("/api/students", studentController);
app.use("/api/classes", classController);
app.use("/api/lessons", lessonController);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
