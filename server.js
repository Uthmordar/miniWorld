'use strict';

var http       =require('http');
var path       =require('path');
var express    =require('express');
var bodyParser =require('body-parser');

var app=express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/app', function(req, res){
	res.type('.html');
	res.sendFile(path.join(__dirname, 'public'+'/index.html'));
});

app.get('/main', function(req, res){
	res.type('.html');
	res.sendFile(path.join(__dirname, 'public'+'/main.html'));
});

var server=http.createServer(app);

server.listen(1337);

var io=require('socket.io')(server);

var x={
	france:{v:0, nb:0},
	allemagne:{v:0, nb:0},
	world:{v:0, nb:0}
};
io.on('connection', function(socket){
	socket.on('message', function(data){
		x.world.nb=x.world.nb+1;
		x[data.country].nb=x[data.country].nb+1;
		x.world.v=x.world.v+parseInt(data.v);
		x[data.country].v=x[data.country].v+parseInt(data.v);
		io.sockets.emit('newForm', {data:'new user complete form with '+data, statusWorld: setMesureColor(x.world.v/x.world.nb)});
	});
});



function setMesureColor(x){
	if(x>=80){
		return '#0F0';
	}else if(x>=60){
		return '#34F912';
	}else if(x>=40){
		return 'orange';
	}else{
		return 'crimson';
	}
}