var prestador = 0;
var idPrestadorContador = 0;
function DatosPrestacion() {
    $(".btn-volver2").show();
    
    poblarResumenPacienteApi1();
    
    ProfesionalExternoCheck();
    cargaProfesionalesSelect();
    cargaOrigenSelect();
    if($("#rebsol_hermesbundle_PrestacionType_prevision").val() === "" || $("#rebsol_hermesbundle_PrestacionType_prevision").val() === null){
        //choisestyle_campos_prevision_api1();
    }else{
         //choisestyle_campos_prevision_api1();
    }
    verificaCamposParaMostrarBuscarPrestacionInsumoPaquete();
    // KeyUp del input del buscar prestación.
    //------------------------------>  //verificar nombre del campo y accion 
    $("#inputPrestacionBuscar").keypress(function(e) {
        if (e.which === 13) {
            buscarPrestacion();
        }
    });

    $('#inputPrestacionBuscar').on('keyup', function() {
        $('#resultadoInsumoBuscar').html("");
        $('#divInsumoBuscar').hide();
        $('#inputInsumoBuscar').val("");

        $('#resultadoPaqueteBuscar').html("");
        $('#divPaqueteBuscar').hide();
        $('#inputPaqueteBuscar').val("");
        buscarPrestacion();
    });
    
    $("#inputInsumoBuscar").keypress(function(e) {
        if (e.which === 13) {
            buscarInsumo();
        }
    });

    $('#inputInsumoBuscar').on('keyup', function() {
        $('#resultadoPrestacionBuscar').html("");
        $('#divPrestacionBuscar').hide();
        $('#inputPrestacionBuscar').val("");

        $('#resultadoPaqueteBuscar').html("");
        $('#divPaqueteBuscar').hide();
        $('#inputPaqueteBuscar').val("");
        buscarInsumo();
    });

    $("#inputPaqueteBuscar").keypress(function(e) {
        if (e.which === 13) {
            buscarPrestacion();
        }
    });

    $('#inputPaqueteBuscar').on('keyup', function() {
        $('#resultadoInsumoBuscar').html("");
        $('#divInsumoBuscar').hide();
        $('#inputInsumoBuscar').val("");

        $('#resultadoPrestacionBuscar').html("");
        $('#divPrestacionBuscar').hide();
        $('#inputPrestacionBuscar').val("");
        buscarPaquete();
    });
    /*
     $('#inputPrestacionBuscar').keypress(function(){
     $('.fade, .modal').empty().hide();
     });
     */
    // Click del botón buscar prestación.
    //------------------------------>  //verificar nombre del campo y accion                                                
   
    $('#btnPaqueteBuscar').on('click', function() {
        buscarInsumo();
    });
    $('#btnInsumoBuscar').on('click', function() {
        buscarPaquete();
    });
   


    $('#btn-pre-pagar').on('click', function() {
        


        if(verificaPrestacionInsumoExiste()==true){
            
            $('.btn-edit-lista-prestaciones').show();
            $('#btneditListaPrestaciones').show();
            $('#agregar-prestacion-insumo-paquete').hide();
            prePagar();

             $('#btn-pre-pagar, .btn-pre-pagar').hide();
            $('.cancelar-desde-prestador').hide;
            $('#cancelar-desde-prestador, #saltosTeporales').hide();
            $("#mediodepago").slideDown();
            verificaPrestacionInsumoMostrarMediosDePago();
            localStorage.setItem('totalmonto', removeComas($("#sumaTotal").text()));
            var Valor_Pagar = localStorage.getItem('totalmonto');
            Caja_Valor_Pagar(Valor_Pagar);
            if(garantia == 1){
                $(".omdp").hide();
            }else{
                $(".omdp").show();
            }
        }else{
            bootbox.dialog("<strong class='red'>Alerta</strong>,<br><strong>Debe seleccionar algun servicio para poder Pagar.", [
                                                    {
                                                        "label": "Aceptar",
                                                        "class": "btn btn-mini alert",
                                                        "callback": function() {

                                                        }
                                                    }]); 
        }
    }
    );

    $(".LimpiarConvenioSelect  ").click(function() {
        limpiarconvenio();
        MotrarOcultarBuscarPrestacionInsumoPaquete();
    });
    
    $("#rebsol_hermesbundle_PrestacionType_prevision").change(function() {
        
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        $('#rebsol_hermesbundle_PrestacionType_plan').trigger("liszt:updated");
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        var idPrevision = $('#rebsol_hermesbundle_PrestacionType_prevision').val();
        var idConvenio = $('#rebsol_hermesbundle_PrestacionType_convenio').val();
        if (idConvenio === "") {

            prestador = idPrevision;
            cargaDatos(prestador);
        }
        //$('.alertafaltaPrestador').slideUp();
        $('#rebsol_hermesbundle_PrestacionType_convenio').prop('disabled', false).trigger("liszt:updated");
    });
    $("#rebsol_hermesbundle_PrestacionType_convenio").change(function() {
       
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        $('#rebsol_hermesbundle_PrestacionType_plan').trigger("liszt:updated");
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        var idPrevision = $('#rebsol_hermesbundle_PrestacionType_prevision').val();
        var idConvenio = $('#rebsol_hermesbundle_PrestacionType_convenio').val();
        verificaConvenioNovacio();
        if (idPrevision !== null) {
            prestador = idConvenio;
            cargaDatos(prestador);
        }
    });
}


