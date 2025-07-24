const express = require("express");
const router = express.Router();
const {
  getPlants,
  getPlantById,
  createPlant,
  getRegions,
} = require("../controllers/plants.controller");

// Get list of all regions (for filter dropdown)
router.get("/regions", getRegions);

// Get all plants with optional region filter
router.get("/", getPlants);

// Get single plant by ID
router.get("/:id", getPlantById);

// Create new plant
router.post("/", createPlant);

module.exports = router;
