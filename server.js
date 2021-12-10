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
    const mesActual = fecha.getMonth();
    let mesEnvia =""; 
    let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    mesEnvia = meses[mesActual];
    console.log(mesEnvia);
    res.json(mesEnvia);
    //res.json({ mesActual });
});

//Este fue Marcelo siuuuuu
var elcodigo = express.Router();

elcodigo.get('/', function(req,turu){
    fechaactual = new Date();
    var primeroenero = new Date(fechaactual.getFullYear(), 0, 1);
    var numdias = Math.floor((fechaactual - primeroenero) / (24 * 60 * 60 * 1000));
    var resultado = Math.ceil((fechaactual.getDay() + 1 + numdias) / 7);
    turu.json(resultado);
    console.log(`El numero de la semana de la fecha actual (${fechaactual}) es ${resultado}.`);
})

var dayweek = express.Router();
dayweek.get('/', function(req,res){

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const DiaActual = days[today.getDay()];
    res.json(DiaActual)

})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/mes', router);
app.use("/mesNm", router);
app.use('/numsemana',elcodigo);
app.use('/day',dayweek);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

 

//CRISTIAM reportandose..
