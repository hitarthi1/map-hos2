const mongoose = require('mongoose');

const geocoder = require('../utils/geocoder');

const HospitalSchema = new mongoose.Schema({
  hospitalId: {
    type: String,
    required: [true, 'Please add a hospital ID'],
    unique: true,
    trim: true,
    maxlength: [10, 'Store ID must be less than 10 chars']
  },

  address: {
    type: String,
    required: [true, 'Please add an address']
  },

  web_url :{
    type: String
  },

  rating: {type: Number},
  phone: {type: Number},
  image_url: {type: String},
  name: {type: String},
  typeHC: {type: String},

 // trk : { type : Array , "default" : [] },
  spetiality: [{
    type: String
}],
  open:{
      from:{type: Number,},
      till:{type: Number,}
  },



  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: { 
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location
HospitalSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});



module.exports = mongoose.model('Hospital', HospitalSchema);
