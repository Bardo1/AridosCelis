var tipoDiferenciaGlobal        = null;
var agrupcion                   = null;
var como                        = null;
if($(subTotal)){
    var MontoBase                   = removeComas($(subTotal).text());
}

var timefuncion                 = null;
$(".disableDiferenciaInput").bind("keypress", function(event) {
                if (event.charCode !== 0) {
                    var regex = new RegExp("^[0-9]+$");
                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                    if (!regex.test(key)) {
                        event.preventDefault();
                        return false;
                    }
                }
            });

////ETAPA 1 valida tipo y motivo de diferencia
//Valida campos desde diferencia si tienen cambios para permitir y habilitar siguientes campos que son la agrupacion y como aplicar la diferencia
function tipoDiferencia(){
    
    var tipoDiferencia = {
           tipoDiferencia: $("#rebsol_hermesbundle_DiferenciaType_tipoDiferencia").val()
        };
     var ruta = Routing.generate("Caja_Diferencia_GetMotivosDiferencia");
     
        $.ajax({
            type:       'get',
            url:        ruta,
            //async:      false,
            data:       tipoDiferencia,
            success: function(data) {
                data = $.parseJSON(data);
                ///////////////CARGA AMBOS CAMPOS DE ORIGEN///////
                $('#rebsol_hermesbundle_DiferenciaType_motivoDiferencia').html("");
                var options = '<option value="" disabled="disabled" selected="selected">Seleccionar Motivo</option>';
                for (var i = 0; i < data.length; i++) {
                    options += "<option value=" + data[i].id + ">" + data[i].nombre + '</option>';
                }
                ;
                $('#rebsol_hermesbundle_DiferenciaType_motivoDiferencia').html(options);
                $("#rebsol_hermesbundle_DiferenciaType_motivoDiferencia").chosen({width: "215px",
                    allow_single_deselect: true, no_results_text: "No se ha encontrado Motivo"
                });
                $('#rebsol_hermesbundle_DiferenciaType_motivoDiferencia').prop('disabled', false).trigger("liszt:updated");
                hideFormFields();
            }
        });

        var tipoDiferencia = {
                 tipoDiferencia: $("#rebsol_hermesbundle_DiferenciaType_tipoDiferencia").val()
            };
            var ruta = Routing.generate("Caja_Diferencia_GetTipoSentido");

            $.ajax({
                type:       'get',
                url:        ruta,
                async:      false,
                data:       tipoDiferencia,
                success: function(data) {
                    tipoDiferenciaGlobal = data;
                }
            });
            $("#id-icon-diferencia").removeClass('icon-sort');
            
            
                if(tipoDiferenciaGlobal == 2){
                    $("#id-icon-diferencia").removeClass('icon-sort icon-level-up');
                    $("#id-icon-diferencia").addClass('icon-level-down  icon-large');
                }
                if(tipoDiferenciaGlobal == 1){
                    $("#id-icon-diferencia").removeClass('icon-sort icon-level-down');
                    $("#id-icon-diferencia").addClass('icon-level-up  icon-large');
                }
}

function motivoDiferencia(){
    if($('#rebsol_hermesbundle_DiferenciaType_motivoDiferencia').val().length >= 1){
        $(".agrupacion-radio").attr('disabled',false);
    }else{
        hideFormFields();
    }
}

function hideFormFields(){
    $('.como-radio, .agrupacion-radio').prop('checked', false);
    $(".como-radio, .agrupacion-radio").attr('disabled',true);
    $(".inputDiferencia, #inputDiferenciaGrupal, .inputMonto, .inputPorcentaje, .inputPorcentajeIn, .inputPorcentajeGr, .aplicarDiferenciaTotal").hide();
    $(".disableDiferenciaInput").val(null);
    $("#diferenciaTotalGenerada, #TotalConDiferenciaGenerada").html("");
    //$('.DiferenciaInputPorcentaje').val(null).trigger('change');
}

