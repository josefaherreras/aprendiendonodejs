//leer archivo en NodeJS
var http = require("http"),
fs = require("fs");

//servidor
http.createServer(function(req , res){
    fs.readFile("./index.html", function(err, html){
         //convertir el codigo en una cadena
        var html_string = html.toString();
        var expresion = /[^\{\}]+(?=\})/g;

        //match expresion regular 
        //  que busque lo que está dentro de las {}
        var variables = html_string.match(expresion);//encontrar donde hay {} y convertirlo en arreglo

        var nombre = "CodigoFacitilo";

        //variable ['nombre']
        for(var i = variables.length -1 ; i >=0; i--){
            //lo ejecuto como codigo de js
            //Para obtener el valor de dicha variable
            var value = eval(variables[i]);

            //remplazar el contenido con {} por su valor correspondiente
            html_string = html_string.replace("{"+variables[i]+"}",value);
        };

        //mandamos el contenido
        res.writeHead(200,{"content-type":"text/html"}) 
        res.write(html_string);
        res.end();//cerrar conexion
    });
}).listen(8080);