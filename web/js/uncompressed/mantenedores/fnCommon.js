$(document).on('ready', function() {
	$(document).on('keypress', function(e) {
		if ($('#editor1').is(":visible")) {} else if (e.which == 13) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});

	function EnviarFormularioAjax(vistaHtml, form) {
		$(".modalVer").html('');
		bootbox.dialog(vistaHtml, [{
			"label": "<i class='icon-arrow-left'></i> Volver",
			"class": "btn btn-mini"
		}, {
			"label": "<i class='icon-save'></i> Guardar",
			"class": "btn btn-mini btn-success validar-input",
			"callback": function() {
				mostrarMensajeGuardando();
				$(".modalVer").html('');
				var action = $(form).attr('action');
				var data = $(form).serializeArray();
				$.post(action, data, function(response) {
					response = $.trim(response);
					ocultarMensajeNav();
					if (response == "Creado") {
						var creado = "" +
						"<div class='alert alert-block alert-success'>" +
						"    <p>" +
						"    <strong><i class='icon-ok'></i> Creado Correctamente!</strong>" +
						"    El objeto fue creado correctamente." +
						"    </p>" +
						"</div>";
						bootbox.dialog(creado, [{
							"label": "Ok",
							"class": "btn btn-mini btn-info",
							"callback": function() {
								location.reload();
							}
						}]);
					} else if (response == "Editado") {
						var editado = "" +
						"<div class='alert alert-block alert-success'>" +
						"    <p>" +
						"    <strong><i class='icon-ok'></i> Editado Correctamente!</strong>" +
						"    El objeto fue editado correctamente." +
						"    </p>" +
						"</div>";
						bootbox.dialog(editado, [{
							"label": "<i class='icon-ok'></i> Ok",
							"class": "btn btn-mini",
							"callback": function() {
								location.reload();
							}
						}]);
					} else {
						var vistaHtml = response;
						$(".modalVer").html('');
						EnviarFormularioAjax(vistaHtml, form);
					}
				});
}
}]);
}

function EnviarFormularioAjaxEmpresa(vistaHtml, form) {
	$(".modalVer").html('');
	bootbox.dialog(vistaHtml, [{
		"label": "<i class='icon-arrow-left'></i> Volver",
		"class": "btn btn-mini"
	}, {
		"label": "<i class='icon-save'></i> Guardar",
		"class": "btn btn-mini btn-success",
		"callback": function() {
			$(form).submit();
			$('#carga_formulario').load(function() {
				var iBody = $('#carga_formulario').contents().find('body').html();
				if (iBody == 'Creado') {
					bootbox.hideAll();
					var creado = "" +
					"<div class='alert alert-block alert-success'>" +
					"    <p>" +
					"    <strong><i class='icon-ok'></i> Creado Correctamente!</strong>" +
					"    El objeto fue creado correctamente." +
					"    </p>" +
					"</div>";
					bootbox.dialog(creado, [{
						"label": "Ok",
						"class": "btn btn-mini btn-info",
						"callback": function() {
							location.reload();
						}
					}]);
				} else if (iBody == "Editado") {
					bootbox.hideAll();
					var editado = "" +
					"<div class='alert alert-block alert-success'>" +
					"    <p>" +
					"    <strong><i class='icon-ok'></i> Editado Correctamente!</strong>" +
					"    El objeto fue editado correctamente." +
					"    </p>" +
					"</div>";
					bootbox.dialog(editado, [{
						"label": "<i class='icon-ok'></i> Ok",
						"class": "btn btn-mini",
						"callback": function() {
							location.reload();
						}
					}]);
				} else {
					var iFrameBody = $('#carga_formulario').contents().find('body').html();
					$('.modal-body').html('');
					$('.modal-body').html(iFrameBody);
				}
			});
return false;
}
}]);
}
	// Inicio Crear
	$(".new").on('click', function(e) {
		e.preventDefault();
		mostrarMensajeCargando();
		$.post($(this).attr('href'), null, function(response) {
			$(".modalVer").html('');
			ocultarMensajeNav();
			EnviarFormularioAjax(response, '#new_form');
		});
		$(".modalVer").html('');
	});
	// Fin Crear
	// Inicio Crear Empresa
	$(".new_empresa").on('click', function(e) {
		e.preventDefault();
		mostrarMensajeCargando();
		$(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
			var vistaHtml = response;
			$(".modalVer").html('');
			ocultarMensajeNav();
			EnviarFormularioAjaxEmpresa(vistaHtml, '#new_form_empresa');
		});
		$(".modalVer").html('');
	});
	// Fin Crear Empresa
	// Inicio Editar
	$(".edit_empresa").on('click', function(e) {
		e.preventDefault();
		mostrarMensajeCargando();
		$(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
			var vistaHtml = response;
			ocultarMensajeNav();
			EnviarFormularioAjaxEmpresa(vistaHtml, '#edit_form_empresa');
		});
		$(".modalVer").html('');
	});
	// Fin Editar
	// Inicio Editar Empresa
	$(".edit").on('click', function(e) {
		e.preventDefault();
		mostrarMensajeCargando();
		$.post($(this).attr('href'), null, function(response) {
			$(".modalVer").html('');
			ocultarMensajeNav();
			EnviarFormularioAjax(response, '#edit_form');
		});
		$(".modalVer").html('');
	});
	// Fin Editar Empresa
	// Inicio Ver
	$(".show").on('click', function(e) {
		e.preventDefault();
		mostrarMensajeCargando();
		$(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
			// $(".modalVer").load($(this).attr('href'));
			var vistaHtml = response;
			ocultarMensajeNav();
			$(".modalVer").html('');
			bootbox.dialog(vistaHtml, [{
				"label": "Ok",
				"class": "btn btn-mini btn-info",
			}]);
		});
		$(".modalVer").html('');
	});
	// Fin Ver
	// Inicio Eliminar
	$(".delete").on('click', function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		bootbox.dialog("<span id='span-msg-delete'>¿Estás Seguro?</span>", [{
			"label": "Cancelar",
			"class": "btn btn-mini",
			"callback": function() {}
		}, {
			"label": "Eliminar",
			"class": "btn btn-mini btn-danger",
			"callback": function() {
				mostrarMensajeEliminando()
				$('#divEliminandoObjeto').show();
				$('#table_report').hide();
				$('#table_report_wrapper').hide();
				$.post(href, function(response) {
					var respuesta = $.parseJSON(response);
					if (respuesta.cod == "0") {
						var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
					} else {
						var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
					}
					ocultarMensajeNav();
					bootbox.dialog(div, [{
						"label": "Ok",
						"class": "btn btn-mini btn-info",
						"callback": function() {
							if (respuesta.cod == "0") {
								location.reload();
							}
							$('#divEliminandoObjeto').hide();
							$('#table_report').show();
							$('#table_report_wrapper').show();
						}
					}]);
				});
			}
		}]);
});
	// Fin Eliminar
});