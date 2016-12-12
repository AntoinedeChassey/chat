var url = window.location.origin + window.location.pathname;
url = url.replace("https", "wss")
var urlParts = url.split("/");
urlParts.pop();
var newUrl = urlParts.join("/") + "/control";
var ws;
var pseudo;

function doSockets() {
	ws = new WebSocket(newUrl);

	ws.onopen = function() {
		console.log("Connecte en Websockets !");
		// Push notification
		Push.create("Status of transmission", {
			body : "Connected",
			icon : 'img/planete.png',
			timeout : 2000,
			onClick : function() {
				window.focus();
				this.close();
			}
		});
		$(".content").empty();
		// $(".content").animate({
		// scrollTop : $('.content').prop("scrollHeight")
		// }, 1000);
		ws.send(JSON.stringify({
			type : "connect",
			pseudo : pseudo,
			// .replace(/</g, "&lt;").replace(/>/g, "&gt;")
			message : undefined
		}));
	};

	ws.onmessage = function(evt) {
		var message = JSON.parse(evt.data);
		// console.log(message);
		var pseudosList = $("#navigation");
		if (message.pseudos) {
			pseudosList.text("");
			for (var i = 0; i < message.pseudos.length; i++) {
				var element = $("<a></a>").text(message.pseudos[i].pseudo);
				pseudosList.append(element);
			}
		}
		// Get all messages
		else if (message.messages) {
			for (var i = 0; i < message.messages.length; i++) {
				var div = $("<div>");
				div.append("<h4 class='pseudo'>" + message.messages[i].pseudo
						+ "<small class='date'>" + message.messages[i].date);
				div.append("<p>" + message.messages[i].message);
				$(".content").append(div);
				setTimeout(
						function() {
							$('.content').scrollTop(
									$('.content').prop("scrollHeight"));
						}, 1000);
			}
		}
		// Get new message
		else {
			if (message.pseudo != pseudo && message.pseudo != "Admin") {
				ion.sound.play("button_tiny");
				// Push notification
				Push.create(message.pseudo, {
					body : message.message,
					icon : 'img/planete.png',
					timeout : 4000,
					onClick : function() {
						window.focus();
						this.close();
					}
				});
			}
			var div = $("<div>");
			div.append("<h4 class='pseudo'>" + message.pseudo
					+ "<small class='date'>" + message.date + "</small></h4>");
			div.append("<p>" + message.message);
			$(".content").append(div);
			$('.content').scrollTop($('.content').prop("scrollHeight"));
		}
	};

	$("#navigation").on("click", "a", function() {
		var pseudo = $(this).html();
		$("#message").val($("#message").val() + "@" + pseudo + " ");
	});

	ws.onclose = function() {
		// Push notification
		Push.create("Status of transmission", {
			body : "Disconnected",
			icon : 'img/planete.png',
			timeout : 0,
			onClick : function() {
				window.focus();
				this.close();
			}
		});
		console.log("Connexion terminée");
	};

	$("#message").on("input", function() {
		if ($(this).val()) {
			$("#submit").removeAttr("disabled");
		}
	});

	$("form").submit(
			function() {
				if ($("#message").val()) {
					var now = new Date();
					var time = now.getHours() + ":" + now.getMinutes() + ":"
							+ now.getSeconds();
					var message = {
						type : "message",
						pseudo : pseudo,
						message : $("#message").val(),
						date : time
					};
					$("#message").val("");
					$("#submit").attr("disabled", "disabled");
					ws.send(JSON.stringify(message));
					return false;
				} else {
					return false;
				}
			});
}

function setPseudo(newPseudo) {
	ws.send(JSON.stringify({
		type : "setPseudo",
		pseudo : newPseudo,
		message : undefined
	}));
}

ion.sound({
	sounds : [ {
		name : "button_tiny"
	} ],

	// main config
	path : "sounds/",
	preload : true,
	multiplay : true,
	volume : 0.5
});