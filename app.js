const express = require("express");
const mongoose = require("mongoose");
const { mongoUri, port } = require('./config');
const passport = require('passport');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

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
const testRoutes = require("./routes/test-routes");
const users = require("./routes/users");
const auth = require("./routes/auth");
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./passport")(passport);
app.get("/", function (req, res) {
  res.send("fashionist back-end");
});

app.use(testRoutes);
app.use('/auth', auth);
app.use('/api/users', users);

app.listen(process.env.PORT || port, () => {
  console.log(`app is running on ${port}`);
});
