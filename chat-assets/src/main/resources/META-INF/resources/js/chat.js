$(document).ready(function() {

	$("body").keyup(function(event) {
		if (event.keyCode == 13) {
			$(".btn-success").click();
		}
	});

	promptOptions = {
		title : "Entre ton pseudo ptit gars!",
		buttons : {
			confirm : {
				label : 'Go',
				className : 'btn-success'
			}
		},
		callback : function(result) {
			if (!result)
				bootbox.prompt(promptOptions);
			else {
				Cookies.set('pseudo', result, {
					expires : 30
				});
				doSockets(result);
			}
		}
	};

	var pseudo = Cookies.get('pseudo');

	if (!pseudo) {
		bootbox.prompt(promptOptions);
	} else {
		doSockets(pseudo);
	}

	$("#setPseudo").click(function() {
		Cookies.remove('pseudo');
		Cookies.set('pseudo', $("#newPseudo").val(), {
			expires : 30
		});
		bootbox.prompt(promptOptions);
	});
});