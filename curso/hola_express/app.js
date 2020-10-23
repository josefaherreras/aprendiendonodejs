var express = require("express");

var app = express();

//motor de vista
app.set("view engine","jade");

app.get("/", function (req,res) {
    res.render("index",{hola: "hola Josefa"});
});


//servidor
app.listen(8080); //callback