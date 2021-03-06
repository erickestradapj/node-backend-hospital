const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const { googleVerify } = require('../helpers/google-verify');
const { generateJWT } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');
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
         menu: getMenuFrontEnd(userDB.role),
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error',
      });
   }
};

const googleSignIn = async (req = request, res = response) => {
   const googleToken = req.body.token;

   try {
      const { name, email, picture } = await googleVerify(googleToken);

      const userDB = await User.findOne({ email });
      let user;

      if (!userDB) {
         // if not exist user
         user = new User({
            name,
            email,
            password: '@@@',
            img: picture,
            google: true,
         });
      } else {
         // exist user
         user = userDB;
         user.google = true;
      }

      // Save in DB
      await user.save();

      // Generate TOKEN - JWT
      const token = await generateJWT(user.id);

      res.json({
         ok: true,
         token,
         menu: getMenuFrontEnd(user.role),
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Token invalid',
      });
   }
};

const renewToken = async (req, res = response) => {
   const uid = req.uid;

   // Generate TOKEN - JWT
   const token = await generateJWT(uid);

   // Get user by uid
   const user = await User.findById(uid);

   if (!user) {
      return res.status(404).json({
         ok: false,
         msg: 'Email not found',
      });
   }

   res.json({
      ok: true,
      token,
      user,
      menu: getMenuFrontEnd(user.role),
   });
};

module.exports = {
   login,
   googleSignIn,
   renewToken,
};
