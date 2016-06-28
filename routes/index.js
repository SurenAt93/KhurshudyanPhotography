module.exports = function(app) {
  app.get('/', 								require('./home-page').get);
  app.get('/portraits', 					require('./open_tabs').get);
  app.get('/get_portraits_images_count', 	require('./get_portraits_images_count').get);
  app.get('/get_nature_images_count', 		require('./get_nature_images_count').get);
  app.get('/get_gallery_images_count', 		require('./get_gallery_images_count').get);
  app.get('/get_kids_images_count', 		require('./get_kids_images_count').get);
  app.get('/get_commercial_images_count', 	require('./get_commercial_images_count').get);

  app.get('/get_other_images_count', 		require('./get_other_images_count').get);
  app.get('/get_photo_shoot_images_count', 	require('./get_photo_shoot_images_count').get);
  app.get('/get_product_images_count', 		require('./get_product_images_count').get);
  app.get('/get_wedding_day_images_count', 	require('./get_wedding_day_images_count').get);
}