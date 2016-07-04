var fs = require('fs');

module.exports.get = function(req, res) {
  var folder_name = req.query.folder_name;
  fs.readdir(__dirname + '/../public/app/img/' + folder_name, function(err, items) {
    res.send({
      img_count: items.length
    });
  });
}