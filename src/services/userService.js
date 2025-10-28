const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/auth");

class UserService {
  getAllUsers() {
    return userRepository.findAll();
  }

  getUserById(id) {
    const user = userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createUser(userData) {
    if (!userData.fullName || !userData.email || !userData.password) {
      throw new Error("Full name, email and password are required");
    }

    const existingUser = userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userToCreate = {
      ...userData,
      password: hashedPassword,
    };

    return userRepository.create(userToCreate);
  }

  async authenticate(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { authToken: token };
  }

  updateUser(id, userData) {
    if (userData.email) {
      const existingUser = userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already registered");
      }
    }

    const updatedUser = userRepository.update(id, userData);
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }

  deleteUser(id) {
    const deleted = userRepository.delete(id);
    if (!deleted) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  }
}
module.exports = new UserService();
