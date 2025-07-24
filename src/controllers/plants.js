const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all plants with search and filtering
const getPlants = async (req, res) => {
  try {
    const { search, region } = req.query;

    // Build where clause for filtering
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { scientificName: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (region) {
      where.region = { equals: region, mode: 'insensitive' };
    }

    const plants = await prisma.plant.findMany({
      where,
      select: {
        id: true,
        name: true,
        scientificName: true,
        region: true,
        conservationStatus: true,
        imageUrl: true,
        description: true,
        benefits: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      status: 'success',
      data: plants,
      count: plants.length,
    });
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch plants',
      error: error.message,
    });
  }
};

// Get plants by region
const getPlantsByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    if (!region) {
      return res.status(400).json({
        status: 'error',
        message: 'Region parameter is required',
      });
    }

    const plants = await prisma.plant.findMany({
      where: {
        region: {
          equals: region,
          mode: 'insensitive', // Case insensitive search
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    if (plants.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `No plants found in region: ${region}`,
      });
    }

    res.json({
      status: 'success',
      data: plants,
      count: plants.length,
      region: region,
    });
  } catch (error) {
    console.error('Error fetching plants by region:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch plants by region',
      error: error.message,
    });
  }
};

// Get a single plant by ID
const getPlantById = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await prisma.plant.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found',
      });
    }

    res.json({
      status: 'success',
      data: plant,
    });
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch plant',
      error: error.message,
    });
  }
};

// Create a new plant
const createPlant = async (req, res) => {
  try {
    const {
      name,
      scientificName,
      region,
      description,
      benefits,
      conservationStatus,
      imageUrl,
    } = req.body;

    const plant = await prisma.plant.create({
      data: {
        name,
        scientificName,
        region,
        description,
        benefits,
        conservationStatus,
        imageUrl,
      },
    });

    res.status(201).json({
      status: 'success',
      data: plant,
    });
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create plant',
      error: error.message,
    });
  }
};

// Get available regions (for filter options)
const getRegions = async (req, res) => {
  try {
    const regions = await prisma.plant.findMany({
      select: {
        region: true,
      },
      distinct: ['region'],
    });

    const uniqueRegions = regions.map((r) => r.region);

    res.json({
      status: 'success',
      data: uniqueRegions,
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch regions',
      error: error.message,
    });
  }
};

// Get plants for dropdown selection
const getPlantsForDropdown = async (req, res) => {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        id: true,
        name: true,
        scientificName: true,
        region: true,
        imageUrl: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Format data untuk frontend dropdown/select
    const formattedPlants = plants.map((plant) => ({
      value: plant.id,
      label: `${plant.name} (${plant.scientificName}) - ${plant.region}`,
      imageUrl: plant.imageUrl,
      region: plant.region,
      details: {
        name: plant.name,
        scientificName: plant.scientificName,
        region: plant.region,
      },
    }));

    res.json({
      status: 'success',
      data: formattedPlants,
    });
  } catch (error) {
    console.error('Error fetching plants for dropdown:', error);
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengambil data tanaman',
      error: error.message,
    });
  }
};

module.exports = {
  getPlants,
  getPlantById,
  createPlant,
  getRegions,
  getPlantsByRegion,
  getPlantsForDropdown,
};
