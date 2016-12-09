
$("#fechaEmision").blur(function(){
  fechaEmision();
  });

$('.subEmpresa').change(function(e){
	// comportamiento inicial
	if ( $("#itemsTable").is(":visible") ) {
	   $("#itemsTable").load(location.href + " #itemsTable");
	}
	
	$(".DTEDinamic, #agregar-items").hide();
	if ( $("#itemsTable").is(":visible") ) {
	  $("#itemsTable").load(location.href + " #itemsTable");
	}
	$(".DTEInput").val("");
	$("#fechaEmision").val("")
	$('.tdEmisor, #items, #agregar-items').hide();
	$('#tipoDocumentoFacturacion').attr('disabled', false);
	$('#tipoDocumentoFacturacion').html('<option value="" disabled="disabled" selected="selected">Cargando...</option>');
	$('#tipoDocumentoFacturacion').attr('disabled', true);
	e.preventDefault();
	var ruta = Routing.generate("Facturacion_GetSubEmpresaData");
	var idSubEmpresa = $('.subEmpresa').val();
	mostrarMensajeCargando();
	$.post(ruta,{idSubEmpresa:idSubEmpresa},function(result){
		ocultarMensajeNav();
		if ($.trim(result) === 'Error') {
			var respuesta =  ""+
				  "<div class='alert alert-block alert-danger'>"+
				  " <p>"+
				  " <strong> Error al Cargar Sub-Empresa, porfavor, Reintente.</strong>"+ 
				  " </p>"+
				  "</div>";
			bootbox.dialog(respuesta, [
				  {
					"label"   : "<i class='icon-ok'></i> Ok",
					"class"   : "btn btn-mini btn-info",
					"callback": function() {
					}
				  }
			]);
		}else{
		 result = $.parseJSON(result);
		 $('.tdEmisor').show();
		 $('#rutEmisor').html(result.rut);
		 $('#razonSoc').html(result.nombre);
		 direccionRazonSocial = result.direccion;
		 comuna = result.comuna
		var append = $('#tipoDocumentoFacturacion').closest(".input-append").children('span').children('i');
		append.removeClass('icon-asterisk');
		append.addClass('icon-spinner icon-spin');
		var ruta = Routing.generate("Facturacion_DTE_By_SubEmpresa");
		
		$.post(ruta,{idSubEmpresa:idSubEmpresa},function(data){
		data = $.parseJSON(data);
				  if(data.length == 0){
					$('#tipoDocumentoFacturacion').attr('disabled', false);
					$('#tipoDocumentoFacturacion').html('<option value="" disabled="disabled" selected="selected">Seleccionar Tipo de Documento</option>');
					
					append.removeClass('icon-spinner icon-spin');
					append.addClass('icon-asterisk');
					var respuesta =  ""+
					"<div class='alert alert-block alert-danger'>"+
					" <p>"+
					" <strong> No existen documentos disponibles para Sub-Empresa </strong>"+ 
					" </p>"+
					"</div>";
				  bootbox.dialog(respuesta, [
				  {
					"label"   : "<i class='icon-ok'></i> Aceptar",
					"class"   : "btn btn-mini btn-info",
					"callback": function() {
					  }
					}]);

				  }else{
					$("#tipoDocumentoFacturacion").prop('disabled', false);
					var options = '<option value="" disabled="disabled" selected="selected">Seleccionar Tipo de Documento</option>';
					for (var i = 0; i < data.length; i++) {
						options += "<option value=" + data[i].id + ">" + data[i].nombre + '</option>';
					}
					$('#tipoDocumentoFacturacion').html(options);
					append.removeClass('icon-spinner icon-spin');
					append.addClass('icon-asterisk');
					$("#divProximoNumeroFactura").hide();
					$("#proximoNumeroFactura").html("");
				  }
				  
		});
		  
		}
	}).error(function(xhr, textStatus, errorThrown){
		bootbox.dialog(xhr.responseText,[{
		  "label" : "<i class='icon-check-sign'></i> Aceptar",
		  "class" : "btn-info btn-mini",
		  "callback": function(){
		  }}
		]);
	});
});

