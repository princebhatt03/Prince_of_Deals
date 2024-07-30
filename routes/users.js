const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect(
  'mongodb+srv://princebhatt316:DnFqDYxei3ai8X3g@cluster0.vdwbeya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
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
  role: {
    type: String,
    enum: ['user', 'admin'],
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
