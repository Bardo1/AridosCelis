var enBusqueda = false; 
var idFactura = null;

function fechaEmision(){
  var append = $("#fechaEmision").closest(".input-append").children('span').children('i');
  append.removeClass('icon-asterisk green icon-remove icon-large red');
  append.addClass('icon-spinner icon-spin');

  if($("#fechaVencimiento").is(":visible")){
	 var append = $("#fechaVencimiento").closest(".input-append").children('span').children('i');
	append.removeClass('icon-asterisk green icon-remove icon-large red');
	append.addClass('icon-spinner icon-spin');
  }
  setTimeout(function(){
	  var fechaEmision = $("#fechaEmision").val().split("-");
	  if(fechaEmision.length == 3){
	  if(!validaFechaEmision(fechaEmision)){
		  var respuesta =  ""+
			  "<div class='alert alert-block alert-danger'>"+
			  " <p>"+
			  " <strong> Error al Ingresar Fecha </strong>"+ 
			  " </p>"+
			  " Solo puede ingresar fecha hasta 60 días atras."+
			  "</div>";
		  bootbox.dialog(respuesta, [
			  {
				  "label"   : "<i class='icon-ok'></i> Ok",
				  "class"   : "btn btn-mini btn-info",
				  "callback": function() {
					  $("#fechaEmision").val('');
				  }
			  }
		  ]);

	  }else{

		var append = $("#fechaEmision").closest(".input-append").children('span').children('i');
		append.removeClass('icon-spinner icon-spin');
		append.addClass('dark-opaque icon-asterisk');
		validaCamposPertenecenDTE();
		if($("#fechaVencimiento").is(":visible")){
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
		}
	  }
	}
  }, 2000);
}
function verDetalleFactura(idfactura) { 

	mostrarMensajeCargando();
	var ruta = Routing.generate("Facturacion_verDetalleFactura");        
	$.post(ruta,{idfactura:idfactura},function(result){

		// $('#BloqueBusquedaAvanzada').hide();
		// $('#resultado').hide();
		$('#facturacion').html(result);
		ocultarMensajeNav();

	  }).error(function(xhr, textStatus, errorThrown){
	   bootbox.dialog(xhr.responseText,[{
		"label" : "<i class='icon-check-sign'></i> Aceptar",
		"class" : "btn-info btn-mini",
		"callback": function(){

		}}
	  ]);
	}); 
}

function validaCamposPertenecenDTE(){
  var x = 0;
	$('.DTEInput').each(function(){
	  if ( ($(this).is(":visible")) && ($(this).val() == null || $(this).val() == "") ) {
		x = x +1;
	  }
	});
	if($("#fechaEmision").val() == null || $("#fechaEmision").val() == ""){
		x = x +1;
	}
	if(($("#dirDest").is(":visible")) && ($("#dirDest").val() == null || $("#dirDest").val() == "")){
		x = x +1;
	}  
	if(x == 0){
	  if($('#btn-modificar').is(":visible")){
	  }else{
		$('#agregar-items').slideDown();
		$('#nav_mensaje').fadeOut('slow');
	  }
		/*$('#agregar-items').toggle(
		function(){
			$(".block").animate({"left": "1500px"}, "slow");
		}, function(){
			$(".block").animate({"left": "-1500px"}, "slow");
		}
		);*/
	}else{
		$('#agregar-items').slideUp();
		$('#nav_mensaje').fadeOut('slow');
		}
}



 function obtieneComuna(){
	  var append = $("#cmnaDest").closest(".input-append").children('span').children('i');
	  append.removeClass('icon-asterisk green icon-remove icon-large red');
	  append.addClass('icon-spinner icon-spin');
	  var data = {
		  comuna: $("#cmnaDest").val()
	  };
	  var ruta = Routing.generate("Caja_ProvinciaporComuna");
	  $.ajax({
		  type: 'get',
		  url: ruta,
		  data: data,
		  success: function(datar) {
		  datar = $.parseJSON(datar);
		  
		   if (datar instanceof Object == false) {
		   }else{
			var provincia = datar["0"];
			$("#ciudadDest").html(provincia);
			var append = $("#cmnaDest").closest(".input-append").children('span').children('i');
			append.removeClass('icon-spinner icon-spin');
			append.addClass('dark-opaque icon-asterisk');
		  }
		}
	  });
 }

function sumaTotal(num) {
 
  valorfinal = $('#subTotal').val();

  if (valorfinal=="") {
	valorfinal=0;
  };
 
  valorSuma = $('#total_'+num).val();

  if (valorSuma =="") { valorSuma = 0; };
  // console.log(valorfinal,valorSuma);

  valorfinal = parseInt(valorfinal)+parseInt(valorSuma);

  $('#subTotal').val(valorfinal);

  totales = $('.total').length;
  iva = $('#iva').val();

  if(valorfinal != 0){
	$('#guardaFactura').attr('disabled',false);
  }else{
	$('#guardaFactura').attr('disabled',true);
  }
  // if(totales > 1 && iva !== ""){
	  calculaIva();
  // }
}

function resta(valorResta) {
 
  valorfinal = $('#subTotal').val();
  
  if (valorfinal=="") {
	valorfinal=0;
  };

  valorfinal = parseInt(valorfinal)-parseInt(valorResta);

  $('#subTotal').val(valorfinal);

  totales = $('.total').length;
  iva = $('#iva').val();

  if(valorfinal != 0){
	$('#guardaFactura').attr('disabled',false);
  }else{
	$('#guardaFactura').attr('disabled',true);
  }
  // if(totales > 1 && iva !== ""){
	  calculaIva();
  // }
}

function calcularCantidad(num) {

  var cant = $('#cantidad_'+num).val();
  var valor = $('#valorUnitario_'+num).val();

  if(cant==""){ return false }
  if(valor==""){ return false }

  valorfinal = parseInt(cant) * parseInt(valor);
  

  $('#total_'+num).val(valorfinal);
  $('#total_'+num).focus();
  // sumaTotal(num);
}

function calculaIva(){
  iva = parseInt($('#iva').val());
  subTotal = parseInt($("#subTotal").val());

  // iva = iva/100;

  total = subTotal+(iva*(subTotal/100));
  inpuesto = total-subTotal;

  $('#inpuesto').val(inpuesto);
  $('#totalPagar').val(total);
}

Date.prototype.yyyymmdd = function() {         
  var yyyy = this.getFullYear().toString();                                    
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
  var dd  = this.getDate().toString();             
  return (dd[1]?dd:"0"+dd[0]) + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + yyyy;
};  

function validaFechaEmision(fechaEmision){
		var today    = new Date();
		var fecha    = new Date(today.getTime() - (60 * 24 * 3600 * 1000));
		var fInput   = new Date(fechaEmision[2], fechaEmision[1] - 1, fechaEmision[0]);
		var today60  = fecha.yyyymmdd().split("-");
		var fToday   = new Date(today60[2], today60[1] - 1, today60[0]);
		if(fInput < fToday){
		  return false;
		}else{
		  return true;
		}
}

function buscarItem() {

	  $("#alertInputItemsMensajeNo").hide();

	  var texto = $('#inputItemBuscar').val();
	  if (enBusqueda) {
		  return false;
	  }
	  if (texto.length < 4) {
		  return false;
	  }

	  $("#alertInputItemsGroupColor").removeClass("error");
	  $("#alertInputItemsIcon").removeClass("icon-remove-sign");
	  $("#alertInputItemsGroupColor").addClass("info");
	  $("#alertInputItemsIcon").addClass("");


	  var append = $('#iconItemBuscar');
	  append.removeClass('icon-asterisk');
	  append.addClass('icon-spinner icon-spin');
	  $('#resultadoItemBuscar').html('');
	  $('#divItemBuscar').hide();

	  enBusqueda = true;
	  var data = {
		  textoBusqueda: texto,
		  subEmpresa: $("#subEmpresa").val()
	  };
	  var ruta = Routing.generate("Facturacion_BuscarItem");
	  $.ajax({
		  type: 'get',
		  url: ruta,
		  data: data,
		  success: function(data) {
			  $('#resultadoItemBuscar').html(data);
			  $('#divItemBuscar').show();
			  append.removeClass('icon-spinner icon-spin');
			  append.addClass('icon-asterisk');
			  enBusqueda = false;
		  }
	  });
  }

