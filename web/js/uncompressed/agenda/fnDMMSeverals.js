
//Funcion: Generar Username
//Descripción: Obtiene los valores desde el formulario "Nombre" y "Apellido Paterno", donde en el string de nombre, es tomado su primer valor,
//adjuntado al apellido paterno completo.
function generarUsername() {
    var append = $("#rebsol_hermesbundle_DMMtype_nombreUsuario").closest(".input-append").children('span').children('i');
    append.removeClass('icon-asterisk');
    append.addClass('icon-spinner icon-spin');
    //si nombre o apellido paterno obteniendos en el formulario, son igual a vacio, retorna falso y no escribe nada  hasta que ambos 
    //tengan contenido.
    if ($("#rebsol_hermesbundle_DMMtype_nombrePnatural").val() === ''
            || $("#rebsol_hermesbundle_DMMtype_apellidoPaterno").val() === ''
            || $("#rebsol_hermesbundle_DMMtype_apellidoMaterno").val() === '')
    {
        return false;
    }
    var data = {
        n: $("#rebsol_hermesbundle_DMMtype_nombrePnatural").val(),
        ap: $("#rebsol_hermesbundle_DMMtype_apellidoPaterno").val(),
        am: $("#rebsol_hermesbundle_DMMtype_apellidoMaterno").val()
    };
    $.ajax({
        type: 'get',
        url: "{{ path('Agenda_DatosMaestrosMedicos_Valusername') }}",
        data: data,
        success: function(data) {
            data = $.parseJSON(data);
            $("#rebsol_hermesbundle_DMMtype_nombreUsuario").val(data);
            append.removeClass('icon-spinner icon-spin add-on dark-opaque');
            append.addClass('icon-ok icon-large green');



        }
    });

    //En un textfield, previamente encrustado en el formulario, se pinta con el valor de la variable "sUsername".
    $("#rebsol_hermesbundle_DMMtype_nombreUsuario").val();
}
setTimeout(function() {

    //con esta función, da un espacio de medio segundo, para obtener el valor que se esta ingresando en el campo nombre, de esta manera, ejecuta
    //la funcion Generar nombre
    $("#rebsol_hermesbundle_DMMtype_nombrePnatural").on('keyup', function() {
        $("#rebsol_hermesbundle_DMMtype_nombreUsuario").val('Procesando...');
        generarUsername();
    });
    //con esta función, da un espacio de medio segundo, para obtener el valor que se esta ingresando en el campo apellido paterno, de esta manera, ejecuta
    //la funcion Generar nombre
    $("#rebsol_hermesbundle_DMMtype_apellidoPaterno").on('keyup', function() {
        generarUsername();
    });
    $("#rebsol_hermesbundle_DMMtype_apellidoMaterno").on('keyup', function() {
        generarUsername();
    });
    //Funcion: Generar Password
    //Descripción: en base a un boton establecido en las funciones del formulario, y en conjunto con un textfield previamente incorporado, se genera un
    //password, con la funcion GenerarPassword, esta funcion, se encuentra dentro de un archivo "js/uncompressed/mantenedores/generarPassword.js".
    //se encuentra construida para generar password de 6 digido que sea alfanumerica. una vez ejecuta la función, refleja el resultado en el textfield
    //de declarado.
    //si hacen click en id #generarpassword se ejecuta la funcion.
    $("#generarPassword").on('click', function(e) {
        //funcion crea una variable, que es resultado de la funcion "GenerarPassword(6)" la cual se encuentra en el archivo:
        //js/uncompressed/mantenedores/generarPassword.js
        var password = GenerarPassword(6);
        //Devuelve el resultado al textfield declarado en formulario, con la variable "password"
        $("#rebsol_hermesbundle_DMMtype_contrasenaMd5").val(password);
    });
    // Fin GenerarPassword
}, 500);

