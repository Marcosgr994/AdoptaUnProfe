var express = require('express');
var router = express.Router();
var app = require('../app.js');

/* GET home page. */
router.get('/BuscarProfesorPorKeyword/:keyword', function(req, res, next) {
    var select='SELECT * from profesores where nombre like \'%?%\''
    var n=req.params.keyword;
    //en esta funcion se guardará tanto la informacio como el logo
    app.pool.getConnection(function (err, conexion){
        if(err){
            res.status(500);
            res.json({msg: "Error al obtener la conexión en la base de datos"});
        } else{
            conexion.query(select, n, function (error, data){

                if(error){
                    //nos aseguramos que la facultad exista
                    conexion.release();
                    res.status(500);
                    res.json({msg: "error al realizar la consulta a la base de datos"});
                } else{
                    if(data.length > 0){
                        res.status(200);
                        res.json({listado: data});
                    } else {
                        res.status(400);
                        res.json({msg: "error al realizar la consulta a la base de datos"});
                    }
                }
            })
        }
    })
});

module.exports = router;