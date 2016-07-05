module.exports.get = function(req, res) {
	var image_url = req.originalUrl.substr(1);
	res.redirect('/#' + image_url);
}