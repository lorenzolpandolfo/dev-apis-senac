const uuid = require("uuid");

class LessonRepository {
  constructor() {
    this.lessons = [];
  }

  findAll() {
    return this.lessons;
  }

  findById(id) {
    return this.lessons.find((lesson) => lesson.id === id);
  }

  findByClassId(classId) {
    return this.lessons
      .filter((lesson) => lesson.classId === classId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  create(lessonData) {
    const lesson = {
      id: uuid.v4(),
      ...lessonData,
      attendance: lessonData.attendance || [],
    };
    this.lessons.push(lesson);
    return lesson;
  }

  update(id, lessonData) {
    const index = this.lessons.findIndex((lesson) => lesson.id === id);
    if (index === -1) return null;

    const updatedLesson = {
      ...this.lessons[index],
      ...lessonData,
      id,
    };
    this.lessons[index] = updatedLesson;
    return updatedLesson;
  }

  delete(id) {
    const index = this.lessons.findIndex((lesson) => lesson.id === id);
    if (index === -1) return false;

    this.lessons.splice(index, 1);
    return true;
  }
}

module.exports = new LessonRepository();
