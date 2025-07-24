const { PrismaClient } = require('@prisma/client');
const imagekit = require('../config/imagekit');
const prisma = new PrismaClient();

// Create a new sighting
const createSighting = async (req, res) => {
  try {
    const { plantId, latitude, longitude, description, location } = req.body;
    const imageFile = req.file;

    // Validasi input
    if (!imageFile) {
      return res.status(400).json({
        status: 'error',
        message: 'Gambar harus disertakan',
      });
    }

    if (!plantId || !latitude || !longitude || !description || !location) {
      return res.status(400).json({
        status: 'error',
        message: 'Semua field harus diisi',
      });
    }

    // Cek apakah tanaman dengan ID tersebut ada
    const plant = await prisma.plant.findUnique({
      where: { id: parseInt(plantId) },
    });

    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Tanaman tidak ditemukan',
      });
    }

    // Upload image to ImageKit
    const upload = await imagekit.upload({
      file: imageFile.buffer.toString('base64'),
      fileName: `${Date.now()}_${imageFile.originalname}`,
      folder: '/plant-sightings',
    });

    const sighting = await prisma.sighting.create({
      data: {
        plantId: parseInt(plantId),
        userId: req.user.userId, // From JWT token
        imageUrl: upload.url,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        description,
        location,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        plant: {
          select: {
            id: true,
            name: true,
            scientificName: true,
          },
        },
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Penemuan berhasil dilaporkan',
      data: sighting,
    });
  } catch (error) {
    console.error('Error creating sighting:', error);
    res.status(500).json({
      status: 'error',
      message: 'Gagal melaporkan penemuan',
      error: error.message,
    });
  }
};

// Get all sightings
const getAllSightings = async (req, res) => {
  try {
    const sightings = await prisma.sighting.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        plant: {
          select: {
            id: true,
            name: true,
            scientificName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      status: 'success',
      data: sightings,
    });
  } catch (error) {
    console.error('Error fetching sightings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengambil data penemuan',
      error: error.message,
    });
  }
};

// Get sightings by user
const getUserSightings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sightings = await prisma.sighting.findMany({
      where: {
        userId,
      },
      include: {
        plant: {
          select: {
            id: true,
            name: true,
            scientificName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      status: 'success',
      data: sightings,
    });
  } catch (error) {
    console.error('Error fetching user sightings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengambil data penemuan pengguna',
      error: error.message,
    });
  }
};

// Get sighting by ID
const getSightingById = async (req, res) => {
  try {
    const { id } = req.params;
    const sighting = await prisma.sighting.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        plant: {
          select: {
            id: true,
            name: true,
            scientificName: true,
          },
        },
      },
    });

    if (!sighting) {
      return res.status(404).json({
        status: 'error',
        message: 'Penemuan tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      data: sighting,
    });
  } catch (error) {
    console.error('Error fetching sighting:', error);
    res.status(500).json({
      status: 'error',
      message: 'Gagal mengambil data penemuan',
      error: error.message,
    });
  }
};

module.exports = {
  createSighting,
  getAllSightings,
  getUserSightings,
  getSightingById,
};
