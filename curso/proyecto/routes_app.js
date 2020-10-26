var express = require("express");
var router = express.Router();



/*app.com/app/   */
router.get("/",function(req,res){
    /*buscar el usuario*/
    res.render("app/home");
})









//exportar objeto que se pueda importar a otros scripts de node.js

module.exports = router;