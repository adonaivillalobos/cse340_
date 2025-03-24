const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try {
    let data = await invModel.getClassifications();
    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
      list += `<li>
                 <a href="/inv/type/${row.classification_id}" 
                    title="See our inventory of ${row.classification_name} vehicles">
                    ${row.classification_name}
                 </a>
               </li>`;
    });
    list += "</ul>";
    return list;
  } catch (error) {
    console.error("Error generating navigation menu:", error);
    throw error;
  }
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  try {
    let grid = '<ul id="inv-display">';
    if (data.length > 0) {
      data.forEach((vehicle) => {
        grid += `<li>
                  <a href="../../inv/detail/${vehicle.inv_id}" 
                     title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
                    <img src="${vehicle.inv_thumbnail}" 
                         alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
                  </a>
                  <div class="namePrice">
                    <hr />
                    <h2>
                      <a href="../../inv/detail/${vehicle.inv_id}" 
                         title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
                         ${vehicle.inv_make} ${vehicle.inv_model}
                      </a>
                    </h2>
                    <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
                  </div>
                </li>`;
      });
      grid += "</ul>";
    } else {
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
    }
    return grid;
  } catch (error) {
    console.error("Error generating classification grid:", error);
    throw error;
  }
};

/* **************************************
 * Build the vehicle detail view HTML
 * ************************************ */
Util.buildVehicleDetailHTML = function (vehicle) {
  if (!vehicle) {
    return '<p class="notice">Sorry, vehicle details could not be found.</p>';
  }

  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" 
           alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-img"/>
      <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
      <p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
      <p><strong>Year:</strong> ${vehicle.inv_year}</p>
      <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      <p><strong>Mileage:</strong> ${vehicle.inv_mileage} miles</p>
    </div>
  `;
};

module.exports = Util;