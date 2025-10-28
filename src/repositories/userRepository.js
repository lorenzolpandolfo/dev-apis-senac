const uuid = require("uuid");
const bcrypt = require("bcrypt");

class UserRepository {
  constructor() {
    this.users = [];
  }

  findAll() {
    return this.users;
  }

  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  create(userData) {
    const user = {
      id: uuid.v4(),
      ...userData,
    };
    this.users.push(user);
    return { ...user, password: undefined };
  }

  update(id, userData) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const updatedUser = {
      ...this.users[index],
      ...userData,
      id,
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  delete(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }

  verifyPassword(email, password) {
    const user = this.findByEmail(email);
    if (!user) return false;

    return bcrypt.compareSync(password, user.password);
  }
}

const repository = new UserRepository();

module.exports = repository;
