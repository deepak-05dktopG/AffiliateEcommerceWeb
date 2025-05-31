const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model('Category', categorySchema);
// module.exports = mongoose.model('User', Cat);

