// Carrie Barrett
// CS 290

// start with code from lecture
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5357);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// my code below
var session = require('express-session');
app.use(session({secret:'DoNotTell'}));

app.get('/', function(req, res) {
	var context = {};
	if(!req.session.name) {
		res.render('new', context);
		return
	}
	context.name = req.session.name;
	res.render('new');
});

app.post('/', function(req, res) {
	var context = {};
	if (req.body[nameSubmit]) {
		req.session.name = req.body.name;
	}

	if(!req.session.name) {
		res.render('new', context);
		return
	}

	if(req.body['ageSubmit']) {
		req.session.age = req.body.age;
	}

	if (req.body['eyeSubmit']){
		req.session.eye = req.body.eye;
	}

	context.name = req.session.name;
	context.age = req.session.age;
	context.eye = req.session.eye;
	console.log(context);
	res.render('forms', context);

});

// code from lecture continues
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
