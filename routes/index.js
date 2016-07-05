module.exports = function(app) {
  app.get('/', 								require('./home-page').get);
  app.get('/get_images_count', 	require('./get_images_count').get);
  app.get('/portraits/*', require('./send_single_image_page').get);
  app.get('/nature/*', require('./send_single_image_page').get);
}