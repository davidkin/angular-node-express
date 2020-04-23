const express = require('express');
const uidController = require('../controllers/uid');

const router = express.Router();

/* GET a guid. */
router.get('/', uidController.getUid);

module.exports = router;