//ETAPA 2 valida la agrupacion del las prestaciones y como aplicar la diferencia
function agrupacion(a){
    
    $(".como-radio").attr('disabled',false);
    $('.como-radio').prop('checked', false);
    $(".inputDiferencia, #inputDiferenciaGrupal, .inputMonto, .inputPorcentaje, .inputPorcentajeIn, .inputPorcentajeGr, .aplicarDiferenciaTotal").hide();
    $(".disableDiferenciaInput").val(null);
    $("#diferenciaTotalGenerada, #TotalConDiferenciaGenerada").html("");
    if(a == 1){
        agrupcion = true;
    }
    if(a == 0){
        agrupcion = false;
    }
}

function aplicarComo(a){
    $(".disableDiferenciaInput").val(0);
    $(".aplicarDiferenciaTotal").hide();
    $("#diferenciaTotalGenerada, #TotalConDiferenciaGenerada").html("");
    $(".aplicarDiferenciaTotal").show();
    $("#diferenciaTotalGenerada").html(0);
    $("#TotalConDiferenciaGenerada").html(MontoBase);
    como = a;
    
    switch(agrupcion + "|" + como) {
    case "true|1":
         resolverVistaGrupalPorcentaje();
        break;
    case "true|0":
        resolverVistaGrupalMonto();
        break;
    case "false|1":
        resolverVistaIndividualPorcentaje();
        break;
    case "false|0":
        resolverVistaIndividualMonto();
        break;
    }

}

function resolverVistaIndividualPorcentaje(){
    $(".inputPorcentajeIn").show(); 
    $("#inputDiferenciaGrupal, .inputMontoIn, .inputPorcentajeGr, .inputMontoGr").hide();
    $(".DiferenciaInputPorcentajeIn").val(0);
    $(".DiferenciaInputPorcentajeIn, .DiferenciaInputMontoIn, .DiferenciaInputPorcentajeGr, .DiferenciaInputMontoGr").val(null);
            $('.DiferenciaInputPorcentajeIn').val(0).trigger('change');
            if(tipoDiferenciaGlobal == 2){
                 $(".DiferenciaInputPorcentajeIn").trigger(
                    'configure',
                    {
                         'min':0
                        ,'max':100
                        ,"fgColor":"#FF0000"
                        });
                    }

             if(tipoDiferenciaGlobal == 1){
                $(".DiferenciaInputPorcentajeIn").trigger(
                    'configure',
                    {
                         'min':0
                        ,'max':1000
                        ,"fgColor":"#66CC66"
                        });
                    }
                    $(".DiferenciaInputPorcentajeIn").css('font-size','125%');
}

function resolverVistaIndividualMonto(){
    $(".inputMontoIn").show(); 
    $("#inputDiferenciaGrupal, .inputPorcentajeIn, .inputPorcentajeGr, .inputMontoGr").hide();
    $(".DiferenciaInputPorcentajeIn, .DiferenciaInputMontoIn, .DiferenciaInputPorcentajeGr, .DiferenciaInputMontoGr").val(null);
    $('.DiferenciaInputMontoIn').val(0);
            if(tipoDiferenciaGlobal == 2){ 
                $(".DiferenciaInputMontoIn").addClass('red');
            }
            if(tipoDiferenciaGlobal == 1){ 
                $(".DiferenciaInputMontoIn").addClass('green');
            }
            $(".DiferenciaInputMontoIn").css('font-weight','bold');
}

function resolverVistaGrupalPorcentaje(){
    $("#inputDiferenciaGrupal, .inputPorcentajeGr").show(); 
    $(".inputPorcentajeIn, .inputMontoIn, .inputMontoGr").hide();
    $(".DiferenciaInputPorcentajeGr").val(0);
    $(".DiferenciaInputPorcentajeIn, .DiferenciaInputMontoIn, .DiferenciaInputMontoGr").val(null);
    
            $('.DiferenciaInputPorcentajeGr').val(0).trigger('change');
            if(tipoDiferenciaGlobal == 2){
                 $(".DiferenciaInputPorcentajeGr").trigger(
                    'configure',
                    {
                         'min':0
                        ,'max':100
                        ,"fgColor":"#FF0000"
                        });
                    }

             if(tipoDiferenciaGlobal == 1){
                $(".DiferenciaInputPorcentajeGr").trigger(
                    'configure',
                    {
                         'min':0
                        ,'max':1000
                        ,"fgColor":"#66CC66"
                        });
                    }
}

