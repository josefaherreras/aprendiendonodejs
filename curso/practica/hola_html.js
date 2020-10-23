//leer archivo en NodeJS
var http = require("http"),
fs = require("fs");

//levantar servidor
//req -> solicitud
//res -> respuesta
http.createServer(function(req , res){
    //retorna el contenido del archivo
    //programación asincrona -> nunca para el programa, si produce error continua con el siguiente
    //html como el cuerpo de la respuesta en el servidor
    fs.readFile("./index.html", function(err, html){
        res.writeHead(200,{"content-type":"application/json"})//encabezado de la respuesta //200 -> que todo salió bien 
        //res.write(html);//respuesta al navegador
        res.write(JSON.stringify({nombre:"Uriel", username:"uriel"}));
        res.end();//cerrar conexion
    });
}).listen(8080);