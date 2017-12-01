var express = require('express');
var path = require('path');
var mysql = require('mysql');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

/*var authenticateController=require('./routes/authenticate-controller');*/
var registerController=require('./routes/registerController');

var app = express();

var connection = mysql.createConnection({
	
	host : 'localhost',
	user : 'root',
	password : '1234',
	database : 'test'
});

connection.connect(function(err){
	if(!err)
		{
		console.log('Database is connected');
		}
	else
		{
		console.log('Error while connecting with database');
		}
	
});

module.exports = connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/* route to handle Registration & Login */ 

app.post('/api/register',registerController.register);
/*app.post('/api/authenticate',authenticateController.authenticate);*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log(err);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(8000,function(req,res){
	
	console.log('Server Starts at port :8000');
	
});
module.exports = app;