function agregarItem(id) {

	var exist = $("#tbody_" + id);
	$('#resultadoItemBuscar').html("");
	$('#divItemBuscar, #resultadoItemBuscar').hide();

	if (exist.length == 1) {
	  var respuesta =  ""+
				  "<div class='alert alert-block alert-danger'>"+
				  " <p>"+
				  " <strong> Item se encuentra actualmente Seleccionado en Formulario Lista de Items</strong>"+ 
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
	  return false;
	}
	var data = {
		idItem: id,
		idEmpresa: $("#subEmpresa").val()
	};

	var ruta = Routing.generate("Facturacion_getItem");
	$.ajax({
		type: 'get',
		url: ruta,
		data: data,
		success: function(data) {
		  $('#items').show();
		  $('#inputItemBuscar').val("");
		  // if($('.tbodyItem').length > 0){
		  //   $(".separatorItems").show();
		  // }
		  $('#tableitemsHeader').show();
		  $("<tbody id='tbody_"+id +"' id-item='"+id+"'' class='tbodyItem'>...</tbody>").insertAfter("#theadItems");
		  //$('#tableitemsHeader').show().append("<tbody id='tbody_"+id +"' class='tbodyItem'>...</tbody>");
		  $("#tbody_"+id).html(data).slideDown();
		}
	});
}

function calculaValorItem(a, id){
   var total = 0;
   var c = parseInt((a==""||a==null)?0:a);
   var b = $('#precioItem_'+id).val();
   var m = parseInt((b==""||b==null)?0:b);
   var t = c*m;
   $("#montoTotalItem_"+id).html(addCommas(t));
   $('.montoTotalItem').each(function() {
	var c = $(this).text();
	var cc =parseFloat(c.split('.').join().replace(/,/g, ''));
	var b = parseInt(cc);
	total = total + b
	});
  $("#totalListadoItem").html(addCommas(total));
  if ( $("#monto_"+id).is(":visible") ) {
	var ho = obtenerMontoTotalPorFila(id);
	GenerarDescuentoItemMontoFromCantidad($("#monto_"+id).val(), ho, id);
  }
  if ( $("#porcentaje_"+id).is(":visible") ) {
	var ho = obtenerMontoTotalPorFila(id);
	GenerarDescuentoItemPorcentajeFromCantidad($("#porcentaje_"+id).val(), ho, id);
  }
}

function eliminarItem(id) {
  var total = 0;
  $('#tbody_'+id).fadeOut().promise().done(function(){
  $('#tbody_'+id).remove('#tbody_'+id)
  });
  setTimeout(function(){
	if ($('.tbodyItem').length == 0) {
	  $('#items').hide();
	  $('#tableitemsHeader').hide();
	  $('#totalListadoItem').val("0");
	}else{
	  $('.montoTotalItem').each(function() {
		var c = $(this).text();
		var co =parseFloat(c.split('.').join().replace(/,/g, ''));
		total = total + co;
		});
	  $("#totalListadoItem").html(addCommas(total));
	}
  }, 500);
}

function eliminarReferencia(count){
  countReferencia = count - 1;
  $('#tbodyReferencia_'+count).fadeOut().promise().done(function(){
  $('#tbodyReferencia_'+count).remove('#tbodyReferencia_'+count);
  });
  setTimeout(function(){
	if ($('.tbodyReferencia').length == 0) {
	  $('#referencias').hide();
	  $('#tableReferencia').hide();
	  countReferencia = 0;
	}
        if($(".tbodyReferencia").length >= 2){
          $('.indGlobal').show();
        }else{
          $('.indGlobal').hide();
        }

  }, 500);
}

function GenerarPrecio(a, id){
  var totall = 0;
  var m = parseInt((a==""||a==null)?0:a);
  var c = parseInt($('#cantidadItem_'+id).val());
  var t = c*m;
  $("#montoTotalItem_"+id).html(addCommas(t));
  $('.montoTotalItem').each(function() {
	var c = $(this).text();
	var co =parseFloat(c.split('.').join().replace(/,/g, ''));
	totall = totall + co;
	});
  $("#totalListadoItem").html(addCommas(totall));
 
  if ( $("#monto_"+id).is(":visible") ) {
	var ho = obtenerMontoTotalPorFila(id);
	GenerarDescuentoItemMontoFromCantidad($("#monto_"+id).val(), ho, id);
  }
  if ( $("#porcentaje_"+id).is(":visible") ) {
	var ho = obtenerMontoTotalPorFila(id);
	GenerarDescuentoItemPorcentajeFromCantidad($("#porcentaje_"+id).val(), ho, id);
  }
}

function aplicarComo(a, id){
  como = a;
  switch(como) {
  case 1:
	  resolverVistaItemPorcentaje(id);
	  break;
  case 0:
	  resolverVistaItemMonto(id);
	  break;
  case 2:
	  resolverVistaItemLimpiar(id);
	  break;
  }
}
function resolverVistaItemLimpiar(id){
  var totall = 0;
  $(".montoDescuento_"+id).html(0);
  $("#divMonto_"+id+", #divPorcentaje_"+id).hide();
  $("#porcentaje_"+id).val(0).trigger('change');
  $("#monto_"+id).val(0);
  var nuevoCalculoPrecioCantidad = parseInt($(".precioItem_"+id).val()) * parseInt($("requisitoItem_"+id).val());
  var montoTotalItem = $(".montoTotalItem_"+id).html(addCommas(nuevoCalculoPrecioCantidad));
  $('.montoTotalItem').each(function() {
	var c = $(this).text();
	var co =parseFloat(c.split('.').join().replace(/,/g, ''));
	totall = totall + co;
	});
  $("#totalListadoItem").html(addCommas(totall));
}

function resolverVistaItemPorcentaje(id){
  var totall = 0;
  $(".montoDescuento_"+id).html("0.00");
  $("#divPorcentaje_"+id).show();
  $("#divMonto_"+id).hide();
  $("#porcentaje_"+id).val(0).trigger('change');
  $("#monto_"+id).val(null);
  $("#porcentaje_"+id).trigger(
	  'configure',
	  {'min':0
	  ,'max':100
	  ,"fgColor":"#66CC66"
	  });
  $('.montoTotalItem').each(function() {
	var c = $(this).text();
	var co =parseFloat(c.split('.').join().replace(/,/g, ''));
	totall = totall + co;
	});
  $("#totalListadoItem").html(addCommas(totall));
}

function resolverVistaItemMonto(id){
  var totall = 0;
  $(".montoDescuento_"+id).html("0.00");
  $("#divMonto_"+id).show();
  $("#divPorcentaje_"+id).hide();
  $("#monto_"+id).val(0);
  $("#porcentaje_"+id).val(null).trigger('change');
  $("#monto_"+id).addClass('green');
  $("#monto_"+id).css('font-weight','bold');
  $('.montoTotalItem').each(function() {
	var c = $(this).text();
	var co =parseFloat(c.split('.').join().replace(/,/g, ''));
	totall = totall + co;
	});
  $("#totalListadoItem").html(addCommas(totall));
}

function GenerarDescuento(a, id){
	switch(como) {
	case 1:
		 GenerarDescuentoItemPorcentaje(a, id);
		break;
	case 0:
		GenerarDescuentoItemMonto(a, id);
		break;
	}
}

function GenerarDescuentoItemPorcentaje(a, id){
	var totall = 0;
	var m = obtenerMontoTotalPorFila(id);
	var z = parseInt(a); 
	var x = (m*z)/100;
	x = arregloPorcentaje(x);
	var y = x;

	$("#montoDescuento_"+id).html(addCommas(y));
	var total = m - y;
	$("#montoTotalItem_"+id).html(addCommas(total));
	console.log(total);
	// $("#totalListadoItem").html(addCommas(total));
	$('.montoTotalItem').each(function() {
	  var c = $(this).text();
	  var cc =parseFloat(c.split('.').join().replace(/,/g, ''));
	  totall = totall + cc;
	});
	$("#totalListadoItem").html(addCommas(totall));
}
function GenerarDescuentoItemPorcentajeFromCantidad(a, h, id){
	var totall = 0;
	var z = parseInt(a); 
	var x = (z*h)/100;
	 x = arregloPorcentaje(x);
	var y = x;

	$("#montoDescuento_"+id).html(addCommas(y));
	var total = h - y;
	$("#montoTotalItem_"+id).html(addCommas(total));
	$("#totalListadoItem").html(addCommas(total));
	$('.montoTotalItem').each(function() {
	var c = $(this).text();
	var co =parseFloat(c.split('.').join().replace(/,/g, ''));
	totall = totall + co;
	});
  $("#totalListadoItem").html(addCommas(totall));
}