function resolverVistaGrupalMonto(){
    $("#inputDiferenciaGrupal, .inputMontoGr").show(); 
    $(".inputPorcentajeIn, .inputMontoIn, .inputPorcentajeGr").hide();
    $(".DiferenciaInputPorcentajeIn, .DiferenciaInputMontoIn, .DiferenciaInputPorcentajeGr").val(null);
    
            if(tipoDiferenciaGlobal == 2){ 
                $(".DiferenciaInputMontoGr").addClass('red');
            }
            if(tipoDiferenciaGlobal == 1){ 
                $(".DiferenciaInputMontoGr").addClass('green');
            }
            $(".DiferenciaInputMontoGr").css('font-weight','bold');
}

////ETAPA 3 Calculo de Montos y Eventos de Como Obtenerlos

$(".disableDiferenciaInput").bind("keyup change blur",function() {
    if($(this).val() == null || $(this).val() == ""){
        $(this).val(0);
    }else{
        if($(this).val().substring(0, 1) == 0 && $(this).val().length > 1){
           var total = $(this).val().substring(1, $(this).val().length-0);
           $(this).val(total);
        }
    }
    GenerarDiferencia($(this).val());
});

$(".DiferenciaInputPorcentajeIn, .DiferenciaInputPorcentajeGr").bind("mouseleave mouseover",function() {

    if($(this).val() == null || $(this).val() == ""){
        $(this).val(0);
    }else{
        if($(this).val().substring(0, 1) == 0 && $(this).val().length > 1){
           var total = $(this).val().substring(1, $(this).val().length-0);
           $(this).val(total);
        }
    }
    GenerarDiferencia($(this).val());
    var valuePorcent = $(this);
    $(window).bind('mousewheel', function(event) {
        GenerarDiferencia(valuePorcent.val());
    });
});

function GenerarDiferencia(a){
   
    switch(agrupcion + "|" + como) {
    case "true|1":
         GenerarDiferenciaGrupalPorcentaje(a);
        break;
    case "true|0":
        GenerarDiferenciaGrupalMonto(a);
        break;
    case "false|1":
        GenerarDiferenciaIndividualPorcentaje(a);
        break;
    case "false|0":
        GenerarDiferenciaIndividualMonto(a);
        break;
    }
}

function GenerarDiferenciaGrupalPorcentaje(a){



    var z = verificaFavorContraSignoMenos(a); 
    // z = removeComas(z);
    var x = (MontoBase*z)/100;
    // var y = x.toFixed(2);
    var y = x;
    $("#diferenciaTotalGenerada").html(addCommas(y));

    switch(tipoDiferenciaGlobal) {
    case "1":
         var total = MontoBase + parseInt(x);
        break;
    case "2":
        var total = MontoBase - parseInt(x);
        break;
    }

    // $("#TotalConDiferenciaGenerada").html(total.toFixed(2));
    $("#TotalConDiferenciaGenerada").html(addCommas(total));
}

function GenerarDiferenciaIndividualPorcentaje(a){
   
    var totalPorcentajeIn           = 0;
    var totalPorcentajeInNoFormat   = 0;
    $('.DiferenciaInputPorcentajeIn').each(function() {
        var z                       = verificaFavorContraSignoMenos($(this).val());
        var montoIndividual         = removeComas($(this).parents().eq(6).find('.monto').text());
        var x                       = (montoIndividual*z)/100;
        // var y                       = x.toFixed(2);
        var y                       = x;
        totalPorcentajeIn           = parseInt(totalPorcentajeIn) + parseInt(x);
        totalPorcentajeInNoFormat   = totalPorcentajeInNoFormat + x;
    });



    // $("#diferenciaTotalGenerada").html(totalPorcentajeIn.toFixed(2));
    $("#diferenciaTotalGenerada").html(addCommas(totalPorcentajeIn));

    switch(tipoDiferenciaGlobal) {
    case "1":
         var total  = MontoBase + parseInt(totalPorcentajeInNoFormat);
        break;
    case "2":
        var total   = MontoBase - parseInt(totalPorcentajeInNoFormat);
        break;
    }

    // $("#TotalConDiferenciaGenerada").html(total.toFixed(2));
    $("#TotalConDiferenciaGenerada").html(addCommas(total));
}

