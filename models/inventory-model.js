const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT i.*, c.classification_name 
       FROM public.inventory AS i 
       JOIN public.classification AS c 
       ON i.classification_id = c.classification_id 
       WHERE i.classification_id = $1`,
      [classification_id]
    );
    
    return data.rows.length > 0 ? data.rows : [];  // ✅ Always return an array
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error);
    return [];  // ✅ Return empty array on error
  }
}

/* ***************************
 *  Get specific vehicle details by inventory_id
 * ************************** */
async function getVehicleById(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory 
       WHERE inventory_id = $1`,
      [inventory_id]
    );
    return data.rows[0]; // Return a single vehicle object
  } catch (error) {
    console.error("getVehicleById error: " + error);
  }
}

module.exports = { getClassifications, getInventoryByClassificationId, getVehicleById };