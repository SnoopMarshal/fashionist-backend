const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000

app.get('/', function (req, res) {
    res.send('fashionist back-end')
  })
  

app.listen(process.env.PORT || port, ()=> {console.log(`app is running on ${port}`)});