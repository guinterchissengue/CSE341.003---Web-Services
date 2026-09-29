const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// Fields that every contact must have
const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

// Return the collection used by this controller
const contactsCollection = () => mongodb.getDb().collection('contacts');

// Build a contact object from the request body (ignores any extra fields)
const buildContact = (body = {}) => ({
  firstName: body.firstName,
  lastName: body.lastName,
  email: body.email,
  favoriteColor: body.favoriteColor,
  birthday: body.birthday
});

// Return the list of required fields that are missing or empty
const getMissingFields = (contact) =>
  REQUIRED_FIELDS.filter(
    (field) => typeof contact[field] !== 'string' || contact[field].trim() === ''
  );

// GET /contacts - retrieve all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await contactsCollection().find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /contacts/:id - retrieve a single contact by its ID
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }

    const contact = await contactsCollection().findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /contacts - create a new contact (all fields are required)
const createContact = async (req, res) => {
  try {
    const contact = buildContact(req.body);
    const missing = getMissingFields(contact);

    if (missing.length > 0) {
      return res
        .status(400)
        .json({ message: `Missing or invalid required field(s): ${missing.join(', ')}` });
    }

    const response = await contactsCollection().insertOne(contact);

    if (response.acknowledged) {
      // Return the id of the new contact in the response body
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'An error occurred while creating the contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /contacts/:id - update an existing contact by its ID
const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }

    const contact = buildContact(req.body);
    const missing = getMissingFields(contact);

    if (missing.length > 0) {
      return res
        .status(400)
        .json({ message: `Missing or invalid required field(s): ${missing.join(', ')}` });
    }

    const response = await contactsCollection().replaceOne(
      { _id: new ObjectId(req.params.id) },
      contact
    );

    // matchedCount is used (not modifiedCount) so sending identical data is still a success
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    // 204 No Content: the update completed successfully
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /contacts/:id - delete a contact by its ID
const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact id.' });
    }

    const response = await contactsCollection().deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    // 204 No Content: the deletion completed successfully
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
