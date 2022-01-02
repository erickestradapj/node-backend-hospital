const { response, request } = require('express');
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = async (req = request, res = response) => {
   const { type, id } = req.params;
   const validType = ['hospitals', 'doctors', 'users'];

   if (!validType.includes(type)) {
      return res.status(400).json({
         ok: false,
         msg: 'Must be users, doctors, hospitals',
      });
   }

   // Validate if exist file
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
         ok: false,
         msg: 'No files were uploaded.',
      });
   }

   // Process the image
   const file = req.files.image;

   const nameSplit = file.name.split('.');
   const extensionFile = nameSplit[nameSplit.length - 1];

   // Validate extension
   const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
   if (!validExtensions.includes(extensionFile)) {
      return res.status(400).json({
         ok: false,
         msg: 'Not an allowed extension',
      });
   }

   // Generate file name
   const nameFile = `${uuidv4()}.${extensionFile}`;

   // Path to save image
   const pathFile = path.join(__dirname, `../uploads/${type}`, nameFile);

   // Use the mv() method to place the file somewhere on your server
   file.mv(pathFile, (err) => {
      if (err) {
         console.log(err);
         return res.status(500).json({
            ok: false,
            msg: 'Error when moving the image',
         });
      }

      // Update database
      updateImage(type, id, nameFile);

      res.json({
         ok: true,
         msg: 'File uploaded!',
         nameFile,
      });
   });
};

const returnImage = (req = request, res = response) => {
   const { type, picture } = req.params;

   const pathImg = path.join(__dirname, `../uploads/${type}/${picture}`);

   // Image default
   if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg);
   } else {
      const pathImg = path.join(__dirname, `../uploads/no-img.png`);
      res.sendFile(pathImg);
   }
};

module.exports = {
   fileUpload,
   returnImage,
};
