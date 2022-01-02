const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/users');

const login = async (req = request, res = response) => {
   const { email, password } = req.body;

   try {
      // Verify email
      const userDB = await User.findOne({ email });

      if (!userDB) {
         return res.status(404).json({
            ok: false,
            msg: 'Email not found',
         });
      }

      // Verify password
      const validatePassword = bcrypt.compareSync(password, userDB.password);
      console.log(userDB);

      if (!validatePassword) {
         return res.status(400).json({
            ok: false,
            msg: 'Password invalid',
         });
      }

      // Generate TOKEN - JWT
      const token = await generateJWT(userDB.id);

      res.json({
         ok: true,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error',
      });
   }
};

module.exports = {
   login,
};
