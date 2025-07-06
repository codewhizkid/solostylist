const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Route handlers
const stylistRoutes = require('./routes/stylists'); // CRUD endpoints for stylists (to be created)
const authRoutes = require('./routes/auth'); // Import auth routes

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/stylists', stylistRoutes);
app.use('/api/auth', authRoutes); // Mount auth routes

// Simple health‑check route
app.get('/', (_req, res) => {
  res.send('Simply Independent API is running 💇‍♂️');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 