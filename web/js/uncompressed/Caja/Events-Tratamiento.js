var IdTratamientoPostCrear = null;
var nombreTratamientoEditar = null;
var countSecond= 0;
var puntosSuspensivos = "";
var upDateSecond = null;

function formularioTratamiento(){
    cargaresumenprestadorform();
        tratamiento = 1;
        $('.datosTratamiento').slideDown();
        $('#btn-pre-pagar, .btn-pre-pagar, .opcionTratamiento').hide();//deben habilitarse al guardar tratamiento
        $('#cancelar-desde-prestador, #saltosTeporales').hide();
        $("#agregar-prestacion-insumo-paquete, #formPrestaciones").slideDown();
        $("#btn-crearTratamiento, .btn-accept-carga-tratamiento").removeClass("hidden").show();
        $("#btn-editTratamiento, .btn-accept-carga-edit-tratamiento").addClass("hidden").hide();
        cargaresumenprestadorform();
        
        if(esTratamientoAgenda==1){
            $("#btn-cancelarTratamiento, .opcionTratamiento").hide();
        }else{
            $(".opcionTratamiento").hide();
            $("#btn-cancelarTratamiento").show();
        }
}

function formularioSinTratamiento(){
    $("#agregar-prestacion-insumo-paquete, #formPrestaciones").slideDown("slow");
    $("#saltosTeporales, .opcionTratamiento").hide();
    $('.btn-pre-pagar, #cancelar-desde-prestador').show();
    cargaresumenprestadorform();
}

function CancelarTratamiento(){
    $("#agregar-prestacion-insumo-paquete").slideUp("slow");
    $("#saltosTeporales, .datosTratamiento, #formPrestaciones, #btn-pre-pagar, #divInsumoBuscar, #divPrestacionBuscar, #prestaciones").hide();
    $('.opcionTratamiento, #cancelar-desde-prestador').show();
    $('#prestacionesTable, #table_insumos').empty();
    $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val("");
    if($('#btn-Carga-DatosTratamiento').is(':visible')){
        $('#btn-Carga-DatosTratamiento').hide();
    }
    esTratamiento           = 0;
    nuevoTratamiento        = 0;
    editTratamiento         = 0;
    TratamientoArray        = [];
    nombreTratamientoEditar = null;
}

function crearTratamiento(){
    
    if(validateDataFormTratamiento()){
        var ruta                    = Routing.generate("Caja_Tratamiento_Crear");
        var rutaidPersona           = Routing.generate("Caja_PeopleId");
        var Listaprestaciones       = [];
        var d                       = 0;
        var idPersona               = null;
        //construcción de array con prestaciones, cantidades y sus valores
        $('.cambioCantidad').each(function() {
            var a                   = $(this).parents().eq(6).attr('name');
            var aa                  = $(this).parents().eq(5).attr('id').replace("td", "");
            var b                   = $(this).val();
            var c                   = $("#precio" + aa).text();
            var x                   = $("#tipoDoc" + aa).text();
            var prestaciones        = [a, b, c, x];
            Listaprestaciones[d]    = prestaciones;        
            var prestaciones        = [];
            d++;
         });
        //operadores para el comprotamiento de barra de progreso 
        //consulta IdNatural de Paciente
        var user = {
           rut: $("#rebsol_hermesbundle_PagoType_rutPersona").val()
        };
        $.ajax({
            type:       'get',
            url:        rutaidPersona,
            async:      false,
            data: user,
            success: function(data) {
                idPersona = $.parseJSON(data);
            }
        });
        //Genera Insert de todas Prestaciones como tratamiento
        AJAXInsert(ruta, idPersona, Listaprestaciones);
    }else{
        $('.GenerandoTratamientoDialog').remove();
        $(".btn-fail-create-tratamiento").show();
        $(".btn-fail-create-tratamiento").removeClass("hidden");
        nuevoTratamiento = 0;
        
        var code    = $("<div class='alert alert-block alert-error GenerandoTratamientoDialog'>" +
                        " <strong class='red'>Debe Ingresar Datos Requeridos,</strong><br>" +
                        "</div>");

        $('.alertTratamientoDialog').append(code);
    }
    
}