$('#cmnaDest').change(function(e){
  obtieneComuna();
});
$('#formaPago').change(function(e){
	// var ruta = Routing.generate("Facturacion_ConsultaTipoMedioPago_EsEfectivo");
	// var idMedioPago = $('#formaPago').val();
	// $.post(ruta,{idMedioPago:idMedioPago},function(result){
	// 	result = $.parseJSON(result);
		if ($(this).val() != 2){
		// if (result == true){
			if($("#fechaVencimiento").is(":visible")){
	    		$('#fechaVencimiento').val('').parents().eq(2).hide();
	    		$("#fechaVencimiento").datepicker('update', $("#fechaEmision").val());
			}	   	
		}
		if ($(this).val() == 2){
			if(!$("#fechaVencimiento").is(":visible")){
				$('#fechaVencimiento').val('').parents().eq(2).show();
				if($("#fechaEmision").val().length>0){
				  var fechaEmision = $("#fechaEmision").val().split("-");
				  var append = $("#fechaVencimiento").closest(".input-append").children('span').children('i');
				  append.removeClass('icon-asterisk green icon-remove icon-large red');
				  append.addClass('icon-spinner icon-spin');
				  var dia = fechaEmision['0'];
				  if(fechaEmision['2']=="12" || fechaEmision['2']==12){
					var mes = 1;
					var ano = parseInt(fechaEmision['2'])+1;
				  }else{
				  var mes = parseInt(fechaEmision['1'])+1;
				  var ano = fechaEmision['2'];
				  }
				  var fechaVencimiento = (dia+"-"+mes+"-"+ano);
				  $("#fechaVencimiento").datepicker('update', fechaVencimiento);

				  var append = $("#fechaVencimiento").closest(".input-append").children('span').children('i');
				  append.removeClass('icon-spinner icon-spin');
				  append.addClass('dark-opaque icon-asterisk');
				  validaCamposPertenecenDTE();
				}
			}
			setTimeout(function() {
				validaCampos();
			}, 1000);
			}
		   	
		validaCamposPertenecenDTE();
	// }).error(function(xhr, textStatus, errorThrown){
	// 	bootbox.dialog(xhr.responseText,[{
	// 	  "label" : "<i class='icon-check-sign'></i> Aceptar",
	// 	  "class" : "btn-info btn-mini",
	// 	  "callback": function(){
	// 	  }
	// 	}]);
	// });
});
$('.tipoDocumentoFacturacion').change(function(e){

	//todos los eventos ocurren en deshabilitar
	$(".DTEDinamic, #agregar-items").hide();
	if($("#itemsTable").is(":visible")){
	   $("#itemsTable").load(location.href + " #itemsTable");
	}
	$(".DTEInput").val("");
	e.preventDefault();
	var ruta = Routing.generate("Facturacion_ValidaNumeroDocumento");
	var idTipoDocumento = $('.tipoDocumentoFacturacion').val();
	mostrarMensajeCargando();
	$.post(ruta,{idTipoDocumento:idTipoDocumento, idsubEmpresa:$('.subEmpresa').val()},function(result){
		validaCampos();
		ocultarMensajeNav();
		result = $.parseJSON(result);
		if ($.trim(result.Error) == 1) {
			var respuesta =  ""+
			  "<div class='alert alert-block alert-danger'>"+
			  " <p>"+
			  " <strong> No existen documentos disponibles </strong>"+ 
			  " </p>"+
			  "</div>";
			bootbox.dialog(respuesta, [
			{
			  "label"   : "<i class='icon-ok'></i> Ok",
			  "class"   : "btn btn-mini btn-info",
			  "callback": function() {
				$("#guardaFactura").hide();
				}
			}]);
		}else if ($.trim(result.Error) == 2){
		   var respuesta =  ""+
			  "<div class='alert alert-block alert-danger'>"+
			  " <p>"+
			  " <strong> No tiene mas Talonario para Generar Facturas </strong>"+ 
			  " </p>"+
			  "</div>";
			bootbox.dialog(respuesta, [
			{
			  "label"   : "<i class='icon-ok'></i> Ok",
			  "class"   : "btn btn-mini btn-info",
			  "callback": function() {
				$("#guardaFactura").hide();
				}
			}]);
			
		}else if ($.trim(result.Error) == 0){
		  dte = $.trim(result.sii);
		  SmartForm($.trim(result.sii));
		  $('#fechaEmision').attr('disabled', false);
		  $("#divProximoNumeroFactura").show();

		  $("#proximoNumeroFactura").html(result.numActual);
		  $("#dirDest").val(direccionRazonSocial);
		  $("#cmnaDest").val(comuna);
		  obtieneComuna();
		  setTimeout(function(){
		   if($("#fechaVencimiento").is(":visible")){
			if($("#fechaEmision").val().length>0){
			  var fechaEmision = $("#fechaEmision").val().split("-");
			  var append = $("#fechaVencimiento").closest(".input-append").children('span').children('i');
			  append.removeClass('icon-asterisk green icon-remove icon-large red');
			  append.addClass('icon-spinner icon-spin');
			  var dia = fechaEmision['0'];
			  if(fechaEmision['2']=="12" || fechaEmision['2']==12){
				var mes = 1;
				var ano = parseInt(fechaEmision['2'])+1;
			  }else{
			  var mes = parseInt(fechaEmision['1'])+1;
			  var ano = fechaEmision['2'];
			  }
			  var fechaVencimiento = (dia+"-"+mes+"-"+ano);
			  $("#fechaVencimiento").datepicker('update', fechaVencimiento);

			  var append = $("#fechaVencimiento").closest(".input-append").children('span').children('i');
			  append.removeClass('icon-spinner icon-spin');
			  append.addClass('dark-opaque icon-asterisk');
			  validaCamposPertenecenDTE();
			}
			}
			setTimeout(function() {
				validaCampos();
			}, 1000);
		  },1000);
			if($("#fechaEmision").val().length == 0){
			  var ruta = Routing.generate("Facturacion_UltimaFechaFactura");
			  var idTipoDocumento = $('.tipoDocumentoFacturacion').val();
			  console.log(idTipoDocumento);
			  mostrarMensajeCargando();
			  $.post(ruta,{idTipoDocumento:idTipoDocumento},function(result){
				var result = $.parseJSON(result);
				
				if (result.date != null || result.date != undefined) {
					  var año = result.date.substr(0, 4);
					  var mes = result.date.substr(5, 2);
					  var dia = result.date.substr(8, 2);
					  var dateFactura = dia + "-" + mes + "-" + año;
					  $("#fechaEmision").datepicker('update', dateFactura);
					  fechaEmision();
					  validaCamposPertenecenDTE();
				  }else{
					  var dateHoy = new Date();
					  $("#fechaEmision").datepicker('update', dateHoy);
					  validaCamposPertenecenDTE();
				  }
			  	});
			  	setTimeout(function() {
					validaCampos();
				}, 1000);
			}
			if($.trim(result.faltan) == 0){
			  var respuesta =  ""+
			  "<div class='alert alert-block alert-warning'>"+
			  " <p>"+
			  " <strong>El talonario del documento seleccionado cuenta con "+result.cantidadFalta+" números disponibles. Debe ponerse en contacto con Supervisor para cargar un nuevo talonario o extender el actual.</strong>"
			  " </p>"+
			  "</div>";
			bootbox.dialog(respuesta, [
			{
			  "label"   : "<i class='icon-ok'></i> Entiendo",
			  "class"   : "btn btn-mini btn-info",
			  "callback": function() {
				}
			}]);
			}
		}
		validaCamposPertenecenDTE();
	}).error(function(xhr, textStatus, errorThrown){
		bootbox.dialog(xhr.responseText,[{
		  "label" : "<i class='icon-check-sign'></i> Aceptar",
		  "class" : "btn-info btn-mini",
		  "callback": function(){
		  }
		}]);
	});
	setTimeout(function() {
		validaCampos();
	}, 1000);
});

