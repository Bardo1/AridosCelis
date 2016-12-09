var copyrigth                    	= 'Osvalde v0.4';
var b                            	= 'http://192.171.14.9/app_dev.php/Hermes/';
var cajaRecaudacion              	= b+'Caja/Recaudacion';
var facturacion                  	= b+'Facturacion/';
var CajaSupervisorAutoDiferencia 	= b+'Caja/Supervisor/AutorizacionDescuentos/index';
var adminUsuario                 	= b+'AdministradorUsuarios/';
var adminProfesional             	= b+'Agenda/DatosMaestrosMedicos';
var perfil                       	= b+'Perfil';
var ManRebsol                    	= b+'MantenedorMaestro/MantenedorRebsol';
var dacionHoras                  	= b+'Agenda/DacionHora/';
var arancelConvenio             	= b+'ArancelesyConvenios/MantenedorDePrecios/';
var presupuesto                    	= b+'Presupuesto/';
var agendamientoWeb					= b+'Agenda/DacionHora/AgendamientoWeb/Inicio/NzU=';
var oHead       				 	= document.getElementsByTagName('head')[0];
var oScript     					= document.createElement('script');
oScript.type    					= 'text/javascript';
oScript.charset 					= 'utf-8';
oScript.src     					= '/js/uncompressed/bootbox.js';
oHead.appendChild(oScript)

setTimeout(function() {
	if($('#_rutEmpresa').length){
		var code = $("<div class='alert alert-block alert-success'><p><strong>Iniciar Session en Servet</strong> Seleccione Usuario:</p></div>");
		bootbox.dialog(code,[
			{"label": "OVALDENEGRO","class": "btn btn-inverse","callback": function() {
				$('#_rutEmpresa').val('99556880-2');
				$('#_password').val('osvaldo123');
				$('#_username').val('ovaldenegro');
				$('.btn-info').click();
			}},
			{"label": "AIBARRA","class": "btn btn-inverse","callback": function() {
				$('#_rutEmpresa').val('99556880-2');
				$('#_password').val('demo123');
				$('#_username').val('aibarra');
				$('.btn-info').click();
			}}, 
			{"label": "Volver","class": "btn","callback": function() {}}
		]); 

	}else{
		var img = $('#img_nav').attr('src');
		var nameUs = $('#img_nav').attr('src');
		var code = $("<div class='alert alert-block alert-success'><p><strong><img src="+img+" class='img-circle'> Session Iniciada </strong> Seleccione un Modulo para Trabajar:</p></div>");
		if($("span:contains('ovaldenegro')").length>0){
			bootbox.dialog(code,[
				{"label": "Caja/Recaudacion","class": "btn btn-mini btn-info","callback": function() {window.open(cajaRecaudacion,'_blank');}},
				{"label": "Caja/Supervisor:AutorizaDiferencia","class": "btn btn-mini btn-info","callback": function() {window.open(CajaSupervisorAutoDiferencia,'_blank');}}, 
				{"label": "Dacion Horas","class": "btn btn-mini btn-info","callback": function() {window.open(dacionHoras,'_blank'); }},
				{"label": "Dacion Web","class": "btn btn-mini btn-info","callback": function() {window.open(agendamientoWeb,'_blank'); }},
				{"label": "Facturacion","class": "btn btn-mini btn-info","callback": function() {window.open(facturacion,'_blank'); }}, 
				{"label": "Admin. Usuario","class": "btn btn-mini btn-info","callback": function() {window.open(adminUsuario,'_blank'); }}, 
				{"label": "Admin. Profesionales","class": "btn btn-mini btn-info","callback": function() {window.open(adminProfesional,'_blank'); }},
				{"label": "Mantenedor Rebsol","class": "btn btn-mini btn-info","callback": function() {window.open(ManRebsol,'_blank'); }},
				{"label": "Perfil","class": "btn btn-mini btn-info","callback": function() {window.open(perfil,'_blank'); ;}},
				{"label": "Volver","class": "btn btn-mini","callback": function() {}}
			]);
		}
		if($("span:contains('aibarra')").length>0){
			bootbox.dialog(code,[
				{"label": "Arancel y Convenio","class": "btn btn-info","callback": function() {window.open(arancelConvenio,'_blank');}},
				{"label": "Presupuesto","class": "btn btn-info","callback": function() {window.open(presupuesto,'_blank');}}, 
				{"label": "Mantenedor Rebsol","class": "btn  btn-info","callback": function() {window.open(ManRebsol,'_blank'); }},
				{"label": "Volver","class": "btn","callback": function() {}}
			]); 
		}
		$("body .modal").css({ "width": "96%", "left": "2%", "margin-right": 'auto', "margin-left": '0%' });
	}
},700);

