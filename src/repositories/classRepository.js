const uuid = require("uuid");

class ClassRepository {
  constructor() {
    this.classes = [];
    this.nextId = 1;
  }

  findAll() {
    return this.classes;
  }

  findById(id) {
    return this.classes.find((cls) => cls.id === id);
  }

  create(classData) {
    const cls = {
      id: uuid.v4(),
      ...classData,
      students: classData.students || [],
    };
    this.classes.push(cls);
    return cls;
  }

  update(id, classData) {
    const index = this.classes.findIndex((cls) => cls.id === id);
    if (index === -1) return null;

    const updatedClass = {
      ...this.classes[index],
      ...classData,
      id,
    };
    this.classes[index] = updatedClass;
    return updatedClass;
  }

  delete(id) {
    const index = this.classes.findIndex((cls) => cls.id === id);
    if (index === -1) return false;

    this.classes.splice(index, 1);
    return true;
  }

  addStudent(classId, studentId) {
    const cls = this.findById(classId);
    if (!cls) return null;

    if (!cls.students.includes(studentId)) {
      cls.students.push(studentId);
    }
    return cls;
  }

  removeStudent(classId, studentId) {
    const cls = this.findById(classId);
    if (!cls) return null;

    cls.students = cls.students.filter((id) => id !== studentId);
    return cls;
  }
}

module.exports = new ClassRepository();
