const express = require('express');
const router = express.Router();

console.log('🛣  Stylist routes loaded');

// Import controller functions
const {
  createStylist,
  getStylists,
  getStylistById,
  updateStylist,
  deleteStylist,
} = require('../controllers/stylistController');

// ----- CRUD Endpoints ----- //

// Create a new stylist
router.post('/', createStylist);

// Get all stylists
router.get('/', getStylists);

// Get a single stylist by ID
router.get('/:id', getStylistById);

// Update stylist (optional for later)
router.put('/:id', updateStylist);

// Delete stylist (optional for later)
router.delete('/:id', deleteStylist);

module.exports = router;