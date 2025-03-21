const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  
  if (data.length === 0) {
    return res.status(404).send("No vehicles found for this classification");
  }

  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.vehicleDetail = async function (req, res, next) {
  const inventoryId = req.params.inventoryId;
  console.log("Inventory ID:", inventoryId);  // Added logging for debugging

  try {
    // Fetch the vehicle details from the database
    const vehicleData = await invModel.getVehicleById(inventoryId);

    if (!vehicleData) {
      return res.status(404).send("Vehicle not found");
    }

    // Generate HTML for the vehicle details
    const vehicleHtml = utilities.formatVehicleDetails(vehicleData);
    
    // Get the navigation menu
    let nav = await utilities.getNav();

    res.render("./inventory/vehicleDetail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicleHtml,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving vehicle details");
  }
};

module.exports = invCont;