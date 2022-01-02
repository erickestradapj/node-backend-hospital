const { request, response } = require('express');
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

module.exports = {
   validateJWT,
};
