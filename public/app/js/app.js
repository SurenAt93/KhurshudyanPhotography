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

    // commercial page effects
    'commercial.main':      '../vendor/commercial_effects/main',
    'commercial.classie':   '../vendor/commercial_effects/classie',
    'commercial.dynamics':  '../vendor/commercial_effects/dynamics.min',

    // Require.js components
    'require.text':         '../vendor/require/requrie_text',
    'image':                '../vendor/require/image',
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
    'gallery.view':         'views/gallery.view',
    'kids.view':            'views/kids.view',
    'wedding_day.view':     'views/wedding_day.view',
    'product.view':         'views/product.view',
    'photo_shoot.view':     'views/photo_shoot.view',
    'other.view':           'views/other.view',

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
    'commercial.classie': {
      exports: 'classie',
    },
  },
});

define('jquery.mousewheel',
  [
    'jquery',
    'jquery.mouse',
  ], function($) {
    return $;
  })

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
  function($, Backbone) {
    Backbone.history.start();
  });
});
