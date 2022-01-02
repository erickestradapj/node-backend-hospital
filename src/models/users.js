const { Schema, model } = require('mongoose');

const UserSchema = Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   img: {
      type: String,
   },
   role: {
      type: String,
      required: true,
      default: 'USER_ROLE',
   },
   google: {
      type: Boolean,
      default: false,
   },
});

UserSchema.methods.toJSON = function () {
   const { __v, _id, password, ...user } = this.toObject();

   user.uid = _id; // optional
   return user;
};

module.exports = model('User', UserSchema);
