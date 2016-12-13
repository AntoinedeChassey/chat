var url = window.location.origin + window.location.pathname;
url = url.replace("https", "wss")
var urlParts = url.split("/");
urlParts.pop();
var newUrl = urlParts.join("/") + "/control";
var ws;

function doSockets() {
	ws = new WebSocket(newUrl);

	ws.onopen = function() {
		console.log("Connecte en Websockets !");
		// Push notification
		Push.create("Status of transmission", {
			body : "Connected",
			icon : 'img/planete.png',
			timeout : 3000,
			onClick : function() {
				window.focus();
				this.close();
			}
		});

		// $(".content").animate({
		// scrollTop : $('.content').prop("scrollHeight")
		// }, 1000);
		var now = new Date();
		var time = now.getHours() + ":" + now.getMinutes() + ":"
				+ now.getSeconds();
		ws.send(JSON.stringify({
			type : "connect",
			pseudo : pseudo,
			message : undefined,
			date : time
		}));
	};

	ws.onmessage = function(evt) {
		var json = JSON.parse(evt.data);
		var pseudosList = $("#navigation");
		if (json.pseudos) {
			pseudosList.text("");
			for (var i = 0; i < json.pseudos.length; i++) {
				var element = $("<a></a>").text(json.pseudos[i].pseudo);
				pseudosList.append(element);
			}
		}
		// Get all messages (first connection)
		else if (json.length >= 1) {
			$(".content").empty();
			for (var i = 0; i < json.length; i++) {
				var div = $("<div>");
				div.append("<h4 class='pseudo'>" + json[i].pseudo
						+ "<small class='date'>" + json[i].date);
				div.append("<p>" + json[i].message);
				$(".content").append(div);
			}
			$(".content").animate({
				scrollTop : $('.content').prop("scrollHeight")
			}, 1000);
		}
		// Get new message
		else {
			if (json.pseudo != pseudo && json.pseudo != "Admin") {
				ion.sound.play("button_tiny");
				// Push notification
				Push.create(json.pseudo, {
					body : reverseEncoding(json.message),
					icon : 'img/planete.png',
					timeout : 4000,
					onClick : function() {
						window.focus();
						this.close();
					}
				});
			}
			var div = $("<div>");
			div.append("<h4 class='pseudo'>" + json.pseudo
					+ "<small class='date'>" + json.date + "</small></h4>");
			div.append("<p>" + json.message);
			$(".content").append(div);
			if (autoScroll)
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
					var json = {
						type : "message",
						pseudo : pseudo,
						message : $("#message").val(),
						date : time
					};
					$("#message").val("");
					$("#submit").attr("disabled", "disabled");
					ws.send(JSON.stringify(json));
					return false;
				} else {
					return false;
				}
			});
}

function setPseudo(newPseudo) {
	var now = new Date();
	var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	ws.send(JSON.stringify({
		type : "setPseudo",
		pseudo : newPseudo,
		message : undefined,
		date : time
	}));
}

function getHistory(number) {
	if (number > 1000)
		number = 1000;
	var now = new Date();
	var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	ws.send(JSON.stringify({
		type : "getHistory",
		pseudo : pseudo,
		message : number,
		date : time
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

function reverseEncoding(texte) {
	texte = texte.replace(/&egrave;/g, 'è');
	texte = texte.replace(/&eacute;/g, 'é');
	texte = texte.replace(/&ecirc;/g, 'ê');
	texte = texte.replace(/&euml;/g, 'ë');

	texte = texte.replace(/&agrave;/g, 'à');
	texte = texte.replace(/&acirc;/g, 'ä');
	texte = texte.replace(/&auml;/g, 'â');

	texte = texte.replace(/&ograve;/g, 'ò');
	texte = texte.replace(/&ocirc;/g, 'ô');
	texte = texte.replace(/&ouml;/g, 'ö');

	texte = texte.replace(/&igrave;/g, 'ì');
	texte = texte.replace(/&icirc;/g, 'î');
	texte = texte.replace(/&iuml;/g, 'ï');

	texte = texte.replace(/&ugrave;/g, 'ù');
	texte = texte.replace(/&uuml;/g, 'ü');
	texte = texte.replace(/&ucirc;/g, 'û');

	texte = texte.replace(/&apos;/g, "'");
	texte = texte.replace(/&quot;/g, '"');
	texte = texte.replace(/&uml;/g, "¨");
	texte = texte.replace(/&deg;/g, "°");
	texte = texte.replace(/&amp;/g, "&");

	texte = texte.replace(/&ccedil;/g, "ç");

	texte = texte.replace(/&sect;/g, "§");
	texte = texte.replace(/&pound;/g, "£");
	texte = texte.replace(/&curren;/g, "¤");
	texte = texte.replace(/&micro;/g, "µ");
	return texte;
}