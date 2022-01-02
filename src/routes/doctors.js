/**
 * Route: '/api/doctors'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validator-fields');

const router = Router();

router.get('/', validateJWT, getDoctors);

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

router.put('/:id', [], updateDoctor);

router.delete('/:id', deleteDoctor);

module.exports = router;
