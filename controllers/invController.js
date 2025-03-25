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
  if (data.length === 0) {
    return res.status(404).send("No vehicles found for this classification.")
  }
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
  const inv_id = req.params.invId
  const vehicleData = await invModel.getVehicleById(inv_id)
  let nav = await utilities.getNav()

  if (!vehicleData) {
    return res.status(404).send("Vehicle not found")
  }

  const vehicleHtml = utilities.buildVehicleDetail(vehicleData)

  res.render("./inventory/detail", {
    title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
    nav,
    vehicleHtml,
  })
}

module.exports = invCont