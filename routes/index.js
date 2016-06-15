module.exports = function(app) {
  app.get('/', require('./home-page').get);
  app.get('/portraits', require('./open_tabs').get);
  app.get('/get_portraits_images_count', require('./get_portraits_images_count').get);
}