// server.js

var mockup = require('./recipes');
var recipes = mockup.recipes();
var nextId = mockup.getNextId();

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

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*"); //CORS accepted
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); //cors accepted
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // cors accepted
    console.log('request');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// on routes that end in /recipes
// ----------------------------------------------------
router.route('/recipes')

    // create a submission (accessed at POST http://localhost:8080/api/recipes)
    .post(function(req, res) {
        
		var recipe = req.body;
                recipe.id = nextId;
                recipes[nextId] = recipe;
                nextId++;
                
		
		res.json(recipe);
    })
	
	// get all the recipes (accessed at GET http://localhost:8080/api/recipes)
    .get(function(req, res) {
       
                console.log(recipes);
            res.json(recipes);
       
    });
	
// on routes that end in /recipes/:recipe_id
// ----------------------------------------------------
router.route('/recipes/:recipe_id')

    // get the submission with that id (accessed at GET http://localhost:8080/api/recipes/:recipe_id)
    .get(function(req, res) {
		var id = req.params.recipe_id;
		
		if(typeof(recipes[id]) === 'undefined'){
			res.status(404).send('Not found');
		}else{
			console.log(recipes[id]);
			res.json(recipes[id]);
		}
    })
	
     // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .post(function(req, res) {
		
		var id = req.params.recipe_id;
		
		if(typeof(recipes[id]) === 'undefined'){
			res.status(404).send('Not found');
		}else{
			console.log(recipes[id]);
			recipes[id] = req.body;
                        res.json(recipes[id]);
		}
		
		
    })    
        
	 // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
		
		var id = req.params.recipe_id;
		
		if(typeof(recipes[id]) === 'undefined'){
			res.status(404).send('Not found');
		}else{
			console.log(recipes[id]);
			recipes[id] = req.body;
                        res.json(recipes[id]);
		}
		
		
    })
	
	 // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
		
		var id = req.params.recipe_id;
		
		if(typeof(recipes[id]) === 'undefined'){
			res.status(404).send('Not found');
		}else{
			delete recipes[id];
			console.log(recipes);
			res.json({ message: 'Successfully deleted' });
		}
		
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);