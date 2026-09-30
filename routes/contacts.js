const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// Map each contact route to its controller function.
// The #swagger comments are read by swagger-autogen to build swagger.json.

router.get('/',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get all contacts'
     #swagger.description = 'Returns every contact stored in the contacts collection.'
     #swagger.responses[200] = {
       description: 'List of contacts.',
       schema: [{ $ref: '#/definitions/Contact' }]
     }
     #swagger.responses[500] = {
       description: 'Internal server error.',
       schema: { $ref: '#/definitions/Error' }
     }
  */
  contactsController.getAll);

router.get('/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Get a contact by id'
     #swagger.description = 'Returns a single contact that matches the given id.'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'string',
       description: 'MongoDB ObjectId of the contact (24 hexadecimal characters).'
     }
     #swagger.responses[200] = {
       description: 'The requested contact.',
       schema: { $ref: '#/definitions/Contact' }
     }
     #swagger.responses[400] = {
       description: 'Invalid contact id.',
       schema: { $ref: '#/definitions/Error' }
     }
     #swagger.responses[404] = {
       description: 'Contact not found.',
       schema: { $ref: '#/definitions/Error' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error.',
       schema: { $ref: '#/definitions/Error' }
     }
  */
  contactsController.getSingle);

router.post('/',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Create a new contact'
     #swagger.description = 'Creates a contact. All fields are required. Returns the id of the new contact.'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Contact data. All fields are required.',
       schema: { $ref: '#/definitions/ContactInput' }
     }
     #swagger.responses[201] = {
       description: 'Contact created successfully.',
       schema: { $ref: '#/definitions/CreatedContact' }
     }
     #swagger.responses[400] = {
       description: 'A required field is missing or invalid.',
       schema: { $ref: '#/definitions/Error' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error.',
       schema: { $ref: '#/definitions/Error' }
     }
  */
  contactsController.createContact);

router.put('/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Update a contact'
     #swagger.description = 'Updates the contact that matches the given id. All fields are required.'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'string',
       description: 'MongoDB ObjectId of the contact to update.'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'New contact data. All fields are required.',
       schema: { $ref: '#/definitions/ContactInput' }
     }
     #swagger.responses[204] = { description: 'Contact updated successfully (no content).' }
     #swagger.responses[400] = {
       description: 'Invalid id or a required field is missing.',
       schema: { $ref: '#/definitions/Error' }
     }
     #swagger.responses[404] = {
       description: 'Contact not found.',
       schema: { $ref: '#/definitions/Error' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error.',
       schema: { $ref: '#/definitions/Error' }
     }
  */
  contactsController.updateContact);

router.delete('/:id',
  /* #swagger.tags = ['Contacts']
     #swagger.summary = 'Delete a contact'
     #swagger.description = 'Deletes the contact that matches the given id.'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'string',
       description: 'MongoDB ObjectId of the contact to delete.'
     }
     #swagger.responses[204] = { description: 'Contact deleted successfully (no content).' }
     #swagger.responses[400] = {
       description: 'Invalid contact id.',
       schema: { $ref: '#/definitions/Error' }
     }
     #swagger.responses[404] = {
       description: 'Contact not found.',
       schema: { $ref: '#/definitions/Error' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error.',
       schema: { $ref: '#/definitions/Error' }
     }
  */
  contactsController.deleteContact);

module.exports = router;
