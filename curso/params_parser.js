//exports

function parse(req) {
    /*********PARAMETROS URL********/

       
    var arreglo_parametros = [] , parametros ={};//hash de parametros
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
    return parametros; //JSON con valores de los parametros
}

module.exports.parse = parse ; //publico