function AJAXInsert(ruta, idPersona, prestaciones){
    $(".btn-tratamiento-aceptar-error-edit").hide();
    $(".btn-tratamiento-aceptar-error-edit").addClass("hidden");
    var nombreTratamiento =   $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val();
    var tipoTratamiento =       $("#rebsol_hermesbundle_PrestacionType_tipoTratamiento").val();

    var data = { prestaciones:          prestaciones,
        totalTratamiento:      parseFloat($("#sumaTotalMediosDePago").text()),
        nombreTratamiento:     nombreTratamiento,
        tipoTratamiento:       tipoTratamiento,
        idPersona:             idPersona
    };
    $.ajax({
        type:       'GET',
        url:        ruta,
        async:      false,
        data:       data,
        timeout:    20000,
        success:    function(datar) {
            datar   = $.parseJSON(datar);
            if(cajaAgenda == 0){
                tratamientoCreadoDesdeAgenda = 1
            }
                if(datar.validate){
                    IdTratamientoPostCrear = datar.id;
                    creaListaHistorica();
                    AJAXResponse(1, null);
                } 
        },
        error:      function(datar) {
            nuevoTratamiento = 0;
            AJAXResponse(0, null);
        }
    }); 
}

function AJAXResponse(v, n){
    
    $('.GenerandoTratamientoDialog').remove();
    $(".btn-accept-create-tratamiento").show();
    $(".btn-accept-create-tratamiento").removeClass("hidden");
    if(v == 1){
        var code = HTMLSuccess();
        if(tratamientoCreadoDesdeAgenda == 1){
            $(".btn-accept-create-tratamiento-block ").hide();
        }
    }
    if(v == 0){
        var code = HTMLError();
    }
    if(v == 2){
        var code = HTMLErrorFalta(n);
    }      
    $('.alertTratamientoDialog').append(code);
    
    return;
}

//RESPUESTAS PARA MODAL
function HTMLError(){
    var html = "" +
        " <div class='alert alert-block alert-error'>" +
        " <p>" +
        " <strong><i class='icon-remove'></i> Tratamiento Presento Error en Creación </strong>" +
        " </p><p>" +
        " Porfavor Reintente." +
        " </p>" +
        " </div>";
        return html;
            }

function HTMLErrorFalta(n){
    $(".btn-accept-create-tratamiento").hide();
    $(".btn-accept-create-tratamiento").addClass("hidden");
    $(".btn-tratamiento-aceptar-error-edit").show();
    $(".btn-tratamiento-aceptar-error-edit").removeClass("hidden");

    var html = "" +
        " <div class='alert alert-block alert-error'>" +
        " <p>" +
        " <strong><i class='icon-remove'></i> Tratamiento Presento Error en Creación </strong>" +
        " </p><p>" +
        " Porfavor Reintente." +
        " </p><p>" +
        " Falta la siguiente información: " + n +
        " </p>" +
        " </div>";
        return html;
            }              
function HTMLSuccess(){
    if(nuevoTratamiento = 1){
        var forma = 'creado';
    }
    if(editTratamiento = 1){
        var forma = 'editado';
    }
     nuevoTratamiento = 1;
     // var forma = (nuevoTratamiento == 1)?'creado':'editado';
     var html = "" +
        " <div class='alert alert-block alert-success'>" +
        " <p>" +
        " <strong><i class='icon-ok'></i> Tratamiento "+forma+" exitosamente!</strong>" +
        " </p><p>" +
        " Ahora puede hacer uso de éste tratamiento." +
        " </p>" +
        " </div>";
    return html;
            }          
function HTMLLoadFail(){
     var html = "" +
        " <div class='alert alert-block alert-warning'>" +
        " <p>" +
        " <strong><i class='icon-ok'></i> No se selecciono ningun dato para la carga del Tratamiento, Por favor, Seleccione un tratamiento y/o pago a realizar, desde la Glosa del Tratamiento.</strong>" +
        " </p>" +
        " </div>";
    return html;
            }
function HTMLLoadFailFinanciador(){
    var html = "" +
        " <div class='alert alert-block alert-warning'>" +
        " <p>" +
        " <strong><i class='icon-ok'></i> No se ha seleccionado todos los datos de Prestación, Por favor, complete el formulario.</strong>" +
        " </p>" +
        " </div>";
    return html;
            }            
function HTMLLoadOk(){
     var html = "" +
        " <div class='alert alert-block alert-success'>" +
        " <p>" +
        " <strong><i class='icon-ok'></i> Tratamiento Cargado exitosamente!</strong>" +
        " </p>" +
        " </div>";
    return html;
            }             

