const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const testRoutes = require("./routes/test-routes");

app.get("/", function (req, res) {
  res.send("fashionist back-end");
});

app.use(testRoutes);

app.listen(process.env.PORT || port, () => {
  console.log(`app is running on ${port}`);
});
