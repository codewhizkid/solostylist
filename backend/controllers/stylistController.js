const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * POST /api/stylists
 * body: { email, name, password, bio?, headshot? }
 */
exports.createStylist = async (req, res) => {
  try {
    const { email, name, password, bio, headshot } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'email, name and password are required' });
    }

    const stylist = await prisma.stylist.create({
      data: { email, name, password, bio, headshot },
    });

    res.status(201).json(stylist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create stylist' });
  }
};

/**
 * GET /api/stylists
 */
exports.getStylists = async (_req, res) => {
  try {
    const stylists = await prisma.stylist.findMany();
    res.json(stylists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stylists' });
  }
};

/**
 * GET /api/stylists/:id
 */
exports.getStylistById = async (req, res) => {
  try {
    const stylist = await prisma.stylist.findUnique({
      where: { id: req.params.id },
    });

    if (!stylist) {
      return res.status(404).json({ error: 'Stylist not found' });
    }

    res.json(stylist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stylist' });
  }
};

/**
 * PUT /api/stylists/:id
 * body: { name?, email?, password?, bio?, headshot? }
 */
exports.updateStylist = async (req, res) => {
  try {
    const updated = await prisma.stylist.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update stylist' });
  }
};

/**
 * DELETE /api/stylists/:id
 */
exports.deleteStylist = async (req, res) => {
  try {
    await prisma.stylist.delete({ where: { id: req.params.id } });
    res.json({ message: 'Stylist deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete stylist' });
  }
};