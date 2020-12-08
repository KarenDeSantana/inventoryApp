var multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
// const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();
// router.use(requireAuth);
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

// Saves Image in database
// var storage = new GridFsStorage({
//   url: 'mongodb://localhost/resthub',
//   file: (req, file) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       return {
//         bucketName: 'articleImages'
//       };
//     } else {
//       return null;
//     }
//   }
// });

var upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 }
});

router.post('/upload', upload.single('fileData'), function(req, res, next) {
  //  const encoded = req.file.buffer.toString('base64')

  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.json({ fileUrl: 'http://172.16.0.11:8080/images/' + req.file.filename });
});

module.exports = router;
