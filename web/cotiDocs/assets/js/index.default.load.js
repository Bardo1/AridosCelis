
;
(function($, window, document, undefined) {

	'use strict';

	var CONFIGURACION_POR_DEFECTO = CONFIGURACION_POR_DEFECTO || {},
		localStorageEstudiante = {
			'datosEstudiante': [],
			'state': true
		};

	var self;

	CONFIGURACION_POR_DEFECTO = function() {

		self = this;
		self.init();
	};

	CONFIGURACION_POR_DEFECTO.prototype = {

		init: function() {
			this.eventosClick();
			this.cargaListaDeEstudiantes();
		},

		eventosClick: function(parametros) { // eventos de click general

			document.getElementById('btn-registrar-estudiante').addEventListener('click', self.registrarEstudiante); // evento click que registra estudiantes
		 	document.getElementById('btn-mostrar-total-pago').addEventListener('click', self.mostrarTotalAPagar); // evento click para mostrar promedios de estudiantes
	        document.getElementById('btn-remover-lista').addEventListener('click', self.removerLista); // evento click para mostrar promedios de estudiantes
		},

		
		registrarEstudiante: function(e) {
			e.stopPropagation();
			var formRegistroEstudiante = $('form#form-registro-estudiante').serializeArray(),
				extraerAlumno = {},
				extraerNotas = {};
			$.each(formRegistroEstudiante, function(key, field) {

				if (field.name === 'cantidad') {
					extraerAlumno['cantidad'] = field.value;
				}
				if (field.name === 'detalle') {
					extraerAlumno['detalle'] = field.value;
				}
				if (field.name === 'valorunitario') {
					extraerAlumno['valorUnitario'] = parseFloat(field.value);
				}
				if (field.name === 'valortotal') {
					extraerAlumno['valorTotal'] = parseFloat(field.value);
				}
			});

			if (self.validaCamposVacios(extraerAlumno)) { // función validaCamposVacios retorna true|false

					var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

					if (JsonParseParametrosDatos === null) {

						localStorageEstudiante.datosEstudiante.push({
							'cantidad': extraerAlumno.cantidad,
							'detalle': extraerAlumno.detalle,
							'valorUnitario': extraerAlumno.valorUnitario,
							'valorTotal': extraerAlumno.valorTotal
						});
                        
                        console.log(localStorageEstudiante);
						localStorage.setItem('data.estudiante.session', JSON.stringify(localStorageEstudiante));

						self.cargaMensajesAlert({
							tipo: 'success',
							titulo: 'Agregar',
							texto: 'Se agrego un nuevo registro',
							btnColor: '#b0e195',
						});
					} else {

						JsonParseParametrosDatos.datosEstudiante.push({
							'cantidad': extraerAlumno.cantidad,
							'detalle': extraerAlumno.detalle,
							'valorUnitario': extraerAlumno.valorUnitario,
							'valorTotal': extraerAlumno.valorTotal
						});

						localStorage.setItem('data.estudiante.session', JSON.stringify(JsonParseParametrosDatos));
                                                                   
						self.cargaMensajesAlert({
							tipo: 'success',
							titulo: 'Agregar',
							texto: 'Se agrego un nuevo registro',
							btnColor: '#b0e195',
						});
                         
                         $('#valortotal').val("");
						 $('#cantidad').val("");
                         $('#detalle').val("");
                         $('#valorunitario').val("");

					}
				
				
			}
		},

		mostrarTotalAPagar: function(e) {
        
			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session')),
				insertarHtmlEstudiante = '',
				insertarTh = '';

			insertarTh += 
		   `<th class="text-center text-muted small">Total</th>
			<th class="text-center text-muted small">Iva </th>
			<th class="text-center text-muted small">Total + iva</th>`;
            var suma=0;
			if (JsonParseParametrosDatos !== null) {

				$.each(JsonParseParametrosDatos.datosEstudiante, function(key, field) {
                    suma=suma+ field.valorTotal;
					console.log(suma);		
				});
                
                var total=suma;
                var iva=(suma*0.19);
                var totaliva=total+iva;

				insertarHtmlEstudiante += 
     		   `<td  class="text-center text-muted small">`+total+`</td>
				<td  class="text-center text-muted small">`+iva+`</td>
				<td  class="text-center text-muted small">`+totaliva+`</td>
				`;
			} else {
				insertarHtmlEstudiante +=
				`<tr>
				 <td colspan="8" class="text-center text-muted small"> No se encontrarón resultados </td>
				 </tr>`;
			}
            
            //guardar valores referenciales
            $('.seniores11').text($('#seniores1').val());
            $('.seniores22').text($('#seniores2').val());
            $('.seniores11').val($('#seniores1').val());
            $('.seniores22').val($('#seniores2').val());

			document.getElementById('insertar-th1').innerHTML = insertarTh;
			document.getElementById('insertar-datos-productoconteo').innerHTML = insertarHtmlEstudiante;

		},


		mostrarNotasPromedio: function(e) {

			e.preventDefault();

			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));

			var insertarHtmlPromediosEstudiantes = `<table class="table table-bordered table-responsive table-striped table-hover uk-table uk-table-hover uk-table-striped">
				<thead><tr> 
				<th class="text-muted small">Codigo</th> 
				<th class="text-muted small"> Nombre estudiante </th> 
				<th class="text-muted small">Promedio</th> </tr> <thead/> <tbody>`;

			if (JsonParseParametrosDatos !== null) {

				for (var i = 0; i < Object.keys(JsonParseParametrosDatos.datosEstudiante).length; i++) {

					insertarHtmlPromediosEstudiantes += `<tr> 
					<td>${ JsonParseParametrosDatos.datosEstudiante[i].codigo }</td>
					<td>${ JsonParseParametrosDatos.datosEstudiante[i].nombre }</td> 
					<td>${ self.calcularPromedio(JsonParseParametrosDatos.datosEstudiante[i].notas).toPrecision(3) }</td>
					</tr>`;
				}
			} else {

				insertarHtmlPromediosEstudiantes += `<tr>
				<td colspan="3" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			insertarHtmlPromediosEstudiantes += `</tbody></table>`;

			swal({
				title: '<small>Listado de promedios</small> <hr>',
				text: insertarHtmlPromediosEstudiantes,
				confirmButtonColor: '#333',
				confirmButtonText: 'Aceptar',
				closeOnConfirm: true,
				html: true
			}, function() {});

		},

		mostrarNotaMayor: function(e) {
			e.preventDefault();
			self.simplificarMostrarNotaMenorYMayor('max');
		},
		mostrarNotaMenor: function(e) {
			e.preventDefault();
			self.simplificarMostrarNotaMenorYMayor('min');
		},
		removerLista: function(e) {
	    localStorage.removeItem('data.estudiante.session');
		},
		validaCamposVacios: function(parametros) { // valida que campos no estén vacios

			var resultado = true;
			// Cantidad - Detalle- valor unitario - valor total
			if (parametros.cantidad === '') {

				$('#mensage-3').removeClass('hide')
					.hide()
					.fadeIn(100)
					.fadeOut(3500);

				resultado = false;
			} else {

				$('#mensage-3').addClass('hide');
			}

			if (parametros.detalle === '') {

				$('#mensage-4').removeClass('hide')
					.hide()
					.fadeIn(100)
					.fadeOut(3500);

				resultado = false;
			} else {

				$('#mensage-4').addClass('hide');
			}

			if (parametros.valorUnitario === '') {

				$('#mensage-5').removeClass('hide')
					.hide()
					.fadeIn(100)
					.fadeOut(3500);

				resultado = false;
			} else {

				$('#mensage-5').addClass('hide');
			}

			if (parametros.valorTotal === '') {

				$('#mensage-6').removeClass('hide')
					.hide()
					.fadeIn(100)
					.fadeOut(3500);

				resultado = false;
			} else {

				$('#mensage-6').addClass('hide');
			}

			$.each(parametros.notas, function(key, data) {

				if (data === '') {

					$('#mensage-nota-' + key).removeClass('hide')
						.hide()
						.fadeIn(100)
						.fadeOut(3500);

					resultado = false;
				} else {

					$('#mensage-nota-' + key).addClass('hide');
				}
			});

			return resultado;
		},
		cargaListaDeEstudiantes: function() { // genera listado de estudiantes

			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session')),
				insertarHtmlEstudiante = '',
				insertarTh = '';

			insertarTh += `<th class="text-muted small">Cantidad</th>
			<th class="text-muted small"> Detalle </th>
			<th class="text-muted small"> Valor unitario </th>
			<th class="text-muted small"> Valor total </th>`;
            var suma=0;
			if (JsonParseParametrosDatos !== null) {

				$.each(JsonParseParametrosDatos.datosEstudiante, function(key, field) {

				insertarHtmlEstudiante += `<tr>
					<td> ${ field.cantidad } </td>
					<td> ${ field.detalle } </td>
					<td> ${ field.valorUnitario } </td>
					<td> ${ field.valorTotal } </td>`;

                    suma=suma+ field.valorTotal;
					console.log(suma);
                    console.log(parseFloat(field.valorUnitario).toPrecision(3));
				});

				insertarHtmlEstudiante += `</tr>`;
			} else {

				insertarHtmlEstudiante += `<tr>
				<td colspan="8" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			document.getElementById('insertar-th').innerHTML = insertarTh;
			document.getElementById('insertar-datos-estudiantes').innerHTML = insertarHtmlEstudiante;
            
		},
		cargaMensajesAlert: function(parametros) { // genera mensajes de alerta


			swal({
				title: parametros.titulo,
				text: parametros.texto,
				type: parametros.tipo,
				confirmButtonColor: parametros.btnColor,
				confirmButtonText: 'Aceptar',
				closeOnConfirm: true
			}, function() {

				document.addEventListener('click', self.cargaListaDeEstudiantes);
			});
		},
		calcularPromedio: function(obj) { // calcular promedios de los estudiantes

			var suma = 0;

			for (var el in obj) {

				if (obj.hasOwnProperty(el)) {

					suma += parseFloat(obj[el] / Object.keys(obj).length);
				}
			}
			return suma;
		},
		simplificarMostrarNotaMenorYMayor: function(parametro) { // Simplifica código

			var JsonParseParametrosDatos = JSON.parse(localStorage.getItem('data.estudiante.session'));
			var insertarHtmlPromediosEstudiantesMin = `
			<table class="table table-bordered  table-responsive table-striped table-hover uk-table uk-table-hover uk-table-striped">
				<thead><tr> <th class="text-muted small">Codigo</th> <th class="text-muted small"> Nombre estudiante </th> <th class="text-muted small">Promedio</th> </tr> <thead/> <tbody>`;

			var newObject = {};
			if (JsonParseParametrosDatos !== null) {

				for (var key in JsonParseParametrosDatos) {

					for (var subKey in JsonParseParametrosDatos[key]) {

						newObject[subKey] = self.calcularPromedio(JsonParseParametrosDatos[key][subKey]['notas']).toPrecision(3);
					}
				}

				var arr = Object.keys(newObject).map(function(key) {
					return newObject[key];
				});
				var resultado = '';

				if (parametro == 'max') {
					resultado = Math.max.apply(null, arr);
				} else {
					resultado = Math.min.apply(null, arr);
				}

				for (var i = 0; i < Object.keys(JsonParseParametrosDatos.datosEstudiante).length; i++) {

					if (self.calcularPromedio(JsonParseParametrosDatos.datosEstudiante[i].notas).toPrecision(3) == resultado) {

						insertarHtmlPromediosEstudiantesMin += `<tr> 
						    <td>${ JsonParseParametrosDatos.datosEstudiante[i].cantidad }</td> 
						    <td>${ JsonParseParametrosDatos.datosEstudiante[i].detalle }</td> 
						    <td>${ JsonParseParametrosDatos.datosEstudiante[i].valorUnitario }</td> 
						    <td>${ JsonParseParametrosDatos.datosEstudiante[i].valorTotal }</td> 
							<td>${ self.calcularPromedio(JsonParseParametrosDatos.datosEstudiante[i].notas).toPrecision(3) }</td>
							</tr>`;
					}
				}
			} else {

				insertarHtmlPromediosEstudiantesMin += `<tr>
				<td colspan="3" class="text-center text-muted small"> No se encontrarón resultados </td></tr>`;
			}

			insertarHtmlPromediosEstudiantesMin += `</tbody></table>`;

			swal({
				title: `<small>Nota ${ (parametro === 'max') ? 'mayor' : 'menor' }</small> <hr>`,
				text: insertarHtmlPromediosEstudiantesMin,
				confirmButtonColor: '#333',
				confirmButtonText: 'Aceptar',
				closeOnConfirm: true,
				html: true
			}, function() {});
		}
	}

	document.addEventListener('DOMContentLoaded', function() {
		return new CONFIGURACION_POR_DEFECTO;
	});

}(jQuery, window, document));