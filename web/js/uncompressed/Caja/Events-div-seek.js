function sinRutDesdeReserva(a, b){

   if(b==1){
    // Para rut
    $("#rebsol_hermesbundle_PagoType_nombrePnatural, #rutdv2,"+
      "#rebsol_hermesbundle_PagoType_apellidoPaterno, #rebsol_hermesbundle_PagoType_apellidoMaterno").prop("readonly", false);
     $("#rebsol_hermesbundle_PagoType_nombrePnatural, #rutdv2,"+
      "#rebsol_hermesbundle_PagoType_apellidoPaterno, #rebsol_hermesbundle_PagoType_apellidoMaterno").prop("disabled", false);
    verificaRutDocumentoExtranjeroexiste = 1;
    $(".camposExtranjero").prop("disabled", true);
    $("#soloRutForm").addClass("btn-success");
    $("#soloExtrangeroForm").removeClass("btn-success");
    $('#rebsol_hermesbundle_PagoType_numeroDocumento').val('');
    $('#rebsol_hermesbundle_PagoType_documento').val('');
    $('.camposNExtranjero').show();
   }
   if(b==0){
    // Para Documento Extranjero
    $("#rebsol_hermesbundle_PagoType_nombrePnatural, .camposExtranjero,"+
      "#rebsol_hermesbundle_PagoType_apellidoPaterno, #rebsol_hermesbundle_PagoType_apellidoMaterno").prop("readonly", false);
    $("#rebsol_hermesbundle_PagoType_nombrePnatural, .camposExtranjero,"+
      "#rebsol_hermesbundle_PagoType_apellidoPaterno, #rebsol_hermesbundle_PagoType_apellidoMaterno").prop("disabled", false);
    verificaRutDocumentoExtranjeroexiste = 1;
    $("#rutdv2").prop("disabled", true);
    $("#soloExtrangeroForm").addClass("btn-success");
    $("#soloRutForm").removeClass("btn-success");
    $('#rutdv2').val('');
    $('.camposNExtranjero').hide();
   }
}
function verificaRutDocumentoExtranjeroExisteFun(rut){
        if(rut.length>1){
            $("#rutdv").val(rut);
            verificaRutDocumentoExtranjeroexiste = 1;
            ValidaRut();
        }else{
            $("#rutdv2").prop("disabled", false);
        }
        
}

