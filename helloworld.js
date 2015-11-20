var express = require('express');

var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});

var Sin = [
	'Envy',
	'Wrath',
	'Sloth',
	'Pride',
	'Lust',
	'Greed',
	'Gluttony'
]

function getWeatherData() {
	return {
		locations: [
			{
				name: 'Portland',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.git',
				weather: 'Overcast',
				temp: '54.1 F'
			},
			{
				name: 'Bend',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.git',
				weather: 'Partly Cloudy',
				temp: '55.0 F'
			},
			{
				name: 'Manzanita',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.git',
				weather: 'Light Rain',
				temp: '55.0 F'
			}
		]
	}
}

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	if (!res.locals.partials) {
		res.locals.partials = {};
	}
	res.locals.partials.weather = getWeatherData();
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	var randomSin = Sin[Math.floor(Math.random() * Sin.length)];
	res.render('about', {Sin: randomSin});
});

app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Server started on localhost: ' + app.get('port'));
});