var express = require("express");
var bodyParser = require("body-parser");
//var cookieSession = require("cookie-session");
//retornando : module.exports.User= User;
var User = require("./models/user").User; //nos devuelve todo el objeto
var router_app = require("./routes_app");
var session_middleware = require("./middleware/session");
var formidable = require("express-formidable");

//redis como un intermediario basado en una arquitectura como pubsub
//donde uno de los clientes puede publicar , donde el cliente u otro cliente se puede subcribir a las publicaciones
//que se están haciendo
//es como si virtualmente estuvieran separados y tuvieran una linea de comunicacionllamada redis
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

//server
var http = require("http");
var realtime = require("./realtime");
var app = express();
//servidor
var server = http.Server(app);
//Redis 
var sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    secret:"RyveTFB6iQjkdX3H"
});

//Compartir sesión entre SocketIO y Express
realtime(server,sessionMiddleware);

//middleware -> parametros que podemos utilizar metodos de http que no implementa el navegador
//como put y delete
var methodOverride = require("method-override"); 


 //middlewares
app.use("/estatico", express.static('public'));//archivos que no cambian , son estaticos

app.use(methodOverride("_method"));

app.use(bodyParser.json());//extraer parametros / peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));// parsing de la libreria 

/*
//middlewares session
//npm install express-session --save
//esto ya nos permite armacenar sesiones
app.use(session({
    //unico parametro requerido , que nos permite generar identificadores unicos. para que no haya conflicto
    secret:"fygUmlpIFSaNG5j1",
    //si la sesion debe volverse a guardar al momento que haya una modificacion
    resave: false,
    //sesion nueva 
    saveUninitialized: false
}));*/

//cookie-session
//a nivel de cliente


app.use(sessionMiddleware)


//leyendo archivos en nuestra aplicación
app.use(formidable.parse({ keepExtensions: true }));


//motor de vista
app.set("view engine","jade");

//declarar ruta con express
app.get("/", function (req,res) {
    console.log(req.session.user_id);
    res.render("index");
});

//iniciar sesion
app.get("/login", function (req,res) {
        res.render("login");
});
//registro
app.get("/signup", function (req,res) {
    User.find(function(err,doc){
        console.log(doc);
        res.render("signup");
    })
});


//crear usuario
app.post("/users", function(req,res){
    // console.log("Email :" + req.body.email);
    // console.log("Contraseña :" + req.body.password);

    //tiene metodos relacionados con la base de datos como .save
    //vive en la memoria dinamica, hasta que se ejecuta .save que se guarda en mongodb
    var user = new User({   email: req.body.email,
                            password: req.body.password,
                            password_confirmation : req.body.password_confirmation,
                            username: req.body.username
                        });

    
    //console.log(user.password_confirmation);

    //funcion asincrona
    //callback

    //Metodo Save - guardar 
    //actualizar parametros a la instancia del objeto, la forma de diferenciar un doc 
    //que está en la bd y no es por el atributo _id que tienen los elementos que ya están guardados en la bd.

    //cuando mongoose ejecuta el metodo save y el objeto se guarda en mongodb 

    // 1º tener un modelo (user)
    //el objeto empieza como una instancia del modelo es decir que el modelo es la clase y creamos un nuevo objeto.
    //el instanciamiento recibe como parametro un objeto JSON con todos los atributos que va a tener nuestro documento (user)
    
    //.save(function(err,objeto,numero))
    //err -> objeto de tipo error -> errores de validaciones o bd
    //objeto -> el objeto ya guardado , ya tiene el atributo _id
    //numero del objeto  guardado

    //metodo asincrono -> puede suceder en cualquier momento
    /*user.save(function(err){
        if(err){
            console.log(String(err));
        }
        res.send("Guardamos tus datos");
    });*/


    //promissed ->  quiere decir que este metodo en lugar de recibir un callback, recibe una promesa con el metodo .then 
    //sintaxis de promissed 
    user.save().then(function(us){
        res.send("Guardamos al usuario exitosamente.");
    }, function(err){
        if(err){
            console.log(String(err));
        }
        res.send("no pudimos guardar la información");
    });

});



app.post("/sessions", function(req,res){
    //find() -> nos devuelve una coleccion, conjunto un arreglo , que cumple con la condicion
    //findOne() -> solo devuelve un objeto, un documento
    User.findOne({email:req.body.email , password: req.body.password },function(err,User){
        //console.log(user);
        req.session.user_id = User._id;
        res.redirect("/app");
    });


});

app.use("/app", session_middleware);
app.use("/app", router_app);

//servidor
server.listen(8080); //callback