const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const foodSchema = new Schema({
  kid: String,
  menu: {}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;