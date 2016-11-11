# image-uploader-s3

## Install

```bash
npm install image-uploader-s3 --save
```

## Usage

```javascript
var upload = require('image-uploader-s3');

upload(req, res, function (error) {
  if (error) {
    return res.status(500).send({ message: `Error uploading file: ${error.message}` });
  }
    return res.status(200).send({ message: 'success' });
});
```

## Configure environment variables

```
export AWS_ACCESS_KEY=""
export AWS_SECRET_KEY="
export BUCKET=""
```

## Running Tests

```bash
npm test
```

##License

The MIT License (MIT)

Copyright (c) 2016 Armando Mendivil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
