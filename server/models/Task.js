const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  kid: Object,
  description: String,
  tutor: Object,
  type: { type: String, enum: ['Education', 'Home']},
  text: String,
  status: Boolean,
  date: String,
  time: Date,
  place: String,
  family_name: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;