define(
[
], function() {

  // ...
  define(
  'create.dispatcher',
  [
    'jquery',
    'dispatcher',
  ],
  function($, Dispatcher) {
    var deferred = $.Deferred();
    $(document).ready(function($) {
      try {
        deferred.resolve(Dispatcher);
      } catch(err) {
        deferred.reject(err);
      }
    });
    return deferred.promise();
  });

  define(
  'create.router',
  [
    'jquery',
    'router',
  ],
  function($, Router) {
    var deferred = $.Deferred();
    $(document).ready(function($) {
      try {
        var router = new Router;
        deferred.resolve(router);
      } catch(err) {
        deferred.reject(err);
      }
    });
    return deferred.promise();
  });

  define(
  'create.app.view',
  [
    'jquery',
    'app.view',
  ],
  function($, AppView) {
    var deferred = $.Deferred();
    $(document).ready(function($) {
      try {
        var app_view = new AppView;
        deferred.resolve(app_view);
      } catch(err) {
        deferred.reject(err);
      }
    });
    return deferred.promise();
  });

  define(
  'create.menu.view',
  [
    'jquery',
    'menu.view',
  ],
  function($, MenuView) {
    var deffered = $.Deferred();
    $(document).ready(function($) {
      try {
        var menu_view = new MenuView;
        deffered.resolve(menu_view);
      } catch(err) {
        deffered.reject(err);
      }
      return deffered.promise();
    });
  });
  define(
  'create.home.view',
  [
    'jquery',
    'home.view',
  ],
  function($, HomeView) {
    var deffered = $.Deferred();
    $(document).ready(function($) {
      try {
        var home_view = new HomeView;
        deffered.resolve(home_view);
      } catch(err) {
        deffered.reject(err);
      }
    });
    return deffered.promise();
  });

  define(
  'create.portraits.view',
  [
    'jquery',
    'portraits.view',
  ],
  function($, Portraits) {
    var deffered = $.Deferred();
    $(document).ready(function($) {
      try {
        var portraits_view = new Portraits;
        deffered.resolve(portraits_view);
      } catch(err) {
        deffered.reject(err);
      }
    });
    return deffered.promise();
  });

  define(
  'create.nature.view',
  [
    'jquery',
    'nature.view',
  ],
  function($, Nature) {
    var deffered = $.Deferred();
    $(document).ready(function($) {
      try {
        var nature_view = new Nature;
        deffered.resolve(nature_view);
      } catch(err) {
        deffered.reject(err);
      }
    });
    return deffered.promise();
  });

  define(
  'create.commercial.view',
  [
    'jquery',
    'commercial.view',
  ],
  function($, Commercial) {
    var deffered = $.Deferred();
    $(document).ready(function($) {
      try {
        var commercial_view = new Commercial;
        deffered.resolve(commercial_view);
      } catch(err) {
        deffered.reject(err);
      }
    });
    return deffered.promise();
  });
  
  define(
  'create.gallery.view',
  [
    'jquery',
    'gallery.view',
  ],
  function($, Gallery) {
    var deffered = $.Deferred();
    $(document).ready(function($) {
      try {
        var gallery_view = new Gallery;
        deffered.resolve(gallery_view);
      } catch(err) {
        deffered.reject(err);
      }
    });
    return deffered.promise();
  });

  define(
  'create.kids.view',
  [
    'jquery',
    'kids.view',
  ],
  function($, Kids) {
    var deffered = $.Deferred();
    $(document).ready(function($) {
      try {
        var kids_view = new Kids;
        deffered.resolve(kids_view);
      } catch(err) {
        deffered.reject(err);
      }
    });
    return deffered.promise();
  });
});