function GenerarDescuentoItemMonto(a, id){
	var totall = 0;
	if(a == null || a == ""){
		a = 0;
	}else{
		if(a.substring(0, 1) == 0 && a.length > 1){
		   var total = a.substring(1, a.length-0);
		   $("#monto_"+id).val(total);
		}
	}
	var m = obtenerMontoTotalPorFila(id);
	var y = parseInt(a);
	$("#montoDescuento_"+id).html(addCommas(y));
	var total = parseInt(m) - y;
	$("#montoTotalItem_"+id).html(addCommas(total));
	$("#totalListadoItem").html(addCommas(total));
	$('.montoTotalItem').each(function() {
	var c = $(this).text();
	var co =parseFloat(c.split('.').join().replace(/,/g, ''));
	totall = totall + co
	});
  $("#totalListadoItem").html(addCommas(totall));
  }

  function GenerarDescuentoItemMontoFromCantidad(a, h, id){
	var totall = 0;
	if(a == null || a == ""){
		a = 0;
	}else{
		if(a.substring(0, 1) == 0 && a.length > 1){
		   var total = a.substring(1, a.length-0);
		   $("#monto_"+id).val(total);
		}
	}
	var m = h;
	var y = parseInt(a);
	$("#montoDescuento_"+id).html(addCommas(y));
	var total = parseInt(m) - y;
	$("#montoTotalItem_"+id).html(addCommas(total));
	$("#totalListadoItem").html(addCommas(total));
	$('.montoTotalItem').each(function() {
	var c = $(this).text();
	var co =parseFloat(c.split('.').join().replace(/,/g, ''));
	totall = totall + co
	});
  $("#totalListadoItem").html(addCommas(totall));
  }


function addCommas(nStr){
  // cuadraCentavos = 0;
  // posicion = 0;
  console.log(nStr);
  // var x             = nStr.substr(0, nStr.length-3);
  // console.log("x=" + x);
  // if(x == '.00'){
  //   posicion = 2;
  // }
  nStrAux = Math.round(nStr);
  
  var temp = nStrAux + '';
  console.log('temp '+temp);
  temp = temp.split('.').join().replace(/,/g, '');
  temp = temp + '';
  console.log('temp 2 '+temp);
  // var x2             = nStr.substr(-posicion);
  // var x1             = nStr.substr(0, nStr.length-posicion);
  var x1 = temp;
  // x2Int = parseInt(x2);
  // if(x2Int > 50){
  //   cuadraCentavos = 1;
  // }
  var rgx = /(\d+)(\d{3})/;
  // x1 = parseInt(x1);
  // x1 = x1 + cuadraCentavos;
  // x1 += '';
  while (rgx.test(x1)) {
	x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }

  return x1;
  // return x1 + x2;
}

function obtenerMontoTotalPorFila(id){
  var h     = $("#precioItem_"+id).val();
  var u     = $("#cantidadItem_"+id).val();
  var total = h * u;
  return total;
}
function obtenerMontoTotaldeItems(){
  var h  = $("#totalListadoItem").text();
  var co =parseFloat(h.split('.').join().replace(/,/g, ''))
  return co;
}

function aplicarGlobalTipo(a){
  if(a == 2){
  	$("#totalGlobalDescuento").html("0");
	$("#divMonto").hide();
	$("#divPorcentaje").hide();
	$(".radioGlobalComo, #GlosaDr").attr('disabled',true);
	$('.radioGlobalComo').prop('checked', false);
	$("#porcentaje").val(null).trigger('change');
	$("#monto, #GlosaDr").val(null);
  }else{
	tipoGlobal = a;
	$("#totalGlobalDescuento").html("0");
	$("#divMonto").hide();
	$("#divPorcentaje").hide();
	$(".radioGlobalComo, #GlosaDr").attr('disabled',false);
	$('.radioGlobalComo').prop('checked', false);
	$("#porcentaje").val(null).trigger('change');
	$("#monto").val(null);
  }
}

function aplicarGlobalComo(a){
  comoGlobal = a;
  switch(comoGlobal) {
  case 1:
	  resolverVistaGlobalPorcentaje();
	  break;
  case 0:
	  resolverVistaGlobalMonto();
	  break;
  }
}

function resolverVistaGlobalPorcentaje(){
  $('.totalAplicado').show();
  $("#totalGlobalDescuento").html("0.00");
  $("#divPorcentaje").show();
  $("#divMonto").hide();
  $("#porcentaje").val(0).trigger('change');
  $("#monto").val(null);
  if(tipoGlobal == 1){
  $("#porcentaje").trigger(
	  'configure',
	  {'min':0
	  ,'max':100
	  ,"fgColor":"#FF0000"
	  });
  }
  if(tipoGlobal == 0){
  $("#porcentaje").trigger(
	  'configure',
	  {'min':0
	  ,'max':100
	  ,"fgColor":"#66CC66"
	  });
  }
}

function resolverVistaGlobalMonto(){
  $('.totalAplicado').show();
  $("#totalGlobalDescuento").html("0");
  $("#divMonto").show();
  $("#divPorcentaje").hide();
  $("#monto").val(0);
  $("#porcentaje").val(null).trigger('change');
  $("#monto").css('font-weight','bold');
}

function GenerarDescuentoGlobalMonto(a){
	if(a == null || a == ""){
		a = 0;
	}else{
		if(a.substring(0, 1) == 0 && a.length > 1){
		   var total = a.substring(1, a.length-0);
		   $("#monto").val(total);
		}
	}
	var m = obtenerMontoTotaldeItems();
	var y = parseInt(a);
	if(tipoGlobal == 1){
	var total = parseInt(m) - y;
	}
	if(tipoGlobal == 0){
	var total = parseInt(m) + y;
	}
	$("#totalGlobalDescuento").html(addCommas(y));
	$("#totalConDiferencia").html(addCommas(total));
	TotalesFields();
  }

  function GenerarDescuentoGlobalPorcentaje(a){
	if(a == null || a == ""){
		a = 0;
	}else{
		if(a.substring(0, 1) == 0 && a.length > 1){
		   var total = a.substring(1, a.length-0);
		   $("#porcentaje").val(total);
		}
	}
	var m = obtenerMontoTotaldeItems();
	var x = (m*a)/100
	 x = arregloPorcentaje(x);
	var y = x;
	if(tipoGlobal == 1){
	var total = parseInt(m) - y;
	}
	if(tipoGlobal == 0){
	var total = parseInt(m) + y;
	}
	$("#totalGlobalDescuento").html(addCommas(y));
	$("#totalConDiferencia").html(addCommas(total));
	TotalesFields();
  }

