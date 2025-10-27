const express = require("express");
const router = express.Router();
const classService = require("../services/classService");

router.get("/", (req, res) => {
  try {
    const classes = classService.getAllClasses();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const cls = classService.getClassById(req.params.id);
    res.json(cls);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/:id/students", (req, res) => {
  try {
    const students = classService.getStudentsInClass(req.params.id);
    res.json(students);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const newClass = classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/:id/students", (req, res) => {
  try {
    const { studentId } = req.body;
    const updatedClass = classService.addStudentToClass(
      req.params.id,
      studentId
    );
    res.json(updatedClass);
  } catch (error) {
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .json({ error: error.message });
  }
});

router.delete("/:id/students/:studentId", (req, res) => {
  try {
    const updatedClass = classService.removeStudentFromClass(
      req.params.id,
      req.params.studentId
    );
    res.json(updatedClass);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const updatedClass = classService.updateClass(req.params.id, req.body);
    res.json(updatedClass);
  } catch (error) {
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const result = classService.deleteClass(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
