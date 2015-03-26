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

var x={v:0, nb:0};
io.on('connection', function(socket){
	socket.on('message', function(data){
		x.nb=x.nb+1;
		x.v=x.v+parseInt(data);
		console.log(x);
		io.sockets.emit('newForm', {data:'new user complete form with '+data, status: setMesureColor(x.v/x.nb)});
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