//VALIDACIONES PARA DATOS
function validateDataFormTratamiento(){
//construcción de array con prestaciones, cantidades y sus valores
    var Listaprestaciones       = [];
    var d                       = 0;
    $('.cambioCantidad').each(function() {
        var a                   = $(this).parents().eq(6).attr('name');
        var aa                  = $(this).parents().eq(5).attr('id').replace("td", "");
        var b                   = $(this).val();
        var c                   = $("#precio" + aa).text();
        var x                   = $("#tipoDoc" + aa).text();
        var prestaciones        = [a, b, c, x];
        Listaprestaciones[d]    = prestaciones;        
        var prestaciones        = [];
        d++;
     }); 
     var cantidadTratamiento    = Listaprestaciones.length;
     var descripcion            = $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val();
     if(cantidadTratamiento>0 && descripcion.length>0 ){
         return true;
     }else{
         return false;
     }
}
function validateDataGlosaTratamiento(){
var ListaTratamientoSeleccion   = [];
    var DetalleArrPrestaciones      = [];
    var x = 0;

    $('.cantidadTratamiento').each(function() {
          
        var idDetalleTratamiento    = $(this).attr('id-dt');

        if(parseInt($('#'+idDetalleTratamiento).val())>0 || parseInt($('#check_'+idDetalleTratamiento).val())>0){
        
            DetalleArrPrestaciones      = [parseInt(idDetalleTratamiento), 
                                        $(this).attr('id-tipo'), 
                                        parseInt($(this).attr('id-acar')), 
                                        $('#check_'+idDetalleTratamiento).val(), 
                                        parseInt($('#'+idDetalleTratamiento).val())];

            ListaTratamientoSeleccion[x]                    = DetalleArrPrestaciones;

            var DetalleArrPrestaciones   = [];

            x++;
        }
    }); 
    var count = ListaTratamientoSeleccion.length;
    
    if(count>0){
         return true;
     }else{
         return false;
     }
}

