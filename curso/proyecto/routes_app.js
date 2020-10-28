var express = require("express");
var router = express.Router();
var Imagen = require("./models/imagenes");
var fs = require("fs");//mover el archivo

var image_finder_middleware = require("./middleware/find_image");


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

router.all("/imagenes/:id*", image_finder_middleware);

//despliega el formulario de una imagen ya existente que nos va a permitir dicha imagen
router.get("/imagenes/:id/edit", function(req,res){
        res.render("app/imagenes/edit");
});

/*REST*/

router.route("/imagenes/:id")
    .get(function(req,res){
            res.render("app/imagenes/show");
    })
    .put(function(req,res){
        res.locals.imagen.title = req.body.title;
            res.locals.imagen.save(function(err){
                if(!err){
                    res.render("app/imagenes/show");
                }else{
                    res.render("app/imagenes/"+req.params.id+"/edit");
                }
            })
    })
    .delete(function(req,res){
        //eliminar las imagenes
        Imagen.findByIdAndRemove({_id: req.params.id},function(err){
                if(!err){
                    res.redirect("/app/imagenes");
                }else{
                    console.log(err);
                    res.redirect("/app/imagenes"+req.params.id);
                }
        });
        
    });


//coleccion de imagenes 
//obtener todas las imagenes
router.route("/imagenes")
    .get(function(req,res){
        Imagen.find({creator: res.locals.user._id}, function(err,imagenes){
            if(err){res.redirect("/app"); return;}
            res.render("app/imagenes/index",{imagenes: imagenes });
        });
    })
//crear una nueva imagen
    .post(function(req,res){
        var extension = req.body.archivo.name.split(".").pop();
        //console.log(req.files.archivo);
        var data = {
            title : req.body.title,
            creator: res.locals.user._id,
            extension: extension
        }
        var imagen = new Imagen(data);
        imagen.save(function(err){
            if (!err) {
                fs.rename(req.body.archivo.path,"public/imagenes/"+imagen._id+"."+extension,function (err) {
                  if (err) return console.error(err);
                  console.log("success!")
                  res.redirect("/app/imagenes/"+imagen._id);
                });
              }else {
                console.log(imagen);
                res.render(err);
              }
        });
    });








//exportar objeto que se pueda importar a otros scripts de node.js

module.exports = router;