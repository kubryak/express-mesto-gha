const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

app.use((req, res, next) => {
  req.user = {
    _id: '648713b158f447fbdf156a88',
  };

  next();
});

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log('Слушаю порт 3000');
});
