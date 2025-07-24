const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all plants with optional region filter
const getPlants = async (req, res) => {
  try {
    const { region } = req.query;
    const whereClause = region ? { region } : {};

    const plants = await prisma.plant.findMany({
      where: whereClause,
      orderBy: {
        localName: "asc",
      },
    });

    res.json({
      status: "success",
      data: plants,
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch plants",
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
        status: "error",
        message: "Plant not found",
      });
    }

    res.json({
      status: "success",
      data: plant,
    });
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch plant",
      error: error.message,
    });
  }
};

// Create a new plant
const createPlant = async (req, res) => {
  try {
    const {
      localName,
      scientificName,
      region,
      description,
      benefits,
      conservationStatus,
      imageUrl,
    } = req.body;

    const plant = await prisma.plant.create({
      data: {
        localName,
        scientificName,
        region,
        description,
        benefits,
        conservationStatus,
        imageUrl,
      },
    });

    res.status(201).json({
      status: "success",
      data: plant,
    });
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create plant",
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
      distinct: ["region"],
    });

    const uniqueRegions = regions.map((r) => r.region);

    res.json({
      status: "success",
      data: uniqueRegions,
    });
  } catch (error) {
    console.error("Error fetching regions:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch regions",
      error: error.message,
    });
  }
};

module.exports = {
  getPlants,
  getPlantById,
  createPlant,
  getRegions,
};