function validateDataFinanciador(){
    var prevision = $("#rebsol_hermesbundle_PrestacionType_prevision").val();
    var plan = $("#rebsol_hermesbundle_PrestacionType_plan").val();
    var origen = $("#rebsol_hermesbundle_PrestacionType_origenSelect").val();
    
    if (prevision && plan ) {
        var derivadoSelect = $("#rebsol_hermesbundle_PrestacionType_derivadoSelect").val();
        var derivadoField = $("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val();
        // if ($("#rebsol_hermesbundle_PrestacionType_derivadoCheck").is(':checked')) {
        //     return true;
        // }else if (derivadoSelect !== null) {
        //     return true;
        // }else{
        //     return false;
        // }
        return true;
    }else{
        return false;
    }
}

function validaMontoRealMontoCero(cantidadRealizada, cantidadPagada, cantidadPago, usoTratamiento){
    //false: paga monto real, true: paga cero
    if(usoTratamiento == 1){
        if(cantidadPagada == cantidadRealizada && cantidadPago == 1){
            return false;
        }
        if(cantidadPagada > cantidadRealizada && cantidadPago == 1){
            return true;
        }
        if(cantidadPagada > cantidadRealizada && cantidadPago > 1){
            return false;
        }
    }else{
        return false;
    }
}

function CargarGlosaTratamientoNuevo(){ 
    esTratamiento = 1;
    nuevoTratamiento = 1;
    $("#tratamientosHistoricosDiv").removeClass("collapsed").children().children().show();
    CancelarTratamiento();
    GetGlosaTratamiento(IdTratamientoPostCrear);
}


function GetGlosaTratamiento(id){
    
    $("#agregar-prestacion-insumo-paquete").slideUp("slow");
    $("#saltosTeporales, .datosTratamiento, .btn-pre-pagar, #mediodepago, #divInsumoBuscar, #divPrestacionBuscar, #prestaciones").hide();
    $('.opcionTratamiento, #cancelar-desde-prestador').show();
    $('#prestacionesTable, #table_insumos').empty();
    $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val("");
    $('#inputPrestacionBuscar').val("");
    $('#resultadoPrestacionBuscar, #tituloTratamientoListadoServicio').html('');
    if(tratamientoCreadoDesdeAgenda == 0){
        $("#prestacionesTable").load(location.href + " #prestacionesTable");
    }

    esTratamiento = 0;
    nuevoTratamiento = 0;

     $('#tratamientoGlosa').show().append("<i class='icon-spinner icon-spin'></i>"
                                            +"<span id='infoCarga'> Cargando Glosa de Tratamiento...</span>"
                                            +"<div class='clearfix'></div></br>");
     var ruta = Routing.generate("Caja_Tratamiento_Glosa"); 
     
     $.get(ruta, {id: id}, function(respuesta)
            {
                $( "#tratamientoGlosa" ).ScrollTo(100);
                if (respuesta.length > 0)
                {
                    $('#tratamientoGlosa').html("");
                    $('#tratamientoGlosa').html(respuesta);
                }else{
                    $('#tratamientoGlosa').hide().html(""); 
                }
            }).promise().done(function() {
                if($(".detector-estado"+id).attr('data-estado') != 1){
                    tratamiento = 0;
                    if($('#prestadorresumen').is(':visible')==true || tratamientoCreadoDesdeAgenda == 0){
                        $(".opcionTratamiento").show();
                        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
                    }else if(tratamientoCreadoDesdeAgenda == 1){
                        $('#btn-Carga-DatosTratamiento').removeClass("hidden").show(); 
                        $('.btn-pre-pagar').hide();
                    }else{
                        $(".opcionTratamiento").hide();
                        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
                    }
                }else{
                    if(nuevoTratamiento == 0 ){
                        if($('#prestadorresumen').is (':visible')==true){
                            $(".opcionTratamiento").hide();
                            $('#btn-Carga-DatosTratamiento').removeClass("hidden").show();
                        }else{
                            if(esTratamiento == 1 ){
                                $(".opcionTratamiento").hide();
                                $('#btn-Carga-DatosTratamiento').removeClass("hidden").show();
                                if(cajaAgenda == 0){
                                    $('#btn-Carga-DatosTratamiento').removeClass("hidden").show();
                                    $('#btn-tratamiento').addClass("hidden").hide();
                                    $(".opcionTratamiento").hide();
                                   
                                }
                            }else{
                                $(".opcionTratamiento").hide();
                                $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
                           }
                        }
                    }
                }
    if(cajaAgenda == 0){

        $(".encabezadoDeGlosa").css({ padding: "10px 0 0 0" });


    }
    });
            
   
}

function GlosaCambioCantidadPagoTratamiento(cantidad, maximoPorPagar, cantidadPagada, cantidadRealizada, idAccionClinica, esAccionClinica, idArticulo, esArticulo, idTratamiento){
           if($('#'+idTratamiento).val()==1 && cantidad == 0){
               $('#'+idTratamiento).val(1);
           }
        }

function GlosaActivarDesactivarRealizarTratamiento(idTratamiento, idField, max, cantidadPagada, cantidadRealizada, idAccionClinica, esAccionClinica, idArticulo, esArticulo){
    var valuefield = $('#'+idField).val();
    if(valuefield == 0){
        $('#'+idField).val(1);
        if(max > 0 && $('#'+idTratamiento).val() == 0){
            if(cantidadPagada > cantidadRealizada){
                $('#'+idTratamiento).val(0);
            }else{
                $('#'+idTratamiento).val(1);
            }
            GlosaCambioCantidadPagoTratamiento(
                $('#'+idTratamiento).val(), 
                max, 
                cantidadPagada, 
                cantidadRealizada, 
                idAccionClinica, 
                esAccionClinica, 
                idArticulo, 
                esArticulo,
                idTratamiento);
        }
        //caso cuando ya haya completado los pagos anticipados y aun tenga atenciones
        if(max == 0){
           $('#'+idTratamiento).val(1); 
        }
        //esconder boton de carga de tratamiento
        $(".opcionTratamiento").show();
        $('#btn-Carga-DatosTratamiento').removeClass("hidden").show();
        $('#btn-tratamiento').addClass("hidden").hide();

    }
    if(valuefield == 1){
        //mostrar boton de carga de tratamiento
         $(".opcionTratamiento").show();
        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
        $('#btn-tratamiento').removeClass("hidden").show();

        
        $('#'+idField).val(0);
        if($('#'+idTratamiento).val() == 1){
            $('#'+idTratamiento).val(0); 
            GlosaCambioCantidadPagoTratamiento(
                $('#'+idTratamiento).val(), 
                max, 
                cantidadPagada, 
                cantidadRealizada, 
                idAccionClinica, 
                esAccionClinica, 
                idArticulo, 
                esArticulo,
                idTratamiento);
        }
    }
}

function CargarDatosDesdeGlosaTratamientoPrePago(){
    if(validateDataGlosaTratamiento() == true){
    
    if(validateDataFinanciador() == true){

        $("#agregar-prestacion-insumo-paquete, #formPrestaciones").slideDown("slow");
        $("#saltosTeporales, .opcionTratamiento").hide();
        $('#btn-Carga-DatosTratamiento').addClass("hidden").hide();
        $('#btn-tratamiento').addClass("hidden").hide();
        cargaresumenprestadorform();

        var ListaTratamientoSeleccion   = [];
        var DetalleArrPrestaciones      = [];
        var x = 0;
        

        $('.cantidadTratamiento').each(function() {

            var idDetalleTratamiento    = $(this).attr('id-dt');

            if((parseInt($('#'+idDetalleTratamiento).val())==0 && parseInt($('#check_'+idDetalleTratamiento).val())>0) || (parseInt($('#'+idDetalleTratamiento).val())>0)){

                DetalleArrPrestaciones      = [parseInt(idDetalleTratamiento), 
                                            $(this).attr('id-tipo'), 
                                            parseInt($(this).attr('id-acar')), 
                                            $('#check_'+idDetalleTratamiento).val(), 
                                            parseInt($('#'+idDetalleTratamiento).val()),
                                            $(this).attr('id-max'), 
                                            $(this).attr('id-total'), 
                                            $(this).attr('id-realizada'), 
                                            $(this).attr('id-pagada'),
                                            $(this).attr('id-nombre'),];
                                        
                ListaTratamientoSeleccion[x] = DetalleArrPrestaciones;

                var DetalleArrPrestaciones   = [];

                x++;
            }
        }); 

        for (var i = 0; i <ListaTratamientoSeleccion.length; i++) {

            var idDetalleTratamiento        = ListaTratamientoSeleccion[i][0];
            var tipo                        = ListaTratamientoSeleccion[i][1];
            var idPrestacionArticulo        = ListaTratamientoSeleccion[i][2];
            var usoTratamiento              = ListaTratamientoSeleccion[i][3];
            var cantidadPago                = ListaTratamientoSeleccion[i][4];
            var maximoPorPagar              = ListaTratamientoSeleccion[i][5]; 
            var cantidadTotal               = ListaTratamientoSeleccion[i][6];
            var cantidadRealizada           = ListaTratamientoSeleccion[i][7];
            var cantidadPagada              = ListaTratamientoSeleccion[i][8];
            var nombreTratamiento           = ListaTratamientoSeleccion[i][9];

            var validacion                  = validaMontoRealMontoCero( cantidadRealizada, 
                                                                        cantidadPagada, 
                                                                        cantidadPago, 
                                                                        usoTratamiento);
                                                                        
            if(tipo == 'AC'){
                agregarPrestacion(idPrestacionArticulo);
                $("#prestacion_"+idPrestacionArticulo).children('td').children('div').children().children().children().children().children('input').val(cantidadPago);
                var valor = cantidadPago;
                //si validacion es TRUE, el monto de esta prestación será 0.
                if(validacion == true){
                    $("#precio"+ idPrestacionArticulo).html("").html("0");
                    $("#sumaCantidad"+ idPrestacionArticulo).html("").html("0");
                }
                var precio = $("#precio" + idPrestacionArticulo).html();
                var spanTotalFila = "sumaCantidad" + idPrestacionArticulo;
                SumarFila(valor, precio, spanTotalFila);
                $("#div"+idPrestacionArticulo).hide();
                $("#spanResumen"+idPrestacionArticulo).append(cantidadPago);
                SumarColumna();
            }

            if(tipo == 'AR'){
                agregarInsumo(idPrestacionArticulo);
                $("#insumo_"+idPrestacionArticulo).children('td').children('div').children().children().children().children().children('input').val(cantidadPago);
                var valor = cantidadPago;
                //si validacion es TRUE, el monto de esta prestación será 0.
                if(validacion == true){
                    $("#precio"+ idPrestacionArticulo).html("").html("0");
                    $("#sumaCantidad"+ idPrestacionArticulo).html("").html("0");
                }
                var precio = $("#precio" + idPrestacionArticulo).html();
                var spanTotalFila = "sumaCantidad" + idPrestacionArticulo;
                SumarFila(valor, precio, spanTotalFila);
                $("#div"+idPrestacionArticulo).hide();
                $("#spanResumen"+idPrestacionArticulo).append(cantidadPago);
                SumarColumna();
            }
            DetalleArrPrestaciones  = [ IdTratamientoPostCrear,
                                        cantidadPago,
                                        idDetalleTratamiento,
                                        tipo,
                                        idPrestacionArticulo,
                                        (validacion)?0:1 ];

            TratamientoArray[i]     = DetalleArrPrestaciones;

         }  
         
        IdTratamientoPostCrear  = null;
        $('.GenerandoTratamientoDialog').remove();
        $(".btn-accept-carga-tratamiento").show();
        $(".btn-accept-carga-tratamiento").removeClass("hidden"); 
        $('#tratamientoGlosa').hide().html("");
        $(".cambioCantidad").attr('readonly', true);
        $(".textoEditTratamiento").hide();
        $(".spanResumen, .btn-pre-pagar, .textoNuevoTratamiento").show();
        $('.icon-list-historicoTratamiento').removeClass("icon-chevron-up").addClass("icon-chevron-down");
        $("#tratamientosHistoricosDiv").addClass("collapsed")
        $("#inputInsumoBuscar, #inputPrestacionBuscar").val("");
        $(".removePrestacion").addClass('btn-light').removeClass("btn-danger").removeAttr("onclick");
        $("#tituloTratamientoListadoServicio").html("de Tratamiento: '"+nombreTratamiento+"'");
        $('.alertTratamientoDialog').append(HTMLLoadOk());
        if(cajaAgenda == 0){
            $('#btn-tratamiento').addClass("hidden").hide();
        
    }
       
        
    }else{
        $('.GenerandoTratamientoDialog').remove();
        $(".btn-accept-carga-tratamiento").show();
        $(".btn-accept-carga-tratamiento").removeClass("hidden"); 
        $('.alertTratamientoDialog').append(HTMLLoadFailFinanciador());    
    }    

    }else{
        $('.GenerandoTratamientoDialog').remove();
        $(".btn-accept-carga-tratamiento").show();
        $(".btn-accept-carga-tratamiento").removeClass("hidden");

        $('.alertTratamientoDialog').append(HTMLLoadFail());    
    }
    return;    
    
         
}

/////EDITAR
function upDateSecondFun(){
    countSecond++;
    puntosSuspensivos = puntosSuspensivos + '.';
    console.log(puntosSuspensivos);
    $(".puntosSuspensivosEspera").html(puntosSuspensivos);
}
function GetGlosaTratamientoEdit(id){

    $("#agregar-prestacion-insumo-paquete").slideUp("slow");
    $("#saltosTeporales, .datosTratamiento, .btn-pre-pagar, #mediodepago, #divInsumoBuscar, #divPrestacionBuscar, #prestaciones").hide();
    $('#prestacionesTable, #table_insumos').empty();
    $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val("");
    $('#inputPrestacionBuscar').val("");
    $('#resultadoPrestacionBuscar, #tituloTratamientoListadoServicio').html('');
    $("#prestacionesTable").load(location.href + " #prestacionesTable");
    $('.icon-list-historicoTratamiento').removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $("#tratamientosHistoricosDiv").addClass("collapsed");
    var upDateSecond = setInterval(upDateSecondFun,1000);
    var divCargando = "<div id='cargando'><center><h4 class='blue'><i class='icon-spinner icon-spin icon-large icon-2x blue'></i><div class='clearfix'></div><br><strong> Cargando<span class=puntosSuspensivosEspera></span></strong></h4></center></div>";
    $('.mensajeEditTratamiento').show().append(divCargando);

    $('#tratamientoGlosa').html('');
    
    esTratamiento    = 0;
    nuevoTratamiento = 0;
    editTratamiento  = 0;
    var ruta = Routing.generate("Caja_Tratamiento_Get_Edit");
     
    $.get(ruta, {id: id}, function(respuesta)
            {
                clearInterval(upDateSecond);
                puntosSuspensivos = "";
                var data = $.parseJSON(respuesta);
                if (data.Tratamiento.length > 0){

                    editTratamiento         = 1;
                    var Listaprestaciones   = [];
                    var Listaarticulos      = [];
                    var d                   = 0;
                    var b                   = 0;
                    nombreTratamientoEditar = data.nombreTratamiento;
                    tipoTratamientoEditar = data.tipoTratamiento;
                    // TratamientoArray es el necesario
                    TratamientoArray        = data.Tratamiento;
                    idTratamiento           = id;

                    var divEditGarantia = $("<div class='alert alert-block alert-warning' style='text-align:center'>"+
                                                    "<i class='icon-ok'></i> "+
                                                    " Datos Cargados para modificación de Tratamiento: "+
                                            "<div class='clearfix'></div>"+
                                            "<strong >'"+nombreTratamientoEditar+"'."+
                                            "</strong>"+
                                            "<br>"+
                                         "</div>");
                    $('.mensajeEditTratamiento').show().html('').append(divEditGarantia);
                    $("#cancelar-desde-prestador, .opcionTratamiento").hide();
                    $(".opcionCargaTratamientoEdit").removeClass("hidden").show();
                    
                }else{
                    ('.mensajeEditTratamiento').hide().html('');
                    $('.icon-list-historicoTratamiento').addClass("icon-chevron-up").removeClass("icon-chevron-down");
                    $("#tratamientosHistoricosDiv").removeClass("collapsed");
                    editTratamiento  = 0;
                    var divE     = $("<div class='alertTratamientoDialog'></div>");
                    var code    = " <div class='alert alert-block alert-error'>" +
                                        " <p>" +
                                        " <strong><i class='icon-remove'></i>No es posible cargar datos del tratamientos seleccionado, por favor, intentar nuevamente </strong>" +
                                        " </p>"+
                                        " </div>";

                       bootbox.dialog(divE.append(code),[{
                               "label": "Aceptar",
                               "class": "btn btn-mini btn-info",
                               "callback": function() {
                               }
                           }]);
                }
            });
}

function cancelarEdicionTratamiento(){
    editTratamiento            = 0;
    TratamientoArray           = [];
    nombreTratamientoEditar    = null;
    creaListaHistorica();
    $('.mensajeEditTratamiento').hide().html('');
    $("#cancelar-desde-prestador, .opcionTratamiento").show();
    $(".opcionCargaTratamientoEdit").addClass("hidden").hide();

}

function cargarEdicionTratamiento(){

    if(validateDataFinanciador() == true){
        $("#agregar-prestacion-insumo-paquete, #formPrestaciones").slideDown(50);
        cargaresumenprestadorform();

        for (var i = 0; i <TratamientoArray.length; i++) {

            var cantidadPagada       = TratamientoArray[i]['cantidadPagada'];
            var cantidadRealizada    = TratamientoArray[i]['cantidadRealizada'];
            var cantidadTotal        = TratamientoArray[i]['cantidadTotal'];
            var esAccionClinica      = TratamientoArray[i]['esAccionClinica'];
            var esArticulo           = TratamientoArray[i]['esArticulo'];
            var idAccionClinica      = TratamientoArray[i]['idAccionClinica']; 
            var idArticulo           = TratamientoArray[i]['idArticulo'];
            var maximoPorPagar       = TratamientoArray[i]['maximoPorPagar'];
            var idDetalleTratamiento = TratamientoArray[i]['detalleTratamiento'];
                                                                        
            if(esAccionClinica == 1){
                agregarPrestacion(idAccionClinica);
                // setTimeout(function(){
                    var id = $("[name='"+idAccionClinica+"']").attr("id").replace("prestacion_", "");
                    var attrName = $("[name='"+idAccionClinica+"']").attr('name');
                    $("#div"+id).html("");
                    $("#div"+id).append(
                        "<div class='input-append btn-group btn-group-vertical'><input type='text' class='" + id + " input-mini spinner-input cambioCantidad cantidadLista" + id + "'' id='" + attrName + "'maxlength='2'></div>"
                    );
                    $("[name='"+idAccionClinica+"']").attr('idDT', idDetalleTratamiento);
                    $("#" + id).ace_spinner({
                        value: cantidadTotal,  
                        maxlength: 3,
                        min: (cantidadPagada==0)?1:cantidadPagada,
                        step: 1, 
                        icon_up: 'icon-plus', 
                        icon_down: 'icon-minus', 
                        btn_up_class: "btn-success sumarestaCantidad up" + id + "", 
                        btn_down_class: "btn-danger sumarestaCantidad down" + id + ""});

                    $("#" + id).removeAttr('style').css({"width": "20px"});
                    var spanTotalFila = "sumaCantidad" + id;
                    var precio = $("#precio" + id).html();
                    SumarFila(cantidadTotal, precio, spanTotalFila);
                    SumarColumna();
                    
                    if(parseInt(cantidadPagada) > 0){
                        $("a[data-id='"+idAccionClinica+"']").addClass('btn-light').removeClass("btn-danger").removeAttr("onclick");
                    }
                // },100);
                

                
            }

            if(esArticulo == 1){
                agregarInsumo(idArticulo);
                // setTimeout(function(){

                    var id = $("[name='"+idArticulo+"']").attr("id").replace("insumo_", "");
                    var attrName = $("[name='"+idArticulo+"']").attr('name');
                    $("#div"+id).html("");
                    $("#div"+id).append(
                        "<div><div class='input-append btn-group btn-group-vertical'><input type='text' class='" + id + " input-mini spinner-input cambioCantidad cantidadLista" + id + "'' id='" + attrName + "'maxlength='3' style='width: 20px;'></div></div>"
                    );
                    $("[name='"+idArticulo+"']").attr('idDT', idDetalleTratamiento);
                    $("#" + id).ace_spinner({
                        value: cantidadTotal,  
                        maxlength: 3,
                        min: (cantidadPagada==0)?1:cantidadPagada,
                        step: 1, 
                        icon_up: 'icon-plus', 
                        icon_down: 'icon-minus', 
                        btn_up_class: "btn-success sumarestaCantidad up" + id + "", 
                        btn_down_class: "btn-danger sumarestaCantidad down" + id + ""});
                    $("#" + id).removeAttr('style').css({"width": "20px"});
                    var spanTotalFila = "sumaCantidad" + id;
                    var precio = $("#precio" + id).html();
                    SumarFila(cantidadTotal, precio, spanTotalFila);
                    SumarColumna();
                    if(parseInt(cantidadPagada) > 0){
                        $("a[data-id='"+idArticulo+"']").addClass('btn-light').removeClass("btn-danger").removeAttr("onclick");
                    }
                // },100);
                
            }

         }  

        $("#cancelar-desde-prestador, .opcionTratamiento").hide();

        $('.GenerandoTratamientoDialog').remove();
        $(".datosTratamiento, .textoEditTratamiento").show();
        $('.mensajeEditTratamiento').slideUp("slow").html("");
        $('.textoNuevoTratamiento, #btn-crearTratamiento').hide();
        $("#inputInsumoBuscar, #inputPrestacionBuscar").val("");
        $("#inputInsumoBuscar").val("");
        $(".btn-pre-pagar").hide()
        $(".opcionCargaTratamientoEdit").addClass("hidden").hide();
        $("#tituloTratamientoListadoServicio").html("de Tratamiento: '"+nombreTratamientoEditar+"'");
        $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val(nombreTratamientoEditar);
        $("#rebsol_hermesbundle_PrestacionType_tipoTratamiento").val(tipoTratamientoEditar);
        $('.alertTratamientoDialog').append(HTMLLoadOk());
        $("#btn-editTratamiento, .btn-accept-carga-edit-tratamiento").removeClass("hidden").show();

    }else{
                            console.log("fail");
        $('.GenerandoTratamientoDialog').remove();
        $('.alertTratamientoDialog').append(HTMLLoadFailFinanciador());
        $(".btn-accept-carga-edit-tratamiento").removeClass("hidden").show();
    }    

    return;    
    
         
}

function editarTratamiento(){
    
    if(validateDataFormTratamiento()){
        var ruta                    = Routing.generate("Caja_Tratamiento_Editar");
        var Listaprestaciones       = [];
        var d                       = 0;
        $('.cambioCantidad').each(function() {
            var a                = $(this).parents().eq(5).attr('name');
            // var aa               = $(this).parents().eq(5).attr('id').replace("td", "");
            var b                = $(this).val();
            var c                = $("#precio" + a).text();
            var x                = $("#tipoDoc" + a).text();
            var iddt             = ($("[name='"+a+"']").attr('iddt') != undefined)?$("[name='"+a+"']").attr('iddt'):'NOIDDT';
            var prestaciones     = [a, b, c, x, iddt];
            Listaprestaciones[d] = prestaciones;        
            var prestaciones     = [];   
            d++;
         });
       
        AJAXUpdate(ruta, Listaprestaciones);
    }else{
        $('.GenerandoTratamientoDialog').remove();
        $(".btn-fail-create-tratamiento").show();
        $(".btn-fail-create-tratamiento").removeClass("hidden");
        nuevoTratamiento = 0;
        mensaje = "Prestaciones";
        AJAXResponse(2, mensaje);
    }
    
}

function AJAXUpdate(ruta, prestaciones){
    $(".btn-tratamiento-aceptar-error-edit").hide();
    $(".btn-tratamiento-aceptar-error-edit").addClass("hidden");
    var mensaje = null;
    var sumacoma = 0;
    var nombreTratamiento =   $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val();
    var tipoTratamiento =       $("#rebsol_hermesbundle_PrestacionType_tipoTratamiento").val();

    if(nombreTratamiento == null || nombreTratamiento == '' || tipoTratamiento == null || tipoTratamiento == '' ||prestaciones.length == 0 || prestaciones == null){
        console.log('error');
        if(nombreTratamiento == null || nombreTratamiento == ''){
            mensaje =+ "Nombre Tratamiento"
            sumacoma = sumacoma + 1;
        }
        if(tipoTratamiento == null || tipoTratamiento == ''){
            mensaje =+ (sumacoma>0)?", Tipo Tratamiento":"Tipo Tratamiento";
            sumacoma = sumacoma + 1;
        }
        if(prestaciones.length == 0 || prestaciones == null){
            mensaje =+ (sumacoma>0)?", Prestaciones":"Prestaciones";
            sumacoma = sumacoma + 1;
        }
      AJAXResponse(2, mensaje);
      return false;
    }
   var data = { prestaciones:          prestaciones,
                nombreTratamiento:     $("#rebsol_hermesbundle_PrestacionType_nombreTratamiento").val(),
                tipoTratamiento:     $("#rebsol_hermesbundle_PrestacionType_tipoTratamiento").val(),
                idTratamiento : idTratamiento
               };
    $.ajax({
        type:       'GET',
        url:        ruta,
        async:      false,
        data:       data,
        timeout:    20000,
        success:    function(datar) {
            if(cajaAgenda == 0){
                tratamientoCreadoDesdeAgenda = 1
            }
            datar = $.parseJSON(datar);
            if(datar.validate){
                
                esTratamiento           = 0;
                nuevoTratamiento        = 0;
                editTratamiento         = 0;
                TratamientoArray        = [];
                nombreTratamientoEditar = null;
                IdTratamientoPostCrear  = datar.id;
                creaListaHistorica();
                AJAXResponse(1, null);
            } 
        },
        error:      function(datar) {
            nuevoTratamiento = 0;
            idTratamiento = null;
            AJAXResponse(0, null);
        }
    }); 
}



// 