function  PagadoAceptar(){
    CancelarTratamiento();
    idReservaAtencion          = 0;
    tratamiento                = 1;
    nuevoTratamiento           = 0;
    esTratamiento              = 0;
    esDiferencia               = 0;
    TratamientoArray           = [];
    ListaDetallesDiferencia    = [];
    ListaInformacionDiferencia = [];
    esTratamientoAgenda        = 0;
    idTratamiento = null;

    $("#pacienteform, .pacientefallecido, #listapacienteform, #mediodepago, #formprestador, #prestaciones, .btn-pre-pagar, .btn-edit-lista-prestaciones, #btneditListaPrestaciones, #datosgarantia, #infoDiferenciaSaldo").hide();
    $("#prestadorresumen, #agregar-prestacion-insumo-paquete, #pacienteresumen, .widget-body-inner, #saltosTeporales, #cancelar-desde-prestador, .ExternoField, #MediosdePagoTabs, #btn-diferencia-saldo").show();

     $(".mdp").addClass("active");
     $("#MediosDePago").show();
     $(".omdp").removeClass("active");
     $("#OtrosMedios").hide();

    $("#prestacionesTable").load(location.href + " #prestacionesTable");
    $('#Tabla_MediosPago_Tab').load(location.href + " #Tabla_MediosPago_Tab");
    $('#Tabla_OtrosMedios_Tab').load(location.href + " #Tabla_OtrosMedios_Tab");
    $('#total').empty();
    $('#inputPrestacionBuscar, #infoDiferenciaDirecciónSaldo, #infoDiferenciaMontoSaldo').val("");
    $('#resultadoPrestacionBuscar, #tituloTratamientoListadoServicio').html('');
    $(".widget-box").removeClass("collapsed"); 
    $('.icon-list-historico').attr('class', function() {
        return $(this).attr('class').replace('icon-chevron-down', 'icon-chevron-up');
    }).delay(1000);
    $( "#historicoPacientePagos" ).ScrollTo(30);
    $( "#historicoPacientePagos" ).ScrollTo(30);
    $( "#historicoPacientePagos" ).ScrollTo(30);
 }
 
 
 function PagadoAceptarDocumentos(){
      bootbox.dialog("<div class='progress progress-success progress-striped active'>" +
	 "<div class='bar' style='width: 1%'></div>" +
	 "</div>" +
                      "<div class='alert alert-block alert-success'>" +
                      " <strong class='green'>Buscando Documentos,</strong><br>Por favor espere..." +
                      "</div>"
                 ).delay(500).promise().done(function() {DocumentosPostPago();
                    });
     
     
 }
 
 

 function FEFA(data) {
                                    $("#prestacionesTable").load(location.href + " #prestacionesTable");
                                    $('#Tabla_MediosPago_Tab').load(location.href + " #Tabla_MediosPago_Tab");
                                    $('#Tabla_OtrosMedios_Tab').load(location.href + " #Tabla_OtrosMedios_Tab");
                                    $(".mdp").addClass("active");
                                    $("#MediosDePago").show();
                                    $(".omdp").removeClass("active");
                                    $("#OtrosMedios").hide();
                                    
                                    $(".sumaTotalMediosDePago").html(data);
                                    $(".sumaTotal").html(data);
                                    $(".SaldoTotalMediosDePago").html(data);
                                    VerificaSaldoCero();
                                    $(".modalVer").html('');
                                    bootbox.hideAll();    
                                    bootbox.dialog("<strong class='red'>ERROR DE DATOS</strong>,<br><strong>Datos Corruptos en Pago</strong>,<br>Deberá reingresar correctamente los montos en los medios de pago.", [
                                        {
                                            "label": "Aceptar",
                                            "class": "btn btn-mini alert",
                                            "callback": function() {
                                                $(".modalVer").html('');
                                            }
                                        }]);
                                    return false;
                                }
                                

    $('.spcb').on('click', function() {
      $(".spcb").css('pointer-events','none');
          bootbox.dialog("<div class='progress progress-success progress-striped active'>" +
	 "<div class='bar' style='width: 1%'></div>" +
	 "</div>" +
                      "<div class='alert alert-block alert-success'>" +
                      " <strong class='green'>Generando Pago,</strong><br>Por favor espere..." +
                      "</div>"
                 ).delay(500).promise().done(function() {SPC();
                    });
    });                                

