// ----------------------------------------------------------------------------
//
// app.js - the app for my redirects
//
// ----------------------------------------------------------------------------

var connect = require('connect');
var uuid    = require('connect-uuid');
var http    = require('http');

// ----------------------------------------------------------------------------

var map = {
    // chilts
    'www.chilts.org' : 'chilts.org',
    'chilts.com'     : 'chilts.org',
    'www.chilts.com' : 'chilts.org',
    'chilts.me'      : 'chilts.org',
    'www.chilts.me'  : 'chilts.org',

    // appsattic (on GitHub pages, so can be a naked domain)
    'www.appsattic.com' : 'appsattic.com',

    // envelopes.io (on Heroku, so needs a subdomain)
    'envelopes.io' : 'www.envelopes.io',

    // awssum.io (on GitHub pages, so can be a naked domain)
    'www.awssum.io' : 'awssum.io',

    // some test domains
    'localhost' : 'example.com',
};

// ----------------------------------------------------------------------------

var app = connect();

// some middleware
app.use(connect.responseTime());
app.use(uuid());
app.use(connect.logger());

// the redirection middleware
app.use(function(req, res, next) {
    // Example.com:8080
    var host = req.headers.host.split(':', 1)[0].toLowerCase();

    // see if we know about this host
    if ( map[host] ) {
        // 301 = Moved Permanently
        res.writeHead( 301, { 'Location' : 'http://' + map[host] + req.url });
        return res.end();
    }

    if ( host !== 'redirects.jit.su' ) {
        // return a Not Found (rather than a server error)
        res.writeHead(404);
        res.end('Not Found');
    }

    next();
});

// if we reach here, then we don't know about this domain, so check if it's 
app.use(function(req, res, next) {
    // see if this request is for
    var host = req.headers.host.split(':', 1)[0].toLowerCase();
    if ( host !== '' ) {
        // return a Not Found (rather than a server error)
        res.writeHead(404);
        res.end('Not Found');
    }

    next();
});

// start up the app
var port = process.env.PORT || 3000;
http.createServer(app).listen(port);

// ----------------------------------------------------------------------------