function loadScriptEventosDivBusqueda() {
  
    $("#cancelar-desde-prestador,  .cancelar-desde-prestador, .continuarPasoUno, #cancelar-desde-mediopago, .cancelar-desde-mediopago").on('click', function(){
         $('#historicoPacientePagos').slideUp().html("");
    });
    
    $(".opcionTratamiento").hide();
    
    $("#btnChangeDatosPaciente").on('click', function() {
        var ruta = Routing.generate("Caja_BuscaMascotas_Cliente");   
        $.ajax({
            type: 'get',
            url: ruta,
            success: function(data) {
                var data = $.parseJSON(data);
                
                if(data.length > 0){
                
                for (i = 0; i < data.length; i++) {
                    var tr = $("<tr></tr>");
                    
                    var td = $("<td>"+data[i].nombre+"</td>");
                    tr.append(td);
                    
                    var td = $("<td>"+data[i].nombreMascota+"</td>");
                    tr.append(td);
                    
                    var td = $("<td>"+data[i].kcc+"</td>");
                    tr.append(td);
                    
                    var td = $("<td>"+data[i].chip+"</td>");
                    tr.append(td);
                    
                    var td = $("<td>"+data[i].raza+"</td>");
                    tr.append(td);
                    
                    var td = $("<td>"+data[i].sexo+"</td>");
                    tr.append(td);
                    
                    var td = $("<td>"+data[i].color+"</td>");
                    tr.append(td);
                    
                    var td = $("<td></td>");
                    var ahref = $("<a class='btn btn-mini btn-success testingEscala' id='"+data[i].id+"' onclick='javascript:SeleccionMascotaApi("+data[i].id+", 1)')>Seleccionar</a>");

                    td.append(ahref);
                    tr.append(td);
                    $('#mascotaPorDuenoTable').append(tr);
                }
                $('#mascotasPorDueno').slideDown();
            }
            },
            error: function(datar) {
                falla();
            }
        });
        
    });
    
    
    $('#btnCancelPacienteClienteTable').on('click', function() {
        $('#mascotasPorDueno').slideUp();
        $('#mascotaPorDuenoTable').html("");
    });
    
    $(".continuarPasoUno, .btn-volverEdit ").on('click', function() {
       
        var ruta = Routing.generate("Caja_ConsultaPacienteIdPnatural");   
        var data = {
                                         rut: $("#rebsol_hermesbundle_PagoType_rutPersona").val(),
                                        dv: $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val()
                                    };
                                    $.ajax({
                                        type: 'get',
                                        url: ruta,
                                        data: data,
                                        success: function(datar) {
                                        },
                                        error: function(datar) {
                                            falla();
                                        }
                                    });
        
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        $(".btn-volverEdit").show();
        $("#pacienteform").slideUp(400);
        $(".alertaExisteFullDatos").slideUp(400);
        $("#pacienteresumen").slideDown(1000);
        $("#datosprestacion").slideDown(1000);
        $("#formprestador").show(1000);
        $("#agregar-prestacion-insumo-paquete").hide(1000);
        poblarResumenPaciente();
        post_create_update();
        
                            
    });

$(".MediosPagoTabs ").on('click', function() {
        var Valor_Pagar = localStorage.getItem('totalmonto');
       // $('#Tabla_MediosPago_Tab').load(location.href + " #Tabla_MediosPago_Tab");
       // $('#Tabla_OtrosMedios_Tab').load(location.href + " #Tabla_OtrosMedios_Tab");
        $(".sumaTotalMediosDePago").html(Valor_Pagar);
        $(".SaldoTotalMediosDePago").html(Valor_Pagar);
        $("#sumaTotal").html("");
        $("#sumaTotal").html(Valor_Pagar);
        $('#saldototalpagar').addClass('alert-danger');
        SumaSaldoVsMediosPago();
        $( ".Input_num, .Input_text, .val-rutdv, .Input_select" ).bind("keyup change", function(e) {
        SumaSaldoVsMediosPago(); 
        });
        
        //Caja_Valor_Pagar(Valor_Pagar);
    });

    $("#RecaudacionTabs ").on('click', function() {
                        var ruta = Routing.generate("Caja_TraeCorrelativo");   
                        var data = {
                                        caja: parseInt( $("#idCajaAbierta").text())
                                    };
                                    $.ajax({
                                        type: 'get',
                                        url: ruta,
                                        data: data,
                                        success: function(datar) {
                                            if(datar== "no"){
                                                return; 
                                            }else{
                                           verificaCorrelativo();
                                            }
                                        }
                                    });
        //verificaCorrelativo();
    });

    $(".actualizarPasoUno ").on('click', function() {
        $(".alertaExisteFullDatos").slideUp(400);
        // $(".btn-salvar").show();
        $("#btn-salvar-edit").show();
       
        $(".btn-volver").show();
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        $(".alertaExisteDatos").slideDown(400);
    });

    $(".btn-salvar").on('click', function() {
        $(".btn-salvar").css('pointer-events','none');
        guardar();
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
    });
     $(".btn-salvar-edit").on('click', function() {
        $(".btn-salvar-edit").css('pointer-events','none');
        GuardarEdit();
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
    });

    $(".btn-volver, .btn-volver2, .btn-volverExiste, .cancelar-desde-prestador, #btn-cancelar_desdeTratamiento").on('click', function() {
        $("#rutdv").removeAttr("disabled");
        $("#rutdv").removeAttr("readonly");
        $("#ApellidoP").removeAttr("readonly");
        $("#ApellidoP").removeAttr("disabled");
        $("#ApellidoM").removeAttr("disabled");
        $("#ApellidoM").removeAttr("readonly");
        $(".pacientefallecido").slideUp(1000);
        $("#listapacienteform").slideUp(1000);
        $("#pacienteresumen").slideUp(1000);
        $("#prestadorresumen").slideUp(1000);
        $("#datosprestacion").slideUp(1000);
        $(".btn-volver2").hide();
        $(".btn-volver").hide();
        $(".btn-pre-pagar, .opcionTratamiento").hide();
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        $(".btn-volverEdit").hide();
        $(".alertaExisteFullDatos").slideUp(500);
        $("#mediodepago").hide();
        limpiaradv();
        limpiar();
        $(".LimpiarConvenioSelect, #historicoPacientePagos, .datosTratamiento").hide();
        $("#listapacienteform").slideUp(500);
        $("#listapacienteform").load(location.href + " #listapacienteform");
        
        $('#busquedaPacientesForm, #formPrestaciones').slideDown(1000);
        
        if(coreApi == 0){
            $(".BusquedaClienteMascota").show();
        }
        idReservaAtencion = 0;
        TratamientoArray = [];
        esTratamientoAgenda = 0;
        tratamiento = 1;
        
    });

    $(".btn-edit-prestacion, #btneditDatosPrestacion").on('click', function() {
         if(esDiferencia == 1){
            anularDiferencia();return;
        }
        $("#mediodepago").hide();
        $("#pacienteform").slideUp(1000);
        $(".pacientefallecido").slideUp(1000);
        $("#listapacienteform").slideUp(1000);
        $("#agregar-prestacion-insumo-paquete").slideUp(1000);
        $("#pacienteresumen").slideDown(1000);
        $("#formprestador").slideDown(1000);
        $('#total').empty();
        $("#prestacionesTable").load(location.href + " #prestacionesTable");
        $('#prestaciones').hide();
        $('.btn-pre-pagar').hide();
        $('#inputPrestacionBuscar').val("");
        $('#saltosTeporales, #cancelar-desde-prestador').show();
        $('#resultadoPrestacionBuscar').html('');
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        $(".opcionTratamiento").hide();
        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
        $("#formPrestaciones").slideDown(1000);
        $("#prestadorresumen").slideUp(1000);
        esTratamiento = 0;
        nuevoTratamiento = 0;
        if($("#prestadorresumen").is(":visible")){
            $('#btn-Carga-DatosTratamiento').addClass("hidden").hide(); 
            $(".opcionTratamiento").hide();
        }
    });

    $("#btneditListaPrestaciones, btn-edit-lista-prestaciones").on('click', function() {
         if(esDiferencia == 1){
            anularDiferencia();return;
        }
        $("#mediodepago, .btn-edit-lista-prestaciones, #btneditListaPrestaciones").hide();

        $('#btn-pre-pagar, #agregar-prestacion-insumo-paquete, .ace-spinner, .removePrestacion, #btn-descuentos, #cancelar-desde-prestador').show();
        $('.cambioCantidad').each(function() {
            $(this).closest('td').find('.spanResumen').html($(this).val()).hide().closest('td').find('div').first().show();
        });

    });

    $(".btn_salva").on('click', function() {
        $(".btn-volverEdit").hide();
        guardar();
    });

    $(".btn-salvarAgenda").on('click', function() {
        $(".btn-volverEdit").hide();
        $(".btn-salvar-edit").css('pointer-events','none');
        GuardarEdit();
    });


    $("#ssimplediv").on('click', function() {
        $('#rutdv').focus();
        $("#listapacienteform").slideUp(500);
        $(".alertaNoexiste").slideUp(900);
        $("#resultadosBusquedaAvanzadaPaciente").load(location.href + " #resultadosBusquedaAvanzadaPaciente");
        $("#resultadosBusquedaAvanzadaPaciente").slideUp(1000);
        limpiaradv();
    });

    $("#sadvdiv").on('click', function() {
        $('#ApellidoP').focus();
        $("#listapacienteform").slideUp(500);
        $(".alertaNoexiste").slideUp(900);
        $("#resultadosBusquedaAvanzadaPaciente").load(location.href + " #resultadosBusquedaAvanzadaPaciente");
        $("#resultadosBusquedaAvanzadaPaciente").slideUp(1000);
        limpiar();
    });

    $("#ssimplediv").on('click', function() {
        $("#listapacienteform").slideUp();
    });

    $("#sadvdiv").on('click', function() {
        $("#listapacienteform").slideUp();
    });

    $("#rebsol_hermesbundle_PagoType_fechaNacimiento").blur(function() {
        validarFechaN();
    });
    
    
$('#buscarDueno_rut').keyup(function(e){
    if(e.keyCode == 13)
    {       
        if($('#buscarDueno_rut').val().length >= 8){
        setTimeout(function(){
         $("#verDuenoMascota").children().children("div").children("a").attr("href", "");
         $("#verDuenoMascota").children().children("div").children("a").removeClass("btn-volver");
         $("#verDuenoMascota").children().children("div").children("a").addClass("btn-volver-mascota");        
     }, 2000);
        }
    }
});

$('#btnBuscarDueñoRut').click(function() {
   
    if($('#buscarDueno_rut').val().length >= 8){
      setTimeout(function(){
         $("#verDuenoMascota").children().children("div").children("a").attr("href", "");
         $("#verDuenoMascota").children().children("div").children("a").removeClass("btn-volver");
         $("#verDuenoMascota").children().children("div").children("a").addClass("btn-volver-mascota");
 }, 2000); 
 }
});
   
       
$('#buscarMascota_nombreMascota, #buscarMascotaChip_kcc, #buscarMascotaChip_chip').keyup(function(e){
    if(e.keyCode == 13)
    {         
      if($('#buscarMascota_nombreMascota').val().length >= 4 || $('#buscarMascotaChip_kcc').val().length >= 4 || $('#buscarMascotaChip_chip').val().length >= 4){      
        setTimeout(function(){
             if($("#verResultadosBusquedaPaciente").children("div").children("div").children("form").children("a").length>0){}else{
         $("#verResultadosBusquedaPaciente").children("div").children("div").children("form").children("button").hide();
         $("#verResultadosBusquedaPaciente").children("div").children("div").children("form").append("<a class='btn btn-small btn-volver-mascota' href=''><i class='icon-arrow-left'></i>Volver</a>");
             }
         }, 2000); 
     }
         
    }
});

$('#btnBuscarMascotaNombre, #btnBuscarMascotaKcc, #btnBuscarMascotaChip').click(function() { 
   
  if($('#buscarMascota_nombreMascota').val().length >= 4 || $('#buscarMascotaChip_kcc').val().length >= 4 || $('#buscarMascotaChip_chip').val().length >= 4){    
      setTimeout(function(){
          if($("#verResultadosBusquedaPaciente").children("div").children("div").children("form").children("a").length>0){}else{
         $("#verResultadosBusquedaPaciente").children("div").children("div").children("form").children("button").hide();
         $("#verResultadosBusquedaPaciente").children("div").children("div").children("form").append("<a class='btn btn-small btn-volver-mascota' href=''><i class='icon-arrow-left'></i>Volver</a>");
          }
 }, 2000); 
 }
 
});

$('#btnBuscaAvanzadoMascota').click(function() { 
  if($('#busquedaAvanzadaPaciente_especie').val() !== null || $('#busquedaAvanzadaPaciente_raza').val() !== null ){ 
      setTimeout(function(){
          if($("#resultadosBusquedaAvanzadaPaciente").children("div").children("div").children("form").children("a").length>0){}else{
         $("#resultadosBusquedaAvanzadaPaciente").children("div").children("div").children("form").children("button").hide();
         $("#resultadosBusquedaAvanzadaPaciente").children("div").children("div").children("form").append("<a class='btn btn-small btn-volver-mascota' href=''><i class='icon-arrow-left'></i>Volver</a>");
          }
 }, 2000); 
 }
 
});

$('#btn-tratamiento').click(function() { 
    formularioTratamiento();
});

$('#btn-PagoNormal').click(function() { 
    formularioSinTratamiento(); 
});

$('#btn-cancelarTratamiento').click(function() { 
    CancelarTratamiento();
});

$('#btn-Carga-DatosTratamiento').click(function(){
    var div     = $("<div class='alertTratamientoDialog'></div>");
    var code    = $("<div class='alert alert-block alert-success GenerandoTratamientoDialog'>" +
                        " <strong class='green'>Cargando datos seleccionados de Tratamiento,</strong><br>Por favor espere..." +
                        "</div>");

        bootbox.dialog(div.append(code),[{
                "label": "Aceptar",
                "class": "btn btn-mini btn-info btn-accept-carga-tratamiento hidden",
                "callback": function() {
                    
                }
            }]).delay(500).promise().done(function() {
                CargarDatosDesdeGlosaTratamientoPrePago();
                    });
});

$('#btn-Carga-DatosTratamiento-Edit').on('click',function(){
    var div     = $("<div class='alertTratamientoDialog'></div>");
    var code    = $("<div class='alert alert-block alert-success GenerandoTratamientoDialog'>" +
                        " <strong class='green'>Cargando datos seleccionados de Tratamiento,</strong><br>Por favor espere..." +
                        "</div>");

        bootbox.dialog(div.append(code),[{
                "label": "Aceptar",
                "class": "btn btn-mini btn-info btn-accept-carga-edit-tratamiento hidden",
                "callback": function() {
                    
                }
            }]).delay(500).promise().done(function() {
                cargarEdicionTratamiento();
                    });
});


$('#btn-crearTratamiento, #btn-editTratamiento').click(function() { 
    if(editTratamiento == 1){
        var status = "Modificando ";
    }else{
        var status = "Generando";
    }
     var div     = $("<div class='alertTratamientoDialog'></div>");
     var code    = $("<div class='alert alert-block alert-success GenerandoTratamientoDialog'>" +
                        " <strong class='green'>"+status+" Tratamiento,</strong><br>Por favor espere..." +
                        "</div>");

      
        bootbox.dialog(div.append(code),[
            {
                "label": "Seleccionar y Cargar Este Tratamiento",
                "class": "btn btn-mini btn-info btn-accept-create-tratamiento hidden hide",
                "callback": function() {
                   CargarGlosaTratamientoNuevo(); 
                }
            },
            {   "label": "Volver a Opciones",
                "class": "btn btn-mini alert btn-accept-create-tratamiento btn-accept-create-tratamiento-block hidden hide",
                 "callback": function() {
                   CancelarTratamiento(); 
                }
            }
            ,
            {   "label": "Aceptar",
                "class": "btn btn-mini alert btn-tratamiento-aceptar-error-edit hidden hide",
                 "callback": function() {
                }
            },
            {
                "label": "Aceptar",
                "class": "btn btn-mini btn-fail-create-tratamiento hidden hide",
                "callback": function() {  
                }
            }]).delay(500).promise().done(function() {
                
                if(editTratamiento == 1){
                    editarTratamiento();
                }else{
                    crearTratamiento();
                }
                    });
});
}

