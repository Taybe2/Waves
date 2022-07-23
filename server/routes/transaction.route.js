const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const router = express.Router();
const auth = require('../middleware/auth');

router.route('/')
.post(auth(), transactionController.addTransaction);

module.exports = router;