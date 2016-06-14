module.exports = function(app) {
  app.get('/', require('./home-page').get);
  app.get('/*', require('./open_tabs').get);
}