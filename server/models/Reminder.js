const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reminderSchema = new Schema({
  kid: String,
  description: String,
  text: String,
  date: String,
  family_name: String,
  status: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;