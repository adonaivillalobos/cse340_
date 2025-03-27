const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildVehicleDetailView = async function (req, res, next) {
  const vehicleId = req.params.vehicleId
  const vehicle = await invModel.getVehicleById(vehicleId)
  let nav = await utilities.getNav()

  if (!vehicle) {
    return res.status(404).send("Vehicle not found")
  }

  res.render("./inventory/detail", {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    nav,
    vehicle,
  })
}

/* ***************************
 *  Intentional 500 Error Handler
 * ************************** */
invCont.triggerError = (req, res, next) => {
  const error = new Error("Intentional server error triggered!");
  error.status = 500;
  next(error); // Pass error to middleware
}

module.exports = invCont
