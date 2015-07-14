// server.js

var mockup = require('./recipes');
var recipes = mockup.recipes();

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
    console.log('request.');
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
        
		//we assume the objects are well formed
		var list = req.body;
		for (var id in list) {
			if (list.hasOwnProperty(id)) {
				if(typeof(recipes[id]) === 'undefined'){
					recipes[id] = list[id];
					console.log('inserted '+id);
				}
			}else{
				console.log('already existing '+id);
			}
		}
		
		res.json({ message: 'Submission created!' });
    })
	
	// get all the recipes (accessed at GET http://localhost:8080/api/recipes)
    .get(function(req, res) {
       
			console.log('get all recipes');
            res.json(recipes);
       
    });
	
// on routes that end in /recipes/:submission_id
// ----------------------------------------------------
router.route('/recipes/:submission_id')

    // get the submission with that id (accessed at GET http://localhost:8080/api/recipes/:submission_id)
    .get(function(req, res) {
		var id = req.params.submission_id;
		
		if(typeof(recipes[id]) === 'undefined'){
			res.status(404).send('Not found');
		}else{
			console.log('get submission '+id);
			res.json(recipes[id]);
		}
    })
	
	 // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
		
		var id = req.params.submission_id;
		
		if(typeof(recipes[id]) === 'undefined'){
			res.status(404).send('Not found');
		}else{
			console.log('submission '+id+' updated');
			recipes[id] = req.body;
		}
		
		res.json({ message: 'Submission updated!' });
    })
	
	 // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
		
		var id = req.params.submission_id;
		
		if(typeof(recipes[id]) === 'undefined'){
			res.status(404).send('Not found');
		}else{
			delete recipes[id];
			console.log('submission '+id+' deleted');
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