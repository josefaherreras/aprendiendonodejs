var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");//mapeando una clase que es un modelo con una tabla.
// ¿Qué es la Mongoose? Mangosta es un Object Document Mapper (ODM).
// Esto significa que Mongoose le permite definir objetos con un esquema fuertemente tipado
// que se asigna a un documento MongoDB. Mongoose proporciona una increíble cantidad de funcionalidades
// para crear y trabajar con esquemas.
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/fotos",
 {useNewUrlParser: true}) .then(() => { console.log("La Conexion a MongoDB se ha realizado Conrrectamente!!"); }) .catch(err => console.log(err));


 //los esquemas corresponden a una coleccion a la base de datos en mongodb, la funcionalidad 
 //de los esquemas es definir la forma que tienen nuestros documentos en la coleccion de mongo

 //esquema => colecciones => tablas
 //documentos => filas
var userSchemaJSON = {
    email: String,
    password: String
}

var user_schema = new Schema(userSchemaJSON);//crear objeto / estructura de nuestra tabla

//modelo con la conexion a la base de datos
var User = mongoose.model("User",user_schema);

//middlewares
app.use(express.static('public'));//archivos que no cambian , son estaticos

app.use(bodyParser.json());//extraer parametros / peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));// parsing de la libreria 


//motor de vista
app.set("view engine","jade");

//declarar ruta con express
app.get("/", function (req,res) {
    res.render("index");
});

app.get("/login", function (req,res) {
    User.find(function(err,doc){
        console.log(doc);
        res.render("login");
    })
});

app.post("/users", function(req,res){
    // console.log("Email :" + req.body.email);
    // console.log("Contraseña :" + req.body.password);

    var user = new User({email: req.body.email, password: req.body.password});

    //guardar usuario
    user.save(function(){
        res.send("Guardamos tus datos");
    });
});



//servidor
app.listen(8080); //callback