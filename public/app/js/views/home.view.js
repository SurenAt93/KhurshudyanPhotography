define(
[
  'jquery',
  'backbone',
  'underscore',
],
function($, Backbone, _) {

  return Backbone.View.extend({

    el: '#home',

    events: {
      'click #play_video': 'play_video',
    },

    initialize: function() {
      var self = this;
      this.$('video').bind('ended', _.bind(self.reload_video, this));
    },

    play_video: function(e) {
      this.$('video')[0].play();
      this.$('#play_video').hide();
    },

    reload_video: function(e) {
      var src = this.$('video > source').attr('src');
      this.$('video > source').attr('src', '');
      this.$('video > source').attr('src', src);
      this.$('video')[0].load();
      this.$('#play_video').fadeIn(200);
    }

  })

})