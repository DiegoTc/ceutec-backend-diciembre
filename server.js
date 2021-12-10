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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    const fecha = new Date();
    const mesActual = fecha.getMonth() + 1;
    res.json(mesActual);
    //res.json({ mesActual });
});

//Este fue Marcelo siuuuuu
var elcodigo = express.Router();

elcodigo.get('/', function(req,res){
    fechaactual = new Date();
    var primeroenero = new Date(fechaactual.getFullYear(), 0, 1);
    var numdias = Math.floor((fechaactual - primeroenero) / (24 * 60 * 60 * 1000));
    var resultado = Math.ceil((fechaactual.getDay() + 1 + numdias) / 7);
    console.log(`El numero de la semana de la fecha actual (${fechaactual}) es ${resultado}.`);
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/mes', router);
app.use('/numsemana',elcodigo);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);