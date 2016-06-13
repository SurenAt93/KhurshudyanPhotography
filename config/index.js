var path = require('path');
var nconf = require('nconf');

nconf
	.env()
	.argv()
	.file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;