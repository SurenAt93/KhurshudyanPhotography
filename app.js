const http = require('http');
const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

var app = express();

const server = http.createServer(app);
app.use(favicon(__dirname + '/public/app/img/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', __dirname + '/views');
// TODO: Suren: Create view engine
app.use(express.static(__dirname + '/public'));

require('./routes')(app);

server.listen(process.env.PORT || config.get('port'), function() {
	console.log('server running ');
});