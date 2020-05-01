const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Image = require('../models/Image');

//Home
router.get('/', async (req, res) => {
  const images = await Image.find();
  console.log(images);
  res.render('index', { images });
});

//form
router.get('/upload', (req, res) => {
  res.render('uploads');
});

//recive images
router.post('/upload', async (req, res) => {
  //console.log(req.file);
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = 'images/uploads/' + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;
  //console.log(image);

  await image.save();

  res.redirect('/');
});

//detail image
router.get('/image/:id', async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  res.render('profile', { image });
});

router.get('/image/:id/delete/', async (req, res) => {
  const { id } = req.params;
  const image = await Image.findByIdAndDelete(id);
  await unlink(path.resolve('./public/' + image.path));
  res.redirect('/');
});


module.exports = router;