define(
[
  'backbone'
],
function(Backbone) {

  var dispatcher = _.extend({}, Backbone.Events);

  var api = {
    open_menu_tabs: {

      open_home: function() {
        if($('#home').html()) {
          $('#content').children().hide();
          $('#home').fadeIn(150);
        } else {
          requirejs(
          [
            'image!app/img/main_slide/1.jpg',
            'image!app/img/main_slide/2.jpg',
            'image!app/img/main_slide/3.jpg',
            'image!app/img/main_slide/4.jpg',
            'image!app/img/main_slide/5.jpg',
            'image!app/img/main_slide/6.jpg',
          ],
          function() {
          });
          $('#loading').fadeIn(400);
          require(
          [
            'create.home.view',
          ], function(HomeView) {
            HomeView
              .then(
                function(homeView) {
                  $('#content').children().hide();
                  $('#home').fadeIn(150);
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=home]').addClass('selected');
        Backbone.history.navigate('home');
      },

      open_contact: function() {
        if($('#contact').html()) {
          $('#content').children().hide();
          $('#contact').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'image!app/img/contacts/main_contacts.jpg'
          ], function(ContactImg) {
            $('#content').children().hide();
            $('#contact')
              .css('background-image',
              'url("app/img/contacts/main_contacts.jpg")')
              .fadeIn(150);
            $('#loading').fadeOut(500);
          });
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=contact]').addClass('selected');
        Backbone.history.navigate('contact');        
      },

      open_commercial: function() {
        if($('#commercial').html()) {
          $('#content').children().hide();
          $('#commercial').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.commercial.view',
          ], function(CommercialView) {
            CommercialView
              .then(
                function(commercialView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('commercial');        
      },
    },

    open_gallery_tabs: {

      generate_view: function(options) {
        var dom_elem = options.dom_elem;
        var view     = options.view;
        $('body').data('active_view', view);
        $('body').data('preload', true);
        if($(dom_elem + ' .image_container').html()) {
          $('#content').children().hide();
          $(dom_elem).fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.gallery_section.view',
          ], function(GallerySectionView) {
            GallerySectionView(view, dom_elem)
              .then(
                function(portraitsView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=' + view + ']').addClass('selected');
        Backbone.history.navigate(view);
      }
    }
  }

  dispatcher.on({
    'open:home':                    api.open_menu_tabs.open_home,
    'open:about':                   api.open_menu_tabs.open_about,
    'open:contact':                 api.open_menu_tabs.open_contact,
    'open:commercial':              api.open_menu_tabs.open_commercial,
    // gallery tabs
    'open:gallery_view_generator':  api.open_gallery_tabs.generate_view,
  })

  return dispatcher;

});
