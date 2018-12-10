const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const familySchema = new Schema({
  name: String,
  tutors: [],
  kids: [],
  photos: []
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Family = mongoose.model('User', familySchema);
module.exports = Family;
