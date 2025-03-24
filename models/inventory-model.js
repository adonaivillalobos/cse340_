const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  try {
    const result = await pool.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching classifications:", error);
    throw error; // Ensures the error can be caught in the controller
  }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("Error fetching inventory by classification ID:", error);
    throw error;
  }
}

/* ***************************
 *  Get a specific vehicle by inventory ID
 * ************************** */
async function getInventoryById(inventoryId) {
  try {
    const result = await pool.query(
      "SELECT * FROM public.inventory WHERE inventory_id = $1",
      [inventoryId]
    );

    if (result.rows.length === 0) {
      return null; // No vehicle found
    }

    return result.rows[0]; // Return the first matching vehicle
  } catch (error) {
    console.error("Error fetching inventory item by ID:", error);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById, // Added the new function
};