function GenerarDiferenciaGrupalMonto(a){
    
    var y = verificaFavorContraSignoMenos(a);
    // $("#diferenciaTotalGenerada").html(y.toFixed(2));
    $("#diferenciaTotalGenerada").html(addCommas(y));

    switch(tipoDiferenciaGlobal) {
    case "1":
         var total = MontoBase + y;
        break;
    case "2":
        var total = MontoBase - y;
        break;
    }

    // $("#TotalConDiferenciaGenerada").html(total.toFixed(2));
    $("#TotalConDiferenciaGenerada").html(addCommas(total));
}

function GenerarDiferenciaIndividualMonto(a){

    var totalMontoIn           = 0;
    $('.DiferenciaInputMontoIn').each(function() {
        var z                       = verificaFavorContraSignoMenos($(this).val());
        var montoIndividual         = removeComas($(this).parents().eq(2).find('.monto').text());
        if(z > montoIndividual){
            $(this).val(0);
            return false;
        }
        totalMontoIn                = totalMontoIn + parseInt(z);
    });

    // $("#diferenciaTotalGenerada").html(totalMontoIn.toFixed(2));
    $("#diferenciaTotalGenerada").html(addCommas(totalMontoIn));

    switch(tipoDiferenciaGlobal) {
    case "1":
         var total  = MontoBase + parseInt(totalMontoIn);
        break;
    case "2":
        var total   = MontoBase - parseInt(totalMontoIn);
        break;
    }
    // $("#TotalConDiferenciaGenerada").html(total.toFixed(2));
    $("#TotalConDiferenciaGenerada").html(addCommas(total));
}

function verificaFavorContraSignoMenos(a){
    if(tipoDiferenciaGlobal == 2){
        r = parseInt(a.replace(/-/g,""));
    }else{
        r = parseInt(a);
    }
    return r;
}

////ETAPA 4 Generar Diferencia desde Formulario
$("#btn-diferencia-solicitar").bind("click", function(event) {
    $("#btn-diferencia-solicitar-saldo").css('pointer-events','none');
    //valida si existen datos ingresados.
   var valueTotalDiferencia            = removeComas($('#diferenciaTotalGenerada').text());    
   var d                               = 0;

    if(valueTotalDiferencia == null || valueTotalDiferencia == "" || valueTotalDiferencia == 0){
        $('.errorfaltaDiferencia').slideDown();
         setTimeout(function() {
            $('.errorfaltaDiferencia').slideUp();
            return;
        },3000);
        return;
    } 

     $('#formDiferenciaFull').hide();
     $("#generandoDiferencia").fadeIn();
    var divCargando = "<div id='cargando'><br><br><br><center><h3 class='blue'><i class='icon-spinner icon-spin icon-large icon-4x blue'></i><div class='clearfix'></div><br><strong> Generando Diferencia </strong></h3></center></div>";
    $("#generandoDiferencia").html(divCargando);
    
    

    $('.todoDetallePrestacionesArticulos').each(function() {
        var tipo                        = parseInt($(this).attr('id-tipo'));
        var idItem                      = parseInt($(this).attr('id-item'));
        var totalIn                     = $(this).find('td.total_'+idItem).find('span.monto').text();
        var porcentajeIn                = $(this).find('td.total_'+idItem).find('input.DiferenciaInputPorcentajeIn').val();
        var montoIn                     = $(this).find('td.total_'+idItem).find('input.DiferenciaInputMontoIn').val();
        var prestaciones                = [tipo, idItem, totalIn, porcentajeIn, montoIn];
        ListaDetallesDiferencia[d]      = prestaciones;
        d++;
        var prestaciones                = [];
    });

    ListaInformacionDiferencia['como']                  = como;
    ListaInformacionDiferencia['agrupcion']             = agrupcion;
    ListaInformacionDiferencia['tipoDiferenciaGlobal']  = tipoDiferenciaGlobal;
    ListaInformacionDiferencia['subTotal']              = MontoBase;
    ListaInformacionDiferencia['DifTotal']              = valueTotalDiferencia;
    ListaInformacionDiferencia['FullTotal']             = removeComas($('#TotalConDiferenciaGenerada').text());
    ListaInformacionDiferencia['listadoPrestaciones']   = ListaDetallesDiferencia;

    var ruta = Routing.generate("Caja_Diferencia_SOlicitar");  
    var data = {
                detalleJson             : ListaDetallesDiferencia,
                como                    : como,
                agrupcion               : agrupcion,
                tipoDiferenciaGlobal    : tipoDiferenciaGlobal,
                motivoDiferencia        : $('#rebsol_hermesbundle_DiferenciaType_motivoDiferencia').val(),
                subTotal                : MontoBase,
                DifTotal                : valueTotalDiferencia,
                FullTotal               : removeComas($('#TotalConDiferenciaGenerada').text())
    };
        $.ajax({
            type:       'GET',
            url:        ruta,
            data:       data,
            success: function(datar) {
                    $("#generandoDiferencia").html("");
                    $("#generandoDiferencia").hide();
                    $('#formDiferenciaFull').fadeIn('fast');
                    datar = $.parseJSON(datar);
                    esDiferencia = 1;
                    ListaInformacionDiferencia['idDiferencia'] = datar.id;
                    if(datar.autorizacion == 'NR'){
                        if(esDiferenciaSaldo == 1){
                            PreparaDiferenciaNRenCajaSaldo();
                        }else if(esDiferencia == 1 ){
                            PreparaDiferenciaNRenCaja();    
                        }
                    }
                    if(datar.autorizacion == 'S'){
                        PreparaDiferenciaSCaja();
                    }   
           }         
        });
});

