function doSockets(pseudo) {
	var url = window.location.origin + window.location.pathname;
	url = url.replace("https", "wss")
	var urlParts = url.split("/");
	urlParts.pop();
	var newUrl = urlParts.join("/") + "/control";

	var ws = new WebSocket(newUrl);

	ws.onopen = function() {
		console.log("Connecte en Websockets !");
		$("#status").removeClass("text-danger").addClass("text-success").text(
				"Connected");
		$(".content").animate({
			scrollTop : $('.content').prop("scrollHeight")
		}, 1000);
		ws.send(JSON.stringify({
			type : "connect",
			pseudo : pseudo,
			message : undefined
		}));
	};

	ws.onmessage = function(evt) {
		var message = JSON.parse(evt.data);
		console.log(message);
		var pseudosList = $("#navigation");
		if (message.pseudos) {
			pseudosList.text("");
			for (var i = 0; i < message.pseudos.length; i++) {
				var element = $("<a></a>").text(message.pseudos[i].pseudo);
				pseudosList.append(element);
			}
		} else if (message.messages) {
			for (var i = 0; i < message.messages.length; i++) {
				var div = $("<div>");
				var now = new Date();
				var time = now.getHours() + ":" + now.getMinutes() + ":"
						+ now.getSeconds();
				div.append("<h3 class='pseudo'>" + message.messages[i].pseudo
						+ "<small>" + time + "</small></h3>");
				div.append("<p>" + message.messages[i].message + "</p>");
				$(".content").append(div);
				$('.content').scrollTop($('.content')[0].scrollHeight);
			}
		} else {
			var div = $("<div>");
			var now = new Date();
			var time = now.getHours() + ":" + now.getMinutes() + ":"
					+ now.getSeconds();
			div.append("<h3 class='pseudo'>" + message.pseudo + "<small>"
					+ time + "</small></h3>");
			div.append("<p>" + message.message + "</p>");
			$(".content").append(div);
			$('.content').scrollTop($('.content')[0].scrollHeight);
		}
	};

	$("#navigation").on("click", "a", function() {
		var pseudo = $(this).html();
		$("#message").val($("#message").val() + "@" + pseudo + " ");
	});

	ws.onclose = function() {
		$("#status").removeClass("text-success").addClass("text-danger").text(
				"Disconnected");
		console.log("Connexion terminée");
	};

	$("#message").on("input", function() {
		if ($(this).val()) {
			$("#submit").removeAttr("disabled");
		}
	})

	$("form").submit(function() {
		if ($("#message").val()) {
			var message = {
				type : "message",
				pseudo : pseudo,
				message : $("#message").val()
			};
			$("#message").val("")
			$("#submit").attr("disabled", "disabled");
			ws.send(JSON.stringify(message));
			return false;
		} else {
			return false;
		}
	});
}