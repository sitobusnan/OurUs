const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  kid: String,
  tutors: [],
  type: { type: String, enum: ['Education', 'Home']},
  text: String,
  status: Boolean,
  date: Date,
  place: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;