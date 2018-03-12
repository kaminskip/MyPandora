// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes'));

// START THE SERVER
// =============================================================================
var server = app.listen( process.env.PORT || 8888, function(){
    console.log('Pandora API gateway started on ' + server.address().port);
});