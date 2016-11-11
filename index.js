const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const ext = require('file-extension');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const storage = multerS3({
  s3,
  bucket: process.env.BUCKET,
  acl: 'public-read',
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, `${Date.now()}.${ext(file.originalname)}`);
  },
});

const upload = multer({ storage }).single('picture');

module.exports = upload;
