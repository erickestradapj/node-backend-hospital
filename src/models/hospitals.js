const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
   name: {
      type: String,
      required: true,
   },
   img: {
      type: String,
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
});

HospitalSchema.methods.toJSON = function () {
   const { __v, ...hospital } = this.toObject();

   return hospital;
};

module.exports = model('Hospital', HospitalSchema);