$('.btn-pestanasLimpias').click(function(){
  $('.limpiarCampos ').val('');
  $('#formularioBusqueda').show();
  $('#BloqueBusquedaAvanzada').show();
  $('#divFormularioBusqueda').show();
  $('#resultadoBusqueda').hide();
  $('#resultadoFacturacion').hide();
  $('#facturacion').hide();
  $('#btnLimpiarPersonaEmpresa').addClass('hidden');
  $('#buscarPaciente_error2').hide();
});

$("#inputItemBuscar").keypress(function(e) {
	if (e.which === 13) {
		buscarItem();
	}
});
$('#inputItemBuscar').on('keyup', function() {
	$('#resultadoItemBuscar').html("");
	$('#divItemBuscar, #resultadoItemBuscar').hide();
	buscarItem();
});

$('.DTEInput').on('blur change keyup', function() {
	validaCamposPertenecenDTE();
});

$('#btn-continuar').on('click', function() {
	$(".text-error").hide();

	var h  = $("#totalListadoItem").text();
	$("#totalConDiferencia").html(h);
	var x = 0;
	$('.requisitoItem').each(function() {
		 if ( ($(this).is(":visible")) && ($(this).val() == null || $(this).val() == "") ) {
		 var a = $(this).attr('id');
		 $("#error_"+a).show();
		 x = x +1;
	   }
	});    
	if(x == 0){
	  $(".text-error, #btn-continuar, #agregar-items").hide();
	  $(".spinner-buttons, .removeItem").hide();
	  $("#diferencia").slideDown();
	  $("#btn-modificar").show();
	  $("#observaciones").show();
	  $("#guardaFactura").show();

	  $('.descripcionItemAutoLoad').each(function() {
		if ($(this).val == '' || $(this).val == null) {
		  $(this).val(' ');
		}
	  });
	  $('.requisitoItem, .descripcionItemAutoLoad').each(function() {
		if ($(this).is(":visible") && $(this).is("input")) {
		  $(this).prop('readonly', true);
		}
		if ($(this).is(":visible") && $(this).is("select")) {
		  $(this).attr("disabled", true);
		}
	  }); 
	  $('.inputForDescuento').each(function() {
		var id = $(this).data('id');
		$("#resumenTipoDescuento_"+id).html("-");
	  });
	  $('.formDescuento').hide();
	  $('.resumenDescuento').show();
	  $('.cantidadReferencia').each(function() {
		var id = $(this).data('id');
		$(this).hide();
		$("#cantidadReferenciaInfo_"+id).show();
		$("#cantidadReferenciaInfo_"+id).html($(this).val());
	  });
	  $('.cantidadItem').each(function() {
		var id = $(this).data('id');
		$(this).hide();
		$("#cantidadItemInfo_"+id).show();
		$("#cantidadItemInfo_"+id).html($(this).val());
	  });
	}
	TotalesFields();
});

