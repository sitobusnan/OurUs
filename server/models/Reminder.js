const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reminderSchema = new Schema({
  kid: String,
  text: String,
  date: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Reminder = mongoose.model('User', reminderSchema);
module.exports = Reminder;