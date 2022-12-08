const express = require('express');
const bodyParser = require('body-parser');

/* Disabling 'x-powered-by' header. */
const app = express().disable('x-powered-by');

app.use(express.static('./public'));

console.log(__dirname + '/public');

app.listen(3000);