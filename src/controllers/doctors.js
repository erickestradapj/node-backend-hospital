const { request, response } = require('express');

const getDoctors = (req = request, res = response) => {
   res.json({
      ok: true,
      msg: 'getDoctors',
   });
};

const createDoctor = (req = request, res = response) => {
   res.json({
      ok: true,
      msg: 'Create Doctor',
   });
};

const updateDoctor = (req = request, res = response) => {
   res.json({
      ok: true,
      msg: 'Update Doctor',
   });
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
