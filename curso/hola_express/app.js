var express = require("express");

var app = express();

app.get("/", function (req,res) {
    res.send("hola mundo");
});


//servidor
app.listen(8080); //callback