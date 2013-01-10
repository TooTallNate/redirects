// ----------------------------------------------------------------------------
//
// Adding your Domain Redirection
//
// When adding your domain or domains, please add your stanza into the correct
// place according to your GitHub username. This is so that I don't keep
// getting conflicts when I merge pull requests.
//
// * your github username
// * the domain(s) you are redirecting FROM
// * the domain(s) you are redirecting TO
//
// e.g.
//
//  // chilts
//  'www.chilts.org' : 'chilts.org',
//  'www.chilts.com' : 'chilts.org', // feel free to add comments here
//      'chilts.com' : 'chilts.org',
//
// ----------------------------------------------------------------------------

module.exports = exports = {
    // appsattic
        'www.appsattic.com' : 'appsattic.com',
        'appsatticdemo.com' : 'demo.appsattic.com',
    'www.appsatticdemo.com' : 'demo.appsattic.com',
             'envelopes.io' : 'www.envelopes.io',    // Heroku
          'cssminifier.com' : 'www.cssminifier.com', // Heroku
          'www.appsdns.net' : 'appsattic.com',
              'appsdns.net' : 'appsattic.com',
               'www.hex.gd' : 'hex.gd',

    // chilts
         'www.chilts.org' : 'chilts.org',
             'chilts.com' : 'chilts.org',
         'www.chilts.com' : 'chilts.org',
              'chilts.me' : 'chilts.org',
          'www.chilts.me' : 'chilts.org',
     'www.nodejs.geek.nz' : 'nodejs.geek.nz',

    // DO NOT ADD YOUR USERNAME and DOMAINS BELOW THIS LINE.

    // If you are adding your username last in this list, please _include_ the final
    // comma so that the next person doesn't have to change your stanza. :)
};

// ----------------------------------------------------------------------------
