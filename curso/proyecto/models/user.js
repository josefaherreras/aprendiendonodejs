var mongoose = require("mongoose");
//mongoose tiene un atributo que mapea que nos retorna un objeto que es el atributo schema
//este es un constructor para que podamos generar nuestros esquemas
//mapeando una clase que es un modelo con una tabla.
// ¿Qué es la Mongoose? Mangosta es un Object Document Mapper (ODM).
// Esto significa que Mongoose le permite definir objetos con un esquema fuertemente tipado
// que se asigna a un documento MongoDB. Mongoose proporciona una increíble cantidad de funcionalidades
// para crear y trabajar con esquemas.
var Schema = mongoose.Schema;

//conexion a la base de datos
mongoose.connect("mongodb://localhost:27017/fotos",
 {useNewUrlParser: true}) .then(() =>
  { console.log("La Conexion a MongoDB se ha realizado Conrrectamente!!"); }) .catch(err => console.log(err));


var sex_validate = ["M","F"];
var email_match = [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Correo invalido"];
//esquema
var user_schema = new Schema({
    name: String,
    last_name: String,
    username: {type:String, maxlength:[30,"Su nombre de usuario es muy largo"]},
    password: {type: String, minlength:[8,"La contraseña es muy corta"]},
    age: {type: Number ,min:[5,"La edad no puede ser menor que 5"] ,max:[100,"La edad no puede ser máximo de 100"]},
    email: {type: String , required : "El correo es obligatorio",match:email_match},
    date_of_birth: Date,
    sex: {value:{type: String,enum:sex_validate, menssage:"Opción no valida"}}
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

//Documentos: virtuals propiedades de un documentos
//validaciones 
//getters and setters -> acceder a un atributo
//get -> la forma en la que se accede a un atributo
//set -> establecer la logica a la cual se asigna un valor a un atributo
user_schema.virtual("password_confirmation").get(function(){
    return this.p_c;
}).set(function(password){
    this.p_c = password;
});

user_schema.virtual("full_name").get(function(){
    return this.name + this.last_name;
}).set(function(full_name){
    var words = full_name.split(" ");
    this.name = words[0];
    this.last_name = words[1];
})

/*MODELOS*/
//SON INSTANCIAS EN MONGOOSE QUE NOS PERMITEN LLAMAR METODOS QUE A LA VEZ NOS PERMITEN 
//EJECTUCAR ACCIONES SOBRE LA BD SIN LA NECESIDAD QUE NOSOTROS ENTENDAMOS LO QUE ESTÁ PASANDO EN LA BD COMO TAL.


//esto equivale a una tabla
//User define el nombre de la coleccion pero lo toma en plural
var User = mongoose.model("User",user_schema);

//para conectarse a la basde de datos de Mongo
//es atravez de modelos 
module.exports.User= User;






//ejemplo
/*
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
var User = mongoose.model("User",user_schema);*/
