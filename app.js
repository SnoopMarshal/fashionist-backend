const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', function (req, res) {
    res.send('fashionist back-end')
  })
  

app.listen(5000);