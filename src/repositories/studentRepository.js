const uuid = require("uuid");

class StudentRepository {
  constructor() {
    this.students = [];
  }

  findAll() {
    return this.students;
  }

  findById(id) {
    return this.students.find((student) => student.id === id);
  }

  findByRegistration(registration) {
    return this.students.find(
      (student) => student.registration === registration
    );
  }

  create(studentData) {
    const student = {
      id: uuid.v4(),
      ...studentData,
    };
    this.students.push(student);
    return student;
  }

  update(id, studentData) {
    const index = this.students.findIndex((student) => student.id === id);
    if (index === -1) return null;

    const updatedStudent = {
      ...this.students[index],
      ...studentData,
      id,
    };
    this.students[index] = updatedStudent;
    return updatedStudent;
  }

  delete(id) {
    const index = this.students.findIndex((student) => student.id === id);
    if (index === -1) return false;

    this.students.splice(index, 1);
    return true;
  }
}

module.exports = new StudentRepository();
