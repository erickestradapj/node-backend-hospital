/**
 * Route: '/api/users''
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT, validateADMIN_ROLE_OR_MYSELF } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validator-fields');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post(
   '/',
   [
      check('name', 'name is required').not().isEmpty(),
      check('password', 'password is required').notEmpty(),
      check('email', 'email is required').isEmail(),
      validateFields,
   ],
   createUser
);

router.put(
   '/:id',
   [
      validateJWT,
      validateADMIN_ROLE_OR_MYSELF,
      check('name', 'name is required').not().isEmpty(),
      check('email', 'email is required').isEmail(),
      check('role', 'role is required').not().isEmpty(),
      validateFields,
   ],
   updateUser
);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
