/**
 * Route: '/api/doctors'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validator-fields');

const router = Router();

router.get('/', getDoctors);

router.post('/', [], createDoctor);

router.put('/:id', [], updateDoctor);

router.delete('/:id', deleteDoctor);

module.exports = router;
