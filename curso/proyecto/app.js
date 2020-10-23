var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//retornando : module.exports.User= User;
var User = require("./models/user").User; //nos devuelve todo el objeto


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

    var user = new User({email: req.body.email,
                            password: req.body.password,
                            password_confirmation : req.body.password_confirmation
                        });
    console.log(user.password_confirmation);

    //guardar usuario
    user.save(function(){
        res.send("Guardamos tus datos");
    });
});



//servidor
app.listen(8080); //callback