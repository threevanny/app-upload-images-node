const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { format } = require('timeago.js');


//init
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: 'public/images/uploads',
  filename: (req, file, callback, filename) => {
    callback(null, uuidv4() + path.extname(file.originalname));
  }
});

app.use(multer({ storage: storage }).single('image'));

//Variables
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});

//Routes
app.use(require('./routes/index'));

//Static Files
app.use(express.static('public'));

//Start
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});