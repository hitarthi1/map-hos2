const Hospital = require('../models/hospital');

// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getHospitals = async (req, res, next) => {
  try {
    console.log("reqqqqqqqqqqqqq",req.query)
    const hospitals = await Hospital.find();
// const agg = Model.aggregate([{ $match: { age: { $gte: 25 } } }]);
// const hoss = data.data.map(hos => {
//   return {
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [
//         hos.location.coordinates[0],
//         hos.location.coordinates[1]
//       ]
//
    return res.status(200).json({
      success: true,
      count: Hospital.length,
      data: hospitals
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Create a store
// @route POST /api/v1/stores
// @access Public
exports.addHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);

    return res.status(201).json({
      success: true,
      data: hospital
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This hospital already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
