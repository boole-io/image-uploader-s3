'use strict';

/**
 * Module dependencies
 */
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var multer = require('multer');
var ext = require('file-extension');

/**
 * Image constructor.
 * @param {object} config - Configuration object. Required.
 *  {string} config.accessKeyId- aws key string. Required.
 *  {string} config.secretAccessKey - aws secret string. Required.
 */
function Image(options) {
  var self = this;
  var opts = options || {};
  opts.accessKeyId = opts.accessKeyId || process.env.AWS_ACCESS_KEY;
  opts.secretAccessKey = opts.secretAccessKey || process.env.AWS_SECRET_KEY;
  if (typeof opts.accessKeyId === 'undefined') throw new Error('AWS Key ID is not defined.');
  if (typeof opts.secretAccessKey === 'undefined') throw new Error('AWS Secret Key is not defined.');

  self.options = opts;

  self.s3 = new aws.S3({
    accessKeyId: self.options.accessKeyId,
    secretAccessKey: self.options.secretAccessKey,
  });
}

/**
 * Uploader.
 * @param {object} config - Configuration object. Required.
 *  {string} config.bucket- aws key string. Required.
 *  {string} config.acl - aws secret string. Optional default(public-read).
 */
Image.prototype.storage = function uploader(options) {
  var self = this;
  var opts = options || {};
  opts.bucket = opts.bucket || process.env.BUCKET;
  opts.acl = opts.acl || process.env.ACL || 'public-read';
  if (typeof opts.bucket === 'undefined') throw new Error('AWS Bucket name is not defined.');

  self.options = opts;

  return multerS3({
    s3: self.s3,
    bucket: self.options.bucket,
    acl: 'public-read',
    metadata: function metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function key(req, file, cb) {
      cb(null, Date.now() + '.' + ext(file.originalname));
    },
  });
};

Image.prototype.uploader = multer({ storage: this.storage }).single('picture');

module.exports = Image;