$('#btn-modificar').on('click', function() {
   
  $(".text-error").hide();
  $("#btn-continuar, #agregar-items, .removeItem").show();
  $("#btn-modificar").hide();
  $(".spinner-buttons").show()
  $("#diferencia").slideUp();
  $("#observaciones").hide();
  $("#guardaFactura").hide();
  $('.requisitoItem').each(function() {
	  $(this).prop('readonly', false);
	  $(this).prop('disabled', false);
  }); 
  $('.formDescuento').show();
  $('.resumenDescuento').hide();
	$('.descripcionItemAutoLoad').each(function() {
		if ($(this).val == '' || $(this).val == null) {
		  $(this).val(' ');
		}
	  });
  $('.inputForDescuento').each(function() {
	  var id = $(this).data('id');
	  $("#resumenTipoDescuento_"+id).html("");
	  $("#resumenAplicadoDescuento_"+id).html("");
  });
  $('.cantidadReferencia').each(function() {
	var id = $(this).data('id');
	$(this).show();
	$("#cantidadReferenciaInfo_"+id).hide();
	$("#cantidadReferenciaInfo_"+id).html("");
  });
  $('.cantidadItem').each(function() {
	var id = $(this).data('id');
	$(this).show();
	$("#cantidadItemInfo_"+id).hide();
	$("#cantidadItemInfo_"+id).html("");
  });
  $(".descripcionItemAutoLoad").attr('readOnly', false);
  $("#MntTotal").html(""); 
  if(dte == 34 || dte == 32){
  	$('.IndExento_'+dte).val(1);
	$('.IndExento_'+dte).attr('disabled', true);
	//1 es para documento exento o no afecto
  }
  if(dte == 33 || dte == 30){
	$('.IndExento_'+dte).val(0);
	$('.IndExento_'+dte).attr('disabled', true);
	//0 es para documento afecto
  }

});

$('#agregarReferencia').on('click', function() {
  countReferencia = countReferencia +1;

   if($('.tbodyReferencia').length > 0) {
	$('.tbodyReferencia').each(function() {
	  if ( ($(this).is(":visible"))) {
		var a = $(this).attr('count-referencia');
		if(a == countReferencia){
		  countReferencia = countReferencia +1;
		  return;
		}
	  }
	});  
  }
  var data = {
		countReferencia: countReferencia
	};

	var ruta = Routing.generate("Facturacion_getReferencia");
	$.ajax({
		type: 'get',
		url: ruta,
		data: data,
		success: function(data) {
		  $('#referencias').show();
		  // if($('.tbodyReferencia').length > 0){
		  //   $(".separatorItems").show();
		  // }
		  $('#tableReferencia').show();
		  $("<tbody id='tbodyReferencia_"+countReferencia+"' count-referencia="+countReferencia+" class='tbodyReferencia'>...</tbody>").insertAfter("#theadReferencia");
		  $("#tbodyReferencia_"+countReferencia).html(data).slideDown().promise().done(function(){
			$(".knob").knob();
			$(".DTE"+dte).show();
			$(".NA"+dte).hide();
		  });
		  
		}
	});
});

