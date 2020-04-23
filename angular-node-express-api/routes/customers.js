const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

router.get('/', customerController.customerListing);
router.post('/', customerController.addNewCustomer);

router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomerById);
router.delete('/:id', customerController.deleteCustomerById);

module.exports = router;

