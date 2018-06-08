const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//get time from middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log.');
		}
	});
	next();

});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

// app.get('/', (req, res, next) => {

// 	//res.send('<h1>Hello Express!</h1>');
// 	res.send({
// 		name: 'Andres',
// 		liks: [
// 			'Nike',
// 			'Bike'
// 		]
// 	});
// });
// 
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website'
	});

});

app.get('/about', (req, res, next) => {
	// res.write('About Page');
	// next();
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

// app.get('/about', (req, res, next) => {

// 	res.write('Hello World');
// 	res.end();
// });

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

//set heroku 
app.listen(port, () => {
	console.log('Server is up on port 3000');
});