function prePagar(){
    
        $('.ace-spinner').hide();
        $('.removePrestacion').hide();
      
        $('.cambioCantidad').each(function() {
            $(this).closest('td').find('.spanResumen').html($(this).val()).show().closest('td').find('div').first().hide();
        });
        
}


function verificaConvenioNovacio() {
    var idConvenio = $('#rebsol_hermesbundle_PrestacionType_convenio').val();
    if (idConvenio !== "") {
        $('.LimpiarConvenioSelect').show();
    } else {
        $('.LimpiarConvenioSelect').hide();
    }
}
function limpiarconvenio() {
    $('#rebsol_hermesbundle_PrestacionType_convenio').val('').trigger('chosen:updated');
    $('#rebsol_hermesbundle_PrestacionType_convenio').trigger("liszt:updated");
    $('#rebsol_hermesbundle_PrestacionType_convenio').val('').trigger('chosen:updated');
    $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
    $('#rebsol_hermesbundle_PrestacionType_plan').trigger("liszt:updated");
    $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
    var idPrevision = $('#rebsol_hermesbundle_PrestacionType_prevision').val();
    cargaDatos(idPrevision);
}
function ProfesionalExternoCheck() {

    $("#rebsol_hermesbundle_PrestacionType_derivadoCheck").change(function() {
        idDerivadoExterno = null;
        if (this.checked) {
            $('.derivadoSelect').hide();
            $('.derivadoExterno').show();
            $('#rebsol_hermesbundle_PrestacionType_derivadoSelect').val('').trigger('chosen:updated');
            $('#rebsol_hermesbundle_PrestacionType_derivadoSelect').trigger("liszt:updated");
            $('#rebsol_hermesbundle_PrestacionType_derivadoSelect').val('').trigger('chosen:updated');
            
        } else {
            $('.derivadoSelect').slideDown('slow');
            $('.derivadoExterno').hide();
            $('#rebsol_hermesbundle_PrestacionType_derivadoExterno').attr('disabled', true).val('');
            $('#rebsol_hermesbundle_PrestacionType_derivadoExternoRut').val('');
        }
        // MotrarOcultarBuscarPrestacionInsumoPaquete();
    });

}

$("#rebsol_hermesbundle_PrestacionType_derivadoExternoRut").keypress(function(e) {
    $('#rebsol_hermesbundle_PrestacionType_derivadoExterno').attr('disabled', true).val("");
    $('#alertInputExternosMensajeNoValido').hide();
    if (e.which === 13) {
        $('#resultadoExternosBuscar').html("");
        $('#divExternoBuscar, #resultadoExternosBuscar').hide();
        buscarExterno();
    }
});
$('#rebsol_hermesbundle_PrestacionType_derivadoExternoRut').on('keyup', function() {
    $('#rebsol_hermesbundle_PrestacionType_derivadoExterno').attr('disabled', true).val("");
    $('#alertInputExternosMensajeNoValido').hide();
    $('#resultadoExternosBuscar').html("");
    $('#divExternoBuscar, #resultadoExternosBuscar').hide();
    buscarExterno();
});

