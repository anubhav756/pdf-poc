var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var fs = require('fs');

app.use(cors());

app.post('/upload', function(req, res) {
  const { 'application-id': applicationId = 'temp' } = req.headers;
  const dir = `public/${applicationId}`;

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

var upload = multer({ storage }).array('file');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);
    } else if (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    return res.status(200).send(req.file)
  })
});

app.listen(9016, function() {
  console.log('App running on port 9016');
});