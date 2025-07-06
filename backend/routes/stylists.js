const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Import controller functions
const {
  updateStylistOnboarding,
  getStylists,
  getStylistById,
  deleteStylist,
} = require('../controllers/stylistController');

// ----- Routes ----- //

// @route   PUT /api/stylists/onboarding
// @desc    Update a stylist's profile after the onboarding flow
// @access  Private
router.put('/onboarding', protect, updateStylistOnboarding);


// Keep the other routes for now, but they should also be protected
// in a real application to ensure only authorized users can access them.

// Get all stylists
router.get('/', getStylists);

// Get a single stylist by ID
router.get('/:id', getStylistById);

// Delete stylist (optional for later)
router.delete('/:id', deleteStylist);

module.exports = router;