var path = require('path');

module.exports.get = function(req, res) {
  console.log(req.originalUrl);
  res.render('index', {fb_img_url: 'app/img/main.jpg'});
}