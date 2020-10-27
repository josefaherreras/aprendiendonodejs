var express = require("express");
var router = express.Router();



/*app.com/app/   */
router.get("/",function(req,res){
    /*buscar el usuario*/
    res.render("app/home");
})



//rutas

//despliega el formulario para crear
router.get("/imagenes/new", function(req,res){
    res.render("app/imagenes/new");
});

//despliega el formulario de una imagen ya existente que nos va a permitir dicha imagen
router.get("/imagenes/:id/edit", function(req,res){

});

/*REST*/

router.route("/imagenes/:id")
    .get(function(req,res){

    })
    .put(function(req,res){

    })
    .delete(function(req,res){
        
    });


//coleccion de imagenes 
//obtener todas las imagenes
router.route("/imagenes/")
    .get(function(req,res){

    })
//crear una nueva imagen
    .post(function(req,res){

    });








//exportar objeto que se pueda importar a otros scripts de node.js

module.exports = router;