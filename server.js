'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')

// require and use "multer"...

var upload = multer({ dest: './images' })

var app = express();
app.use(bodyParser.urlencoded({entended: false})); 

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


//        https://www.npmjs.com/package/multer
app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) =>{
 
const file = req.file    // when u press submit on form it gets access to the file details


if(!file){
  return res.send("select file")
};

res.json({
     name: file.originalname,
     type: file.mimetype,
     size: file.size
})
// return json 
// {"name":"Freecodecamp.txt","type":"text/plain","size":171}


});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
  