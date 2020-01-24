const express = require('express');

const router = express.Router();

const auth = require('../../middlewear/auth');
const User = require('../../models/Users');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route       GET api/auth
//@description test route
//@access      Private

// header should be passed for auth middlewear to get req.user.id
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).send('server error');
	}
});

//@route       POST api/auth
//@description Authniticate User and get token
//@access      Public
router.post(
	'/',
	[
		// username must be an email
		check('email', 'please include valid email').isEmail(),
		// password must be at least 5 chars long
		check('password', 'Password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		console.log(req.body);
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ erros: [ { msg: 'Invalid Credentials' } ] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ erros: [ { msg: 'Invalid Credentials' } ] });
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, config.get('JWTSecretKey'), { expiresIn: 36000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});

			//	res.send('User registered');
		} catch (error) {
			console.log(error.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
