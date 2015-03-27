(function(ctx){
	"use strict";
	var socket, first, $start, country, $country=$('.country');

	var app={
		initialize: function(socket_node){
			socket=socket_node;
			socket.emit('launch', true, function(data){
				self.startIndex(data);
			});
			self.bindEvents();
		},
		bindEvents: function(){
			self.socketEvents();
			$('form').on('submit', function(e){
				e.preventDefault();
				socket.emit('message', {v:$(this).find('input[name="success"]').val(), country: country});
				return false;
			});

			$(document).on('click', '.btn.btn_close', function(e){
				$start.modal('toggle');
			});
		},
		socketEvents: function(){

		},
		/**
			first question pop-up
		*/
		startIndex: function(data){
			country=data;
			$country.html(country);
			first='<div id="start" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n\
			  <div class="modal-header">\n\
			    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n\
			    <h3 id="myModalLabel">Welcome,</h3>\n\
			  </div>\n\
			  <div class="modal-body">\n\
			    <p>You are now a decision-maker. You are the one who makes the choices. You have influence.\n\
				You don’t just represent <strong>'+self.ucfirst(country)+'</strong>. You are <strong>'+self.ucfirst(country)+'</strong>.<br/>\n\
				You are part of a great discussion. Climate change is affecting both your country and the world. Your people want solutions.\n\
				We’ll lead you through the process of decisions on specific topics, with the aim of reducing greenhouse gas emissions and slowing down global warming. Consider the consequences of your choices - for tomorrow and the next 100 years.</p>\n\
			  </div>\n\
			  <div class="modal-footer">\n\
			    <button class="btn btn-primary btn_close">Start</button>\n\
			  </div>\n\
			</div>';
			$(first).appendTo('#wrapper').modal('toggle');
			$start=$('#start');
		},
		ucfirst: function(string){
			return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
		}
	}

	var self=app;
	ctx.app=app;
})(window);