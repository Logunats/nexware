const multer = require('multer');
const path = require('path');
const config = require('../config');
const maxSize = 2 * 1024 * 1024; // size in kb
const base = path.resolve('.');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, base + config.fileLocationUrl);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log("file", file);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    },
});

let checkFileType = function(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb({code: 'INVALID_EXTENSION'});
    }
  }

let uploadFile = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    },
}).single('file');

exports.upload = (req, res, next) => {
    uploadFile(req, res, function (err) {
        if (req.file == undefined) {
            return res.status(401).json({ message: 'Please upload a profile picture!' });
        }
        if (err) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                return res.status(401).json({
                message: ' Profile picture size cannot be larger than 2MB!',
                });
            } else if (err.code == 'INVALID_EXTENSION') {
                return res.status(401).json({
                    message: 'Only .png, .jpg and .jpeg format allowed!',
                });
            }
            
            return res.status(401).json({
                message: `Could not upload a profile picture: ${req.file.originalname}. ${err}`,
            });
        }

        return next();
    });
    // try {
    //     console.log(req.file);
    //     await uploadFile(req, res);
    

    //     return next();
    // } catch (err) {
    //     console.log('err====', err);
    //     if (err.code == 'LIMIT_FILE_SIZE') {
    //         return res.status(401).json({
    //           message: 'File size cannot be larger than 2MB!',
    //         });
    //     } else if (err.code == 'INVALID_EXTENSION') {
    //         return res.status(401).json({
    //             message: 'Only .png, .jpg and .jpeg format allowed!',
    //         });
    //     }
        
    //     return res.status(401).json({
    //         message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    //     });
    // }
};
