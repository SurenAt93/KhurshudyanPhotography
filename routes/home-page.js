var path = require('path');

module.exports.get = function(req, res) {
  res.render('index', {fb_img_url: 'app/img/fb_share.jpg'});
}