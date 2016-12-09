function validarEmail(valor) {
    var mailchar = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!(mailchar.test(valor))) {
        return true;
    } else {
        return false;
    }
}

function falla() {
    $(".errorfalla").slideDown("slow");
    setTimeout(function() {
        $(".errorfalla").slideUp("slow");
    }, 6000);
}

function update() {
    $(".actualizado").slideDown();
    setTimeout(function() {
        $(".actualizado").slideUp("slow");
    }, 5000);
    post_create_update();
}

function create() {
    $(".creado").slideDown();
    setTimeout(function() {
        $(".creado").slideUp("slow");
    }, 5000);
    post_create_update();
}

function post_create_update() {
    $(".disablepago").attr("disabled", "disabled");
    $(".disablepago").attr("readonly", "readonly");
    $("#rebsol_hermesbundle_PagoType_comuna").attr("disabled", "disabled");
    $("#rebsol_hermesbundle_PagoType_comuna").attr("readonly", "readonly");
    $(".btn-salvar").fadeOut("slow");
    $(".btn-volver").fadeOut("slow");
    $(".mensajeErrorFormulario").fadeOut("slow");
    $("#datosprestacion").slideDown("slow");
    DatosPrestacion();
    $("#pacienteform").slideUp(400);
    $(".alertaExisteFullDatos").slideUp(400);
    poblarResumenPaciente();
    creaListaHistorica();
}

function post_create_updateApi1() {
    $(".disablepago").attr("disabled", "disabled");
    $(".disablepago").attr("readonly", "readonly");
    $("#rebsol_hermesbundle_PagoType_comuna").attr("disabled", "disabled");
    $("#rebsol_hermesbundle_PagoType_comuna").attr("readonly", "readonly");
    $(".btn-salvar").fadeOut("slow");
    $(".btn-volver").fadeOut("slow");
    $(".mensajeErrorFormulario").fadeOut("slow");
    $("#datosprestacion").slideDown("slow");
    DatosPrestacion();
    $("#pacienteform").slideUp(400);
    $(".alertaExisteFullDatos").slideUp(400);
    creaListaHistorica();
}

function creaListaHistorica(){
     $('#historicoPacientePagos').show().append("<i class='icon-spinner icon-spin'></i> <span id='infoCarga'>Buscando y actualizando listado de antecedentes...</span>");
     var ruta = Routing.generate("Caja_PostPago_Historial"); 
     $.post(ruta, null, function(respuesta)
            {
                if (respuesta.length > 0)
                {
                    $('#historicoPacientePagos').html("");
                    $('#historicoPacientePagos').html(respuesta);
                }else{
                    $('#historicoPacientePagos').hide().html("");
                }
            });
}

