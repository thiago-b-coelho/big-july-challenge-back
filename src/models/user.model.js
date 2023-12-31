const mongoose = require('../config/mongo')
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;