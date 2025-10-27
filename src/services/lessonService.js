const lessonRepository = require("../repositories/lessonRepository");
const classService = require("./classService");

class LessonService {
  getAllLessons() {
    return lessonRepository.findAll();
  }

  getLessonById(id) {
    const lesson = lessonRepository.findById(id);
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    return lesson;
  }

  getClassLessons(classId) {
    classService.getClassById(classId);
    return lessonRepository.findByClassId(classId);
  }

  createLesson(lessonData) {
    if (!lessonData.classId || !lessonData.date || !lessonData.content) {
      throw new Error("Class ID, date and content are required");
    }

    const classStudents = classService.getStudentsInClass(lessonData.classId);

    const providedAttendance = new Set(
      lessonData.attendance?.map((a) => a.studentId) || []
    );
    const missingStudents = classStudents.filter(
      (student) => !providedAttendance.has(student.id)
    );

    if (missingStudents.length > 0) {
      throw new Error(
        `Attendance missing for students: ${missingStudents
          .map((s) => s.name)
          .join(", ")}`
      );
    }

    return lessonRepository.create(lessonData);
  }

  updateLesson(id, lessonData) {
    if (lessonData.attendance) {
      const lesson = this.getLessonById(id);
      const classStudents = classService.getStudentsInClass(lesson.classId);

      const providedAttendance = new Set(
        lessonData.attendance.map((a) => a.studentId)
      );
      const missingStudents = classStudents.filter(
        (student) => !providedAttendance.has(student.id)
      );

      if (missingStudents.length > 0) {
        throw new Error(
          `Attendance missing for students: ${missingStudents
            .map((s) => s.name)
            .join(", ")}`
        );
      }
    }

    const updatedLesson = lessonRepository.update(id, lessonData);
    if (!updatedLesson) {
      throw new Error("Lesson not found");
    }
    return updatedLesson;
  }

  deleteLesson(id) {
    const deleted = lessonRepository.delete(id);
    if (!deleted) {
      throw new Error("Lesson not found");
    }
    return { message: "Lesson deleted successfully" };
  }
}

module.exports = new LessonService();
