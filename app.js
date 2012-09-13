// ----------------------------------------------------------------------------
//
// app.js - the app for my redirects
//
// ----------------------------------------------------------------------------

var http    = require('http');
var fs      = require('fs');

var connect = require('connect');
var uuid    = require('connect-uuid');

var map     = require('./map.js');

// ----------------------------------------------------------------------------

var app = connect();

// some middleware
app.use(connect.logger());

// the redirection middleware (comes first, so it is faster)
app.use(function(req, res, next) {
    // Example.com:8080
    var host = req.headers.host.split(':', 1)[0].toLowerCase();

    // see if we know about this host
    if ( map[host] ) {
        // 301 = Moved Permanently
        res.writeHead( 301, { 'Location' : 'http://' + map[host] + req.url });
        return res.end();
    }

    next();
});

// now do the favicon and the static files
app.use(connect.favicon());
app.use(connect.static('public/'))

// serve up some pages so it is easy (no templating needed here)
var cache = {};
var pages = {
    '/'           : 'index.html',
    '/index'      : 'index.html',
    '/index.htm'  : 'index.html',
    '/index.html' : 'index.html',
};
app.use(function(req, res, next) {
    var path = req._parsedUrl.pathname;

    var pagename = pages[path];
    if ( !pagename ) {
        // not a page we know about
        next();
    }

    // check the cache for this page
    if ( cache[pagename] ) {
        return res.end(cache[pagename]);
    }

    // read the file and send it out
    fs.readFile('views/' + pages[path], 'utf8', function(err, data) {
        if (err) next(err);
        cache[pages[path]] = data;
        res.end(data);
    });
});

// don't know what this is, so 404 it
app.use(function(req, res, next) {
    // we don't know about this domain, so 404 it
    res.writeHead(404);
    return res.end('Not Found');
});

// start up the app
var port = process.env.PORT || 3000;
http.createServer(app).listen(port);

// ----------------------------------------------------------------------------
