const pool = require("../database/")

const Util = {}

/* ***************************
 *  Build Navigation Bar
 * ************************** */
Util.getNav = async function () {
  try {
    const data = await pool.query("SELECT * FROM public.classification")
    let nav = "<ul>"
    data.rows.forEach((row) => {
      nav += `<li><a href="/inv/type/${row.classification_id}">${row.classification_name}</a></li>`
    })
    nav += "</ul>"
    return nav
  } catch (error) {
    console.error("Error building navigation:", error)
    return "<ul><li>Error loading navigation</li></ul>"
  }
}

module.exports = Util // Make sure `getNav` is exported properly!