function loadDatosMascotas(){
   bootbox.dialog("<div class='alert alert-block alert-success'>" +
            "    <p>" +
            "    <strong></i>Buscando si existe Mascota</strong>" +
            "    </p>" +
            "</div>" 
   );
}

function revisionListaMascota(){
                 loadDatosMascotas();
      $('.odd, .even').each(function() {
         if( $(this).children().eq(7).children("a").length>0 && $(this).children().eq(7).children("a").attr("id")!=null){}else{ 
        var id = $(this).children().eq(7).children("div").children("button").data('idmascotaver');
        $(this).children().eq(7).html("");
        $(this).children().eq(7).append("<a class='btn btn-mini btn-success testingEscala' id='"+id+"' onclick='javascript:SeleccionMascotaApi("+id+", 1)')>Seleccionar</a>");  
    } });
 
    bootbox.hideAll();   
}

function SeleccionMascotaApi(id, a){   
    var ruta = Routing.generate("Caja_Guarda_IdPnaturalMascota");   
    var data = {id: id};
        $.ajax({
            type: 'get',
            url: ruta,
            data: data,
            success: function(datar) {
                    datar = $.parseJSON(datar);
                    $("#rutdv").val(datar.rut+""+datar.dv);  
                    var rdv = $("#rutdv").val();
                    var largo = rdv.length;
                    var r = $("#rutdv").val().substr(0, largo - 1);
                    var dv = $("#rutdv").val().substr(largo - 1, largo);
                    $("#rebsol_hermesbundle_PagoType_rutPersona").val(r);
                    $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val(dv);
                    $("#rutspan").html(rdv);
                    $("#nombrespan").html(datar.nombre);
                    $("#apepspan").html(datar.ApellidoPaterno+" "+datar.ApellidoMaterno);
                    $("#nomMascota").html(datar.nombreMascota);
                    $("#chipMascota").html(datar.chip);
                    $("#kccMascota").html(datar.kcc);
                    $("#reproMascota").html(datar.estadoReproductivo);
                    var fechaNac = datar.fechaNacimiento.date;
                    if (fechaNac) {
                        var año = fechaNac.substr(0, 4);
                        var mes = fechaNac.substr(5, 2);
                        var dia = fechaNac.substr(8, 2);
                        var fechanacimiento = dia + "-" + mes + "-" + año;
                    }
                    $("#fechanMascota").html(fechanacimiento);
                    $("#sexoMascota").html(datar.sexo);
                    $("#especieMascota").html(datar.especie+" - "+datar.raza);
                    $("#colorMascota").html(datar.color);
              },
            error: function(datar) {
                falla();
            }
        });
//#verResultadosBusquedaPaciente
        $("#bAvanzadoMascota").parent("li").removeClass("active");
        $("#bSimpleMascota").parent("li").addClass("active");
        $("#avanzado").removeClass("active");
        $("#avanzado").removeClass("in");
        $("#simple").addClass("active");                                    
        $("#simple").addClass("in");
        $(".limpiarCampos").val("");
        $('#verResultadosBusquedaPaciente, #resultadosBusquedaPaciente, #resultadosBusquedaMultimedia').html("");
        $("#busquedaDueño, #busquedaMascotaNombre").show();
        $(".BusquedaClienteMascota, .btnLimpiar").hide();
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        $(".btn-volverEdit").show();
        $("#pacienteform").slideUp(400);
        $(".alertaExisteFullDatos").slideUp(400);
        $("#pacienteresumen").slideDown(1000);
        $("#datosprestacion").slideDown(1000);
        $("#formprestador").show(1000);
        $("#agregar-prestacion-insumo-paquete").hide(1000);
        $('#mascotasPorDueno').slideUp();
        $('#mascotaPorDuenoTable').html("");
        post_create_updateApi1();
   
}

