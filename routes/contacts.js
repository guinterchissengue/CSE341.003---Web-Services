const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// Define contact routes mapping to controller functions
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;