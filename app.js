var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
const passport = require('passport')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
var app = express();
const PostModel = require('./models/posts.models')
const jwt = require('jsonwebtoken')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads/"));

/* passport */
app.use(passport.initialize())
require('./security/passport')(passport)
/* connect to db */
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to db"))
.catch(err=>console.log(err))
app.use('/api', indexRouter);

console.log(__dirname)
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' +newName,
    })
    res.json(newName);
})


const photosMiddleware = multer({ dest: "/uploads/" });
app.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.') 
        ext = parts[parts.length - 1];
        const newPath = path + '.' + ext
        fs.rename(path, newPath);
      uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
  }
);
app.post("/posts", (req, res) => {
  const { authToken } = req.cookies;
  const { title, address, addedPhotos, description, price, extraInfo } =
    req.body;
  jwt.verify(authToken, process.env.PRIVATE_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const postDoc = await PostModel.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      extraInfo,
    });
    res.json(postDoc);
  });
});



module.exports = app;
