const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');

// Route to fetch the "My Account" page
router.get("/login", utilities.handleErrors(accountController, accountController.buildLogin));

// Route to fect the Registration page
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Error handler middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong, please try again later.' });
});

module.exports = router;
