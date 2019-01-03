var express = require("express");
var path = require( "path");
var app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render("index");
})
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    socket.on('new_user', function(data){
        console.log(data.user);
        io.emit('post_user', {user: data.user});
    })
    socket.on("input_send", function(data){
        console.log(data.msg);
        io.emit('posted_input', {msg:data.msg});
    // socket.on("input_send", function(data){
    //     console.log(data);
    })
    // console.log(socket.id);
})