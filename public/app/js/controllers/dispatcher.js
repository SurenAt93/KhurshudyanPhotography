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

      open_portraits: function() {
        $('body').data('active_view', 'portraits');
        $('body').data('preload', true);
        if($('#portraits .image_container').html()) {
          $('#content').children().hide();
          $('#portraits').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.portraits.view',
          ], function(PortraitsView) {
            PortraitsView
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
        $('.mobile-inner-nav').find('a[value=portraits]').addClass('selected');
        Backbone.history.navigate('portraits');
      },

      open_nature: function() {
        $('body').data('active_view', 'nature');
        $('body').data('preload', true);
        if($('#nature .image_container').html()) {
          $('#content').children().hide();
          $('#nature').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.nature.view',
          ], function(NatureView) {
            NatureView
              .then(
                function(natureView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=nature]').addClass('selected');
        Backbone.history.navigate('nature');        
      },

      open_gallery: function() {
        $('body').data('active_view', 'gallery');
        $('body').data('preload', true);
        if($('#gallery_o .image_container').html()) {
          $('#content').children().hide();
          $('#gallery_o').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.gallery.view',
          ], function(WtpView) {
            WtpView
              .then(
                function(wtpView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=gallery]')
                              .addClass('selected');
        Backbone.history.navigate('gallery');
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

      open_kids: function() {
        $('body').data('active_view', 'kids');
        $('body').data('preload', true);
        if($('#kids .image_container').html()) {
          $('#content').children().hide();
          $('#kids').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.kids.view',
          ], function(KidsView) {
            KidsView
              .then(
                function(kidsView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('kids');
      }

    }
  }

  dispatcher.on({
    'open:home':                  api.open_menu_tabs.open_home,
    'open:portraits':             api.open_menu_tabs.open_portraits,
    'open:nature':                api.open_menu_tabs.open_nature,
    'open:gallery':               api.open_menu_tabs.open_gallery,
    'open:commercial':            api.open_menu_tabs.open_commercial,
    'open:about':                 api.open_menu_tabs.open_about,
    'open:contact':               api.open_menu_tabs.open_contact,
    'open:kids':                  api.open_menu_tabs.open_kids,
  })

  return dispatcher;

});
