const studentRepository = require("../repositories/studentRepository");

class StudentService {
  getAllStudents() {
    return studentRepository.findAll();
  }

  getStudentById(id) {
    const student = studentRepository.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }

  getStudentByRegistration(registration) {
    const student = studentRepository.findByRegistration(registration);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }

  createStudent(studentData) {
    if (
      !studentData.registration ||
      !studentData.name ||
      !studentData.email ||
      !studentData.phone
    ) {
      throw new Error("Registration, name, email and phone are required");
    }

    const existingStudent = studentRepository.findByRegistration(
      studentData.registration
    );
    if (existingStudent) {
      throw new Error("Registration number already exists");
    }

    return studentRepository.create(studentData);
  }

  updateStudent(id, studentData) {
    if (studentData.registration) {
      const existingStudent = studentRepository.findByRegistration(
        studentData.registration
      );
      if (existingStudent && existingStudent.id !== id) {
        throw new Error("Registration number already exists");
      }
    }

    const updatedStudent = studentRepository.update(id, studentData);
    if (!updatedStudent) {
      throw new Error("Student not found");
    }
    return updatedStudent;
  }

  deleteStudent(id) {
    const deleted = studentRepository.delete(id);
    if (!deleted) {
      throw new Error("Student not found");
    }
    return { message: "Student deleted successfully" };
  }
}

module.exports = new StudentService();
