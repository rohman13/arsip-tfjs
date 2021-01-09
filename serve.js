const runApp = require('./app');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 4000;
var init;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/url", (req, res, next) => {
  return res.json("test");
});

app.post('/predict', async (req, res, next) => {
  const test = await runApp.runApp(init, req.body.title)
  return res.json(test);
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  init = await runApp.init();
});