////ETAPA 4 Generar Diferencia desde Formulario
$("#btn-diferencia-solicitar-saldo").bind("click", function(event) {
    //valida si existen datos ingresados.
    $("#btn-diferencia-solicitar-saldo").css('pointer-events','none');
    var xTemp = 0;
    $('.diferenciaRequiered').each(function() {
        if($(this).val() == null || $(this).val() == ''){
            xTemp = xTemp  + 1;
            $('.errorfaltaDiferenciaSaldo').show();
            // $(this).parent().find('div').show();
        }
    });
    if(xTemp < 1){
         $('.errorfaltaDiferenciaSaldo').hide();
    }else{
        return;
    }


   var valueTotalDiferencia = parseInt($('#rebsol_hermesbundle_DiferenciaType_montoSaldo').val());    

   var subtotalsaldo        = $("#sumaTotalMediosDePago").text();
   subtotalsaldo = subtotalsaldo.replace(",", "");


   if(tipoDiferenciaSaldo == 1){
        var resultadoDiferencia = parseInt(subtotalsaldo + valueTotalDiferencia);
   }else if(tipoDiferenciaSaldo == 2){
        var resultadoDiferencia = parseInt(subtotalsaldo - valueTotalDiferencia);
   }

    $('#formDiferenciaFull').hide();
    $("#generandoDiferencia").fadeIn();
    var divCargando = "<div id='cargando'><br><br><br><center><h3 class='blue'><i class='icon-spinner icon-spin icon-large icon-4x blue'></i><div class='clearfix'></div><br><strong> Generando Diferencia </strong></h3></center></div>";
    $("#generandoDiferencia").html(divCargando);
    
    ListaInformacionDiferenciaSaldo['tipoDiferenciaGlobal'] = tipoDiferenciaSaldo;
    // ListaInformacionDiferenciaSaldo['subTotal']        = subtotalsaldo; //valor se encuentra en DiferenciaSaldo.html
    ListaInformacionDiferenciaSaldo['subTotal']        = parseInt(subtotalsaldo); //valor se encuentra en DiferenciaSaldo.html
    ListaInformacionDiferenciaSaldo['DifTotal']        = valueTotalDiferencia;
    ListaInformacionDiferenciaSaldo['FullTotal']       = resultadoDiferencia;

    var ruta = Routing.generate("Caja_Diferencia_SOlicitar_Saldo");  
    var data = {
                tipoDiferenciaGlobal    : tipoDiferenciaSaldo,
                motivoDiferencia        : $('#rebsol_hermesbundle_DiferenciaType_motivoDiferencia').val(),
                subTotal                : subtotalsaldo,
                DifTotal                : valueTotalDiferencia,
                FullTotal               : resultadoDiferencia
    };
        $.ajax({
            type:       'GET',
            url:        ruta,
            data:       data,
            success: function(datar) {
                    $("#generandoDiferencia").html("");
                    $("#generandoDiferencia").hide();
                    $('#formDiferenciaFull').fadeIn('fast');
                    datar = $.parseJSON(datar);
                    esDiferenciaSaldo = 1;
                    ListaInformacionDiferenciaSaldo['idDiferencia'] = datar.id;
                    if(datar.autorizacion == 'NR'){
                       if(esDiferenciaSaldo == 1){
                            PreparaDiferenciaNRenCajaSaldo();
                        }else if(esDiferencia == 1 ){
                            PreparaDiferenciaNRenCaja();    
                        }
                    }
                    if(datar.autorizacion == 'S'){
                        PreparaDiferenciaSCaja();
                    }   
           }         
        });
});

