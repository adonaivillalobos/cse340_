const express = require('express');
const router = express.Router();
const utilities = require('../utilities');
const accountController = require('../controllers/accountController');

// Route to fetch the "My Account" page
router.get('/my-account', utilities.verifyAuth, accountController.getMyAccount);

// Example route for getting account details
router.get('/details/:id', utilities.verifyAuth, accountController.getAccountDetails);

// Example route for updating account information
router.put('/update/:id', utilities.verifyAuth, accountController.updateAccount);

// Example route for deleting an account
router.delete('/delete/:id', utilities.verifyAuth, accountController.deleteAccount);

// Error handler middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong, please try again later.' });
});

module.exports = router;
