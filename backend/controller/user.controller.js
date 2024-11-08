const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');
const { body, validationResult } = require('express-validator');  // Pastikan ini diimpor
const { v4: uuidv4 } = require('uuid');  // Mengimpor fungsi uuidv4


const getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'] // Optional: limit fields returned
    });

    // Return success response with user data
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;  // Get the user ID from the URL parameter

  try {
    // Fetch user by ID
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'email', 'role', 'created_at', 'updated_at']
    });

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    // Return success response with user data
    res.status(200).json({
      message: 'User retrieved successfully',
      data: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the user' });
  }
};

// Function to update a user's details
const updateUser = async (req, res) => {
  const userId = req.params.id;  // Retrieve the user ID from the URL parameter
  const { name, email, password, role } = req.body;  // Get the updated data from the request body

  try {
    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } });

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    // Update the user's data if new values are provided
    user.name = name || user.name;  // If name is not provided, keep the old name
    user.email = email || user.email;  // If email is not provided, keep the old email
    user.role = role || user.role;  // If role is not provided, keep the old role
    
    // If a new password is provided, hash it before saving
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);  // Hash password with 10 salt rounds
      user.password = hashedPassword;
    }

    // Save the updated user to the database
    await user.save();

    // Return success response with updated user data
    res.status(200).json({
      message: 'User updated successfully',
      data: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the user' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser
};
