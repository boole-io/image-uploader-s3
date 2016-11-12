/**
 * image-uploader-s3/test/index.js
 * @author Armando Mendivil <armandomendivil.m@gmail.com>
 */

/**
 * Module dependencies
 */
var should = require('should');
var expect = require('chai').expect;
var server = require('express')();
var mutilpart = require('connect-multiparty');
var request = require('supertest');
var Image = require('../index');

var image = new Image();

describe('Upload Image', function () {
  it('It should upload image to s3', function (done) {
    server.use('/upload/image', mutilpart());

    server.post('/upload/image', function(req, res) {
      image.uploader(req, res, function (error) {
        if (error) {
          return res.status(500).send({ message: `Error uploading file: ${error.message}` });
        }
          return res.status(200).send({ message: 'success' });
      });
    });

    request(server)
     .post('/upload/image')
     .attach('picture', 'test/images/node.png')
     .expect(200)
     .end(function(err, res) {
       if (err) {
         console.log('ERROR', err);
         return done(err);
       }
       console.log('RESPONSE', res.body);
       should.exist(res.body);
       done();
     });
  });
});
