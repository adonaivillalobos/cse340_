const pool = require("../database/")

/* ***************************
 *  Get vehicle details by ID
 * ************************** */
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0] // Return only the first row (single vehicle)
  } catch (error) {
    console.error("getVehicleById error: " + error)
  }
}

module.exports = {
  getVehicleById, // Make sure this function is exported!
}