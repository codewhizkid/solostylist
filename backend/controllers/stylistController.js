const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getStylistById, getStylists, deleteStylist } = require('./stylistController');

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
      headshotUrl,
      font,
      colors = {}, // { primary, secondary, tertiary }
      tagline,
      logoUrl,
      socials = {}, // { instagram, facebook, website }
      services = [], // [{ name, price, duration }]
      availability = [], // [{ day, startTime, endTime, enabled }]
    } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: 'email, name, and password are required' });
    }

    const dayStringToInt = (day) => {
      const map = { Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6 };
      return map[day] ?? 0;
    };

    const stylist = await prisma.stylist.create({
      data: {
        email,
        password, // TODO: hash with bcrypt
        name,
        bio,
        headshotUrl,
        font,
        primaryColor: colors.primary,

        // Nested Services
        services: {
          create: services.map((s) => ({
            name: s.name,
            price: Number(s.price) || 0,
            duration: Number(s.duration) || 0,
          })),
        },

        // Nested Availability (only enabled days)
        availability: {
          create: availability
            .filter((d) => d.enabled)
            .map((d) => ({
              dayOfWeek: dayStringToInt(d.day).toString(),
              startTime: d.startTime,
              endTime: d.endTime,
            })),
        },

        // Nested Settings
        settings: {
          create: {
            brandName: name, // assuming brandName is same as stylist name for now
            tagline,
            socialLinks: {
              instagram: socials.instagram,
              facebook: socials.facebook,
              website: socials.website,
            },
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

// This is the new primary function for this controller.
// It will take all the onboarding data and update the stylist record.
exports.updateStylistOnboarding = async (req, res) => {
  // The user's ID will come from the authentication token, not the URL params
  const stylistId = req.user.id; 

  try {
    const {
      bio,
      headshotUrl,
      font,
      colors = {},
      tagline,
      logoUrl,
      socials = {},
      services = [],
      availability = [],
      brandName,
    } = req.body;

    const dayStringToInt = (day) => {
      const map = { Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6 };
      return map[day] ?? 0;
    };

    // Use prisma.stylist.update instead of create
    const updatedStylist = await prisma.stylist.update({
      where: { id: stylistId },
      data: {
        bio,
        headshotUrl,
        font,
        primaryColor: colors.primary,

        // Clear and recreate nested models to avoid duplicates
        services: {
          deleteMany: {},
          create: services.map((s) => ({
            name: s.name,
            price: Number(s.price) || 0,
            duration: Number(s.duration) || 0,
          })),
        },
        availability: {
          deleteMany: {},
          create: availability
            .filter((d) => d.enabled)
            .map((d) => ({
              dayOfWeek: dayStringToInt(d.day).toString(),
              startTime: d.startTime,
              endTime: d.endTime,
            })),
        },
        settings: {
          upsert: { // Use upsert to create if not exists, or update if it does
            create: {
              brandName,
              tagline,
              socialLinks: {
                instagram: socials.instagram,
                facebook: socials.facebook,
                website: socials.website,
              },
            },
            update: {
              brandName,
              tagline,
              socialLinks: {
                instagram: socials.instagram,
                facebook: socials.facebook,
                website: socials.website,
              },
            }
          }
        }
      },
      include: { services: true, availability: true, settings: true },
    });

    res.status(200).json(updatedStylist);
  } catch (err) {
    console.error('Failed to update stylist onboarding:', err);
    res.status(500).json({ error: 'Failed to update stylist' });
  }
};

/**
 * GET /api/stylists
 */
exports.getStylists = async (_req, res) => {
  try {
    const stylists = await prisma.stylist.findMany({
      include: { services: true, availability: true, settings: true },
    });
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
      include: { services: true, availability: true, settings: true },
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