$('#ContinarSinReferencia').on('click', function() {
	$(".text-error").hide();
	$("#agregarReferencia").hide();
	$("#observaciones").show();
});

$('#ContinarConReferencia').on('click', function() {
	$(".text-error").hide();
	var x = 0;
	$('.requisitoReferencia').each(function() {
		 if ( ($(this).is(":visible")) && ($(this).val() == null || $(this).val() == "") ) {
		 var a = $(this).attr('id');
		 $("#error_"+a).show();
		 x = x +1;
	   }
	});    
	if(x == 0){
	  $(".text-error, #ContinarConReferencia, #agregarReferencia").hide();
	  $(".removeReferencia").hide();
	  $("#observaciones").slideDown();
	  $("#modificarConReferencia").show();
	  $('.requisitoReferencia').each(function() {
		if ($(this).is(":visible") && $(this).is("input")) {
		  $(this).prop('readonly', true);
		}
		if ($(this).is(":visible") && $(this).is("select")) {
		  $(this).attr("disabled", true);
		}
	  }); 
	}
});


$('#modificarConReferencia').on('click', function() {
	$(".text-error").hide();
	var x = 0;
	$('.requisitoReferencia').each(function() {
		 if ( ($(this).is(":visible")) && ($(this).val() == null || $(this).val() == "") ) {
		 var a = $(this).attr('id');
		 $("#error_"+a).show();
		 x = x +1;
	   }
	});  
	// var valDifAux = removeComas($('#totalGlobalDescuento').text());
	// if($("#GlosaDr").val().length==0){
	// $("#error_GlosaDiferencia").show();
	// x = x +1;
	// }

	if(x == 0){
	  $("#ContinarConReferencia, #agregarReferencia").show();
	  $(".removeReferencia").show();
	  $("#observaciones").slideUp();
	  $("#modificarConReferencia").show();
	  $('.requisitoReferencia').each(function() {
		if ($(this).is(":visible") && $(this).is("input")) {
		 $(this).prop('readonly', false);
		}
	  }); 
	}
});

$('#guardaFactura').click(function(e){
	$('#guardaFactura').attr('disabled', true).hide();
	 e.preventDefault();
	 $(".text-error").hide();
	 var x = 0;
	 $('.requisitoReferencia').each(function() {
		 if ( ($(this).is(":visible")) && ($(this).val() == null || $(this).val() == "") ) {
		 var a = $(this).attr('id');
		 $("#error_"+a).show();
		 x = x +1;
	   }
	}); 
	$('.requisitoObs').each(function() {
		 if ( ($(this).is(":visible")) && ($(this).val() == null || $(this).val() == "") ) {
		 var a = $(this).attr('id');
		 $("#error"+a).show();
		 x = x +1;
	   }
	}); 

	if(x == 0){
	  $(".text-error").hide();
	  var ruta = Routing.generate("Facturacion_New");
	  var datosFacturacion = {ArrayDatosTablaFacturacion: ArrayDatosTablaFacturacion(), 
							  ArrayDatosTablaFacturacionObservaciones: ArrayDatosTablaFacturacionObservaciones(), 
							  ArrayDatosTablaFacturacionDetalle: ArrayDatosTablaFacturacionDetalle(), 
							  ArrayDatosTablaFacturacionReferencia: (ArrayDatosTablaFacturacionReferencia().length == 0)?null:ArrayDatosTablaFacturacionReferencia() };
	  $.ajax({type: 'POST',
		  url: ruta,
		  async: false,
		  data: datosFacturacion,
		  success: function(respuesta) {
			var respuesta = $.parseJSON(respuesta);
			$('#guardaFactura').attr('disabled', false).show();
			if (respuesta.error == 1) {
				  errorNewFacturacion(respuesta.mensaje);
			  }
			if (respuesta.error == 0) {
				  exitoNewFacturacion(respuesta.mensaje, respuesta.idFacturacion);
			  }
		  }
	  });
	}else{
		$('#guardaFactura').attr('disabled', false).show();
	}
});