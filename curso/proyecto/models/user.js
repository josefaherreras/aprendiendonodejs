var mongoose = require("mongoose");
//mongoose tiene un atributo que mapea que nos retorna un objeto que es el atributo schema
//este es un constructor para que podamos generar nuestros esquemas
var Schema = mongoose.Schema;

//esquema
var user_schema = new Schema({
    name: String,
    username: String,
    password: String,
    age: Number,
    email: String,
    date_of_birth: Date
});//crear objeto / estructura de nuestra tabla


//definición de un documento:
//itpos de datos que se pueden guardar en la base de mongodb atravez de mongoose
/*
String
Number
Date
Buffer
Boolean
Mixed
Objetc id
Array
*/