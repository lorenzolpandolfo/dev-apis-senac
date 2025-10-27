const express = require("express");
const router = express.Router();
const lessonService = require("../services/lessonService");

router.get("/", (req, res) => {
  try {
    const lessons = lessonService.getAllLessons();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const lesson = lessonService.getLessonById(req.params.id);
    res.json(lesson);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/class/:classId", (req, res) => {
  try {
    const lessons = lessonService.getClassLessons(req.params.classId);
    res.json(lessons);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const newLesson = lessonService.createLesson(req.body);
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const updatedLesson = lessonService.updateLesson(req.params.id, req.body);
    res.json(updatedLesson);
  } catch (error) {
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const result = lessonService.deleteLesson(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
