const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Register a new stylist
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if stylist already exists
    const existingStylist = await prisma.stylist.findUnique({ where: { email } });
    if (existingStylist) {
      return res.status(400).json({ message: 'Stylist with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new stylist in the database
    const stylist = await prisma.stylist.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create a JWT
    const token = jwt.sign({ id: stylist.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      token,
      stylist: {
        id: stylist.id,
        name: stylist.name,
        email: stylist.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate a stylist
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check for stylist by email
    const stylist = await prisma.stylist.findUnique({ where: { email } });
    if (!stylist) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, stylist.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT
    const token = jwt.sign({ id: stylist.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      token,
      stylist: {
        id: stylist.id,
        name: stylist.name,
        email: stylist.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
}; 