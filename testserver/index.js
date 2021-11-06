const process = require('process');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.text());

const memory = [];

function displayLog(text) {
  console.log(`[${ (new Date()).toLocaleTimeString() }] ${ text }`);
}

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(memory));
});

app.post('/', (req, res) => {
  memory.push(req.body);
  
  displayLog(`POST ${ req.body }`);
  
  res.send();
})

app.delete('/', (req, res) => {
  memory.length = 0;

  displayLog('Cleared');
  
  res.send();
});

app.listen(3000);

if (process.send) {
  process.send({
    started: true
  });
}

