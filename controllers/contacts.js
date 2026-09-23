const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');


const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: userId });
    const contacts = await result.toArray();
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'Contacto não encontrado' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle
};