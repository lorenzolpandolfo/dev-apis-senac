const classRepository = require("../repositories/classRepository");
const studentRepository = require("../repositories/studentRepository");

class ClassService {
  getAllClasses() {
    return classRepository.findAll();
  }

  getClassById(id) {
    const cls = classRepository.findById(id);
    if (!cls) {
      throw new Error("Class not found");
    }
    return cls;
  }

  createClass(classData) {
    if (
      !classData.semester ||
      !classData.courseName ||
      !classData.teacherName ||
      !classData.weekDay
    ) {
      throw new Error(
        "Semester, course name, teacher name and week day are required"
      );
    }

    if (!/^\d{4}\/[1-2]$/.test(classData.semester)) {
      throw new Error(
        "Invalid semester format. Use YYYY/S format (e.g., 2025/2)"
      );
    }

    return classRepository.create(classData);
  }

  updateClass(id, classData) {
    if (classData.semester && !/^\d{4}\/[1-2]$/.test(classData.semester)) {
      throw new Error(
        "Invalid semester format. Use YYYY/S format (e.g., 2025/2)"
      );
    }

    const updatedClass = classRepository.update(id, classData);
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  }

  deleteClass(id) {
    const deleted = classRepository.delete(id);
    if (!deleted) {
      throw new Error("Class not found");
    }
    return { message: "Class deleted successfully" };
  }

  addStudentToClass(classId, studentId) {
    const student = studentRepository.findById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    const updatedClass = classRepository.addStudent(classId, studentId);
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  }

  removeStudentFromClass(classId, studentId) {
    const updatedClass = classRepository.removeStudent(classId, studentId);
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  }

  getStudentsInClass(classId) {
    const cls = this.getClassById(classId);
    return cls.students.map((studentId) =>
      studentRepository.findById(studentId)
    );
  }
}

module.exports = new ClassService();
