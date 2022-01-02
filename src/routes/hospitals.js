/**
 * Route: '/api/hospitals'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validator-fields');

const router = Router();

router.get('/', validateJWT, getHospitals);

router.post(
   '/',
   [validateJWT, check('name', 'hospital name is required').not().isEmpty(), validateFields],
   createHospital
);

router.put(
   '/:id',
   [validateJWT, check('name', 'hospital name is required').not().isEmpty(), validateFields],
   updateHospital
);

router.delete('/:id', validateJWT, deleteHospital);

module.exports = router;
