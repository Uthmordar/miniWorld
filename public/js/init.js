(function(){
	var socket=io('ws://localhost:1337');
	window.app.initialize(socket);
})();