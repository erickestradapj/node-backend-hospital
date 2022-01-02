const { request, response } = require('express');
const Hospital = require('../models/hospitals');

const getHospitals = async (req = request, res = response) => {
   const hospitals = await Hospital.find().populate('user', 'name email img');

   res.json({
      ok: true,
      hospitals,
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

const updateHospital = async (req = request, res = response) => {
   const id = req.params.id;
   const uid = req.uid;

   try {
      const hospital = await Hospital.findById(id);

      if (!hospital) {
         return res.status(404).json({
            ok: true,
            msg: 'Hospital not found by id',
         });
      }

      const changesHospital = {
         ...req.body,
         user: uid,
      };

      const hospitalUpdated = await Hospital.findByIdAndUpdate(id, changesHospital, { new: true });

      res.json({
         ok: true,
         hospital: hospitalUpdated,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error... check logs',
      });
   }
};

const deleteHospital = async (req = request, res = response) => {
   const id = req.params.id;

   try {
      const hospital = await Hospital.findById(id);

      if (!hospital) {
         return res.status(404).json({
            ok: true,
            msg: 'Hospital not found by id',
         });
      }

      await Hospital.findByIdAndDelete(id);

      res.json({
         ok: true,
         msg: 'Hospital deleted',
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error... check logs',
      });
   }
};

module.exports = {
   getHospitals,
   createHospital,
   updateHospital,
   deleteHospital,
};
