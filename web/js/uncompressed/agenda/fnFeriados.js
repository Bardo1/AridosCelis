function EnviarFormularioAjax(vistaHtml, form, date) {
	$(".modalVer").html('');
	bootbox.dialog(vistaHtml, [
	{
		"label" : "<i class='icon-arrow-left'></i> Volver",
		"class" : "btn btn-mini"
	},
	{
		"label"   : "<i class='icon-save'></i> Guardar",
		"class"   : "btn btn-mini btn-success",
		"callback": function() {
			mostrarMensajeGuardando();
			$(".modalVer").html('');
			var action = $(form).attr('action');
			var data = $(form).serializeArray();
			$.post(action, data, function(response) {
				ocultarMensajeNav();
				var IS_JSON = true;
				try { var json = $.parseJSON(response); } catch(err) { IS_JSON = false; }
				if(IS_JSON) {
					var data = json;
					msg = data.msg;
				} else {
					msg = response;
				}
				if(msg == "Creado"){
					marcarFechasUsadas(date, data.id);
					var creado = ""+
					"<div class='alert alert-block alert-success'>"+
					"    <p>"+
					"    <strong><i class='icon-ok'></i> Creado Correctamente!</strong>"+
					"    El Feriado fue registrado correctamente."+
					"    </p>"+
					"</div>";
					bootbox.dialog(creado, [
					{
						"label" : "Ok",
						"class" : "btn btn-mini btn-info",
						"callback": function() {
								// location.reload();
							}
						}
						]);
				} else {
					var vistaHtml = response;
					$(".modalVer").html('');
					EnviarFormularioAjax(vistaHtml, form, date);
				}
			});
		}
	}
	]);
};