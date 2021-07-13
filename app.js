const express = require("express");
const mongoose = require("mongoose");
const { mongoUri, port } = require('./config');
const passport = require('passport');

const app = express();


app.use(express.urlencoded({
  extended: false
}));
app.use(express.json())
mongoose
  .connect(
    mongoUri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // route files
const users = require("./routes/users");
const auth = require("./routes/auth");
const admin = require("./routes/admin")
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./passport")(passport);
app.get("/", function (req, res) {
  res.send("fashionist back-end");
});

app.use('/auth', auth);
app.use('/api/users', users);
app.use('/api/admin', admin);
app.use((err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    msg: err.msg
  })
})
app.listen(process.env.PORT || port, () => {
  console.log(`app is running on ${port}`);
});