function calcular_edad(dia_nacim, mes_nacim, anio_nacim)
{
    var fecha_hoy = new Date();
    var ahora_anio = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth();
    var ahora_dia = fecha_hoy.getDate();
    var edad = (ahora_anio + 1900) - anio_nacim;
    if (ahora_mes < (mes_nacim - 1))
    {
        edad--;
    }
    if (((mes_nacim - 1) == ahora_mes) && (ahora_dia < dia_nacim))
    {
        edad--;
    }
    if (edad > 1900)
    {
        edad -= 1900;
    }
    return edad;
}

function calcular_edad_FechaEmicion(dia_nacim, mes_nacim, anio_nacim, fechaEmicion)
{
    var fecha_hoy = fechaEmicion;
    var ahora_anio = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth();
    var ahora_dia = fecha_hoy.getDate();
    var edad = (ahora_anio + 1900) - anio_nacim;
    if (ahora_mes < (mes_nacim - 1))
    {
        edad--;
    }
    if (((mes_nacim - 1) == ahora_mes) && (ahora_dia < dia_nacim))
    {
        edad--;
    }
    if (edad > 1900)
    {
        edad -= 1900;
    }
    return edad;
}

function poblarResumenPacienteApi1()
{
    var rut = $("#rutdv2").val();
    var nombre = $("#rebsol_hermesbundle_PagoType_nombrePnatural").val();
    var apep = $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val();
    var apem = $("#rebsol_hermesbundle_PagoType_apellidoMaterno").val();
    $("#rutspan").html(rut);
    $("#nombrespan").html(nombre);
    $("#apepspan").html(apep);
    $("#apemspan").html(apem);
    $("#pacienteresumen").slideDown(1000);
}

