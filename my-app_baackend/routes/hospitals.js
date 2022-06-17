const express = require('express');
const { getHospitals, addHospital } = require('../controllers/hospital');

const router = express.Router();

router
  .route('/')
  .get(getHospitals)
  .post(addHospital);

module.exports = router;
