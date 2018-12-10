const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  kid: String,
  tutors: [],
  kids: [],
  photos: []
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Task = mongoose.model('User', taskSchema);
module.exports = Task;