function PreparaDiferenciaNRenCaja(){
    $("#sumaTotal").html('calculando...');
    $('#trDiferencia, #btn-volver-solicitada').show();
    $("#btn-volver-solicitada").removeClass("hidden");
    $("#trDiferencia").removeClass("hidden");
    $("#btn-diferencia").addClass('hidden');
    $("#btn-diferencia").css('pointer-events','auto');
    $('.diferenciaPostSolicitud, .divInput, #btn-diferencia, #inputDiferenciaGrupal').hide();
    calculaNuevoMontoDiferencia(removeComas($('#TotalConDiferenciaGenerada').text()));
    $('#diferenciaTotal').html(addCommas($('#diferenciaTotalGenerada').text()));
    $('.agrupacion-radio, .como-radio').attr('disabled','disabled');
    $("#rebsol_hermesbundle_DiferenciaType_tipoDiferencia").attr('disabled', true).trigger("liszt:updated");
    $("#rebsol_hermesbundle_DiferenciaType_motivoDiferencia").attr('disabled', true).trigger("liszt:updated");
}

function PreparaDiferenciaNRenCajaSaldo(){

    $('#btn-volver-solicitada-saldo').show();
    $("#btn-volver-solicitada-saldo").removeClass("hidden");
    $("#btn-diferencia-solicitar-saldo").remove();
    $("#btn-volver-rechazada").remove();

    var subtotalsaldoEnd  = $("#sumaTotalMediosDePago").text();
    subtotalsaldoEnd = subtotalsaldoEnd.replace(",", "");

    //variables de sesion local html5
    localStorage.setItem('CMP_VP', removeComas(ListaInformacionDiferenciaSaldo['FullTotal']));
    var CMP_VP = localStorage.getItem('CMP_VP');
    var Valor_Pagar = localStorage.getItem('CMP_VP');
    $(".sumaTotalMediosDePago").html(addCommas(Valor_Pagar));

    var valDiferenciaSaldo = parseInt(ListaInformacionDiferenciaSaldo['DifTotal']);

    if(tipoDiferenciaSaldo == 1){
        var resultadoDiferencia = parseInt(subtotalsaldoEnd + valDiferenciaSaldo);
    }else if(tipoDiferenciaSaldo == 2){
        var resultadoDiferencia = parseInt(subtotalsaldoEnd - valDiferenciaSaldo);
    }

    $(".SaldoTotalMediosDePago").html(resultadoDiferencia);
    
    $('#saldototalpagar').addClass('alert-danger');
    SumaSaldoVsMediosPago();
    $( ".Input_num, .Input_text, .val-rutdv, .Input_select" ).bind("keyup change", function(e) {
    SumaSaldoVsMediosPago(); 
    });

    $("#infoDiferenciaSaldo").show();
    if(tipoDiferenciaSaldo == 1){
        $("#infoDiferenciaDirecciónSaldo").html(" a Favor ");
        $("#infoDiferenciaMontoSaldo").html("$"+addCommas(valDiferenciaSaldo));
    }else if(tipoDiferenciaSaldo == 2){
        $("#infoDiferenciaDirecciónSaldo").html("en Contra");
        $("#infoDiferenciaMontoSaldo").html("$"+addCommas(valDiferenciaSaldo));
    }
    $("#btn-diferencia-saldo").hide();
    $("#rebsol_hermesbundle_DiferenciaType_motivoDiferencia").attr('disabled', true).trigger("liszt:updated");
    $("#rebsol_hermesbundle_DiferenciaType_montoSaldo").attr('disabled', true);
}

