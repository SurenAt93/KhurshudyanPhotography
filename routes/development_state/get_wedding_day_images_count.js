var fs = require('fs');

module.exports.get = function(req, res) {
  fs.readdir(__dirname + '/../public/app/img/wedding_day', function(err, items) {
    res.send({
      img_count: items.length
    });
  });
}
