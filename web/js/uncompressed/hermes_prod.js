/**
 * En las siguientes lineas se puede activar o desactivar los console.log() de la aplicación. 
 * Esta es para que en el ambiente de producción no se muestren los console.log();
 */
(function () {
  var log = console.log;
  console.log = function () {};
}());

function obtenerHoraServidor(path) {
	$.post(path, null, function(data, textStatus, xhr) { return data; });
}

function mantenerConexionServidor(path) {
	setInterval(function () {
		obtenerHoraServidor(path);
	}, 30000);
}