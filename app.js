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
        'chilts.com' : 'chilts.org',
    'www.chilts.com' : 'chilts.org',
         'chilts.me' : 'chilts.org',
     'www.chilts.me' : 'chilts.org',

    // appsattic (on GitHub pages, so can be a naked domain)
        'www.appsattic.com' : 'appsattic.com',
        'appsatticdemo.com' : 'appsattic.com',
    'www.appsatticdemo.com' : 'appsattic.com',

    // envelopes.io (on Heroku, so needs a subdomain)
    'envelopes.io' : 'www.envelopes.io',

    // cssminifier.com (on Heroku, so needs a subdomain)
    'cssminifier.com' : 'www.cssminifier.com',

    // some test domains
    'local.host' : 'example.com'
};

var index = "<!doctype html><head><title>Redirect Service</title></head><body>Coming Soon!</body></html>\n";

// ----------------------------------------------------------------------------

var app = connect();

// some middleware
// app.use(connect.responseTime());
// app.use(uuid());
// app.use(connect.logger());

// the redirection middleware
app.use(function(req, res, next) {
    // Example.com:8080
    var host = req.headers.host.split(':', 1)[0].toLowerCase();

    // if this is asking for the actual site, check it is for / and show them the index file
    if ( host === 'redirects.jit.su' || host === 'redirects.nodejitsu.com' || host === 'localhost' ) {
        if ( req.url === '/' ) {
            return res.end(index);
        }
        // else, not found
        res.writeHead(404);
        return res.end('Not Found');
    }

    // see if we know about this host
    if ( map[host] ) {
        // 301 = Moved Permanently
        res.writeHead( 301, { 'Location' : 'http://' + map[host] + req.url });
        return res.end();
    }

    // we don't know about this domain, so 404 it
    res.writeHead(404);
    res.end('Not Found');
});

// start up the app
var port = process.env.PORT || 3000;
http.createServer(app).listen(port);

// ----------------------------------------------------------------------------
