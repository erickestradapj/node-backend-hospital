const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
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
   },
   hospital: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
   },
});

DoctorSchema.methods.toJSON = function () {
   const { __v, ...doctor } = this.toObject();

   return doctor;
};

module.exports = model('Doctor', DoctorSchema);
