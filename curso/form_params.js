//leer archivo en NodeJS
var http = require("http"),
fs = require("fs");

//servidor
http.createServer(function(req , res){

    if(req.url.indexOf("favicon.ico")>0){return;}

    fs.readFile("./index.html", function(err, html){
         //convertir el codigo en una cadena
        var html_string = html.toString();
        var expresion = /[^\{\}]+(?=\})/g;
        var arreglo_parametros = [] , parametros ={};//hash de parametros
        var variables = html_string.match(expresion);
        var nombre = "";


       if(req.url.indexOf("?") > 0){
            //http://localhost:8080/?nombre=josefa&data=algo => ['/','nombre=josefa&data=algo']
            //$PATH
            var url_data = req.url.split("?");
            var arreglo_parametros = url_data[1].split("&");
            //[nombre=josefa,data=algo]
        }
        
        for(var i = arreglo_parametros.length -1 ; i>=0 ;i--){
            var parametro =arreglo_parametros[i];
            //nombre=josefa
            var param_data = parametro.split("=");
            //[nombre,josefa]
            parametros[param_data[0]] = param_data[1];
            //{nombre: josefa}
        }


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