function TotalesFields(){
  var valTotalSiniva      = 0;
  var valAplicaExento     = 0;
  var valAplicaAfecto     = 0;
  var valMontoTotal       = 0;
  var valIva              = 0;
  var valDiferencia       = 0;
  var valMontoaDiferencia = (removeComas($('#totalGlobalDescuento').text())==null)?
							0:removeComas($('#totalGlobalDescuento').text());
  var valDiferencia       = (removeComas($('#totalConDiferencia').text())==null)?
							0:removeComas($('#totalConDiferencia').text());                              
  $(".DTE"+dte).show();
  $('.tbodyItem').each(function() {
	var valInd  = removeComas($(this).find('.IndExento').val());
	var valItem = removeComas($(this).find('.montoTotalItem').text());
	if(valInd == 0){
	  valAplicaAfecto = valAplicaAfecto + valItem
	}else{
	  valAplicaExento = valAplicaExento + valItem;
	}
	// valTotalSiniva = valTotalSiniva + valItem;
  });
  console.log(dte);
  	if(dte == 56 || dte == 61 || dte == 55 || dte == 60 || dte == '56' || dte == '61' || dte == '55' || dte == '60'){
  		if(valAplicaAfecto >= 1){
  	  		valTotalSiniva = valAplicaAfecto;
	  		$("#MntExe").html(addCommas(valAplicaExento));
	  		valMontoTotal = removeComas($("#totalListadoItem").text());
	  		if($("#MntNeto").is(":visible")){
				$("#MntNeto").html(addCommas(valAplicaAfecto));
				$("#IVA").html(iva+'%');
				if(valMontoaDiferencia > 0){
		  			valTotalSiniva = valDiferencia;
				}
				valIva = (valTotalSiniva*parseInt(iva))/100;
				valIva = arregloPorcentaje(valIva);

				$("#TasaIVA").html(addCommas(valIva));
				valMontoTotal = valTotalSiniva + valIva;
	  		}else{
				if(valMontoaDiferencia > 0){
					valMontoTotal = valDiferencia;
				}
	  		}
		}else if(valAplicaExento >= 1){
	  		valMontoTotal = valAplicaExento;
	  		$("#MntExe").html(addCommas(valAplicaExento));
	  		$(".DinamicAfecto").hide();
		}
  	}else{
  		valTotalSiniva = valAplicaAfecto;
	  		$("#MntExe").html(addCommas(valAplicaExento));
	  		valMontoTotal = removeComas($("#totalListadoItem").text());
	  		if($("#MntNeto").is(":visible")){
				$("#MntNeto").html(addCommas(valAplicaAfecto));
				$("#IVA").html(iva+'%');
				if(valMontoaDiferencia > 0){
		  			valTotalSiniva = valDiferencia;
				}
				valIva = (valTotalSiniva*parseInt(iva))/100;
				valIva = arregloPorcentaje(valIva);

				$("#TasaIVA").html(addCommas(valIva));
				valMontoTotal = valTotalSiniva + valIva;
	  		}else{
				if(valMontoaDiferencia > 0){
					valMontoTotal = valDiferencia;
				}
	  		}
  	}

   
  var montoTotal = valMontoTotal;
  $("#MntTotal").html(addCommas(montoTotal));
  var textNum = getNumberLiteral(valMontoTotal);
  var largo = montoTotal.toString().length;
  var centavos = montoTotal.toString().substr(largo - 2, largo);
	$("#Obs4").val(textNum+' Pesos.');
  
  // if(centavos == "00"){
  //   $("#Obs4").val(textNum+' Pesos.');
  // }else{
  //   var centavosCero = centavosCeros(centavos);
  //   var textCent = getNumberLiteral(centavosCero);
  // }
}
function arregloPorcentaje(value){
  var valIvaString = value +'';
  var valIvaLen = valIvaString.length; 
  var vaIvalastIndexOf = valIvaString.lastIndexOf('.'); 
  var valIvaUbicacion = valIvaLen-vaIvalastIndexOf;
	
  if(valIvaUbicacion == 3){
	value = removeComas(Math.round(value));
  }else if(valIvaUbicacion == 4){
	value = removeComas(value);
  }
  return value;
}
function removeComas(a){
  //es importante al momento de generar datos en el IVA y otras operaciones, el hecho de poder saber si viene 
  //con decimales, esto pues al momento de aplicar un mathRoad, sueles considerar hasta 3 digitos valores decimales.
  a = a +'';
  return parseInt(a.split('.').join().replace(/,/g, ''));
}
function centavosCeros(d){
  return (d < 10) ? '0' + d.toString() : d.toString();
}

function letras(c,d,u){
  var centenas,decenas,decom
  var lc=""
  var ld=""
  var lu=""
  centenas=eval(c);
  decenas=eval(d);
  decom=eval(u);
  switch(centenas) 
  {
	case 0: lc="";break;
	case 1:
			{
			  if (decenas==0 && decom==0){
				lc="Cien";
			  }else{
				lc="Ciento ";
			  }
			  break;
		  }
  case 2: lc="Doscientos ";break;
  case 3: lc="Trescientos ";break;
  case 4: lc="Cuatrocientos ";break;
  case 5: lc="Quinientos ";break;
  case 6: lc="Seiscientos ";break;
  case 7: lc="Setecientos ";break;
  case 8: lc="Ochocientos ";break;
  case 9: lc="Novecientos ";break; 
  } 

  switch(decenas) 
  {
	 case 0: ld="";break;
	 case 1:
			{ 
			switch(decom) 
			{
			   case 0:ld="Diez";break;
			   case 1:ld="Once";break;
			   case 2:ld="Doce";break;
			   case 3:ld="Trece";break;
			   case 4:ld="Catorce";break;
			   case 5:ld="Quince";break;
			   case 6:ld="Dieciseis";break;
			   case 7:ld="Diecisiete";break;
			   case 8:ld="Dieciocho";break;
			   case 9:ld="Diecinueve";break;
			}
			}          
			break;
  case 2:ld="Veinte";break;
  case 3:ld="Treinta";break;
  case 4:ld="Cuarenta";break;
  case 5:ld="Cincuenta";break;
  case 6:ld="Sesenta";break;
  case 7:ld="Setenta";break;
  case 8:ld="Ochenta";break;
  case 9:ld="Noventa";break; 
  }
  switch(decom) 
  {
	 case 0: lu="";break;
	 case 1: lu="Un";break;
	 case 2: lu="Dos";break;
	 case 3: lu="Tres";break;
	 case 4: lu="Cuatro";break;
	 case 5: lu="Cinco";break;
	 case 6: lu="Seis";break;
	 case 7: lu="Siete";break;
	 case 8: lu="Ocho";break;
	 case 9: lu="Nueve";break; 
  }
   
  if (decenas==1)
  {
  return lc+ld;
  }
  if (decenas==0 || decom==0)
  {
  return lc+" "+ld+lu;
  }
  else
  {
  if(decenas==2) 
  {
  ld="Veinti";
  return lc + ld + lu.toLowerCase();
  }
  else
  {
  return lc+ld+" y "+lu
  }
  }
}
 
function getNumberLiteral(n)
{ 
  var m0,cm,dm,um,cmi,dmi,umi,ce,de,un,hlp,decimal;
   
  if (isNaN(n)) {
  alert("La Cantidad debe ser un valor Numérico.");
  return null
  }
  m0= parseInt(n/ 1000000000000); rm0=n% 1000000000000;
  m1= parseInt(rm0/100000000000); rm1=rm0%100000000000;
  m2= parseInt(rm1/10000000000); rm2=rm1%10000000000;
  m3= parseInt(rm2/1000000000); rm3=rm2%1000000000;
  cm= parseInt(rm3/100000000); r1= rm3%100000000;
  dm= parseInt(r1/10000000); r2= r1% 10000000;
  um= parseInt(r2/1000000); r3= r2% 1000000;
  cmi=parseInt(r3/100000); r4= r3% 100000;
  dmi=parseInt(r4/10000); r5= r4% 10000;
  umi=parseInt(r5/1000); r6= r5% 1000;
  ce= parseInt(r6/100); r7= r6% 100;
  de= parseInt(r7/10); r8= r7% 10;
  un= parseInt(r8/1);
  //r9=r8%1; 
  // 999123456789
  if (n< 1000000000000 && n>=1000000000)
  {
  tmp=n.toString();
  s=tmp.length;
  tmp1=tmp.slice(0,s-9)
  tmp2=tmp.slice(s-9,s);
   
  tmpn1=getNumberLiteral(tmp1);
  tmpn2=getNumberLiteral(tmp2);
   
  if(tmpn1.indexOf("Un")>=0)
  pred=" Billón "
  else
  pred=" Billones "
  return tmpn1+ pred +tmpn2;
  }
   
  if (n<10000000000 && n>=1000000)
  {
  mldata=letras(cm,dm,um); 
  hlp=mldata.replace("Un","*");
  if (hlp.indexOf("*")<0 || hlp.indexOf("*")>3)
  {
  mldata=mldata.replace("Uno","un");
  mldata+=" Millones ";
  }
  else
  {
  mldata="Un Millón ";
  }
  mdata=letras(cmi,dmi,umi);
  cdata=letras(ce,de,un);
  if(mdata!="   ")
  {
  if (n == 1000000) {
	 mdata=mdata.replace("Uno","un") + "de";
  } else {
	 mdata=mdata.replace("Uno","un")+" mil ";
  }
  }
   
  return (mldata+mdata+cdata);
  } 
  if (n<1000000 && n>=1000)
  {
  mdata=letras(cmi,dmi,umi);
  cdata=letras(ce,de,un);
  hlp=mdata.replace("Un","*");
  if (hlp.indexOf("*")<0 || hlp.indexOf("*")>3)
  {
  mdata=mdata.replace("Uno","un");
  return (mdata +" mil "+cdata);
  }
  else
	 return ("Mil "+ cdata);
  } 
  if (n<1000 && n>=1)
  {
  return (letras(ce,de,un));
  }
  if (n==0)
  {
  return " Cero";
  }
  return "No disponible"
}
 

