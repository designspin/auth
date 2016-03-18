const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = require('./routes/api');

const app = express();

mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
app.use('/api', api);

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on port: ", port);
});