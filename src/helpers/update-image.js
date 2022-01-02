const fs = require('fs');
const path = require('path');
const User = require('../models/users');
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospitals');

const deleteImage = (path) => {
   if (fs.existsSync(path)) {
      // Delete previous image
      fs.unlinkSync(path);
   }
};

const updateImage = async (type, id, nameFile) => {
   let pathOld = '';

   switch (type) {
      case 'doctors':
         const doctor = await Doctor.findById(id);
         if (!doctor) {
            console.log('Not a doctor');
            return false;
         }

         pathOld = path.join(__dirname, `../uploads/doctors/${doctor.img}`);
         deleteImage(pathOld);

         doctor.img = nameFile;

         await doctor.save();

         return true;

         break;

      case 'hospitals':
         const hospital = await Hospital.findById(id);
         if (!hospital) {
            console.log('Not a hospital');
            return false;
         }

         pathOld = path.join(__dirname, `../uploads/hospitals/${hospital.img}`);
         deleteImage(pathOld);

         hospital.img = nameFile;

         await hospital.save();

         return true;

         break;

      case 'users':
         const user = await User.findById(id);
         if (!user) {
            console.log('Not a users');
            return false;
         }

         pathOld = path.join(__dirname, `../uploads/users/${user.img}`);
         deleteImage(pathOld);

         user.img = nameFile;

         await user.save();

         return true;

         break;

      default:
         break;
   }
};

module.exports = {
   updateImage,
};
