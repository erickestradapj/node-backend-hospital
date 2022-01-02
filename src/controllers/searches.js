const { request, response } = require('express');
const User = require('../models/users');
const Hospital = require('../models/hospitals');
const Doctor = require('../models/doctors');

const getTodo = async (req = request, res = response) => {
   const { search } = req.params;
   const regex = new RegExp(search, 'i');

   const [users, doctors, hospitals] = await Promise.all([
      User.find({ name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
   ]);

   res.json({
      ok: true,
      users,
      doctors,
      hospitals,
   });
};

const getDocumentCollection = async (req = request, res = response) => {
   const { search, table } = req.params;
   const regex = new RegExp(search, 'i');

   let data = [];

   switch (table) {
      case 'doctors':
         data = await Doctor.find({ name: regex })
            .populate('hospital', 'name img')
            .populate('user', 'name img');
         break;

      case 'hospitals':
         data = await Hospital.find({ name: regex }).populate('user', 'name img');
         break;

      case 'users':
         data = await User.find({ name: regex });
         break;

      default:
         return res.status(400).json({
            ok: false,
            msg: 'Table can be users, doctors or hospitals',
         });
   }

   res.json({
      ok: true,
      results: data,
   });
};

module.exports = {
   getTodo,
   getDocumentCollection,
};
