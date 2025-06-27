const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * POST /api/stylists
 * Expects body:
 * {
 *   email, password, name, bio?, headshot?,
 *   font, colors:{primary,secondary,tertiary},
 *   tagline?, logoUrl?,
 *   socials:{instagram,facebook,website},
 *   services:[{name,price,duration}],
 *   availability:[{day,startTime,endTime,enabled}]
 * }
 */
exports.createStylist = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      bio,
      headshot,
      font,
      colors = {},
      tagline,
      logoUrl,
      socials = {},
      services = [],
      availability = [],
    } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: 'email, name, and password are required' });
    }

    const stylist = await prisma.stylist.create({
      data: {
        email,
        name,
        password, // TODO: hash later
        bio,
        headshot,

        // Nested: create service rows
        services: {
          create: services.map((s) => ({
            name: s.name,
            price: Number(s.price) || 0,
            duration: Number(s.duration) || 0,
          })),
        },

        // Nested: create availability rows (only enabled days)
        availability: {
          create: availability
            .filter((d) => d.enabled)
            .map((d) => ({
              dayOfWeek: d.day, // assuming day is string for now
              startTime: d.startTime,
              endTime: d.endTime,
            })),
        },

        // Nested: create settings row with branding + socials
        settings: {
          create: {
            brandName: name,
            logoUrl: logoUrl || headshot, // fallback
            tagline,
            font,
            primaryColor: colors.primary,
            secondaryColor: colors.secondary,
            tertiaryColor: colors.tertiary,
            igHandle: socials.instagram,
            fbPage: socials.facebook,
            website: socials.website,
          },
        },
      },
      select: { id: true },
    });

    res.status(201).json(stylist); // { id: "..." }
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