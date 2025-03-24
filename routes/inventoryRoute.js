// Needed Resources 
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to fetch a specific inventory item by ID
router.get("/:id", invController.getInventoryItem);

module.exports = router;
