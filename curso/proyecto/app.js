var express = require("express");
var app = express();
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