const { request, response } = require('express');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
   // Read token
   const token = req.header('x-token');

   if (!token) {
      return res.status(401).json({
         ok: false,
         msg: 'There not token in the request',
      });
   }

   try {
      const { uid } = jwt.verify(token, process.env.JWT_SECRET);

      req.uid = uid;
      next();
   } catch (error) {
      return res.status(401).json({
         ok: false,
         msg: 'Token invalid',
      });
   }
};

const validateADMIN_ROLE = async (req = request, res = response, next) => {
   const uid = req.uid;

   try {
      const userDB = await User.findById(uid);

      if (!userDB) {
         return res.status(404).json({
            ok: false,
            msg: 'User does not exist',
         });
      }

      if (userDB.role !== 'ADMIN_ROLE') {
         return res.status(403).json({
            ok: false,
            msg: 'Has no privileges',
         });
      }

      next();
   } catch (error) {
      console.log(error);
      resp.status(500).json({
         ok: false,
         msg: 'Error, please contact the administrator',
      });
   }
};

const validateADMIN_ROLE_OR_MYSELF = async (req = request, res = response, next) => {
   const uid = req.uid;
   const id = req.params.id;

   try {
      const userDB = await User.findById(uid);

      if (!userDB) {
         return res.status(404).json({
            ok: false,
            msg: 'User does not exist',
         });
      }

      if (userDB.role === 'ADMIN_ROLE' || uid === id) {
         next();
      } else {
         return res.status(403).json({
            ok: false,
            msg: 'Has no privileges',
         });
      }
   } catch (error) {
      console.log(error);
      resp.status(500).json({
         ok: false,
         msg: 'Error, please contact the administrator',
      });
   }
};

module.exports = {
   validateJWT,
   validateADMIN_ROLE,
   validateADMIN_ROLE_OR_MYSELF,
};
