const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();

mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on port: ", port);
});