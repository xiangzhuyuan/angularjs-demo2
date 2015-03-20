/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api');

var app = express();

var pg = require('pg').native,
    connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/angularjsdemo1',
    client,
    query;

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {
    layout: false
});
var connect        = require('connect')
var methodOverride = require('method-override')
var compression = require('compression')
var bodyParser = require('body-parser')
var errorHandler = require('errorhandler')

app.use(compression())
app.use(bodyParser.json())

app.use(methodOverride('X-HTTP-Method'))          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
app.use(methodOverride('X-Method-Override'))      // IBM

app.use(express.static(__dirname + '/public'));


var env = process.env.NODE_ENV || 'development'

if ('development' == env) {
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
}
if ('production' == env) {
    app.use(errorHandler());
}

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/api/posts', api.posts);
app.get('/api/post/:id', api.post);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);


// Start server

app.listen(3000, function(){
    console.log("app started...")
});
