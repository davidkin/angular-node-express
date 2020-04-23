const uid = require('uid-safe');

exports.getUid = (req, res, next) => {
	const strUid = uid.sync(18);
	res.json({ guid: strUid });
};