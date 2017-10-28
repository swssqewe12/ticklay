var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Test');
})

app.listen(process.env.PORT || 5000, function () {
  console.log('App listening!');
})