function PreparaDiferenciaRechazadaCaja(){
    esDiferencia = 0;
    $('#btn-volver-rechazada').show();
    $("#btn-volver-rechazada").removeClass("hidden");
    $("#btn-diferencia").removeClass("hidden");
    $("#btn-diferencia").css('pointer-events','auto');
    $("#trDiferencia").addClass('hidden');
    $('.diferenciaPostSolicitud, .divInput, #btn-diferencia, #inputDiferenciaGrupal').hide();
    $('.agrupacion-radio, .como-radio').attr('disabled','disabled');
    $("#rebsol_hermesbundle_DiferenciaType_tipoDiferencia").attr('disabled', true).trigger("liszt:updated");
    $("#rebsol_hermesbundle_DiferenciaType_motivoDiferencia").attr('disabled', true).trigger("liszt:updated");
}

function PreparaDiferenciaRechazadaCajaSaldo(){
    esDiferenciaSaldo = 0;
    $('#btn-volver-rechazada').hide();
    $("#btn-volver-rechazada").removeClass("hidden");
    $("#btn-volver-solicitada-saldo").remove();
    $("#btn-diferencia-solicitar-saldo").remove();
    $("#rebsol_hermesbundle_DiferenciaType_tipoDiferencia").attr('disabled', true).trigger("liszt:updated");
    $("#rebsol_hermesbundle_DiferenciaType_motivoDiferencia").attr('disabled', true).trigger("liszt:updated");
}

function PreparaDiferenciaSCaja(){
    if($('#generandoDiferencia').is(":hidden") ){
        $('#formDiferenciaFull').hide();
        $("#generandoDiferencia").fadeIn();
        var divCargando = "<div id='cargando'><br><br><br><center><h3 class='blue'><i class='icon-spinner icon-spin icon-large icon-4x blue'></i><div class='clearfix'></div><br><strong> Esperando Validación Supervisor </strong></h3></center></div>";
        $("#generandoDiferencia").html(divCargando);
    }
    timefuncion = setInterval(getRespuestaSupervisor, 5000);
    
}


function getRespuestaSupervisor(){
        var ruta = Routing.generate("Caja_Diferencia_Respuesta_SUpervisor");
        $.ajax({
            type: "GET",
            url: ruta,
            success: function(datar) {
                datar = $.parseJSON(datar);                  
                if(datar == 'no'){
                }else{
                    clearInterval(timefuncion);
                    $("#generandoDiferencia").html("");
                    $("#generandoDiferencia").hide();
                    $('#formDiferenciaFull').fadeIn('fast');
                    if(datar == 1){
                        clearInterval(timefuncion);
                        $('.exito').show();
                        $('#btn-cancelar-desde-diferencia').hide();
                        if(esDiferenciaSaldo == 1){
                            PreparaDiferenciaNRenCajaSaldo();
                        }else if(esDiferencia == 1 ){
                            PreparaDiferenciaNRenCaja();    
                        }
                        
                        return;
                    }
                    if(datar == 4){
                        clearInterval(timefuncion);
                        $('.rechazo').show();
                        if(esDiferenciaSaldo == 1){
                            PreparaDiferenciaRechazadaCajaSaldo();
                        }else if (esDiferencia == 1){
                            PreparaDiferenciaRechazadaCaja();    
                        }
                        return;
                    }   
                }
            }
        });
    }