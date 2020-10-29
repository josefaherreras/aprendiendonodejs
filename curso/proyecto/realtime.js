//para poder configurar Socket
module.exports= function(server, sessionMiddleware){
    var io = require("socket.io")(server);

    io.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    //informar si está bien la connection
    io.sockets.on("connection",function(socket){
        console.log(socket.request.session.user_id);
    });
}