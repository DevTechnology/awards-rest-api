var express = require('express');
var path = require('path');
var logger = require('morgan');
var config = require('./config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes/routes');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var app = express();
var swagger = require('swagger-jsdoc');
var swaggerDefinition = {
	info: {
		title: 'Dev Technology Awards REST API',
		version: '0.7.1',
		description: 'NodeJS RESTful Web Service API with a focus on Corporate Awards Use Cases'
	},
	host: config.server_host+':'+config.server_port,
	basePath: '/'
};

var swaggerOptions = {
	swaggerDefinition: swaggerDefinition,
	apis: ['./routes/*.js']
};

var swaggerSpec = swagger(swaggerOptions);

// Setup swagger route
app.get('/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

var env = config.env; 

if (process.argv[2]) {
	env = process.argv[2];
}

console.log("ENV >>> " + env);

app.set('api-secret', config.secret);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

	if (req.method === 'OPTIONS') {
		res.writeHead(200, res.headers);
		res.end();
	} else {
		next();
	}
});

app.use(express.static('public'));

app.use(config.apiroot, routes);

var server = app.listen(config.server_port, function() {
	var port = server.address().port;
	console.log("Listening on port: %s", port);
});

module.exports = server;
