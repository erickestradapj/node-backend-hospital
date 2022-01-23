/**
 * Route: '/api/doctors'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const {
   getDoctors,
   createDoctor,
   updateDoctor,
   deleteDoctor,
   getDoctorById,
} = require('../controllers/doctors');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validator-fields');

const router = Router();

router.get('/', validateJWT, getDoctors);

router.get('/:id', validateJWT, getDoctorById);

router.post(
   '/',
   [
      validateJWT,
      check('name', 'doctor name is required').not().isEmpty(),
      check('hospital', 'hospital id should be valid').isMongoId(),
      validateFields,
   ],
   createDoctor
);

router.put(
   '/:id',
   [
      validateJWT,
      check('name', 'doctor name is required').not().isEmpty(),
      check('hospital', 'hospital id should be valid').isMongoId(),
      validateFields,
   ],
   updateDoctor
);

router.delete('/:id', validateJWT, deleteDoctor);

module.exports = router;
