const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const familySchema = new Schema({
  name: String,
  tutors: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  kids: [{ type : Schema.Types.ObjectId, ref: 'Kid' }],
  tasks: [{ type : Schema.Types.ObjectId, ref: 'Task' }],
  reminders: [{ type : Schema.Types.ObjectId, ref: 'Reminder' }],
  photos: [],
  token: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Family = mongoose.model('Family', familySchema);
module.exports = Family;
