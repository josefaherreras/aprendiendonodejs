var express = require("express");
var app = express();

//middlewares
app.use(express.static('public'));
app.use(express.static('assets'));//archivos que no cambian , son estaticos

//motor de vista
app.set("view engine","jade");

//declarar ruta con express
app.get("/", function (req,res) {
    res.render("index");
});

app.get("/login", function (req,res) {
    res.render("login");
});



//servidor
app.listen(8080); //callback