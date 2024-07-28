const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect(
  'mongodb+srv://princebhatt316:DnFqDYxei3ai8X3g@cluster0.vdwbeya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    sparse: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
});

userSchema.plugin(plm, {
  usernameField: 'username',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
