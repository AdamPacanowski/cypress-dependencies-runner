const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.text());

const memory = [];

app.get('/', (req, res) => {
  res.send(JSON.stringify(memory));
});

app.post('/', (req, res) => {
  memory.push(req.body);

  res.send();
})

app.delete('/', (req, res) => {
  memory.length = 0;
  
  res.send();
});

app.listen(3000);

