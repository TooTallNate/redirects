
var fs = require('fs');

var redirects = require('./redirects.js');
var pkg = require('./_package.json');

pkg.domains = Object.keys(redirects);
fs.writeFileSync('package.json', JSON.stringify(pkg), 'utf8');
