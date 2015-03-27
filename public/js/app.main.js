(function(ctx){
	"use strict";
	var socket, world, $world, message, $messages=$('#messages'), info, $infos=$('#infos'), statusColor={excellent: "#14d02a", good: "#8eef10", average: "#c8ef10", bad:"#efd710", badbad: "#ef9810", critical: "#ef4f10"},
	statusWorld={excellent: "rgba(20,208,42,0.3)", good: "rgba(142,239,16, 0.3)", average: "rgba(200,239,16, 0.3)", bad:"rgba(239,215,16,0.3)", badbad: "rgba(239,152,16,0.3)", critical: "rgba(239,79,16,0.3)"};

	var app={
		initialize: function(socket_node){
			socket=socket_node;
			world=Snap('#world');
			Snap.load('../images/world_map.svg', function(f){
				world.append(f);
			});
			$world=$('#svg2');
			self.bindEvents();
		},
		bindEvents: function(){
			self.socketEvents();
			$(document).on('click', '.status_msg>.close_box, .info_msg>.close_box', function(e){
				e.preventDefault();
				$(this).parent().remove();
			});
		},
		socketEvents: function(){
			socket.on('newForm', function(data){
				message=$('<div class="alert alert-info status_msg"><span class="close_box">X</span>'+data.message+'</div>');
				message.prependTo($messages);
				info=$('<div class="alert alert-success status_msg"><span class="close_box">X</span>'+data.about+'</div>');
				info.prependTo($infos);
				$('#'+data.country.selector).css('fill', statusColor[data.country.status]);
				$('#svg2').css('background-color', statusWorld[data.statusWorld]);
				setTimeout(function(){message.addClass('active'); info.addClass('active');}, 500);
			});
		}
	}

	var self=app;
	ctx.app=app;
})(window);