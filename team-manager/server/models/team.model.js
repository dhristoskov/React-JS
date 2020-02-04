const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;