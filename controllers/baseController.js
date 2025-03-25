const utilities = require("../utilities/") // Ensure correct import

const baseController = {}

/* ***************************
 *  Build Home Page
 * ************************** */
baseController.buildHome = async function (req, res) {
  try {
    const nav = await utilities.getNav() // Ensure function name matches
    res.render("index", { title: "Home", nav })
  } catch (error) {
    console.error("Error in buildHome:", error)
    res.status(500).send("Internal Server Error")
  }
}

module.exports = baseController
