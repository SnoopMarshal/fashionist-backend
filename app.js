const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', function (req, res) {
    res.send('fashionist back-end')
  })
  

app.listen(process.env.PORT || 5000, ()=> {console.log(`app is running on ${port}`)});