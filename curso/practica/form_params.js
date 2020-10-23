//leer archivo en NodeJS
var http = require("http"),
fs = require("fs"),
parser = require("./params_parser.js"); // nos entrega el objeto

var p = parser.parse;

//servidor
http.createServer(function(req , res){

    if(req.url.indexOf("favicon.ico")>0){return;}

    fs.readFile("./index.html", function(err, html){
         //convertir el codigo en una cadena
        var html_string = html.toString();
        var expresion = /[^\{\}]+(?=\})/g;
        
        var variables = html_string.match(expresion);
        var nombre = "";

        var parametros = p(req);


        for(var i = variables.length -1 ; i >=0; i--){
            var variable = variables[i];
            //parametros[variable]
            //parametros[nombre]
            html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]);
        };

        res.writeHead(200,{"content-type":"text/html"}) 
        res.write(html_string);
        res.end();
    });
}).listen(8080);
