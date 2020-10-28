var express = require("express");
var router = express.Router();
var Imagen = require("./models/imagenes");



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
    Imagen.findById(req.params.id, function(err,imagen){
        res.render("app/imagenes/edit",{imagen : imagen});
    });
});

/*REST*/

router.route("/imagenes/:id")
    .get(function(req,res){
        Imagen.findById(req.params.id, function(err,imagen){
            res.render("app/imagenes/show",{imagen : imagen});
        });
    })
    .put(function(req,res){
        Imagen.findById(req.params.id, function(err,imagen){
            imagen.title = req.body.title;
            imagen.save(function(err){
                if(!err){
                    res.render("app/imagenes/show",{imagen : imagen});
                }else{
                    res.render("app/imagenes/"+imagen.id+"/edit" ,{imagen : imagen});
                }
            })
        });
    })
    .delete(function(req,res){
        
    });


//coleccion de imagenes 
//obtener todas las imagenes
router.route("/imagenes")
    .get(function(req,res){
        Imagen.find({}, function(err,imagenes){
            if(err){res.redirect("/app"); return;}
            res.render("app/imagenes/index",{imagenes: imagenes });
        });
    })
//crear una nueva imagen
    .post(function(req,res){
        var data = {
            title : req.body.title
        }
        var imagen = new Imagen(data);
        imagen.save(function(err){
            if(!err){
                res.redirect("/app/imagenes/"+imagen._id)
            }else{
                res.render(err);
            }
        });
    });








//exportar objeto que se pueda importar a otros scripts de node.js

module.exports = router;