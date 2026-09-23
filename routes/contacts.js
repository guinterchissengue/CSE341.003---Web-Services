const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET routes for contacts
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

module.exports = router;