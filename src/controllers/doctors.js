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

const getDoctorById = async (req = request, res = response) => {
   const { id } = req.params;

   try {
      const doctor = await Doctor.findById(id)
         .populate('user', 'name email img')
         .populate('hospital', 'name user img');

      res.json({
         ok: true,
         doctor,
      });
   } catch (error) {
      console.log(error);
      res.json({
         ok: true,
         msg: 'Doctor not found',
      });
   }
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

const deleteDoctor = async (req = request, res = response) => {
   const id = req.params.id;

   try {
      const doctor = await Doctor.findById(id);

      if (!doctor) {
         return res.status(404).json({
            ok: true,
            msg: 'Doctor not found by id',
         });
      }

      await Doctor.findByIdAndDelete(id);

      res.json({
         ok: true,
         msg: 'Doctor deleted',
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
   getDoctors,
   createDoctor,
   updateDoctor,
   deleteDoctor,
   getDoctorById,
};
