const invModel = require("../models/inventory-model");
const Util = {};

// Existing utility functions for building nav, classification grid, and vehicle detail view

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the vehicle detail view HTML
 * ************************************ */
Util.buildVehicleDetailView = async function (vehicle) {
  if (!vehicle) {
    return '<p class="notice">Sorry, vehicle details could not be found.</p>';
  }

  let detailView = '<div class="vehicle-detail">';
  detailView += `<h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>`;
  detailView += `<img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">`;
  detailView += `<p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>`;
  detailView += `<p><strong>Year:</strong> ${vehicle.inv_year}</p>`;
  detailView += `<p><strong>Mileage:</strong> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</p>`;
  detailView += `<p><strong>Color:</strong> ${vehicle.inv_color}</p>`;
  detailView += `<p><strong>Description:</strong> ${vehicle.inv_description}</p>`;
  detailView += "</div>";

  return detailView;
};

// New utilities

/* **************************************
 * Authentication Middleware (verifyAuth)
 * ************************************ */
Util.verifyAuth = function (req, res, next) {
  if (!req.user) {  // Assuming req.user contains the user info if logged in
    return res.redirect('/login');  // Redirect to login if not authenticated
  }
  next();  // Proceed to the next middleware or route handler
};

/* **************************************
 * Get Account Details (example)
 * ************************************ */
Util.getAccountDetails = async function (userId) {
  // Replace this with actual logic to fetch account details from the database
  return {
    id: userId,
    name: "John Doe",
    email: "johndoe@example.com",
    // Add other account details as necessary
  };
};

module.exports = Util;