function poblarResumenPaciente() {
    var rut = $("#rutdv2").val();
    var nombre = $("#rebsol_hermesbundle_PagoType_nombrePnatural").val();
    var apep = $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val();
    var apem = $("#rebsol_hermesbundle_PagoType_apellidoMaterno").val();
    var fechan = $("#rebsol_hermesbundle_PagoType_fechaNacimiento").val();
    var anio_nacim = fechan.substr(6, 4);
    var mes_nacim = fechan.substr(3, 2);
    var dia_nacim = fechan.substr(0, 2);
    $("#rutspan").html(rut);
    $("#nombrespan").html(nombre);
    $("#apepspan").html(apep);
    $("#apemspan").html(apem);
    $("#fechanspan").html(fechan);
    $("#edadspan").html(calcular_edad(dia_nacim, mes_nacim, anio_nacim));
    $("#pacienteresumen").slideDown(1000);
}

function fallecido(fechad) {
    $(".disablepago").attr("disabled", "disabled");
    $(".disablepago").attr("readonly", "readonly");
    $("#rebsol_hermesbundle_PagoType_fechaNacimiento").attr("readonly", "readonly");
    $("#rebsol_hermesbundle_PagoType_fechaNacimiento").attr("disabled", "disabled");
    $(".pacientefallecido").slideDown(1000);
    $(".infoesusuario, infoesusuariolista").hide();
    $(".btn-volver").hide();
    $(".btn-salvar").hide();
    var año = fechad.substr(0, 4);
    var mes = fechad.substr(5, 2);
    var dia = fechad.substr(8, 2);
    var fechadefuncion = dia + "-" + mes + "-" + año;
    $("#fechad").html(fechadefuncion);
    $(".btn-volver2, .volver-desde-prestador").show();
}

