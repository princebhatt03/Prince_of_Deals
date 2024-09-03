const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

userSchema.plugin(plm, {
  usernameField: 'username',
  hashField: 'hash',
  saltField: 'salt',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
