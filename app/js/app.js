require({
  paths: {
    // libs
    'jquery':               '../vendor/jquery/jquery',

    'backbone':             '../vendor/backbone/backbone',
    'underscore':           '../vendor/underscore/underscore',
    'handlebars':           '../vendor/handlebars/handlebars',
    'modernizr':            '../vendor/modernizr/modernizr.custom',
    'toucheffects':         '../vendor/toucheffects/toucheffects',

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
  }
});

requirejs(['lazyLoader'], function() {
  console.log('app is runing!');

  requirejs(
  [
    'jquery',
    'backbone',
    'create.dispatcher',
    'create.app.view',
    'create.menu.view',
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
      // var vid = document.getElementById("bgvid");
      // var pauseButton = document.querySelector("#polina button");

      // function vidFade() {
      //   vid.classList.add("stopfade");
      // }

      // vid.addEventListener('ended', function()
      // {
      // // only functional if "loop" is removed 
      // vid.pause();
      // // to capture IE10
      // vidFade();
      // }); 


      // pauseButton.addEventListener("click", function() {
      //   vid.classList.toggle("stopfade");
      //   if (vid.paused) {
      //     vid.play();
      //     pauseButton.innerHTML = "Pause";
      //   } else {
      //     vid.pause();
      //     pauseButton.innerHTML = "Paused";
      //   }
      // })


    });
  });
});
