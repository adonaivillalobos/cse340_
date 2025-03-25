// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController") // Make sure the path is correct!

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId); 

// Route for vehicle detail view (Make sure this function exists in invController.js)
router.get("/detail/:invId", invController.buildVehicleDetailView); 

module.exports = router;
