const { Product, User, Order } = require('../models'); // Assuming you have Product and User models
const { validationResult } = require('express-validator'); // Validation imports
const { Sequelize } = require('sequelize');


// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, type } = req.body;  // Extract fields from the request body
  const createdBy = req.userId;  // Get the user ID from the JWT token (set by the middleware)

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Fetch the user to associate with the product (createdBy)
    const user = await User.findByPk(createdBy);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${createdBy} not found` });
    }

    // Create a new product
    const newProduct = await Product.create({
      name,
      description,
      price,
      type,
      createdBy,  // Automatically set based on the JWT token
      updatedBy: createdBy,  // Initially set the updater to the same user
    });

    // Return success response with the created product
    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the product' });
  }
};

// Get all products
const getProducts = async (req, res) => {
  const userId = req.userId; // Assuming userId is passed through authentication middleware
  const { status, type, name } = req.query; // Get query parameters for status, type, and name

  try {
    // Base condition to filter active products
    let whereConditions = {
      is_active: 1,  // Only active products
    };

    // If "type" query parameter is provided, add it to the where conditions
    if (type) {
      whereConditions.type = type;
    }

    // If "name" query parameter is provided, add it to the where conditions (case-insensitive search)
    if (name) {
      whereConditions.name = {
        [Sequelize.Op.iLike]: `%${name}%`,  // Case-insensitive search
      };
    }

    let products = null;

    // Handle the different status values
    if (status === 'purchased') {
      // Products that have been purchased
      products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'type', 'is_active', 'created_at', 'updated_at'],
        where: whereConditions,  // Apply the conditions to filter products
        include: [
          {
            model: Order,
            as: 'orders',
            where: {
              user_id: userId, // Filter by user
              paid_at: { [Sequelize.Op.ne]: null }, // Only paid orders
            },
            required: true,  // Ensure the product is related to a paid order
          },
          {
            model: User,
            as: 'createdByUser',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'updatedByUser',
            attributes: ['id', 'name'],
          },
        ],
      });
    } else if (status === 'unpurchased') {
      // Products that have not been purchased (either no orders or not paid)
      products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'type', 'is_active', 'created_at', 'updated_at'],
        where: whereConditions,  // Apply the conditions to filter products
        include: [
          {
            model: Order,
            as: 'orders',
            required: false,  // No need for an order to exist
            where: {
              user_id: userId, // Filter by user
            },
          },
          {
            model: User,
            as: 'createdByUser',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'updatedByUser',
            attributes: ['id', 'name'],
          },
        ],
        where: Sequelize.and(
          whereConditions,  // Apply the base conditions
          Sequelize.or(
            { "$orders.id$": { [Sequelize.Op.is]: null } }, // Products not in any order
            { "$orders.paid_at$": { [Sequelize.Op.is]: null } } // Products in orders but not paid
          )
        ),
      });
    } else {
      // For any other status (or no status query), fetch all active products
      products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'type', 'is_active', 'created_at', 'updated_at'],
        where: whereConditions,  // Apply the conditions to filter products
        include: [
          {
            model: User,
            as: 'createdByUser',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'updatedByUser',
            attributes: ['id', 'name'],
          },
        ],
      });
    }

    // Send response with filtered products
    res.status(200).json({
      message: 'Products retrieved successfully',
      data: { products: products.length > 0 ? products : null },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the products' });
  }
};


// Get a product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({
      where: { id: productId },
      attributes: ['id', 'name', 'description', 'price', 'type', 'is_active', 'created_at', 'updated_at'],
      include: [
        {
          model: User,
          as: 'createdByUser',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'updatedByUser',
          attributes: ['id', 'name'],
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${productId} not found` });
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the product' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, type } = req.body;  // Extract fields from request body
  const updatedBy = req.userId;  // Get the user ID from the JWT token (set by the middleware)

  try {
    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${productId} not found` });
    }

    // Fetch the user to associate with the product (updatedBy)
    const user = await User.findByPk(updatedBy);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${updatedBy} not found` });
    }

    // Update the product fields if they are provided
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.type = type || product.type;
    product.updatedBy = updatedBy;  // Update the updater to the current user

    // Save the updated product to the database
    await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the product' });
  }
};


  

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
};
