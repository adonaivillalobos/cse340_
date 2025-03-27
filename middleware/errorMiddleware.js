const utilities = require("../utilities"); // ✅ Import utilities

const errorMiddleware = async (err, req, res, next) => {
    console.error(err.stack); // Logs error to the console
    let nav = await utilities.getNav(); // ✅ Get navigation

    res.status(500).render('errors/error', { 
        title: "Server Error (500)", 
        message: "Something went wrong on our end. Please try again later!",
        nav // ✅ Pass navigation to the error view
    });
};

module.exports = errorMiddleware;
