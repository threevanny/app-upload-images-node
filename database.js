const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app-images', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(db => console.log('db is conneced'))
.catch(err => console.error(err));