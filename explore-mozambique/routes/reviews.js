const express = require('express');
const router = express.Router();

const {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace
} = require('../controllers/placesController');

const { validatePlace } = require('../middleware/validation');

router.route('/')
  .get(getPlaces)
  .post(validatePlace, createPlace); // POST validation applied here

router.route('/:id')
  .get(getPlaceById)
  .put(validatePlace, updatePlace)   // PUT validation applied here
  .delete(deletePlace);

module.exports = router;