//////////////////////////
//guardaFactura
//////////////////////////

function ArrayDatosTablaFacturacion() {
  var valDifAux  = removeComas($('#totalGlobalDescuento').text());
  
  var comoDiferencia = null;
	switch(comoGlobal) {
	case 1:
	  comoDiferencia = "%";
	  break;
	case 0:
	  comoDiferencia = "$";
	  break;
  }

  var tipoDiferencia = null;
	switch(tipoGlobal) {
	case 1:
	  tipoDiferencia = 2;
	  break;
	case 0:
	  tipoDiferencia = 1;
	  break;
  }

  return datosJson = {
	idPersona:              parseInt($("#datosDestinatarioTable").attr("data-idPersona")),
	fechaFacturacion:       $("#fechaEmision").val(),
	fechaVencimiento:       $("#fechaVencimiento").val(),
	fechaCancelacion:       $("#fechaCancel").val(),
	fechaPago:              $("#fechaPago").val(),
	idTipoDocumento:        $("#tipoDocumentoFacturacion").val(),
	idFormaPago:            $("#formaPago").val(),
	iva:                    iva,
	idFormaPago:            $("#formaPago").val(),
	direccionDestino:       $("#dirDest").val(),
	comunaDestino:          $("#cmnaDest").val(),
	IndicadorTraslado:      $("#IndTraslado").val(),
	montoExento:            removeComas($("#MntExe").text()),
	montoTotal:             removeComas($("#MntTotal").text()),
	montoNeto:              removeComas($("#totalListadoItem").text()),
	montoDiferencia:        (valDifAux>0)?removeComas($("#totalConDiferencia").text()):0,
	tasaIva:                removeComas($("#TasaIVA").text()),
	comoDiferencia:         comoDiferencia,
	glosaDiferencia:        $("#GlosaDr").val(),
	idSentidoDiferencia:    tipoDiferencia,
	idSubEmpresa:           $("#subEmpresa").val(),
	dte:                    dte
  };
}

function ArrayDatosTablaFacturacionObservaciones() {
  
  return datosJson = {
	Obs1:             $("#Obs1").val(),
	Obs2:             $("#Obs2").val(),
	Obs3:             $("#Obs3").val(),
	Obs4:             $("#Obs4").val(),
	Obs5:             $("#Obs5").val()
  };
}

function ArrayDatosTablaFacturacionDetalle() {
  var x          = $('.itemRecolectionId').length;
  var ListaItems = [];
  var count      = 0;

  $('.itemRecolectionId').each(function() {
		
		var id = $(this).attr('data-idItem');
		var a  = x //equivale a CAMPO ITEM //0
		a = (a)?a:0;
		var b  = $("#cantidadItem_"+id).val(); //1
		b = (b)?b:0;
		var c  = $("#precioItem_"+id).val(); //2
		c = (c)?c:0;
		var d  = $("#descripcionItem_"+id).val();//3
		d = (d)?d:"N/A";
		var e  = x;//4
		e = (e)?e:0;
		var f  = $(this).attr('data-codigo');//5
		f = (f)?f:"N/A";
		var g  = $(this).attr('data-nombre');//6
		g = (g)?g:"N/A";
		var h  = $("#unidadMedidaItem_"+id).val();//7
		h = (h)?h:0;
		var i  = $("#cantidadReferencia_"+id).val();//8
		i = (i)?i:0;
		var j  = $("#unidadMedidaReferencia_"+id).val();//9
		i = (i)?i:0;
		var k  = $("#precioReferencia_"+id).val();//10
		k = (k)?k:0;
		var l  = ($("#porcentaje_"+id).val()=="" || $("#porcentaje_"+id).val()==null)?0:$("#porcentaje_"+id).val();//11
		l = (l)?l:0;
		var m  = ($("#monto_"+id).val()=="" || $("#monto_"+id).val()==null)?0:$("#monto_"+id).val();//12
		m = (m)?m:0;
		var n  = $("#IndExento_"+id).val();//13
		n = (n)?n:0;
		var item          = [a,b,c,d,e,f,g,h,i,j,k,l,m,n];
		ListaItems[count] = item;
		var item          = [];
		count++;
		x--;
	  }); 
  return ListaItems;
}

function ArrayDatosTablaFacturacionReferencia() {
  var ListaReferencias = [];
  var count = 0;
  $('.indicadorReferencia').each(function() {
		var id = $(this).attr('countRefrencia');
		var a = $("#fechaReferencia_"+id).val();//0
		var b = ($('#RazonReferencia_'+id).is(':visible'))?$("#RazonReferencia_"+id).val():null;//1
		var c = $("#indGlobal_"+id).val();//2
		var d = $("#folioReferencia_"+id).val();//3
		var e = $("#IndDocumento_"+id).val();//4
		var f = ($('#codigoReferencia_'+id).is(':visible'))?$("#codigoReferencia_"+id).val():null;//5
		var referencia = [a,b,c,d,e,f];
		ListaReferencias[count] = referencia;
		count++;
		var referencia = [];
	  }); 
  return ListaReferencias;
}

function ParseNumericField(a){
  return parseFloat(a.replace(/,/g, ''));
}

function errorNewFacturacion(mensaje){
	var vistaHtml = "<div class='alert alert-block alert-danger '>" +
					"    <p>" +
					"    <strong><i class='icon-ok'></i> Error Durante el Proceso de Facturación</strong>" +
					"    </p>" +
					"    <p>" +
					mensaje+"." +
					"    </p>" +
					"</div>";
		bootbox.dialog(vistaHtml, [
			{
				"label": "Volver",
				"class": "btn btn-mini btn-volver",
				"callback": function() {
				   $('#buscarPaciente_error2, #divEmpresaBuscar').hide();
				  $('.limpiarCampos, #inputEmpresaBuscar').val('');
				  $("#facturacion ").load(location.href + " #facturacion ");
				  $("#divFormularioBusqueda").show();
				  $("#buscarPaciente_rut").val("");
				}
			}
		]);
}
function exitoNewFacturacion(mensaje, idFacturacion){
	console.log(mensaje, idFacturacion);
	$("#divEmpresaBuscar").hide();$("#inputEmpresaBuscar").val(null);$("#iconEmpresaBuscar").addClass('dark');
	 $('#buscarPaciente_error2, #divEmpresaBuscar').hide();
	  $('.limpiarCampos, #inputEmpresaBuscar').val('');
	console.log('limpio busqueda');
	var vistaHtml = "<div class='alert alert-block alert-success '>" +
					"    <p>" +
					"    <strong><i class='icon-ok'></i> Generacion Exitosa:</strong>" +
					"    </p>" +
					"    <p>" +
					mensaje+"." +
					"    </p>" +
					"</div>";
		bootbox.dialog(vistaHtml, [
			{
				"label": "Nuevo Item",
				"class": "btn btn-mini btn-success success",
				"callback": function() {
				  $("#facturacion ").load(location.href + " #facturacion ");
				  $("#divFormularioBusqueda").show();
				  $("#buscarPaciente_rut").val("");
				  var append = $("#buscarPaciente_rut").closest(".input-append").children('span').children('i');
				  append.removeClass('icon-ok-sign green icon-remove icon-large red');
				  append.addClass('dark-opaque icon-question-sign');
				}
			},
			{
				"label": "Enviar XML",
				"class": "btn btn-mini btn-success success",
				"callback": function() {
					envioXML(idFacturacion);
				}
			}
		]);
}