$("#rebsol_hermesbundle_PrestacionType_derivadoExterno").keypress(function(e) {
    $("#alertInputExternosGroupColor").removeClass("error");
    $("#alertInputExternosGroupColor").addClass("info");
    $("#alertInputExternosMensajeNo").hide();
});

var enBusqueda = false; 
function buscarExterno() {

      $("#alertInputExternosMensajeNo").hide();

      var texto = $('#rebsol_hermesbundle_PrestacionType_derivadoExternoRut').val();
      if (enBusqueda) {
          return false;
      }
      if (texto.length < 8) {
          return false;
      }
      if (Rut(texto)) {
        $('#alertInputExternosMensajeNoValido').show();

        return false;
      }
      
        var largo = texto.replace("-", "").length;
        var r     = texto.replace("-", "").substr(0, largo - 1);
        var dv    = texto.replace("-", "").substr(largo - 1, largo);

      $("#alertInputExternosGroupColor").removeClass("error");
      $("#alertInputExternosGroupColor").addClass("info");
      $("#iconExternoBuscar").removeClass("icon-question-sign icon-remove-sign");
      $("#iconExternoBuscar").addClass("icon-spinner icon-spin");
 

      // var append = $('#iconItemBuscar');
      // append.removeClass('icon-asterisk');
      // append.addClass('icon-spinner icon-spin');
      $('#resultadoExternosBuscar').html('');
      $('#divExternoBuscar').hide();

      enBusqueda = true;
      var data = {
          rut: r,
          dv: dv
      };
      var ruta = Routing.generate("Caja_Consulta_Externos");
      $.ajax({
          type: 'get',
          url: ruta,
          data: data,
          success: function(data) {
              $('#divExternoBuscar').show();
              $('#resultadoExternosBuscar').html(data);
              enBusqueda = false;
          }
      });
  }

