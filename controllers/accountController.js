// Import utilities
const utilities = require('../utilities');


// Login function
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav();
    res.render("account/login", {
        title: "Login",
        nav,
        messages: req.flash ? req.flash("message") : [] 
      });
}

// Registration function
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav();
    res.render("account/register", {
        title: "Register",
        nav,
        errors : null,
      });
}


module.exports = { buildLogin, buildRegister };