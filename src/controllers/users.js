const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
   const from = Number(req.query.from) || 0;
   console.log(from);

   const [users, total] = await Promise.all([
      User.find({}, 'name email role google img').skip(from).limit(5),
      User.countDocuments(),
   ]);

   res.json({
      ok: true,
      users,
      total,
   });
};

const createUser = async (req = request, res = response) => {
   const { password, email } = req.body;

   try {
      const existEmail = await User.findOne({ email });

      if (existEmail) {
         return res.status(400).json({
            ok: false,
            msg: 'The email is already registered',
         });
      }

      const user = new User(req.body);

      // Encrypt password
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      // Save user
      await user.save();

      // Generate TOKEN - JWT
      const token = await generateJWT(user.id);
      user.token = token;

      res.json({
         ok: true,
         user,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error... check logs',
      });
   }
};

const updateUser = async (req = request, res = response) => {
   // TODO: Validate token and verify if user is correct

   const uid = req.params.id;

   try {
      const userDB = await User.findById(uid);

      if (!userDB) {
         return res.status(404).json({
            ok: false,
            msg: 'There is not user for that id',
         });
      }

      // Update
      const { password, google, email, ...fields } = req.body;

      if (userDB.email !== email) {
         const existEmail = await User.findOne({ email });
         if (existEmail) {
            return res.status(400).json({
               ok: false,
               msg: 'There is already user user with that email',
            });
         }
      }

      if (!userDB.google) {
         fields.email = email;
      } else if (userDB.email !== email) {
         return res.status(400).json({
            ok: false,
            msg: 'Google user can not change his email address',
         });
      }

      const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

      res.json({
         ok: true,
         user: userUpdated,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Unexpected error',
      });
   }
};

const deleteUser = async (req = request, res = response) => {
   const uid = req.params.id;

   try {
      const userDB = await User.findById(uid);

      if (!userDB) {
         return res.status(404).json({
            ok: false,
            msg: 'There is not user for that id',
         });
      }

      await User.findByIdAndDelete(uid);

      res.json({
         ok: true,
         msg: 'User deleted',
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
   getUsers,
   createUser,
   updateUser,
   deleteUser,
};
