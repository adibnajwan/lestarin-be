const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createSighting,
  getAllSightings,
  getUserSightings,
  getSightingById,
} = require('../controllers/sightings');
const authMiddleware = require('../middlewares/auth');

// Setup multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Routes that require authentication
router.use(authMiddleware);

// Get user's sightings
router.get('/my-sightings', getUserSightings);

// Public routes untuk melihat penemuan
router.get('/', getAllSightings);
router.get('/:id', getSightingById);

// Get list tanaman untuk form pelaporan
router.get('/plants/dropdown', async (req, res) => {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        id: true,
        name: true,
        scientificName: true,
        region: true,
        imageUrl: true,
        description: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    const formattedPlants = plants.map((plant) => ({
      value: plant.id,
      label: `${plant.name} (${plant.scientificName}) - ${plant.region}`,
      imageUrl: plant.imageUrl,
      details: {
        name: plant.name,
        scientificName: plant.scientificName,
        region: plant.region,
        description: plant.description,
      },
    }));

    res.json({
      status: 'success',
      data: formattedPlants,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengambil data tanaman',
      error: error.message,
    });
  }
});

// Create new sighting (requires image upload)
router.post('/', upload.single('image'), createSighting);

// Get user's sightings
router.get('/my-sightings', getUserSightings);

module.exports = router;