function envioXML(id){
  bootbox.hideAll();
  idFactura = id;
  $("#facturacionFormItem").fadeOut();
  var divCargando = "<div id='cargando'><br><br><br><center><h3 class='blue'><i class='icon-spinner icon-spin icon-large icon-4x blue'></i><div class='clearfix'></div><br><strong> Enviando </strong></h3></center></div>";
  $("#enviandoXMLDiv").html(divCargando);
  var data = {
		  idFacturacion: id
	  };
	  var ruta = Routing.generate("Facturacion_envioXML");
	  $.ajax({
		  type: 'get',
		  url: ruta,
		  data: data,
		  success: function(data) {
			  $("#enviandoXMLDiv").fadeOut();
			  $("#facturacionFormItem").fadeIn();
			  $("#enviandoXMLDiv").html("");

			  var respuesta = $.parseJSON(data);
			  console.log(respuesta.error);
			  if (respuesta.error == 1) {
				  errorNewFacturacion(respuesta.mensaje);
			  }
			  if (respuesta.error == 0) {
				  //en este caso idFacturacion contiene la URL del documento.
				  exitoEnvioXML(respuesta.mensaje, respuesta.idFacturacion);
			  }
		  }
	  });
}

function exitoEnvioXML(mensaje, urlSII){
  $("#divEmpresaBuscar").hide();$("#inputEmpresaBuscar").val(null);$("#iconEmpresaBuscar").addClass('dark');
   $('#buscarPaciente_error2, #divEmpresaBuscar').hide();
	  $('.limpiarCampos, #inputEmpresaBuscar').val('');
  console.log('limpio busqueda');
  var vistaHtml = "<div class='alert alert-block alert-success '>" +
					"    <p>" +
					"    <strong><i class='icon-ok'></i> Generacion Exitosa:</strong>" +
					"    </p>" +
					"    <p>" +
					mensaje+"." +
					"    </p>" +
					"</div>";
	  if($('#resultadoFacturacion').is(':visible')){
		$("#buscarPaciente_rut").val("");
					var append = $("#buscarPaciente_rut").closest(".input-append").children('span').children('i');
					append.removeClass('icon-ok-sign green icon-remove icon-large red');
					append.addClass('dark-opaque');
		bootbox.dialog(vistaHtml, [
			  {
				"label": "Volver",
				"class": "btn btn-mini btn-volver",
				"callback": function() {
				}
			},
			  {
				"label": "Revisar Documento Online",
				"class": "btn btn-mini btn-info success",
				"callback": function() {
					window.open(urlSII,'');
					$("#facturacion ").load(location.href + " #facturacion ");
					$("#divFormularioBusqueda").show();
				}
			}
			
			// ,
			// {
			//     "label": "Enviar XML",
			//     "class": "btn btn-mini btn-success success",
			//     "callback": function() {
			//         envioXML(idFacturacion);
			//     }
			// }
		]);
			}else{
			  $("#buscarPaciente_rut").val("");
					var append = $("#buscarPaciente_rut").closest(".input-append").children('span').children('i');
					append.removeClass('icon-ok-sign green icon-remove icon-large red');
					append.addClass('dark-opaque icon-asterisk');
					

				bootbox.dialog(vistaHtml, [
			{
				"label": "Nuevo Item",
				"class": "btn btn-mini btn-success success",
				"callback": function() {
				  $("#facturacion ").load(location.href + " #facturacion ");
				  $("#divFormularioBusqueda").show();
				}
			}, 
			  {
				"label": "Revisar Documento Online",
				"class": "btn btn-mini btn-info success",
				"callback": function() {
					window.open(urlSII,'');
					$("#facturacion ").load(location.href + " #facturacion ");
					$("#divFormularioBusqueda").show();                    
				}
			}
			
			// ,
			// {
			//     "label": "Enviar XML",
			//     "class": "btn btn-mini btn-success success",
			//     "callback": function() {
			//         envioXML(idFacturacion);
			//     }
			// }
		]);

			}
}

function errorEnvioXML(mensaje){
	$("#divEmpresaBuscar").hide();$("#inputEmpresaBuscar").val(null);$("#iconEmpresaBuscar").addClass('dark');
	 $('#buscarPaciente_error2, #divEmpresaBuscar').hide();
	  $('.limpiarCampos, #inputEmpresaBuscar').val('');
	console.log('limpio busqueda');
	var vistaHtml = "<div class='alert alert-block alert-danger '>" +
					"    <p>" +
					"    <strong><i class='icon-ok'></i> Error Durante el Proceso de envio de Factura:</strong>" +
					"    </p>" +
					"    <p>" +
					mensaje+"." +
					"    </p>" +
					"</div>";
					$("#buscarPaciente_rut").val("");
					var append = $("#buscarPaciente_rut").closest(".input-append").children('span').children('i');
					append.removeClass('icon-ok-sign green icon-remove icon-large red');
					append.addClass('dark-opaque icon-asterisk');
					
		bootbox.dialog(vistaHtml, [
			{
				"label": "Volver",
				"class": "btn btn-mini btn-volver",
				"callback": function() {
				  $("#facturacion ").load(location.href + " #facturacion ");
				  $("#divFormularioBusqueda").show();
				  $("#buscarPaciente_rut").val("");
				}
			},
			{
				"label": "Reintentar Envio",
				"class": "btn btn-mini btn-info success",
				"callback": function() {
					envioXML(idFactura);
				}
			}
		]);
}

////////////////////////////
// FOR TESTING ////////////
///////////////////////////

function agregarItemTest(){

	var error = "" +
		 "<div class='alert alert-block alert-danger'>" +
		 "    <p>" +
		 "    <strong>XTREME TEST, SIENTATE Y ESPERA <span id='numeroTest'></span></strong>" +
		 "    </p>" +
		 "</div>";
		 bootbox.dialog(error);

	 for(id = 0; id <= 100; id++) {
		var exist = $("#tbody_" + id);
	$('#resultadoItemBuscar').html("");
	$('#divItemBuscar, #resultadoItemBuscar').hide();

	var data = {
		idItem: id,
	};

	var ruta = Routing.generate("Facturacion_getItem_test");
	$.ajax({
		type: 'get',
		url: ruta,
		data: data,
		success: function(data) {
		  $('#items').show();
		  $('#inputItemBuscar').val("");
		  $('#tableitemsHeader').show();
		  $("<tbody id='tbody_"+id +"' id-item='"+id+"'' class='tbodyItem'>...</tbody>").insertAfter("#theadItems");
		  $("#tbody_"+id).html(data).slideDown();
		  $('#descripcionItem_'+id).val('Descripción Test N° '+id);
		  $('#IndExento_'+id).val(0);
		  $('#unidadMedidaItem_'+id).val(1);
		  $('#cantidadItem_'+id).val(1);
		  var monto = id+'001';
		  $('#precioItem_'+id).val(parseInt(monto));
		  var numeroTest = $(".tbodyItem").length;
		  $('#numeroTest').html(numeroTest);
		  if($(".tbodyItem").length == 101 ){
			console.log("ahora");
		   verificaTest();    
		   }else{
			console.log("aun no");
		   }
		}
	});

	 }
  if($(".tbodyItem").length == 101 ){
	console.log("ahora");
   verificaTest();    
   }else{
	console.log("aun no");
   }
}

