// Import utilities
const utilities = require('../utilities');

// Example of getMyAccount function
async function getMyAccount(req, res, next) {
    try {
        // Example logic for fetching the account data (you can adjust it according to your actual logic)
        const account = await utilities.getAccountDetails(req.user.id); // or any logic to fetch account details

        // Rendering the view for the "My Account" page
        res.render("account/myAccount", {
            title: "My Account",
            account: account,
            nav: await utilities.getNav()  // Example of passing the navigation data
        });
    } catch (error) {
        next(error);  // Pass the error to the next middleware (error handler)
    }
}

module.exports = {
    getMyAccount,
    // Export other controller methods if needed
};

