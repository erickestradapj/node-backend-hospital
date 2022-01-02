const { request, response } = require('express');
const Hospital = require('../models/hospitals');

const getHospitals = (req = request, res = response) => {
   res.json({
      ok: true,
      msg: 'getHospitals',
   });
};

const createHospital = async (req = request, res = response) => {
   const uid = req.uid;
   const hospital = new Hospital({ user: uid, ...req.body });

   try {
      const hospitalDB = await hospital.save();

      res.json({
         ok: true,
         hospital: hospitalDB,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error... check logs',
      });
   }
};

const updateHospital = (req = request, res = response) => {
   res.json({
      ok: true,
      msg: 'Update hospital',
   });
};

const deleteHospital = (req = request, res = response) => {
   res.json({
      ok: true,
      msg: 'Delete hospital',
   });
};

module.exports = {
   getHospitals,
   createHospital,
   updateHospital,
   deleteHospital,
};
