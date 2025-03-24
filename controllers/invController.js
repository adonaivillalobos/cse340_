const Util = require("../utilities/");
const invModel = require("../models/inventory-model");

async function buildVehicleDetail(req, res, next) {
  const invId = req.params.inventoryId; // Get the vehicle ID from the URL
  const nav = await Util.getNav();
  
  try {
    const vehicle = await invModel.getInventoryById(invId); // Fetch vehicle data
    if (!vehicle) {
      return res.status(404).render("errors/404", { title: "Not Found", nav });
    }

    const vehicleHTML = Util.buildVehicleDetailHTML(vehicle); // Generate HTML
    res.render("inventory/detail", { 
      title: `${vehicle.inv_make} ${vehicle.inv_model}`, 
      nav, 
      vehicleHTML 
    });

  } catch (error) {
    console.error("Error loading vehicle detail:", error);
    res.status(500).render("errors/500", { title: "Server Error", nav });
  }
}

module.exports = { buildVehicleDetail };