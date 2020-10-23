var express = require("express");

var app = express();

//motor de vista
app.set("view engine","jade");

//Verbos Http => GET/ POST / PUT / PATCH / OPTIONS / HEADERS / DELETE /
//REST

//declarar ruta con express
app.get("/", function (req,res) {
    res.render("index");
});

app.get("/:nombre", function (req,res) {

    res.render("form", {nombre: req.params.nombre});
});

app.post("/", function (req,res) {
    res.render("form")
  
});


//servidor
app.listen(8080); //callback