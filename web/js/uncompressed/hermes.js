/**
 * mostrarMensajeNav: Función para generar mensajes de aviso 
 * 					  al lado derecho del logo de la empresa.
 * @param  {string} mensaje [Mensaje del aviso (default: Cargando...)]
 * @param  {string} color   [Color del aviso (default: #333)]
 * @param  {string} zindex  [z-index del aviso] (default: 1)]
 */
function mostrarMensajeNav(mensaje, color, zindex) {
	mensaje  = typeof mensaje !== 'undefined' ? mensaje : 'Cargando...';
	color    = typeof color   !== 'undefined' ? color   : '#333';
	zindex   = typeof zindex  !== 'undefined' ? zindex  : '1';
	$('#nav_mensajeSpan').html(mensaje);
	$('#nav_mensaje').css('opacity', '0.8');
	$('#nav_mensaje').css('color', color);
	$('#nav_mensaje').css('z-index', zindex);
	$('#nav_mensaje').fadeIn("slow");
}
/**
 * mostrarMensajeGuardando: Función para generar un mensaje de guardando
 */
function mostrarMensajeGuardando() {
	mostrarMensajeNav('Guardando...', '#387038', '1');
}
/**
 * mostrarMensajeEliminando: Función para generar un mensaje de eliminando
 */
function mostrarMensajeEliminando() {
	mostrarMensajeNav('Eliminando...', '#802420', '1');
}
/**
 * mostrarMensajeCargando: Función para generar un mensaje de cargando
 */
function mostrarMensajeCargando() {
	mostrarMensajeNav('Cargando...', '#1F6377', '1');
}
/**
 * ocultarMensajeNav: Función para ocultar el mensaje de aviso
 */
function ocultarMensajeNav() {
	$('#nav_mensajeSpan').html('');
	$('#nav_mensaje').fadeOut('slow');
}
/**
 * obtenerHoraSistema: Función para obtener la hora y fecha del sistema que está usando la aplicación
 */
function obtenerHoraSistema() {
	var h    = new Date();
	var dd   = h.getDate(); 
	var mm   = h.getMonth()+1;
	var yyyy = h.getFullYear(); 
	if(dd < 10) { 
		dd = '0'+dd;
	} 
	if(mm < 10) {
		mm = '0'+mm;
	}
	
	$("#horaSistema").html(""+dd+'-'+mm+'-'+yyyy+" ")
	$("#horaSistema").append(((h.getHours()<10)?"0":"")+h.getHours()+":")
	$("#horaSistema").append(((h.getMinutes()<10)?"0":"")+h.getMinutes()+":")
	$("#horaSistema").append(((h.getSeconds()<10)?"0":"")+h.getSeconds());
	setTimeout( "obtenerHoraSistema();", 1000 );
}
/**
 * obtenerDatosModulo: Función para obtener los datos del módulo.
 */
function obtenerDatosModulo(moduloJSON) {
	moduloJSON = $.parseJSON(moduloJSON);
	
	$('#moduloNombre').html(moduloJSON['nombre']);
	$('#moduloIcono').addClass(moduloJSON['icono']);
	$('#btn-manualesModulos').attr('href', '/manuales/'+moduloJSON['modulo']+'.pdf');

	// var pathManual = '{{ path('hermes_obtener_manual_modulo', {iIdModulo: 'iIdModulo'}) }}';
	// pathManual = pathManual.replace("iIdModulo", moduloJSON['idCodify']);
	// $('#btn-manualesModulos').attr('href', pathManual);
}