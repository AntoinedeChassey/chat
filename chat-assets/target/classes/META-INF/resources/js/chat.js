var autoScroll = true;
var pseudo;

$(document)
		.ready(
				function() {

					/*
					 * Sidebar menu
					 */
					$("#menu-toggle").click(function(e) {
						e.preventDefault();
						$("#sidebar-wrapper ").toggleClass("sidebarStyle");
						$(".fa-bars").toggleClass("rotate");
						$("#wrapper").toggleClass("toggled");
					});
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
								// Build the connection
								pseudo = result;
								doSockets();
							}
						}
					};

					// Try to get the last saved value
					pseudo = Cookies.get('pseudo');

					if (!pseudo || pseudo === "undefined") {
						bootbox.prompt(promptOptions);
					} else {
						// Build the connection
						doSockets();
					}

					promptOptionsSetPseudo = {
						title : "Entre ton nouveau pseudo ptit gars!",
						buttons : {
							confirm : {
								label : 'Go',
								className : 'btn-success'
							}
						},
						callback : function(result) {
							if (result) {
								Cookies.set('pseudo', result, {
									expires : 30
								});
								pseudo = result;
								setPseudo(result);
							}
						}
					};

					promptOptionsGetHistory = {
						title : "Nombre de messages à voir? (1000 max)",
						inputType : 'number',
						callback : function(result) {
							if (result)
								getHistory(result);
						}
					};

					$("#setPseudo").click(function(e) {
						e.preventDefault();
						Cookies.remove('pseudo');
						Cookies.set('pseudo', $("#newPseudo").val(), {
							expires : 30
						});
						bootbox.prompt(promptOptionsSetPseudo);
					});
					$("#getHistory").click(function(e) {
						e.preventDefault();
						bootbox.prompt(promptOptionsGetHistory);
					});
					$("#setScroll")
							.click(
									function(e) {
										e.preventDefault();
										if (autoScroll) {
											autoScroll = false;
											$(this)
													.html(
															"<li id='setScroll'><a href='#'>Activer le scroll automatique</a></li>");
										} else {
											$(this)
													.html(
															"<li id='setScroll'><a href='#'>Désactiver le scroll automatique</a></li>");
											autoScroll = true;
										}
									});

				});