//Prevalidación para ingreso de datos en campos
//Esto valida que pueda ingresarse alfanumericamente, todos los ID con esta caracteristica. AQUI
$("#rebsol_hermesbundle_DMMtype_digitoVerifivador").bind("keypress", function(event) {
    if (event.charCode !== 0) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
});
//Este, solo valida que sean alfabeticos, no permite numeros ni simbolos
$("#rebsol_hermesbundle_DMMtype_nombrePnatural, #rebsol_hermesbundle_DMMtype_apellidoPaterno, #rebsol_hermesbundle_DMMtype_apellidoMaterno").bind("keypress", function(event) {
    if (event.charCode !== 0) {
        var regex = new RegExp("^[a-zA-Z ]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
});
//Este solo permite numeros, tampoco permite simbolos.
$("#rebsol_hermesbundle_DMMtype_fechaNacimiento, #rebsol_hermesbundle_DMMtype_fechaTermino, #rebsol_hermesbundle_DMMtype_rutPersona, #rebsol_hermesbundle_DMMtype_telefonoFijo, #rebsol_hermesbundle_DMMtype_telefonoMovil").bind("keypress", function(event) {
    if (event.charCode !== 0) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
});


//Muestra la fecha escondida
function showfttf() {
    $("#fechaterminotf").slideDown("slow");
    //$(".rolismedic").show();
}
//esconde la fecha y además limpia los valores que se ingresaron preparandola para ser procesada en NULL
function hidefttf() {
    $("#fechaterminotf").slideUp(600);
    $("#rebsol_hermesbundle_DMMtype_fechaTermino").val('');
    //$(".rolismedic").hide();
}
//verifica al cargar el modal que contiene el formulario, si contiene datos el textfield que
//contiene la fecha de termino, muestra el div escondido, y cambia el cheked del radio.
$(document).ready(function() {

    setTimeout(function() {
        if ($("#rebsol_hermesbundle_DMMtype_fechaTermino").val() !== '')
        {
            $("#fechaterminotf").show();
            $('input:radio[name="fechadefinicion"]').filter('[value="definido"]').attr('checked', true);
        }
    }, 500);
});


//Muestra opcion de especialidad de medicos
$(document).ready(function() {
    $(".rolisadmin").hide();
    if ($("#rebsol_hermesbundle_DMMtype_Rol").val() !== '' && ($("#rebsol_hermesbundle_DMMtype_Rol").val() === "1" || $("#rebsol_hermesbundle_DMMtype_Rol").val() === "3"))
    {
        $(".rolisadmin").show();
    }
});
$("#rebsol_hermesbundle_DMMtype_Rol").change(function() {
    var val = $(this).find(":selected").val();
    if (val !== "2") {
        $(".rolisadmin").show();

    } else {
        $(".rolisadmin").hide();
        $("#rebsol_hermesbundle_DMMtype_Especialidad").val('');
        $("#rebsol_hermesbundle_DMMtype_Tipomedico").val('');
    }

});


//evita que pueda copiar, cortar o pegar en los siguientes campos de texto
$(document).ready(function() {
    $("#rebsol_hermesbundle_DMMtype_rutPersona, #rebsol_hermesbundle_DMMtype_fechaNacimiento, #rebsol_hermesbundle_DMMtype_telefonoFijo, #rebsol_hermesbundle_DMMtype_telefonoMovil, #rebsol_hermesbundle_DMMtype_fechaTermino").bind("cut copy paste", function(e) {
        e.preventDefault();
    });
});

//Formatea fecha con una mascara
$(document).ready(function() {

    $(".fechamask").mask("99/99/9999");
});

$(document).ready(function() {
    setTimeout(function() {
        $("#rebsol_hermesbundle_DMMtype_Especialidad").chosen({width: "270px", no_results_text: "No se ha encontrado Especialidad", max_selected_options: 5});

    }, 500);
});

//Muestra correo escondido
$(document).ready(function() {
    $("#email2").hide();
    $("#fono2").hide();
    setTimeout(function() {
        if ($("#rebsol_hermesbundle_DMMtype_telefonoFijo").val() !== '')
        {
            $("#fono2").show();
        }
        if ($("#rebsol_hermesbundle_DMMtype_correoElectronico2").val() !== '')
        {
            $("#email2").show();
        }
    }, 500);
});

$("#btnfono2").on('click', function() {
    $("#fono2").slideDown("slow");
    $("#btnfono2").slideUp(600);

});

$("#btnemail2").on('click', function() {
    $("#email2").slideDown("slow");
    $("#btnemail2").slideUp(600);
});
$("#btnfono2X").on('click', function() {
    $("#rebsol_hermesbundle_DMMtype_telefonoFijo").val('');
    $("#fono2").slideUp(600);
    $("#btnfono2").show();
});

$("#btnemail2X").on('click', function() {
    $("#rebsol_hermesbundle_DMMtype_correoElectronico2").val('');
    $("#email2").slideUp(600);
    $("#btnemail2").show();
});

jQuery(document).ready(function($) {
    // loop over all elements creating a tooltip based on their data-tooltip-id attribute  
    $('.tooltip-from-element').each(function() {
        var selector = '#' + $(this).data('tooltip-id');
        Tipped.create(this, $(selector)[0], {target: $(this).id, hook: {target: 'rightmiddle', tooltip: 'leftmiddle'}, skin: 'black', radius: {size: 1}});
    });
});
Tipped.create("#generarPassword", {target: $(this).id, hook: {target: 'rightmiddle', tooltip: 'leftmiddle'}, skin: 'red', radius: {size: 1}});


$("#rutdv").blur(function() {
    var rdv = $("#rutdv").val();
    var largo = rdv.length;

 if ($("#rutdv").val() !== '' && ($("#rutdv").val().substring(largo - 2, largo) !== '-')) { 
        var r = $("#rutdv").val().substr(0, largo - 1);
        var dv = $("#rutdv").val().substring(largo - 1, largo);
        var rdv1 = r + 'H' + dv;
        $("#rutdv").val(rdv1);
 }
});

function rutdv() {

    if ($("#rutdv").val() !== '') {
        var rdv = $("#rutdv").val();
        var largo = rdv.length;
        var r = $("#rutdv").val().substr(0, largo - 1);
        var dv = $("#rutdv").val().substring(largo - 1, largo);

        $("#rebsol_hermesbundle_DMMtype_rutPersona").val(r);
        $("#rebsol_hermesbundle_DMMtype_digitoVerifivador").val(dv);
        var rdv1 = r + 'H' + dv;
        $("#rutdv").val(rdv1);

        }
}

setTimeout(function() {
    
    
        $("#rebsol_hermesbundle_DMMtype_idSucursal").change(function(){
            var append = $(this).closest(".input-append").children('span').children('i');
            append.removeClass('icon-asterisk');
            append.addClass('icon-spinner icon-spin');
            var data = {
                idSucursal: $(this).val()
            };
            $.ajax({
                type: 'get',
                url: "{{ path('Agenda_DatosMaestrosMedicos_Unidad_por_Sucursal') }}",
                data: data,
                success: function(data) {
                    data = $.parseJSON(data);
                    var options = '<option value="" disabled="disabled" selected="selected">Seleccionar Unidad</option>';
                    for (var i = 0; i < data.length; i++) {
                        options += "<option value="+data[i].id+">"+data[i].nombre+'</option>';
                    };
                    $('#rebsol_hermesbundle_DMMtype_idUnidad').html(options);
                    //
                    var options = '<option value="" disabled="disabled" selected="selected">Seleccionar Servicio</option>';
                    $('#rebsol_hermesbundle_DMMtype_idServicio').html(options);
                    //
                   
                    //
                    append.removeClass('icon-spinner icon-spin');
                    append.addClass('icon-asterisk');
                }
            });
        });
        $("#rebsol_hermesbundle_DMMtype_idUnidad").change(function(){
            var append = $(this).closest(".input-append").children('span').children('i');
            append.removeClass('icon-asterisk');
            append.addClass('icon-spinner icon-spin');
            var data = {
                idUnidad: $(this).val()
            };
            $.ajax({
                type: 'get',
                url: "{{ path('Agenda_DatosMaestrosMedicos_Servicios_por_Unidad') }}",
                data: data,
                success: function(data) {
                    data = $.parseJSON(data);
                    var options = '<option value="" disabled="disabled" selected="selected">Seleccionar Servicio</option>';
                    for (var i = 0; i < data.length; i++) {
                        options += "<option value="+data[i].id+">"+data[i].nombre+'</option>';
                    };
                    $('#rebsol_hermesbundle_DMMtype_idServicio').html(options);
                    append.removeClass('icon-spinner icon-spin');
                    append.addClass('icon-asterisk');
                }
            });
        });});


