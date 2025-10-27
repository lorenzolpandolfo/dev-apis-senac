const express = require("express");
const router = express.Router();
const studentService = require("../services/studentService");

router.get("/", (req, res) => {
  try {
    const students = studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const student = studentService.getStudentById(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/registration/:registration", (req, res) => {
  try {
    const student = studentService.getStudentByRegistration(
      req.params.registration
    );
    res.json(student);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const newStudent = studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const updatedStudent = studentService.updateStudent(
      req.params.id,
      req.body
    );
    res.json(updatedStudent);
  } catch (error) {
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const result = studentService.deleteStudent(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
