/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const path = require("path");
const app = express();
const static = require("./routes/static");
const expressLayouts = require("express-ejs-layouts");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute"); // ✅ Import inventoryRoute
const utilities = require("./utilities"); // ✅ Ensure utilities is in scope

/* ***********************
 * View Engine and Templates
 *************************/
// Explicitly set views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Not at views root

/* ***********************
 * Routes
 *************************/
app.use(static);

// Index Route
app.get("/", baseController.buildHome);

// Inventory routes
app.use("/inv", inventoryRoute); // ✅ Now this will work

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});