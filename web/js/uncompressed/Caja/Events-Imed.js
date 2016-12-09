var timefuncion                 = null;
var num = null; 
var tipo = null;

function medioBonoElectronico(n, t) {
    tipo = t;
    var ruta = Routing.generate("Caja_Valida_Prevision_EsImed");
    var solicitante = { prevision: $("#rebsol_hermesbundle_PrestacionType_prevision").val() };
    $.ajax({type: 'get',  url: ruta, async: false, data: solicitante, success: function(data) {
        console.log(data);
           if(data == 0){
            bootbox.dialog("<div class='alert alert-block alert-warning'>" +
            "    <p>" +
            "    <strong><i class='icon-warning-sign'></i>Financiador no tiene asignado Código IMED, </strong>" +
            "    </p>" +
            "    <p>" +
            "    Solo puede hacer pagos normales de Bono Electronico." +
            "    </p>" +
            "</div>" 
       
            , [
                {
                    "label": "Conitnuar Pago Normal",
                    "class": "btn btn-mini  btn-warning btn-normal-BonoElectronico",
                    "callback": function() {
                        validaFormadePagoBonoElectronico = 1;
                        // showTablas(num);
                    }
                }]);
            return;
           }else if(data == 1){


             bootbox.dialog("<div class='alert alert-block alert-success mensaje-pregunta-imed'>" +
            "    <p>" +
            "    <strong><i class='icon-ok'></i> Pagará mediante Bono Electronico, </strong>" +
            "    </p>" +
            "    <p>" +
            "    Porfavor, seleccione una opción: Pago Normal o Pago IMED." +
            "    </p>" +
            "</div>" 
       
            , [
                {
                    "label": "Normal",
                    "class": "btn btn-mini  btn-warning btn-normal-BonoElectronico",
                    "callback": function() {
                        validaFormadePagoBonoElectronico = 1;
                        // showTablas(num);
                    }
                }, {
                    "label": "<span style='float:left'>&nbsp</span><span class='imedFace' style='float:left'>;)</span><span style='float:left'>&nbsp</span><span style='float:left'> I-MED</span>",
                    "class": "btn btn-mini btn-success btn-imed-BonoElectronico",
                    "callback": function() {
                        EsperaPago(n);
                        // $("#tabla_" + num + "_IMED").show();
                        validaFormadePagoBonoElectronico = 1;
                    }
                }]);

           }
        }
    });



   
}

function SinPrestacionesImed(num) {
    var Alerta = "<div class='alert alert-block alert-warning '>" +
            "    <p>" +
            "    <strong><i class='icon-ok'></i> No contiene Prestaciones, </strong>" +
            "    </p>" +
            "    <p>" +
            "   No es posible Pagar Articulos mediante I-MED" +
            "    </p>" +
            "</div>";
    bootbox.dialog(Alerta, [
        {
            "label": "Volver",
            "class": "btn btn-mini btn-volver-Imed",
            "callback": function() {
                bootbox.hideAll();
                validaFormadePagoBonoElectronico = 1;
                showTablas(num, tipo);
                return false;
            }
        }
    ]);
}

function ArraydePrestaciones() {
    var Listaprestaciones = [];
    var d = 0;
    $('.cambioCantidad').each(function() {
        //Esta Validación hace referencia al tipo de construccion de Tabla para arrays que vienen desde
        //una garantía pre-hecha y un ingreso de prestacion nueva.
        var a =   (garantiaAuxPrestacion == 0)?$(this).parents().eq(6).attr('name'):$(this).parents().eq(4).attr('name');
        var aa =(garantiaAuxPrestacion == 0)?$(this).parents().eq(5).attr('id').replace("td", ""):$(this).parents().eq(4).attr('id').replace("prestacion_", "");
        if ($("#tipoDoc" + aa).text() == "1") {
            var b = $(this).val();
            var c = $("#precio" + aa).text(); 
            var x = $("#tipoDoc" + aa).text();
            var prestaciones = [a, b, c, x];
            Listaprestaciones[d] = prestaciones;
            d++;
            var prestaciones = [];
        }
    });
    return Listaprestaciones;
}
function ArraydePrestacionesNormal() {
    var Listaprestaciones = [];
    var d = 0;
    $('.cambioCantidad').each(function() {
        //Esta Validación hace referencia al tipo de construccion de Tabla para arrays que vienen desde
        //una garantía pre-hecha y un ingreso de prestacion nueva.
        var a =   $(this).parents().eq(6).attr('name');
        var aa =  $(this).parents().eq(5).attr('id').replace("td", "");
        console.log(aa);
        console.log(a);
        if ($("#tipoDoc" + aa).text() == "1") {
            var b = $(this).val();
            var c = $("#precio" + aa).text(); 
            var x = $("#tipoDoc" + aa).text();
            var prestaciones = [a, b, c, x];
            Listaprestaciones[d] = prestaciones;
            d++;
            var prestaciones = [];
        }
    });
    return Listaprestaciones;
}

