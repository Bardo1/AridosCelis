// // $(window).bind('beforeunload', function() {
// // if(true){  
// //       var e = e || window.event;  
// //       if (e) {  
// //         e.returnValue = 'WHY?';  
// //       }  
// //       else{  
// //         return 'WHY?';  
// //       }  
// //     }  
//    //  var error = "" +
//    //                                                             "<div class='alert alert-block alert-danger'>" +
//    //                                                             "    <p>" +
//    //                                                             "    <strong>DIFERENCIA CARGADA/strong>" +
//    //                                                             "    <br>Porfavor, purebe con una selección diferente." +
//    //                                                             "    </p>" +
//    //                                                             "</div>";
//    // bootbox.dialog(error, [
//    //          {
//    //              "label": "<i class='icon-arrow-left'></i> Continuar con Accion",
//    //              "class": "btn btn-mini",
//    //              "callback": function(){
//    //              }
//    //          },
//    //          {
//    //              "label": "<i class='icon-print'></i> Continuar",
//    //              "class": "btn btn-mini btn-success btn-print",
//    //              "callback": function() {
//    //              }
//    //          }
//    //      ]);
// // } );
//  var isEnabled = true;  
//   window.onbeforeunload = function (e) {  
//     if(isEnabled){  
//       var e = e || window.event;
//       if (e) {  
//         e.returnValue = 'WHY?';  
//       }  
//       else{  
//         return 'WHY?';  
//       }  
//     }  
//   }  

