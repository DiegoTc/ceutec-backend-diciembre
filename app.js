
const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());
const fecha = new Date();
const mesActual = fecha.getMonth() + 1;
var fec = new Date();

// default URL to API
app.use("/mes", function (req, res) {
    console.log(mesActual);
    return mesActual;
});


// default URL to API
app.use("/", function (req, res) {
    json_res = JSON.stringify(mesActual);
    res.send( json_res);
});


const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug("Server Escuchando el puerto " + port);

/*
//cambios en installation de nodemon y express en nueva carpeta para subir completo
var http = require('http');
var url = require('url');
const express = require("express");
const app = express();
app.use(express.json());
http.createServer(function (req, res) {

      res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // If needed
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type', // If needed
        'Access-Control-Allow-Credentials': true
    });
    var q = url.parse(req.url, true);
    var qdata = q.query;
    var accion = qdata.accion;
     if (accion == "insert" || accion == "select" || accion == "update" || accion == "delete" ) {
        switch (accion) {
          case "insert":
            break;
          case "update":
            break;
          case "delete":
            break;
          case "select":
                //console.debug("Hola.. ");
                var fechaPar = new date();
                let json_res = fechaPar.setMonth( fechaPar.getMonth() +1);
                json_res = JSON.stringify(json_res);
                res.end(json_res);
            break;
          default:
            let mensaje = {
              mensaje: "Accion no definida!",
              id: 0,
              registros_insertados: 0,
            };
             json_res = JSON.stringify(mensaje);
            res.end(json_res);
            break;
        }
     }
})
const server = http.createServer(app);
const port = 3000;
server.listen(port);
  */