function RespuestasDiv(){
    $(".MediosPagoTabs ").on('click', function() {
        var Valor_Pagar = localStorage.getItem('totalmonto');
          $('.Input_checkbox_Bool').each(function() {
                                    $(this).val(0);
                                });
        $('#Tabla_MediosPago_Tab').load(location.href + " #Tabla_MediosPago_Tab");
        $('#Tabla_OtrosMedios_Tab').load(location.href + " #Tabla_OtrosMedios_Tab");
        Caja_Valor_Pagar(Valor_Pagar);
    });
     $(".btn-volver, .btn-volver2, .btn-volverExiste, .cancelar-desde-prestador").on('click', function() {
        $("#rutdv").removeAttr("disabled");
        $("#rutdv").removeAttr("readonly");
        $("#ApellidoP").removeAttr("readonly");
        $("#ApellidoP").removeAttr("disabled");
        $("#ApellidoM").removeAttr("disabled");
        $("#ApellidoM").removeAttr("readonly");
        $(".pacientefallecido").slideUp(1000);
        $("#listapacienteform").slideUp(1000);
        $("#pacienteresumen").slideUp(1000);
        $("#prestadorresumen").slideUp(1000);
        $("#datosprestacion").slideUp(1000);
        $(".btn-volver2").hide();
        $(".btn-volver").hide();
        $(".btn-pre-pagar").hide();
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        $(".btn-volverEdit").hide();
        $(".alertaExisteFullDatos").slideUp(500);
        $("#mediodepago").hide();
        limpiaradv();
        limpiar();
        $(".LimpiarConvenioSelect").hide();
        $("#listapacienteform").slideUp(500);
        $("#listapacienteform").load(location.href + " #listapacienteform");
        $('#busquedaPacientesForm').slideDown(1000);
        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
        esTratamiento = 0;
        nuevoTratamiento = 0;
    });

    $(".btn-edit-prestacion, #btneditDatosPrestacion").on('click', function() {
         if(esDiferencia == 1){
            anularDiferencia();return;
        }
        $("#mediodepago").hide();
        $("#pacienteform").slideUp(1000);
        $(".pacientefallecido").slideUp(1000);
        $("#listapacienteform").slideUp(1000);
        $("#agregar-prestacion-insumo-paquete").slideUp(1000);
        $("#pacienteresumen").slideDown(1000);
        $("#prestadorresumen").slideUp(1000);
        $("#formprestador").slideDown(1000);
        $('#total').empty();
        $("#prestacionesTable").load(location.href + " #prestacionesTable");
        $('#prestaciones').hide();
        $('.btn-pre-pagar').hide();
        $('#inputPrestacionBuscar').val("");
        $('#saltosTeporales').show();
        $('#resultadoPrestacionBuscar').html('');
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        $(".opcionTratamiento").hide();
        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
        esTratamiento = 0;
        nuevoTratamiento = 0;
        if($("#prestadorresumen").is(":visible")){
            $('#btn-Carga-DatosTratamiento').addClass("hidden").hide(); 
            $(".opcionTratamiento").hide();
        }
       
    });

    $("#btneditListaPrestaciones, btn-edit-lista-prestaciones").on('click', function() {
         if(esDiferencia == 1){
            anularDiferencia();return;
        }
        $("#mediodepago").hide();
        $('.btn-edit-lista-prestaciones').hide();
        $('#btneditListaPrestaciones').hide();
        btnEditPrestacion();
        $('#btn-pre-pagar, #agregar-prestacion-insumo-paquete').show();
       
    });
              var prestador = 0;
          var idPrestadorContador = 0;
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

function btnEditPrestacion(){
     $('.ace-spinner, .removePrestacion').show();
        $('.cambioCantidad').each(function() {
            $(this).closest('td').find('.spanResumen').html($(this).val()).hide().closest('td').find('div').first().show();
        });
}