function agregarExterno(id) {
    
    var data = {
        id: id
    };
    var ruta = Routing.generate("Caja_Obtiene_Externo");
    $.ajax({
        type: 'get',
        url: ruta,
        data: data,
        success: function(data) {
          data = $.parseJSON(data);
          $('#resultadoExternosBuscar').html('');
          $("#resultadoExternosBuscar, #divExternoBuscar").hide();
          $('#rebsol_hermesbundle_PrestacionType_derivadoExternoRut').val("");
          $('#rebsol_hermesbundle_PrestacionType_derivadoExternoRut').val(data.rut+'-'+data.dv);
          $("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val(data.nombre.toUpperCase());
        }
    });
}
                                                           
     ////////////////////////////////////////////////////////////////////////////////////////////
     // Listado de Prestaciones, Insumos y Paquetes
     ///////////////////////////////////////////////////////////////////////////////////////////
function verificaCamposParaMostrarBuscarPrestacionInsumoPaquete() {
// #rebsol_hermesbundle_PrestacionType_prevision,
    $("#rebsol_hermesbundle_PrestacionType_derivadoSelect, #rebsol_hermesbundle_PrestacionType_origenSelect, #rebsol_hermesbundle_PrestacionType_plan, #rebsol_hermesbundle_PrestacionType_convenio").change(function() {
      
        MotrarOcultarBuscarPrestacionInsumoPaquete();
    });
    $("#rebsol_hermesbundle_PrestacionType_derivadoExterno, #rebsol_hermesbundle_PrestacionType_derivadoExternoRut").blur(function() {
        if ($("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val().length > 3 && $('#rebsol_hermesbundle_PrestacionType_derivadoExternoRut').val() != null) {
            MotrarOcultarBuscarPrestacionInsumoPaquete();
        }
    });
    //validacion de en cambio del check, se hará directamente con la acción del boton
    //validacion de limpiar convenio, se hará directamente con la acción del boton
}
function MotrarOcultarBuscarPrestacionInsumoPaquete() {
    
    var prevision        = $("#rebsol_hermesbundle_PrestacionType_prevision").val();
    var plan             = $("#rebsol_hermesbundle_PrestacionType_plan").val();
    var origen           = $("#rebsol_hermesbundle_PrestacionType_origenSelect").val();
    var derivadoSelect   = $("#rebsol_hermesbundle_PrestacionType_derivadoSelect").val();
    var derivadoField    = $("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val();
    var derivadoRutField = $("#rebsol_hermesbundle_PrestacionType_derivadoExternoRut").val();    

    if ($("#rebsol_hermesbundle_PrestacionType_derivadoCheck").is(':checked')) {
        if(derivadoField == null || derivadoRutField == null){
            console.log('aqui');
            return false;
        }else{
            console.log('po aqui')
            if(derivadoRutField.length < 7){
                $('#alertInputExternosMensajeNoValido').show();
                return false;
                console.log('aca');
            }else{
                 $('#alertInputExternosMensajeNoValido').hide();
                 console.log('aqua');
            }
        }
    }

    if (prevision && plan) {
                if(editTratamiento == 1){
                    // cargaresumenprestadorform();
                }else{
                    $('.btnes-pre-pagar').show();
                    if(esTratamiento == 0){
                        $(".opcionTratamiento").show();
                        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
                    
                    }else{
                       if(tratamiento == 1){
                        $('#btn-Carga-DatosTratamiento').removeClass("hidden").show();  
                       }else{

                          if($('#prestadorresumen').is (':visible')==true){
                                $(".opcionTratamiento").show();
                                $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
                            }else{
                                $(".opcionTratamiento").hide();
                                $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
                            } 
                       }
                    }
                cargaresumenprestadorform();
                }
    } else {
        $("#agregar-prestacion-insumo-paquete").slideUp("slow");
        if(editTratamiento == 1){
                    $("#saltosTeporales").hide();
                }else{ 
                    $("#saltosTeporales").show();
                }
    }
}
function cargaresumenprestadorform() {
    $('#formprestador').slideUp("slow");

    var prevision = $("#rebsol_hermesbundle_PrestacionType_prevision option:selected").html();
    var derivadoSelect = $("#rebsol_hermesbundle_PrestacionType_derivadoSelect option:selected").html();
    var origenSelect = $("#rebsol_hermesbundle_PrestacionType_origenSelect option:selected").html();
    var plan = $("#rebsol_hermesbundle_PrestacionType_plan option:selected").html();
    var derivadoExterno = $("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val();
    var derivadoRutField = $("#rebsol_hermesbundle_PrestacionType_derivadoExternoRut").val(); 

    if ($("#rebsol_hermesbundle_PrestacionType_convenio").val() == null) {
        var convenio = "No eligió un Convenio.";
    } else {
        var convenio = $("#rebsol_hermesbundle_PrestacionType_convenio option:selected").html();
    }
    
    if ($("#rebsol_hermesbundle_PrestacionType_origenSelect").val() == null) {
        var origenSelect = "No eligió un Origen.";
    } else {
        var origenSelect = $("#rebsol_hermesbundle_PrestacionType_origenSelect option:selected").html();
    }

    if ($("#rebsol_hermesbundle_PrestacionType_derivadoSelect ").val() == null) {
        var derivado = derivadoRutField+' / '+derivadoExterno;
    } else {
        var derivado = derivadoSelect;
    }
    if(derivado == null){
        derivado = "No eligió Deribado."
    }

    $("#conveniospan").html(convenio);
    $("#prestadorspan").html(prevision);
    $("#derivadospan").html(derivado);
    $("#origenspan").html(origenSelect);
    $("#planspan").html(plan);
    $('#prestadorresumen').slideDown("slow");
    $("opcionTratamiento ").hide();
    if(esTratamientoAgenda == 1){
        $('.btnes-pre-pagar').show();
        $(".opcionTratamiento").hide();
        $("#btn-tratamiento").show();
    }
    // if(editTratamiento == 1){
    //     console.log("aqui");
    //     $(".opcionTratamiento").hide();
    //     $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
    //     var count = Listaprestaciones.length;
    //     console.log("1"+count);
    //     if(count > 0){
    //         console.log("vamos Prestaciones"+count);
    //         for (var i = 0; i <count; i++) {
    //             if(Listaprestaciones[i]){  
    //                 agregarPrestacion(Listaprestaciones[i]);
    //                 SumarColumna();
    //             }
    //         } 
    //     }
    //     var count = Listaarticulos.length;
    //     console.log("2"+count);
    //     if(count > 0){
    //         console.log("vamos Articulos"+count);
    //         for (var e = 0; e <count; e++) {
    //             if(Listaarticulos[e]){  
    //                 agregarInsumo(Listaarticulos[e]);
    //                 SumarColumna();
    //             }
    //         }
    //     } 
    // }

    if(esTratamientoAgenda == 0){ 
        if(idReservaAtencion){
            $('#prestacionesTable').empty();
            var count = Listaprestaciones.length;
            for (var i = 0; i <count; i++) {
                if(Listaprestaciones[i]){  
                    agregarPrestacion(Listaprestaciones[i]);
                    SumarColumna();
                }
            }
            $('.btnes-pre-pagar').show();
            $("#agregar-prestacion-insumo-paquete, .btn-pre-pagar").show();
            $(".opcionTratamiento").hide(); 
        }
        if(tratamiento == 0){ 
            $('.btnes-pre-pagar').show();
           $("#agregar-prestacion-insumo-paquete, .btn-pre-pagar").show();
           $(".opcionTratamiento").hide();
        }
    }
}
function obtienevalorCantidad() {

    $('.sumarestaCantidad').click(function() {

          if(esDiferencia == 1){
                var n = parseInt($(this).parents().eq(2).children().find('input').val());
                if($(this).hasClass('spinner-up')){
                    var z = n - 1;
                }else{
                    if(parseInt($(this).parents().eq(2).children().find('input').val()) > 1){
                        var z = n + 1;
                    }else{
                        var z = n;
                    }
                }
                $(this).parents().eq(2).children().find('input').val(z);
                $('.cambioCantidad').each(function() {

                    var id = $(this).closest('input').attr('id');
                    var valor = parseFloat($("#" + id).val());
                    var precio = $("#precio" + id).html();
                    var spanTotalFila = "sumaCantidad" + id;
                    if (valor === 0) {
                        $("#" + id).val("1");
                        var valor = parseFloat($("#" + id).val());
                        SumarFila(valor, precio, spanTotalFila);
                    } else {
                        SumarFila(valor, precio, spanTotalFila);
                    }
                }).promise().done(function() {
                 $("#diferenciaTotal").html(ListaInformacionDiferencia['DifTotal']);
                 calculaNuevoMontoDiferencia(ListaInformacionDiferencia['FullTotal']);
                 anularDiferencia();return;
                  });;
                
            }
    });
    $('.cambioCantidad').click(function() {
              if(esDiferencia == 1){

                anularDiferencia();return;
            }
    });

    $('.cambioCantidad').change(function() {

        var id = $(this).closest('input').attr('id');
        var valor = parseFloat($("#" + id).val());
        var precio = $("#precio" + id).html();
        var spanTotalFila = "sumaCantidad" + id;
        //FYIconsole.log(valor);
        //FYIconsole.log(precio);
        //FYIconsole.log(spanTotalFila);
        if (valor === 0) {
            $("#" + id).val("1");
            var valor = parseFloat($("#" + id).val());
            SumarFila(valor, precio, spanTotalFila);
        } else {
            SumarFila(valor, precio, spanTotalFila);
        }

    });
    
       $('.cambioCantidadInsumos').change(function() {
        var id = $(this).closest('input').attr('id');
        
        var valor = parseFloat($(".inputCantidadInsumo" + id).val());
        var precio = $("#precio_i" + id).html();
        var spanTotalFila = "sumaCantidad_i" + id;
        //FYIconsole.log(spanTotalFila);
        if (valor === 0) {
            $(".inputCantidadInsumo" + id).val("1");
            var valor = parseFloat($(".inputCantidadInsumo" + id).val());
            SumarFilaInsumo(valor, precio, spanTotalFila);
        } else {
            SumarFilaInsumo(valor, precio, spanTotalFila);
        }

    });
}


////////////////////////////////////////////////////////////////////////////////////////////
// Acciones de Listado de Isumos Prestaciones
///////////////////////////////////////////////////////////////////////////////////////////
function eliminarPrestacion(elemento) {
    if(esDiferencia == 1){
        anularDiferencia();return;
    }

    elemento = $(elemento);
    var tr = elemento.closest('tr');
    tr.remove();
    SumarColumna();
    if ($('#prestacionesTable').find('.icon-remove').length == 0) {
        $('#total').empty();
        $('#prestacionesTable').find('#total').remove();
        $('#prestaciones').hide();
        $('.btn-pre-pagar').hide();
    } else {

    }
    ;
}

function eliminarInsumo(elemento) {
    if(esDiferencia == 1){
        anularDiferencia();return;
    }

    elemento = $(elemento);
    var tr = elemento.closest('tr');
    tr.remove();
    SumarColumna();
    if ($('#prestacionesTable').find('.icon-remove').length == 0) {
        $('#total').empty();
        $('#prestacionesTable').find('#total').remove();
        $('#prestaciones').hide();
        $('.btn-pre-pagar').hide();
    } else {

    }
    ;
}

function SumarColumna() {
    var resultVal = 0;
    $('.sumaCantidad').each(function() {
        resultVal += removeComas($(this).text());
    });
    localStorage.setItem('VariableSumaCantidad', resultVal);
    var vSumaCantidad = localStorage.getItem('VariableSumaCantidad');
    Caja_Valmacena_Total_Suma(vSumaCantidad);
}

function SumarFila(valor, precio, spanTotalFila) {
    console.log(precio);
    precio = removeComas(precio);
    console.log(precio);
    var totalFila = valor * precio;
    $("#" + spanTotalFila).html(addCommas(totalFila));
    SumarColumna();
}

function SumarFilaInsumo(valor, precio, spanTotalFila) {
   
    var totalFila = valor * removeComas(precio);
    $("#" + spanTotalFila).html(addCommas(totalFila));
    SumarColumna();
}



function FormatDinero(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function PoblarSpan(dato) {
    var id = $('.cambioCantidad ').attr("id");
    $("#spanResumen" + id).html($("#" + id).val());
}            


function DatosPrestacionApi1() {
    $(".btn-volver2").show();
    //poblarResumenPaciente();
    ProfesionalExternoCheck();
    cargaProfesionalesSelect();
    cargaOrigenSelect();
   // //choisestyle_campos_prevision_api1();
    verificaCamposParaMostrarBuscarPrestacionInsumoPaquete();
    // KeyUp del input del buscar prestación.
    //------------------------------>  //verificar nombre del campo y accion 
    $("#inputPrestacionBuscar").keypress(function(e) {
        if (e.which === 13) {
            buscarPrestacion();
        }
    });

    $('#inputPrestacionBuscar').on('keyup', function() {
        $('#resultadoInsumoBuscar').html("");
        $('#divInsumoBuscar').hide();
        $('#inputInsumoBuscar').val("");

        $('#resultadoPaqueteBuscar').html("");
        $('#divPaqueteBuscar').hide();
        $('#inputPaqueteBuscar').val("");
        buscarPrestacion();
    });

    $("#inputInsumoBuscar").keypress(function(e) {
        if (e.which === 13) {
            buscarInsumo();
        }
    });

    $('#inputInsumoBuscar').on('keyup', function() {
        $('#resultadoPrestacionBuscar').html("");
        $('#divPrestacionBuscar').hide();
        $('#inputPrestacionBuscar').val("");

        $('#resultadoPaqueteBuscar').html("");
        $('#divPaqueteBuscar').hide();
        $('#inputPaqueteBuscar').val("");
        buscarInsumo();
    });

    $("#inputPaqueteBuscar").keypress(function(e) {
        if (e.which === 13) {
            buscarPrestacion();
        }
    });

    $('#inputPaqueteBuscar').on('keyup', function() {
        $('#resultadoInsumoBuscar').html("");
        $('#divInsumoBuscar').hide();
        $('#inputInsumoBuscar').val("");

        $('#resultadoPrestacionBuscar').html("");
        $('#divPrestacionBuscar').hide();
        $('#inputPrestacionBuscar').val("");
        buscarPaquete();
    });
    /*
     $('#inputPrestacionBuscar').keypress(function(){
     $('.fade, .modal').empty().hide();
     });
     */
    // Click del botón buscar prestación.
    //------------------------------>  //verificar nombre del campo y accion                                                
    $('#btnPrestacionBuscar').on('click', function() {
        buscarPrestacion();
    });

    // $('.spcb').on('click', function() {
    //     SPC();
    // });

    $('#btn-pre-pagar').on('click', function() {
        
        if(verificaPrestacionInsumoExiste()==true){
            
            $('.btn-pre-pagar').show();
            $('#btneditListaPrestaciones').show();
            $('#agregar-prestacion-insumo-paquete').hide();
            $('.ace-spinner').hide();
            $('.removePrestacion').hide();
            $('#btn-pre-pagar, .btn-pre-pagar').hide();
            $('.cancelar-desde-prestador').hide;
            $('#cancelar-desde-prestador').hide();
            $('.cambioCantidad').each(function() {
                $(this).closest('td').find('.spanResumen').html($(this).val()).show().closest('td').find('div').first().hide();
            });
            $("#mediodepago").slideDown();
            verificaPrestacionInsumoMostrarMediosDePago();
            localStorage.setItem('totalmonto', parseFloat($("#sumaTotal").text()));
            var Valor_Pagar = localStorage.getItem('totalmonto');
            Caja_Valor_Pagar(Valor_Pagar);
        }else{
            bootbox.dialog("<strong class='red'>Alerta</strong>,<br><strong>Debe seleccionar algun servicio para poder Pagar.", [
                                                    {
                                                        "label": "Aceptar",
                                                        "class": "btn btn-mini alert",
                                                        "callback": function() {

                                                        }
                                                    }]); 
        }
    }
    );

    $('#btn-descuentos').on('click', function() {
        //FYIconsole.log("coming soon 'descuentos'");
    }
    );

    $(".LimpiarConvenioSelect  ").click(function() {
        limpiarconvenio();
        MotrarOcultarBuscarPrestacionInsumoPaquete();
    });
    $("#rebsol_hermesbundle_PrestacionType_prevision").change(function() {
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        $('#rebsol_hermesbundle_PrestacionType_plan').trigger("liszt:updated");
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        var idPrevision = $('#rebsol_hermesbundle_PrestacionType_prevision').val();
        var idConvenio = $('#rebsol_hermesbundle_PrestacionType_convenio').val();
        if (idConvenio === "") {

            prestador = idPrevision;
            cargaDatos(prestador);
        }
        //$('.alertafaltaPrestador').slideUp();
        $('#rebsol_hermesbundle_PrestacionType_convenio').prop('disabled', false).trigger("liszt:updated");
    });
    $("#rebsol_hermesbundle_PrestacionType_convenio").change(function() {
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        $('#rebsol_hermesbundle_PrestacionType_plan').trigger("liszt:updated");
        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
        var idPrevision = $('#rebsol_hermesbundle_PrestacionType_prevision').val();
        var idConvenio = $('#rebsol_hermesbundle_PrestacionType_convenio').val();
        verificaConvenioNovacio();
        if (idPrevision !== null) {
            prestador = idConvenio;
            cargaDatos(prestador);
        }
    });
}

function verificaPrestacionInsumoMostrarMediosDePago(){
    
        if (ArraydePrestacionesNormal().length == 0) {
            $('.MedioPagoBono').each(function() {
                $(this).parent().parent().hide();
            });
        } else {
            $('.MedioPagoBono').each(function() {
                $(this).parent().parent().show();
            });
        }
  
}

function verificaPrestacionInsumoExiste(){
   if($(".cambioCantidad ").length>0){return true;}else{return false;}
}


function Rut(rut) {
    if (rut.toString().trim() != '' && rut.toString().indexOf('-') > 0) {
        var caracteres = new Array();
        var serie = new Array(2, 3, 4, 5, 6, 7);
        var dig = rut.toString().substr(rut.toString().length - 1, 1);
        rut = rut.toString().substr(0, rut.toString().length - 2);

        for (var i = 0; i < rut.length; i++) {
            caracteres[i] = parseInt(rut.charAt((rut.length - (i + 1))));
        }

        var sumatoria = 0;
        var k = 0;
        var resto = 0;

        for (var j = 0; j < caracteres.length; j++) {
            if (k == 6) {
                k = 0;
            }
            sumatoria += parseInt(caracteres[j]) * parseInt(serie[k]);
            k++;
        }

        resto = sumatoria % 11;
        dv = 11 - resto;

        if (dv == 10) {
            dv = "K";
        }
        else if (dv == 11) {
            dv = 0;
        }

        if (dv.toString().trim().toUpperCase() == dig.toString().trim().toUpperCase())
            return true;
        else
            return false;
    }
    else {
        return false;
    }
}

$("#rebsol_hermesbundle_PrestacionType_derivadoExternoRut").bind("keypress", function(event) {
    if (event.charCode !== 0) {
        var regex = new RegExp("^[0-9kK]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
});