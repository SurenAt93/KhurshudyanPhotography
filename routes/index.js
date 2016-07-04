module.exports = function(app) {
  app.get('/', 								require('./home-page').get);
  app.get('/get_images_count', 	require('./get_images_count').get);
}