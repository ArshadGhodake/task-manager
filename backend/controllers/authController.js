const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, findUserByEmail } = require('../models/userModel');

// SIGNUP
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = {
      id: Date.now(),
      email,
      password: hashedPassword
    };

    addUser(newUser);

    // generate token
    const token = jwt.sign({ id: newUser.id }, "secretkey", {
      expiresIn: "1h"
    });

    res.json({
      message: "User created",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign({ id: user.id }, "secretkey", {
      expiresIn: "1h"
    });

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { signup, login };