function verificaTest(){
$('.tbodyItem').each(function() {
	var a = $(this).children().children().children().children().children().children().find('.cantidadItem').val();
	var id = $(this).children().children().children().children().children().children().find('.cantidadItem').attr('data-id');
	calculaValorItem(a, id);
 });

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
	  $('.requisitoItem').each(function() {
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
  bootbox.hideAll(); 
   
}


// function agregarItemTest(){

//      var id = null;
//      for(id = 0; id <= 100; id++) {
//         var exist = $("#tbody_" + id);
//     $('#resultadoItemBuscar').html("");
//     $('#divItemBuscar, #resultadoItemBuscar').hide();

//     if (exist.length == 1) {
//       var respuesta =  ""+
//                   "<div class='alert alert-block alert-danger'>"+
//                   " <p>"+
//                   " <strong> Item se encuentra actualmente Seleccionado en Formulario Lista de Items</strong>"+ 
//                   " </p>"+
//                   "</div>";
//       bootbox.dialog(respuesta, [
//           {
//             "label"   : "<i class='icon-ok'></i> Ok",
//             "class"   : "btn btn-mini btn-info",
//             "callback": function() {
//             }
//           }
//       ]);
//       return false;
//     }
//     var data = {
//         idItem: id,
//     };

//     var ruta = Routing.generate("Facturacion_getItem_test");
//     $.ajax({
//         type: 'get',
//         url: ruta,
//         data: data,
//         success: function(data) {
//           $('#items').show();
//           $('#inputItemBuscar').val("");
//           // if($('.tbodyItem').length > 0){
//           //   $(".separatorItems").show();
//           // }
//           $('#tableitemsHeader').show();
//           $("<tbody id='tbody_"+id +"' id-item='"+id+"'' class='tbodyItem'>...</tbody>").insertAfter("#theadItems");
//           //$('#tableitemsHeader').show().append("<tbody id='tbody_"+id +"' class='tbodyItem'>...</tbody>");
//           $("#tbody_"+id).html(data).slideDown();
//           $('#descripcionItem_'+id).val('Descripción Test N° '+id);
//           $('#IndExento_'+id).val(0);
//           $('#unidadMedidaItem_'+id).val(0);
//           $('#cantidadItem_'+id).val(1);
//           var monto = id+'001';
//           $('#precioItem_'+id).val(parseInt(monto));
//           calculaValorItemTest($('#precioItem_'+id).val(), id);
//         }
//     });
//      }
// }

function calculaValorItemTest(a, id){
  console.log(a);
   var total = 0;
   var c = parseInt((a==""||a==null)?0:a);
   var b = $('#precioItem_'+id).val();
   var m = parseInt((b==""||b==null)?0:b);
   var t = c*m;
   $("#montoTotalItem_"+id).html(addCommas(t));
   $('.montoTotalItem').each(function() {
	var c = $(this).text();
	var cc =parseFloat(c.split('.').join().replace(/,/g, ''))
	var b = parseInt(cc);
	total = total + b
	});
  $("#totalListadoItem").html(addCommas(total));
}

// function fortesting(){
//   console.log("kaka");
//     for(x = 0; x <= 100; x++) {
//      var contenido = 
//           "<tbody id='tbody_36"+x+
//           "' id-item='36"+x+
//           "' '='' class='tbodyItem' style=''>"+
//           "<tr class='titulo itemRecolectionId' data-iditem='36"+x+
//           "' data-codigo='1090"+x+
//           "' data-nombre='Ultraproct Pomada v."+x+
//           "'>"+
//     "<td colspan='3' class='headRowForms'>"+
//       "<div style='float:left'>"+  
//         "<h5 class='white'><b>1090 - Ultraproct Pomada v."+x+
//         "</b></h5>"+
//       "</div>"+
//                "<div class='btn-group pull-right btn-remove-row'>"+
//           "<a data-id='36"+x+
//           "' class='btn btn-app btn-danger btn-mini removeItem' onclick='eliminarItem($(this).data('id'))'>"+
//             "<i class='icon-trash'></i>"+
//           "</a>"+
//         "</div>"+
//     "</td>"+
//   "</tr>"+
//       "<tr class='table-hover'>"+
//               "<th colspan='2' class='headItemForm'>Descripción Item</th>"+
//         "<th colspan='' class='headItemForm'>Indicador Exento</th>"+
//       "</tr>"+
//       "<tr>"+
//               "<td colspan='2'>"+
//            "<div class='input-append'>"+
//                 "<input id='descripcionItem_36"+x+
//                 "' class='requisitoItem span6' type='text' maxlength='1000'>"+
//                 "<span class='add-on'><i class='icon-asterisk'></i></span>"+
//             "</div>"+
//             "<div class='clearfix'>"+"</div>"+
//             "<span id='error_descripcionItem_36"+x+
//             "' class='text-error hide'>"+
//             "<i class='pull-left bigger-130 icon-warning-sign'></i>Este valor no debe estar en blanco.</span>"+           
//         "</td>"+
//         "<td colspan=''>"+
//           "<div class='input-append'>"+
//                 "<select name='IndExento_36"+x+"' id='IndExento_36"+x+"' class='IndExento requisitoItem requisitoItem_36"+x
//                 +"'>"+
//                                                   "<option value='0'>[0] No aplica  </option>"+
//                                                   "<option value='1'>[1] No afecto o exento de IVA   </option>"+
//                                                   "<option value='2'>[2] Producto o servicio no es facturable  </option>"+
//                                                   "<option value='3'>[3] Garantía de depósito por envases   </option>"+
//                                                   "<option value='4'>[4] Ítem No Venta </option>"+
//                                       "</select>"+
//                "<span class='add-on'><i class='icon-asterisk'></i></span>"+
//             "</div>"+
//            "<div class='clearfix'></div>"+
//           "<span id='error_IndExento_36"+x+
//           "' class='text-error hide'>"+
//           "<i class='pull-left bigger-130 icon-warning-sign'>"+
//           "</i>Este valor no debe estar en blanco.</span>"+   
//         "</td>"+
//       "</tr>"+
//           "<tr>"+
//         "<th class='headItemForm'>Unidad Item</th>"+
//         "<th class='headItemForm'>Cantidad Item</th>"+
//         "<th colspan='' class='headItemForm'>Precio Item</th>"+
//       "</tr>"+
//       "<tr>"+
//         "<td>"+
//           "<div class='input-append'>"+
//                 "<select name='unidadMedidaItem_36"+x+
//                 "' id='unidadMedidaItem_36"+x+
//                 "' class='unidadMedidaItem requisitoItem requisitoItem_36"+x+
//                 "'>"+
//                     "<option value='' disabled='' selected=''>Seleccione Identificador</option>"+
//                                                   "<option value='1'>AMP  </option>"+
//                                                   "<option value='2'>BLS  </option>"+
//                                                   "<option value='3'>BOL  </option>"+
//                                                   "<option value='4'>BR  </option>"+
//                                                   "<option value='5'>BS  </option>"+
//                                                   "<option value='6'>CJ  </option>"+
//                                                   "<option value='7'>CM  </option>"+
//                                                   "<option value='8'>FA  </option>"+
//                                                   "<option value='9'>FCO  </option>"+
//                                                   "<option value='10'>GM  </option>"+
//                                                   "<option value='11'>GR  </option>"+
//                                                   "<option value='12'>KG  </option>"+
//                                                   "<option value='13'>LT  </option>"+
//                                                   "<option value='14'>ML  </option>"+
//                                                   "<option value='15'>MTZ  </option>"+
//                                                   "<option value='16'>OV  </option>"+
//                                                   "<option value='17'>PAP  </option>"+
//                                                   "<option value='18'>SUP  </option>"+
//                                                   "<option value='19'>TU  </option>"+
//                                                   "<option value='20'>UN  </option>"+
//                                                   "<option value='21'>BID  </option>"+
//                                                   "<option value='22'>PTE  </option>"+
//                                                   "<option value='23'>PAR  </option>"+
//                                                   "<option value='24'>RO  </option>"+
//                                                   "<option value='25'>SB  </option>"+
//                                                   "<option value='26'>SET  </option>"+
//                                                   "<option value='27'>BD  </option>"+
//                                                   "<option value='28'>FR  </option>"+
//                                                   "<option value='29'>GL  </option>"+
//                                                   "<option value='30'>KL  </option>"+
//                                                   "<option value='31'>MT  </option>"+
//                                                   "<option value='32'>MTR  </option>"+
//                                                   "<option value='33'>MG  </option>"+
//                                       "</select>"+
//                "<span class='add-on'><i class='icon-asterisk'></i></span>"+
//             "</div>"+
//             "<div class='clearfix'>"+"</div>"+
//              "<span id='error_unidadMedidaItem_36"+x+
//              "' class='text-error hide'>"+"<i class='pull-left bigger-130 icon-warning-sign'>"+
//              "</i>Este valor no debe estar en blanco.</span>"+     
//         "</td>"+
//         "<td>"+
//         "<div style='text-align:right;'>"+
//                "<h5>"+
//                "<b>"+
//               "<span class='cantidadItemInfo hide infobox-data-number' id='cantidadItemInfo_36"+x+
//               "'>"+
//               "</span>"+
//                "</b>"+
//                "</h5>"+
//               "</div>"+
//           "<div class='ace-spinner'>"+
//             "<div class='input-append'>"+
//               "<div class='ace-spinner'>"+"<div class='input-append'>"+
//               "<input type='text' class='input-mini spinner-input cantidadItem isNumeric requisitoItem requisitoItem_36"+x+
//               "' data-id='36"+x+
//               "' id='cantidadItem_36"+x+
//               "' maxlength='3' style='width: 30px;'>"+
//               "<div class='spinner-buttons btn-group btn-group-vertical'>"+            
//               "<button type='button' class='btn spinner-up btn-mini btn-info'>"+           
//               "<i class='icon-chevron-up'></i>"+           
//               "</button>"+           
//               "<button type='button' class='btn spinner-down btn-mini btn-info'>"+           
//               "<i class='icon-chevron-down'></i>"+           
//               "</button></div></div></div>"+
//               "<div class='spinner-buttons btn-group btn-group-vertical'>"+            
//               "</div>"+
//             "</div>"+
//           "</div>"+
//           "<div class='clearfix'></div>"+
//              "<span id='error_cantidadItem_36"+x+
//              "' class='text-error hide'><i class='pull-left bigger-130 icon-warning-sign'>"+
//              "</i>Este valor no debe estar en blanco.</span>"+   
//         "</td>"+
//         "<td colspan=''>"+
//           "<div class='input-append'>"+
//                 "<input id='precioItem_36"+x+
//                 "' data-id='36"+x+
//                 "' class='precioItem requisitoItem isNumeric' type='text' onkeyup='GenerarPrecio($(this).val(), $(this).data('id'))'>"+
//                 "<span class='add-on'>"+
//                 "<i class='icon-asterisk'></i></span>"+
//             "</div>"+ 
//             "<div class='clearfix'></div>"+
//              "<span id='error_precioItem_36"+x+
//              "'class='text-error hide'><i class='pull-left bigger-130 icon-warning-sign'>"+
//              "</i>Este valor no debe estar en blanco.</span>"+   
//         "</td>"+
//       "</tr>"+
//       "<tr>"+
//         "<th class='headItemForm'>Descuento</th>"+
//         "<th class='headItemForm'>Monto Descuento</th>"+
//         "<th class='headItemForm'>Monto Total Item</th>"+
//             "</tr>"+
//       "<tr>"+
//         "<td>"+
//           "<div id='formDescuento_36"+x+
//           "' class='formDescuento'>"+
//           "<div style='float:left'>"+
//             "<div class='control-group'>"+
//                   "<div class='controls'>"+
//                       "<label>"+
//                           "<input name='radioComo' data-id='36"+x+
//                           "' type='radio' class='ace como-radio' onclick='javascript:aplicarComo(1, $(this).data('id'));'>"+
//                           "<span class='lbl'>Porcentaje</span>"+
//                       "</label>"+
//                       "<label>"+
//                           "<input name='radioComo' data-id='36"+x+
//                           "' type='radio' class='ace como-radio' onclick='javascript:aplicarComo(0, $(this).data('id'));'>"+
//                           "<span class='lbl'>Monto</span>"+
//                       "</label>"+
//                   "</div>"+
//               "</div>"+
//           "</div>"+ 
//           "<div style='float:left'>&nbsp;&nbsp;</div>"+
//           "<div style='float:left'>"+  
//             "<div id='divPorcentaje_36"+x+
//             "' class='hide divPorcentaje'>"+
//                 "<div class='knob-container inline'>"+
//                   "<div style='display:inline;'>"+
//                       "<span class='input-icon input-icon-right'>"+
//                           "<div style='display:inline;width:64px;height:64px;'>"+
//                           "<canvas width='64' height='64'>"+
//                           "</canvas>"+
//                           "<input type='text' class='porcentaje_36"+x+
//                           "porcentajeInput input-small inputForDescuento isNumeric knob' data-id='36"+x+
//                           "' id='porcentaje_36"+x+
//                           "' maxlength='3' style='width: 36"+x+
//                           "px; height: 21px; position: absolute; vertical-align: middle; margin-top: 21px; margin-left: -50px; border: 0px; font-weight: bold; font-style: normal; font-variant: normal; font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial; text-align: center; color: rgb(135, 206, 235); padding: 0px; -webkit-appearance: none; background: none;' data-step='10' data-width='64' data-height='64' data-thickness='.2' onkeyup='verificoTipoPorcentajeItemInput($(this).val(), $(this).data('id'))' onchange='verificoTipoPorcentajeItemInput($(this).val(), $(this).data('id'))' onblur='verificoTipoPorcentajeItemInput($(this).val(), $(this).data('id'))' onmouseleave='verificoTipoPorcentajeItemKnob($(this).val(), $(this).data('id'))' onmouseover='verificoTipoPorcentajeItemKnob($(this).val(), $(this).data('id'))' onmousewheel='verificoTipoPorcentajeItemKnob($(this).val(), $(this).data('id'))'>"+
//                           "</div>"+
//                           "<span style=' font-size: small; position: absolute; left: 40px; top: 22px ' class='grey'><b>%</b></span>"+
//                       "</span>"+
//                   "</div>"+
//               "</div>"+
//             "</div>"+
//             "<div id='divMonto_36"+x+
//             "' class='hide divMonto' style='padding:10px 0 0 10px'>"+
//                "<span class='input-icon'>"+
//                 "<i class='icon-usd'></i>"+
//                 "<input type='text' class='monto_36"+x+
//                 " montoInput isNumeric inputForDescuento input-small' data-id='36"+x+
//                 "' id='monto_36"+x+
//                 "' onkeyup='GenerarDescuentoItemMonto($(this).val(), $(this).data('id'))'>"+    
//               "</span>"+
//             "</div>"+
//           "</div>"+
//           "</div>"+
//           "<div id='resumenDescuento_36"+x+
//           "' style='float:left' class='hide resumenDescuento'>"+ 
//             "<span id='resumenTipoDescuento_36"+x+
//             "'>"+"</span>"+
//           "</div>"+         
//         "</td>"+
//         "<td>"+ 
//         "<div style='text-align:right;'>"+
//           "<h5>"+"<b>"+
//             "<span class='grey'>$<span class='montoDescuento infobox-data-number' id='montoDescuento_36"+x+
//             "'>0.00</span>"+"</span>"+
//           "</b>"+"</h5>"+
//           "</div>"+
//         "</td>"+
//         "<td>"+
//          "<div style='text-align:right;'>"+
//            "<h5>"+"<b>"+
//           "<span class='red'>$<span class='montoTotalItem infobox-data-number' id='montoTotalItem_36"+x+
//           "'>0.00</span>"+
//           "</span>"+
//            "</b>"+
//            "</h5>"+
//           "</div>"+
//         "</td>"+
//            "</tr>"+
	  

//   "<script type='text/javascript' src='/js/fuelux/fuelux.spinner.min.js?v=4.6.0'></script>"+
//   "<script type='text/javascript' src='/js/jquery.knob.min.js?v=4.6.0'></script>"+ 
//   "<script type='text/javascript' src='/js/tipped/spinners.min.js?v=4.6.0'></script>"+
//   "<script>
//     $('.knob').knob();
//     var id = 36"+x+
//     ";
//     $('#cantidadReferencia_'+id).ace_spinner({
//           value:1,
//           min:1,
//           max:200,
//           step:1, 
//           btn_up_class:'btn-info' , 
//           btn_down_class:'btn-info'
//         });
//     $('#cantidadItem_'+id).ace_spinner({
//       value:1,
//       min:1,
//       max:200,
//       step:1, 
//       btn_up_class:'btn-info' , 
//       btn_down_class:'btn-info'
//     }).on('change', function(){
//           calculaValorItem($(this).val(), $(this).data('id'));
//         });

//   $('.isNumeric').bind('keypress', function(event) {
//       if (event.charCode !== 0) {
//           var regex = new RegExp('^[0-9]+$');
//           var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
//           if (!regex.test(key)) {
//               event.preventDefault();
//               return false;
//           }
//       }
//   });

//   function verificoTipoPorcentajeItemInput(a, id){
//         if(a == null || a == ''){
//             a = 0;
//         }else{
//             if(a.substring(0, 1) == 0 && a.length >1){
//                var total = a.substring(1, a.length-0);
//                $('#porcentaje_'+id).val(total).trigger('change');
//             }
//         }
//         GenerarDescuentoItemPorcentaje(a, id);
//   }
//   function verificoTipoPorcentajeItemKnob(a, id){
//           if(a == null || a == ''){
//                     a = 0;
//                 }else{
//                     if(a.substring(0, 1) == 0 && a.length > 1){
//                        var total = a.substring(1, a.length-0);
//                        $('#porcentaje_'+id).val(total).trigger('change');
//                     }
//                 }
//                 GenerarDescuentoItemPorcentaje(a, id);
//   }
//       setTimeout(function() {
//         $('#IndExento_'+id).val(0);
//         }, 500);


//     </script></tbody>";
//   contenido.insertAfter("#theadItems");
//   } 
// }