function addCommas(nStr){
  
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '': '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

function removeComas(a){
  a += '';  
  a = a.replace(/,/g, '')
  return parseInt(a);
}

function idReservaEmpty(){
     if(!idReservaAtencion){bootbox.hideAll();}
      var a = (idReservaAtencion) ? "modalVerAA" : "modalVerA"; 
      //FYIconsole.log(a);
             $("."+a).html('');
     return a;   
}
            
function HistorialPagosPacienteTools(){
    $(".Print-Detalle-Pago").on('click', function(e) {
        e.preventDefault();
       var a = idReservaEmpty();
        $("."+a).load($(this).attr('href'), function(response, status, xhr) {
            var vistaHtml = response;
              bootbox.dialog(vistaHtml, [
            {
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini",
                "callback": function(){
                   e.preventDefault();
                }
            },
            {
                "label": "<i class='icon-print'></i> Imprimir",
                "class": "btn btn-mini btn-success btn-print",
                "callback": function() {
                $( "#formPago" ).submit();
                }
            }
        ]);
        });
    });

        $(".Print-Detalle-Atencion").on('click', function(e) {
        e.preventDefault();
              var a = idReservaEmpty();
        $("."+a).load($(this).attr('href'), function(response, status, xhr) {
           
            var vistaHtml = response;
              bootbox.dialog(vistaHtml, [
            {
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini",
                "callback": function(){
                  e.preventDefault();
                }
            },
            {
                "label": "<i class='icon-print'></i> Imprimir",
                "class": "btn btn-mini btn-success btn-print",
                "callback": function() {
                    $( "#formAtencion" ).submit();
                }
            }
        ]);
        });
    });

    $(".add-imagen").on('click', function(e) {
        e.preventDefault();
        var a = idReservaEmpty();
        $("."+a).load($(this).attr('href'), function(response, status, xhr) {
           
            var vistaHtml = response;
              bootbox.dialog(vistaHtml, [
            {
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini",
                "callback": function(){
                  e.preventDefault();
                }
            }
        ]);
        });
    });


       $(".Print-Detalle-Boleta").on('click', function(e) {
        e.preventDefault();
       var a = idReservaEmpty();
        $("."+a).load($(this).attr('href'), function(response, status, xhr) {
            idReservaEmpty();
            var vistaHtml = response;
              bootbox.dialog(vistaHtml, [
            {
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini",
                "callback": function(){
               idReservaEmpty();
                    verificaCorrelativo();
                }
            },
          
            {
                "label": "<i class='icon-print'></i> Imprimir",
                "class": "btn btn-mini btn-success btn-print",
                "callback": function() {
                    $( "#formBoleta" ).submit();
                }
            }
        ]);
        });
    });
     
}
function GestionCaja_CajaSinCerrar(){
    $(".cerrarCaja").on('click', function(e) {
        e.preventDefault();
        bootbox.hideAll(); 
        $(".modalSinCerrar").html('');
        $(".modalSinCerrar").load($(this).attr('href'), function(response, status, xhr) {
        $(".modalSinCerrar").html('');   
            var vistaHtml = response;
              bootbox.dialog(vistaHtml, [
            {
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini",
                "callback": function(){
                    $(".modalSinCerrar").html('');
                    bootbox.hideAll(); 
                }
            },
            {
                "label": "<i class='icon-save'></i> Grabar",
                "class": "btn btn-mini btn-success",
                "callback": function() {
                    var action = $("#form").attr('action');
                    var data = $("#form").serializeArray();
                    $.post(action, data, function(response) {
                        response = $.trim(response);
                        if (response == "Cerrado") {
                            var cerrado = "" +
                                    "<div class='alert alert-block alert-success'>" +
                                    "    <p>" +
                                    "    <strong><i class='icon-ok'></i>Caja Cerrada</strong>" +
                                    "    Caja Cerrada correctamente." +
                                    "    </p>" +
                                    "</div>";
                            bootbox.dialog(cerrado, [
                                {
                                    "label": "Ok",
                                    "class": "btn btn-mini btn-info",
                                    "callback": function() {
                                        location.reload();
                                    }
                                }
                            ]);
                        } else {
                           var cerrado = "" +
                                    "<div class='alert alert-block alert-danger'>" +
                                    "    <p>" +
                                    "    <strong>Error al Cerrar Caja</strong>" +
                                    "    <br>No cerró correctamente." +
                                    "    </p>" +
                                    "</div>";
                            bootbox.dialog(cerrado, [
                                {
                                    "label": "Ok",
                                    "class": "btn btn-mini btn-info",
                                    "callback": function() {
                                        location.reload();
                                    }
                                }
                            ]);

                        }
                    });
                }
            }
            ]);
        });
    });


}
function GestionCaja_InformesCaja(){

    $(".InformesCajaS, .InformesGarantiaS").on('click', function(e) {
        e.preventDefault();
        bootbox.hideAll(); 
        var divCargando = "<div id='cargando'><br><br><br><center><h3 class='blue'><i class='icon-spinner icon-spin icon-large icon-4x blue'></i><div class='clearfix'></div><br><strong> Cargando</strong></h3></center></div>";
        $(".modalInformeCajas").html(divCargando);
        $(".modalInformeCajas").load($(this).attr('href'), function(response, status, xhr) {
        $(".modalInformeCajas").html('');   
            var vistaHtml = response;
              bootbox.dialog(vistaHtml, [
            {
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini",
                "callback": function(){
                    $(".modalInformeCajas").html('');
                    bootbox.hideAll(); 
                }
            }
            ]);
        });
    });
  $(".detalleCaja").on('click', function(e) {
        e.preventDefault();
        bootbox.hideAll(); 
        var divCargando = "<div id='cargando'><br><br><br><center><h3 class='blue'><i class='icon-spinner icon-spin icon-large icon-4x blue'></i><div class='clearfix'></div><br><strong> Cargando</strong></h3></center></div>";
        $(".modalInformeCaja").html(divCargando);
        $(".modalInformeCaja").load($(this).attr('href'), function(response, status, xhr) {
        $(".modalInformeCaja").html('');   
            var vistaHtml = response;
              bootbox.dialog(vistaHtml, [
            {
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini",
                "callback": function(){
                    $(".modalInformeCaja").html('');
                    bootbox.hideAll(); 
                }
            },
            {
                "label": "<i class='icon-print'></i> Imprimir",
                "class": "btn btn-mini btn-success btn-print-InfoCaja",
                "callback": function() {
                $("#formInfoCajaDetalle").submit();
                }
            }
            ]);
        });
    });

}
function informacion(vistaHtml) {
    $(".modalInformeCaja").html('');
    bootbox.dialog(vistaHtml, [
        {
           "label" : "Volver",
	   "class" : "btn btn-mini"           
        },  
        {
            "label": "<i class='icon-print'></i> Imprimir",
            "class": "btn btn-mini btn-success btn-print-InfoCaja",
            "callback": function() {
            $("#formInfoCajaDetalle").submit();
            }
        }
    ]);
}

function AnulacionBoleta(id) {
                AnulaBoletaAjax(id);  
}  

function AnulaBoletaAjax(id){
       var ruta = Routing.generate("Caja_Boleta_ModificaNumero");   
        var data = {
                                         id: id
                                    };
                                    $.ajax({
                                        type: 'get',
                                        url: ruta,
                                        data: data,
                                        success: function(datar) {
                                            datar = $.parseJSON(datar);
                                         if(datar){
                                             creaListaHistorica();
                                            if(!idReservaAtencion){
            bootbox.hideAll();
            }
                                                PagoConBoleta();

                                         }else{
                                             if(!idReservaAtencion){
            bootbox.hideAll();
            }
                                                var error = "" +
                                                "<div class='alert alert-block alert-danger'>" +
                                                "    <p>" +
                                                "    <strong>Error al Modificar Boleta</strong>" +
                                                "    <br>No se ha Generado Modificación de Número de Boleta." +
                                                "    </p>" +
                                                "</div>";
                                                bootbox.dialog(error, [
                                                 
                                                    {
                                                        "label": "Cancelar",
                                                        "class": "btn btn-mini",
                                                        "callback": function() {
                                                          
                                                        }
                                                    }
                                                ]);
                                         }
                                            
                                        }

                                    }); 
    
} 
function verificaCorrelativo(){
    
    var routing = Routing.generate("Caja_Gestion_verificaCorrelativo");
    var inicioRecaudacion = Routing.generate("Caja_Recaudacion");
        $.ajax({
            type: 'POST',
            url: routing,
            success: function(datar) {
             //    var datar = $.parseJSON(datar);
                    if(datar == "no"){
                        window.location.replace(inicioRecaudacion);
                    }
                    if(datar == "ok"){
                       return false;
                    }
                    
                    }
        
                });
}

function anulacionAjax(){
  //funcion extinta
}

