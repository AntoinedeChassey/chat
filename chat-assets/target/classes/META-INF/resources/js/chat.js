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
				doSockets(result);
			}
		}
	};

	bootbox.prompt(promptOptions);

});