require({
  waitSeconds: 67,
  paths: {
    // libs
    'jquery':               '../vendor/jquery/jquery',
    'jquery.mouse':         '../vendor/jquery/mousewheel',
    'jquery.easing':        '../vendor/jquery/easing',

    'backbone':             '../vendor/backbone/backbone',
    'underscore':           '../vendor/underscore/underscore',
    'handlebars':           '../vendor/handlebars/handlebars',
    'modernizr':            '../vendor/modernizr/modernizr.custom',
    'toucheffects':         '../vendor/toucheffects/toucheffects',

    // Require.js components
    'require.text':         '../vendor/require/requrie_text',
    'image':                '../vendor/require/image',
    // facebook sdk
    'facebook':             '//connect.facebook.net/en_US/sdk',
    'fb':                   'fb/fb',
    // Workflow
    'lazyLoader':           'workflow/lazyLoader',
    // Controller
    'router':               'controllers/router',
    'dispatcher':           'controllers/dispatcher',
    // views
    'app.view':             'views/app.view',
    'menu.view':            'views/menu.view',
    'home.view':            'views/home.view',
    'portraits.view':       'views/portraits.view',
    'nature.view':          'views/nature.view',
    'commercial.view':      'views/commercial.view',
    'wtp.view':             'views/wtp.view',

  },

  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone',
    },
    'underscore': {
      exports: '_',
    },
    'jquery': {
      exports: ['$', 'jQuery']
    },
    'handlebars': {
      exports: 'Handlebars',
    },

    'modernizr': {
      exports: 'Modernizr',
    },
    'jquery.mouse': {
      deps: ['jquery'],
    },
    'jquery.easing' : {
      deps: ['jquery'],
    }, 
    shim: {
    'facebook' : {
      exports: 'FB'
    }
  },
  }
});

define('jquery.mousewheel',
  [
    'jquery',
    'jquery.mouse',
  ], function($) {
    return $;
  })


// require fb sdk async
require(['fb']);

// require app
requirejs(['lazyLoader'], function() {
  console.log('app is runing!');

  requirejs(
  [
    'jquery',
    'backbone',
    'create.dispatcher',
    'create.app.view',
    'create.menu.view',
    'create.router',
  ],
  function($, Backbone, Test) {
    Backbone.history.start();
    requirejs(
    [
      'image!app/img/main.jpg',
    ],
    function(test_image) {
      setTimeout(function() {
        $('#loading').fadeOut(500);
      }, 0.5);
    });
  });
});
