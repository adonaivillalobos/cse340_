// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display vehicle details by inventoryId
router.get("/vehicle/:inventoryId", invController.vehicleDetail);  // Correct route

module.exports = router;