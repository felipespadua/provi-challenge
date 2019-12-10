const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pathSchema = new Schema({
  order: [{type: String}]
}, {
  timestamps: true
});

const Path = mongoose.model('Path', pathSchema);

module.exports = Path;