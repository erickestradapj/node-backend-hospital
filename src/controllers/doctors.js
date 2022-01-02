const { request, response } = require('express');
const Doctor = require('../models/doctors');

const getDoctors = async (req = request, res = response) => {
   const doctors = await Doctor.find()
      .populate('user', 'name email img')
      .populate('hospital', 'name user img');

   res.json({
      ok: true,
      doctors,
   });
};

const createDoctor = async (req = request, res = response) => {
   const uid = req.uid;
   const doctor = new Doctor({ user: uid, ...req.body });

   try {
      const doctorDB = await doctor.save();

      res.json({
         ok: true,
         doctor: doctorDB,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error... check logs',
      });
   }

   res.json({
      ok: true,
      msg: 'Create Doctor',
   });
};

const updateDoctor = async (req = request, res = response) => {
   const id = req.params.id;
   const uid = req.uid;

   try {
      const doctor = await Doctor.findById(id);

      if (!doctor) {
         return res.status(404).json({
            ok: true,
            msg: 'Doctor not found by id',
         });
      }

      const changesDoctor = {
         ...req.body,
         user: uid,
      };

      const doctorUpdated = await Doctor.findByIdAndUpdate(id, changesDoctor, { new: true });

      res.json({
         ok: true,
         doctor: doctorUpdated,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error... check logs',
      });
   }
};

const deleteDoctor = (req = request, res = response) => {
   res.json({
      ok: true,
      msg: 'Delete Doctor',
   });
};

module.exports = {
   getDoctors,
   createDoctor,
   updateDoctor,
   deleteDoctor,
};
