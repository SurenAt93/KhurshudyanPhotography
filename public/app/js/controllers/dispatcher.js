define(
[
  'backbone'
],
function(Backbone) {

  var dispatcher = _.extend({}, Backbone.Events);

  var api = {
    open_menu_tabs: {

      open_home: function() {
        if(/*$('#home').html()*/false) {
          $('#content').children().hide();
          $('#home').fadeIn(150);
        } else {
          require(
          [
            'create.home.view',
          ], function(HomeView) {
            console.log(HomeView);
            HomeView
              .then(
                function(homeView) {
                  $('#content').children().hide();
                  $('#home').fadeIn(150);
                  $('#play_video').show();
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

      open_when_talking_pictures: function() {
        if($('#when_talking_pictures .image_container').html()) {
          $('#content').children().hide();
          $('#when_talking_pictures').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.wtp.view',
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
        $('.mobile-inner-nav').find('a[value=when_talking_pictures]')
                              .addClass('selected');
        Backbone.history.navigate('when_talking_pictures');
      },

      open_commercial: function() {
        if($('#commercial .image_container').html()) {
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


    }
  }

  dispatcher.on({
    'open:home':                  api.open_menu_tabs.open_home,
    'open:portraits':             api.open_menu_tabs.open_portraits,
    'open:nature':                api.open_menu_tabs.open_nature,
    'open:when_talking_pictures': api.open_menu_tabs.open_when_talking_pictures,
    'open:commercial':            api.open_menu_tabs.open_commercial,
    'open:about':                 api.open_menu_tabs.open_about,
    'open:contact':               api.open_menu_tabs.open_contact,
  })

  return dispatcher;

});
