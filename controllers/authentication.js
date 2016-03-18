const User = require('../models/user');
const jwtSimple = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwtSimple.encode({
		sub: user.id,
		iat: timestamp
	}, config.secret );
}

exports.reset = function(req, res, next) {
	
}

exports.signin = function(req, res, next) {
	res.send({ token: tokenForUser(req.user)});
}
//Post Method for signup
exports.signup = function(req, res, next) {

	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({
			error: "You must provide an email and a password to login"
		});
	}

	User.findOne({ email: email }, function(err, existingUser) {

		if(err) { 
			return next(err); 
		}
		if(existingUser) {
			return res.status(422).send({
				error: "Email is already in use"
			})
		}
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err) {
			if(err) {
				return next(err);
			}
			res.json({ token: tokenForUser(user)});
		});
	})
}