function ArrayDatos() {
    var datos = [];
    var ruta = Routing.generate("Caja_PeopleId");
    var solicitante = { rut: $("#rebsol_hermesbundle_PagoType_rutPersona").val() };
    $.ajax({type: 'get',  url: ruta, async: false, data: solicitante, success: function(data) {
            var data = $.parseJSON(data);
            datos['idPnatural'] = data;
        }
    });
    datos['financiador']       = $("#rebsol_hermesbundle_PrestacionType_prevision").val();
    datos['convenio']          = $("#rebsol_hermesbundle_PrestacionType_convenio").val(); //
    datos['derivadoInt']       = $("#rebsol_hermesbundle_PrestacionType_derivadoSelect").val();
    datos['derivadoExt']       = $("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val();
    datos['derivadoExtRut']    = $("#rebsol_hermesbundle_PrestacionType_derivadoExternoRut").val();
    datos['idReservaAtencion'] = idReservaAtencion; //(rut tratante, rut Solicitante, nombre Solicitant,;
    datos['plan']              = $("#rebsol_hermesbundle_PrestacionType_plan").val();
    return datosJson = {
        idPnatural:         datos['idPnatural'],
        financiador:        datos['financiador'],
        convenio:           datos['convenio'],
        derivadoInt:        datos['derivadoInt'],
        derivadoExt:        datos['derivadoExt'],
        idReservaAtencion:  datos['idReservaAtencion'],
        TipoAtencion:       TipoAtencion,
        plan:               datos['plan'],
        idTratamiento:      idTratamiento,
        derivadoExtRut:     datos['derivadoExtRut']
    };
}

function InterfazImed(n) {
    num = n;
    (ArraydePrestaciones().length == 0)? SinPrestacionesImed(num):null;
    var ruta = Routing.generate("Caja_Imed_Index");
    var datosImed = {arrPrestaciones: ArraydePrestaciones(), arrDatos: ArrayDatos()};
    $.ajax({type: 'get',
        url: ruta,
        async: false,
        data: datosImed,
        success: function(respuesta) {
            var respuesta = $.parseJSON(respuesta);
            if (respuesta.error == 1) {
                errorImed(respuesta.glosaError, num);
            }
            if (respuesta.error == 0) {
                post(respuesta.path, {  NroAuditoria: respuesta.NroAuditoria, 
                                        NumTransac: respuesta.NumTransac,
                                        rut: respuesta.rut,
                                        lugar: respuesta.lugar}, null, num);
            }
        }
    });
}
function errorImed(mensaje, num){
    var vistaHtml = "<div class='alert alert-block alert-imed alert-danger '>" +
                "    <p>" +
                "    <strong><i class='icon-ok'></i> Error Durante el Proceso I-MED</strong>" +
                "    </p>" +
                "    <p>" +
              mensaje+"." +
                "    </p>" +
                "    <p>" +
                "    <strong>Se recomienda Enérgicamente el Ingreso a Interfaz I-MED</strong>" +
                "    </p>" +
                "</div>";
        bootbox.dialog(vistaHtml, [
            {
                "label": "Volver",
                "class": "btn btn-mini btn-volver-Imed",
                "callback": function() {
                    bootbox.hideAll();
                    $(".alert-imed").closest('.modal').modal("hide");
                    validaFormadePagoBonoElectronico = 1;
                    // showTablas(num);
                    $(".Input_checkbox_"+num).click();
                }
            },
            {
                "label": "Acceder a Interfaz Imed",
                "class": "btn btn-mini",
                "callback": function() {
                     bootbox.hideAll();
                    $(".alert-imed").closest('.modal').modal("hide");
                    validaFormadePagoBonoElectronico = 1;
                    showTablas(num, tipo);
                    var url = 'http://interfaz.i-med.cl:8080/login.php';
                    var win = window.open(url, '_blank');
                    win.focus();
                    $(".esperaPagoImed").modal("hide"); 
                    $(".Input_checkbox_"+num).click();
                }
            }
        ]);
} 

function errorImedPost(mensaje, num){
    var vistaHtml = "<div class='alert alert-block alert-imed alert-danger '>" +
                "    <p>" +
                "    <strong><i class='icon-ok'></i> Error, Venta no logro completarse</strong>" +
                "    </p>" +
                "    <p>" +
                "Detalle: " +
                mensaje+"." +
                "    </p>" +
                "</div>";
        bootbox.dialog(vistaHtml, [
            {
                "label": "Volver",
                "class": "btn btn-mini btn-volver-Imed",
                "callback": function() {
                    bootbox.hideAll();
                    $(".alert-imed").closest('.modal').modal("hide");
                    validaFormadePagoBonoElectronico = 1;
                    showTablas(num, tipo);
                }
            }
        ]);
} 

$(".esperaPagoImed").closest('.modal').modal("hide");


function EsperaPago(num){
         var vistaHtml = "<div class='alert alert-block alert-success esperaPagoImed '>" +
              "<div class='progress progress-success progress-striped active'>" +
              "<div class='bar' style='width: 100%'></div>" +
                 "</div>" +
                "    <p>" +
                "    <strong><i class='icon-ok'></i> Por favor, espere....</strong>" +
                "    </p>" +
                "    <p>" +
                "    Se está ejecutando Pago Bono Electrónico I-MED." +
                "    </p>" +
                "</div>";
        bootbox.dialog(vistaHtml).delay(500).promise().done(function() {InterfazImed(num);
                    });
}      
function post(path, params, method, n) {
    console.log(params);
    num = n;

    $("#form_IntefazImed").attr('action',path);
    $("#NroAuditoria").val(params.NroAuditoria);
    $("#NumTransac").val(params.NumTransac);
    $("#Rut").val(params.rut);
    $("#Lugar").val(params.lugar);
    $( "#form_IntefazImed" ).submit();


    timefuncion = setInterval(postFormSubmit, 5000);

   // postFormSubmit(params,num); 
}
function postFormSubmit() {
     // var ruta = Routing.generate("Caja_Imed_Post_Trans_Auditoria_Prueba");
     var ruta = Routing.generate("Caja_Imed_Post_Trans_Auditoria");
                $.ajax({type: 'get',
                    url: ruta,
                    async: false,
                    data: null,
                    success: function(datar) {
                        console.log(datar);
                        datar = $.parseJSON(datar);  

                        if(datar.cod == 1){
                              
                        }else if(datar.cod == 2 || datar.cod == 3){
                            clearInterval(timefuncion);
                            
                            $(".Input_checkbox_"+num+", .imedBotonesAgregarQuitarForm").hide();
                            $(".AlertImedMedioPago").show();
                            if(datar.cod == 2){
                                $(".AlertImedMedioPago").addClass('alert-success');
                            }else if(datar.cod == 3){
                                $(".AlertImedMedioPago").addClass('alert-warning');
                            }
                            $("#respuestaFinalizaImed").html(datar.glo);
                            $(".AlertImedMedioPago").show();
                            BonoElecVentaInterfaz(datar.respuesta.arrayBonos, datar.respuesta.Exedente);
                        }else if(datar.cod == 0 || datar.cod == 4){
                            // clearInterval(timefuncion);
                            // errorImedPost(datar.glo, num); 
                        }
                    }

                });
}

function BonoElecVentaInterfaz(arr, exedente){
    var countBelectronico = 0;
    for (var i in arr) {
        if(countBelectronico > 0){
            NuevoFormDinamico(num);
        }
        $("#rebsol_hermesbundle_MediosPagoType_bono_"+num+"_"+countBelectronico).val(parseInt(arr[i].FolioBono));
        $("#rebsol_hermesbundle_MediosPagoType_Bonificacion_"+num+"_"+countBelectronico).val(parseInt(arr[i].MontoBon));
        $("#rebsol_hermesbundle_MediosPagoType_Seguro_"+num+"_"+countBelectronico).val(parseInt(arr[i].MontoSeguro));
        $("#rebsol_hermesbundle_MediosPagoType_copago_"+num+"_"+countBelectronico).val(parseInt(arr[i].MontoCopago));
        
        SumaSaldoVsMediosPago();
        countBelectronico = countBelectronico +1;
    }

    $("#exedente_"+num).show();
    $("#rebsol_hermesbundle_MediosPagoType_exedente_"+num).val(parseInt(exedente));
    SumaSaldoVsMediosPago();

    $(".esperaPagoImed").closest('.modal').modal("hide");
    $(".bElectronico").prop('readonly', true); 

}
