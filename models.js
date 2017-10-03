const mongoose = require('mongoose');

// Approach #1 on creating Schema
// Import in server.js as const User = require('./models');

const UsersSchema = new mongoose.Schema({
    // TODO: write your schema here
    firstName: String,
    lastName: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
});
    
module.exports = mongoose.model('User', UsersSchema);
    

// Approach #2 on creating Schema
// Import in server.js as  const { User } = require('./models');

// const Schema = mongoose.Schema;
// const UserSchema = Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', UserSchema);
// module.exports = {
//   User
// };







