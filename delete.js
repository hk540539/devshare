const bcrypt = require('bcryptjs');

const fn = async () => {
	let password = 'hemu123';
	const salt = await bcrypt.genSalt(10);
	let hashedpassword = await bcrypt.hash(password, salt);
	const isMatch = await bcrypt.compare(password, user.password);
};
