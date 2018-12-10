const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const kidSchema = new Schema({
  name: String,
  family: String,
  photo: String,
  age: Number,
  allergies: [],
  intolerances: [],
  vaccinations: []
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Kid = mongoose.model('User', kidSchema);
module.exports = Kid;
