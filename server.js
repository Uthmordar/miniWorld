'use strict';

var countryStatus;
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

var country=['france', 'germany', 'brazil', 'russia', 'usa', 'china'];
var x={
	france:{v:0, nb:0},
	brazil:{v:0, nb:0},
	germany:{v:0, nb:0},
	russia:{v:0, nb:0},
	usa:{v:0, nb:0},
	china:{v:0, nb:0},
	world:{v:0, nb:0}
};
io.on('connection', function(socket){
	socket.on('launch', function(data, fn){
		fn(country[Math.floor(Math.random()*country.length)]);
	});

	socket.on('message', function(data){
		x.world={v: x.world.v+parseInt(data.v), nb: x.world.nb+1};
		x[data.country]={v: x[data.country].v+parseInt(data.v), nb: x[data.country].nb+1};
		countryStatus=setStatus(x[data.country].v/x[data.country].nb);
		io.sockets.emit('newForm', {message:"new status for "+data.country+" : " +countryStatus, about: "There is some new infos/datas", statusWorld: setStatus(x.world.v/x.world.nb), country: {selector:data.country, status: countryStatus}});
	});

	socket.on('getStat', function(data, fn){
		fn(x[data]);
	});
});


function setStatus(x){
	if(x>=90){
		return 'excellent';
	}else if(x>=80){
		return 'good';
	}else if(x>=60){
		return 'average';
	}else if(x>=40){
		return 'bad';
	}else if(x>=20){
		return 'badbad';
	}else{
		return 'critical';
	}
}