$(document).on('ready', function(){
function choisestyle_comuna() {
//OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
//carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).
            $("#rebsol_hermesbundle_PagoType_comuna").addClass("chosen-select");  
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Comuna", allow_single_deselect: true});    
    }
    function poblarResumenPaciente(){
      var rut = $("#rutdv2").val();
      var nombre = $("#rebsol_hermesbundle_PagoType_nombrePnatural").val();
      var apep = $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val();
      var apem = $("#rebsol_hermesbundle_PagoType_apellidoMaterno").val();
      var fechan = $("#rebsol_hermesbundle_PagoType_fechaNacimiento").val();
      
      $("#rutspan").html(rut);
      $("#nombrespan").html(nombre);
      $("#apepspan").html(apep);
      $("#apemspan").html(apem);
      $("#fechanspan").html(fechan);
}

function fallecido(fechad){
$(".disablepago").attr("disabled", "disabled");
$(".disablepago").attr("readonly", "readonly");
$("#rebsol_hermesbundle_PagoType_fechaNacimiento").attr("readonly", "readonly");
$("#rebsol_hermesbundle_PagoType_fechaNacimiento").attr("disabled", "disabled");
$(".pacientefallecido").slideDown(1000);
$(".infoesusuario, infoesusuariolista").hide();
$(".btn-volver").hide();
$(".btn-salvar").hide();
$(".btn-volver2").show();
 var año = fechad.substr(0, 4);
                                        var mes = fechad.substr(5, 2);
                                        var dia = fechad.substr(9, 2);
        var fechadefuncion = dia + "-" + mes + "-" + año;
        $("#fechad").html(fechadefuncion);
}

function PermiteCamposenFormulario() {
                    $(".permitidoTemp").removeAttr("disabled");
                    $(".permitidoTemp").removeAttr("readonly");
                    $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("disabled");
                    $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("readonly");
                }
                // Iimpia todos los puntos, y rayas que se encuentran en el campo de rut.
                function limpiarayapuntio() {
                    $("#rutdv").each(function() {
                        var algo = $(this).val();
                        var rrb1 = algo.replace(/\./g, "");
                        $(this).val(rrb1);
                    });

                    $("#rutdv").each(function() {
                        var algo = $(this).val();
                        var rrb1 = algo.replace(/-/g, "");
                        $(this).val(rrb1);
                    });
                }
                //limpia todo el formulario, limpia los dos campos ocultos de rut y limpia el campo rut, esconde el formulario completo
                function limpiar() {
                    $("#rebsol_hermesbundle_PagoType_fechaNacimiento").removeAttr("disabled");
                    $("#rebsol_hermesbundle_PagoType_fechaNacimiento").removeAttr("readonly");
                    $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("disabled");
                    $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("readonly");

                    $(".disablepago").removeAttr("disabled");
                    $(".disablepago").removeAttr("readonly");
                    $("#ApellidoP").removeAttr("readonly");
                    $("#ApellidoM").removeAttr("disabled");
                    $("#ApellidoM").removeAttr("readonly");
                    $("#ApellidoP").removeAttr("disabled");
                    $("#rutdv").removeAttr("disabled");
                    $("#rutdv").removeAttr("readonly");

                    $("#rutdv").val("");
                    $("#rutdv2").val("");
                    $("#ApellidoP").val("");
                    $("#ApellidoM").val("");
                    $("#provincia").html("");
                    $("#region").html("");
                    $("#pais").html("");
                    $("#user").val("");
                    $("#idPersonainput").val("");

                    $("#rebsol_hermesbundle_PagoType_rutPersona").val("");
                    $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val("");
                    $("#rebsol_hermesbundle_PagoType_nombrePnatural").val("");
                    $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val("");
                    $("#rebsol_hermesbundle_PagoType_apellidoMaterno").val("");
                    $("#rebsol_hermesbundle_PagoType_idSexo").val("");
                    $("#rebsol_hermesbundle_PagoType_idSexo").find(":selected").val();
                    $("#rebsol_hermesbundle_PagoType_fechaNacimiento").val("");
                    $("#rebsol_hermesbundle_PagoType_telefonoMovil").val("");
                    $("#rebsol_hermesbundle_PagoType_telefonoFijo").val("");
                    $("#rebsol_hermesbundle_PagoType_correoElectronico").val("");
                    $("#rebsol_hermesbundle_PagoType_telefonoTrabajo").val("");
                    $("#rebsol_hermesbundle_PagoType_comuna").val("");
                    $("#rebsol_hermesbundle_PagoType_comuna").find(":selected").val("");
                    $("#rebsol_hermesbundle_PagoType_direccion").val("");
                    $("#rebsol_hermesbundle_PagoType_numero").val("");
                    $("#rebsol_hermesbundle_PagoType_resto").val("");

                    var append = $("#ApellidoP").closest(".input-append").children('span').children('i');
                    append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                    append.addClass('icon-asterisk');
                    var append = $("#ApellidoM").closest(".input-append").children('span').children('i');
                    append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                    append.addClass('icon-asterisk');
                    var append = $("#rebsol_hermesbundle_PagoType_comuna").closest(".input-append").children('span').children('i');
                    append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                    append.addClass('icon-asterisk');
                    var append = $("#rutdv").closest(".input-append").children('span').children('i');
                    append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                    append.addClass('icon-asterisk');

                    $(".infoTieneGarantia").hide();
                    $(".alertaExisteDatos").hide();
                    $("#alertaNoexiste,").slideUp(1000);
                    $("#pacienteform").slideUp(1000);
                    $("#limpiaradv").hide();
                    $("#Buscaradv").show();
                    $("#limpiar").hide();
                    $("#Buscar").delay(300).fadeIn(400);
                    $(".mensajeErrorFormulario").hide();
                }

                function killScroll() {
                    $(".tab-content").css("overflow", "hidden");
                }

                // Reformatea los numeros ingresados como rut, pese a que no esten validados desde el servidor. los formatea: 1.111.111-1
                function reformat() {
                    var Rut = $("#rebsol_hermesbundle_PagoType_rutPersona").val();
                    var digitoVerificador = $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val();
                    var sRut = new String(Rut);
                    var sRutFormateado = '';
                    while (sRut.length > 3)
                    {
                        sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
                        sRut = sRut.substring(0, sRut.length - 3);
                    }
                    sRutFormateado = sRut + sRutFormateado;
                    if (sRutFormateado != "" && digitoVerificador)
                    {
                        sRutFormateado += "-" + digitoVerificador;
                    }
                    else if (digitoVerificador)
                    {
                        sRutFormateado += digitoVerificador;
                    }
                    $("#rutdv").val(sRutFormateado);
                }

                // cuando una acción es exitosa, llama esta funcion para alterar las clases, y validar con un tiquet en el campo rut.
                function accionok() {
                    var append = $("#rutdv").closest(".input-append").children('span').children('i');
                    append.removeClass('icon-spinner icon-spin add-on dark-opaque icon-asterisk');
                    append.addClass('icon-ok icon-large green');
                    $("#Buscar").hide();
                    $("#errorrut").hide();
                }

                function accionerror() {
                    var append = $("#rutdv").closest(".input-append").children('span').children('i');
                    append.removeClass('icon-spinner icon-spin add-on dark-opaque green icon-asterisk');
                    append.addClass('icon-remove icon-large red');
                    $("#datosprestacion").hide();
                    $("#errorrut").slideDown("Slow");
                }
                //funcion AJAX, envia rut, lo comprueba en el servidor, y devuelve si encuentra datos, los datos del relacionado desde la tabla PERSONA  y PNATURAL
                
                //END funciones de acciones en pantalla, envian una reaccion un evento asociativo.       
                function validaDatosCompletos(fechad){
                 if(!fechad){
                                          if(
                    $("#rutdv2").val() === '' ||   
                    $("#rebsol_hermesbundle_PagoType_rutPersona").val() === '' ||
                    $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val() === '' ||
                    $("#rebsol_hermesbundle_PagoType_nombrePnatural").val() === '' ||
                    $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_apellidoMaterno").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_idSexo").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_fechaNacimiento").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_correoElectronico").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_comuna").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_direccion").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_numero").val() === '' ||
                                $("#rebsol_hermesbundle_PagoType_resto").val() === ''
                                ) {
                        } else {
                            if (
                                    $("#rebsol_hermesbundle_PagoType_telefonoMovil").val() === "" &&
                                    $("#rebsol_hermesbundle_PagoType_telefonoFijo").val() === "" &&
                                    $("#rebsol_hermesbundle_PagoType_telefonoTrabajo").val() === ""
                                    ) {
                            } else {
                                 $(".btn-salvar").slideUp(500);
                                 $(".btn-volver").slideUp(500);
                                 $(".alertaExisteFullDatos").slideDown(900);
                            }
                        }
                                    }
               
                    }
                    
   function validaConstraint(){
 if($("#rutdv2").val() === '' || $("#rebsol_hermesbundle_PagoType_rutPersona").val() === '' ||   $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val() === '' )  {
 $(".rutdv2val").slideDown(500);
  }
   if( $("#rebsol_hermesbundle_PagoType_nombrePnatural").val() === '')  {
 $(".nombreval").slideDown(500);
  }
   if( $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '')  {
 $(".apepval").slideDown(500);
  }
   if( $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '')  {
 $(".apemval").slideDown(500);
  }
   if($("#rebsol_hermesbundle_PagoType_idSexo").find(":selected").val() === '')  {
 $(".sexoval").slideDown(500);
  }
   if($("#rebsol_hermesbundle_PagoType_fechaNacimiento").val() === '')  {
 $(".fechanval").slideDown(500);
  }
   if( $("#rebsol_hermesbundle_PagoType_correoElectronico").val() === '')  {
 $(".emailval").slideDown(500);
  }
   if($("#rebsol_hermesbundle_PagoType_comuna").find(":selected").val() === '')  {
 $(".comunaval").slideDown(500);
  }
  if($("#rebsol_hermesbundle_PagoType_direccion").val() === '' || $("#rebsol_hermesbundle_PagoType_numero").val() === '' || $("#rebsol_hermesbundle_PagoType_resto").val() === '' ) {
    $(".direccionval").slideDown(500);     
 }                                   
   if ($("#rebsol_hermesbundle_PagoType_telefonoMovil").val() === "" && $("#rebsol_hermesbundle_PagoType_telefonoFijo").val() === "" && $("#rebsol_hermesbundle_PagoType_telefonoTrabajo").val() === "" ) {
            $(".fonoval").slideDown(500);                    
        }                              
                    }   
///////////////////////////////////
//BUSQUE AVANZADA
/////////////////////////////////////
function PermiteCamposenFormulario() {
                        $(".permitidoTemp").removeAttr("disabled");
                        $(".permitidoTemp").removeAttr("readonly");
                        $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("disabled");
                        $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("readonly");
                    }
                    //limpia todo el formulario, limpia los dos campos ocultos de rut y limpia el campo rut, esconde el formulario completo
                    function killScroll() {
                        $(".tab-content").css("overflow", "hidden");
                    }

                    function limpiaradv() {
                        $("#rebsol_hermesbundle_PagoType_fechaNacimiento").removeAttr("disabled");
                        $("#rebsol_hermesbundle_PagoType_fechaNacimiento").removeAttr("readonly");
                        $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("disabled");
                        $("#rebsol_hermesbundle_PagoType_comuna").removeAttr("readonly");

                        $(".disablepago").removeAttr("disabled");
                        $(".disablepago").removeAttr("readonly");
                        $("#ApellidoP").removeAttr("readonly");
                        $("#ApellidoM").removeAttr("disabled");
                        $("#ApellidoM").removeAttr("readonly");
                        $("#ApellidoP").removeAttr("disabled");
                        $("#rutdv").removeAttr("disabled");
                        $("#rutdv").removeAttr("readonly");

                        $("#rutdv").val("");
                        $("#rutdv2").val("");
                        $("#ApellidoP").val("");
                        $("#ApellidoM").val("");
                        $("#provincia").html("");
                        $("#region").html("");
                        $("#pais").html("");
                        $("#user").val("");
                        $("#idPersonainput").val("");

                        $("#rebsol_hermesbundle_PagoType_rutPersona").val("");
                        $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val("");
                        $("#rebsol_hermesbundle_PagoType_rutPersona").val("");
                        $("#rebsol_hermesbundle_PagoType_nombrePnatural").val("");
                        $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val("");
                        $("#rebsol_hermesbundle_PagoType_apellidoMaterno").val("");
                        $("#rebsol_hermesbundle_PagoType_idSexo").val("");
                        $("#rebsol_hermesbundle_PagoType_idSexo").find(":selected").val();
                        $("#rebsol_hermesbundle_PagoType_fechaNacimiento").val("");
                        $("#rebsol_hermesbundle_PagoType_telefonoMovil").val("");
                        $("#rebsol_hermesbundle_PagoType_telefonoFijo").val("");
                        $("#rebsol_hermesbundle_PagoType_correoElectronico").val("");
                        $("#rebsol_hermesbundle_PagoType_telefonoTrabajo").val("");
                        $("#rebsol_hermesbundle_PagoType_comuna").val("");
                        $("#rebsol_hermesbundle_PagoType_comuna").find(":selected").val("");
                        $("#rebsol_hermesbundle_PagoType_direccion").val("");
                        $("#rebsol_hermesbundle_PagoType_numero").val("");
                        $("#rebsol_hermesbundle_PagoType_resto").val("");

                        var append = $("#ApellidoP").closest(".input-append").children('span').children('i');
                        append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                        append.addClass('icon-asterisk');
                        var append = $("#ApellidoM").closest(".input-append").children('span').children('i');
                        append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                        append.addClass('icon-asterisk');
                        var append = $("#rebsol_hermesbundle_PagoType_comuna").closest(".input-append").children('span').children('i');
                        append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                        append.addClass('icon-asterisk');
                        var append = $("#rutdv").closest(".input-append").children('span').children('i');
                        append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                        append.addClass('icon-asterisk');

                        $("#alertaNoexiste").slideUp(1000);
                        $("#pacienteform").slideUp(1000);
                        $("#limpiaradv").hide();
                        $("#Buscaradv").show();
                        $("#limpiar").hide();
                        $("#Buscar").delay(300).fadeIn(400);
                        $(".mensajeErrorFormulario").hide();
                        
                    }
                    // cuando una acción es exitosa, llama esta funcion para alterar las clases, y validar con un tiquet en el campo rut.
                    function accionokadv() {

                        if ($("#ApellidoP").val() !== '') {
                            var append = $("#ApellidoP").closest(".input-append").children('span').children('i');
                            append.removeClass('icon-spinner icon-spin add-on dark-opaque icon-asterisk');
                            append.addClass('icon-ok icon-large green');
                        }
                        if ($("#ApellidoM").val() !== '') {
                            var append = $("#ApellidoM").closest(".input-append").children('span').children('i');
                            append.removeClass('icon-spinner icon-spin add-on dark-opaque icon-asterisk');
                            append.addClass('icon-ok icon-large green');
                        }
                        $("#erroradv").hide();
                        $("#Buscar").hide();
                    }
                    function reformatadv() {
                        var Rut = $("#rebsol_hermesbundle_PagoType_rutPersona").val();
                        var digitoVerificador = $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val();
                        var sRut = new String(Rut);
                        var sRutFormateado = '';
                        while (sRut.length > 3)
                        {
                            sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
                            sRut = sRut.substring(0, sRut.length - 3);
                        }
                        sRutFormateado = sRut + sRutFormateado;
                        if (sRutFormateado != "" && digitoVerificador)
                        {
                            sRutFormateado += "-" + digitoVerificador;
                        }
                        else if (digitoVerificador)
                        {
                            sRutFormateado += digitoVerificador;
                        }
                        $("#rutdv2").val(sRutFormateado);
                    }
                    function reformatadvlist(rut, dv) {
                        var Rut = rut;
                        var digitoVerificador = dv;
                        var sRut = new String(Rut);
                        var sRutFormateado = '';
                        while (sRut.length > 3)
                        {
                            sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
                            sRut = sRut.substring(0, sRut.length - 3);
                        }
                        sRutFormateado = sRut + sRutFormateado;
                        if (sRutFormateado != "" && digitoVerificador)
                        {
                            sRutFormateado += "-" + digitoVerificador;
                        }
                        else if (digitoVerificador)
                        {
                            sRutFormateado += digitoVerificador;
                        }
                        return sRutFormateado;
                    }
                    function accionerroradv() {

                        if ($("#ApellidoP").val() !== '') {
                            var append = $("#ApellidoP").closest(".input-append").children('span').children('i');
                            append.removeClass('icon-spinner icon-spin add-on dark-opaque green icon-asterisk');
                            append.addClass('icon-remove icon-large red');
                        }
                        if ($("#ApellidoM").val() !== '') {
                            var append = $("#ApellidoM").closest(".input-append").children('span').children('i');
                            append.removeClass('icon-spinner icon-spin add-on dark-opaque green icon-asterisk');
                            append.addClass('icon-remove icon-large red');
                        }

                        $("#erroradv").slideDown("Slow");
                    }
                    //funcion AJAX, envia rut, lo comprueba en el servidor, y devuelve si encuentra datos, los datos del relacionado desde la tabla PERSONA  y PNATURAL
                    

//////////////////////////////////////////
///// GUARDAR
/////////////////////////////////////////
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
                            $("#datosprestacion").slideDown("slow");
                            DatosPrestacion();
                        }

                       

////////////////////////////////
// FUNCION PRESTADOR
/////////////////////////////////////////////
function DatosPrestacion() {
                                poblarResumenPaciente();
                                
                            }


///////////////////////////////////
//////////////////////////////////
//SET TIME OUT////////
/////////////////////////////////
////////////////////////////////

setTimeout(function() {
            //Prevalidación para ingreso de datos en campos
            //Esto valida que pueda ingresarse alfanumericamente, todos los ID con esta caracteristica. AQUI

            $("#rebsol_hermesbundle_PagoType_nombrePnatural, #rebsol_hermesbundle_PagoType_apellidoPaterno, #rebsol_hermesbundle_PagoType_apellidoMaterno, #ApellidoP, #ApellidoM").bind("keypress", function(event) {
                if (event.charCode !== 0) {
                    var regex = new RegExp("^[a-zA-Z]+$");
                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                    if (!regex.test(key)) {
                        event.preventDefault();
                        return false;
                    }
                }
            });
            //Este solo permite numeros, tampoco permite simbolos.
            $("#rebsol_hermesbundle_PagoType_fechaNacimiento, #rebsol_hermesbundle_PagoType_telefonoFijo, #rebsol_hermesbundle_PagoType_telefonoMovil").bind("keypress", function(event) {
                if (event.charCode !== 0) {
                    var regex = new RegExp("^[0-9]+$");
                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                    if (!regex.test(key)) {
                        event.preventDefault();
                        return false;
                    }
                }
            });
            $("#rutdv").bind("keypress", function(event) {
                if (event.charCode !== 0) {
                    var regex = new RegExp("^[0-9kK]+$");
                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                    if (!regex.test(key)) {
                        event.preventDefault();
                        return false;
                    }
                }
            });
$(".continuarPasoUno").on('click', function() {
                    $("#pacienteform").slideUp(400);
                    $(".alertaExisteFullDatos").slideUp(400);
                    $("#pacienteresumen").slideDown(1000);
                    $("#datosprestacion").slideDown(1000);
                    poblarResumenPaciente();
                });
                 $(".actualizarPasoUno").on('click', function() {
                    $(".alertaExisteFullDatos").slideUp(400);
                    $(".btn-salvar").show();
                    $(".btn-volver").show();
                    
                });
                 $(".btn-salvar").on('click', function() {
                    guardar();
                });

                $(".btn-volver, .btn-volver2").on('click', function() {
                    $("#rutdv").removeAttr("disabled");
                    $("#rutdv").removeAttr("readonly");
                    $("#ApellidoP").removeAttr("readonly");
                    $("#ApellidoP").removeAttr("disabled");
                    $("#ApellidoM").removeAttr("disabled");
                    $("#ApellidoM").removeAttr("readonly");
                    $(".pacientefallecido").slideUp(1000);
                    limpiaradv();
                    limpiar();

                    $('#busquedaPacientesForm').slideDown(1000);
                        $("#listapacienteform").slideUp(500);
                        $("#listapacienteform").load(location.href + " #listapacienteform");
                });

                $(".btn_salva").on('click', function() {
                    guardar();
                });

                $("#ssimplediv").on('click', function() {
                        $('#rutdv').focus();
                        $("#listapacienteform").slideUp(500);
                        $(".alertaNoexiste").slideUp(900);
                        $("#listapacienteform").load(location.href + " #listapacienteform");
                    limpiaradv();

                });

                $("#sadvdiv").on('click', function() {
                        $('#ApellidoP').focus();
                        $("#listapacienteform").slideUp(500);
                        $(".alertaNoexiste").slideUp(900);
                        $("#listapacienteform").load(location.href + " #listapacienteform");
                    limpiar();
                });

                $("#ssimplediv").on('click', function() {
                    $("#listapacienteform").slideUp();
                });
                $("#sadvdiv").on('click', function() {
                    $("#listapacienteform").slideUp();
                });
                //Acciones, Reacciones e interaccion en Pantalla
                        $("#rutdv").keypress(function(e) {
                            if(e.which === 13) {
                                 $(".alertaNoexiste").slideUp(300);
                                ValidaRut();
                            }
                        });

                    $("#rutdv").keypress(function() {
                        if ($("#rutdv").val() !== '') {
                            $("#limpiar").fadeIn(1000);
                        }
                    });

                    $( "#rutdv" ).blur(function() {
                         if ($("#rutdv").val() === '') {
                            $("#limpiar").fadeOut(1000);
                        }
                      });

                    $(".agregarnuevo").on('click', function() {
                        $("#pacienteform").slideDown(1000);
                        $(".alertaNoexiste").slideUp(900);
                        $("#busquedaPacientesForm").slideUp(1000);
                        killScroll();
                    });

                    $(".noagregarnuevo").on('click', function() {
                        $(".alertaNoexiste").slideUp(300);
                        limpiar();
                    });

                    $("#limpiar").on('click', function() {

                        $("#listapacienteform").slideUp(500);
                        $("#listapacienteform").load(location.href + " #listapacienteform");
                        limpiar();
                    });

                    $("#rutdv").on('click', function() {
                        limpiarayapuntio();
                    });

                    $("#Buscar").on('click', function() {

                        $("#rutdv").each(function() {
                            var algo = $(this).val();
                            var rrb1 = algo.replace(/-/g, "");
                            $(this).val(rrb1);
                        });
                        var rutvar = $("#rutdv").val();
                        var rayaindex = rutvar.indexOf('-');
                        var rayalast = rutvar.lastIndexOf('-');
                        if (rayaindex !== rayalast) {
                            $("#rutdv").val().replace(/-/g, '');
                            $("#errormsjrut").html('No debe haber mas de un "-"');
                            accionerror();
                        } else {
                            $("#rutdv").val($.trim($("#rutdv").val()));
                            if ($("#rutdv").val() === '') {
                                $("#errormsjrut").html('Rut no debe ser vacío');
                                accionerror();
                            } else {
                                ValidaRut();
                                $("#errorrut").slideUp("slow");
                            }
                            $("#rutdv").click(function() {
                                if ($("#rutdv").val() === '') {
                                    var append = $("#rutdv").closest(".input-append").children('span').children('i');
                                    append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                                    append.addClass('icon-asterisk');
                                }
                            });
                        }
                    });
             //Acciones, Reacciones e interaccion en Pantalla
                        //"ADV de Avanzado"
                        //todos campos de busqueda avanzada
                         $("#ApellidoP, #ApellidoM").keypress(function(e) {
                            if(e.which === 13) {
                                 $(".alertaNoexiste").slideUp(300);
                                Validainfo();
                            }
                        });
                        
                       $( "#ApellidoP, #ApellidoM" ).blur(function() {
                         if ($("#ApellidoP, #ApellidoM").val() === '') {
                            $("#limpiar").fadeOut(1000);
                        }
                      });
                      
                    $("#ApellidoP, #ApellidoM").keypress(function() {
                        if ($("#ApellidoP, #ApellidoM").val() !== '') {
                            $("#limpiaradv").fadeIn(1000);
                        }
                    });

                        $("#limpiaradv").on('click', function() {
                            $("#listapacienteform").slideUp(500);
                            $("#listapacienteform").load(location.href + " #listapacienteform");
                            limpiaradv();
                        });

                        $("#Buscaradv").on('click', function() {
                            if ($("#ApellidoP").val() === '' && $("#ApellidoM").val() === '') {
                                $("#errormsjadv").html('Debe Completar al menos un campo');
                                accionerroradv();
                            } else {

                                $("#listapacienteform").slideUp(500);
                                $("#listapacienteform").load(location.href + " #listapacienteform");
                                Validainfo();
                                $("#erroradv").slideUp("slow");
                            }

                            $("#ApellidoP, #ApellidoM").click(function() {
                                if ($("#ApellidoP").val() === '' && $("#ApellidoM").val() === '') {
                                    var append = $("#ApellidoP").closest(".input-append").children('span').children('i');
                                    append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                                    append.addClass('icon-asterisk');
                                    var append = $("#ApellidoM").closest(".input-append").children('span').children('i');
                                    append.removeClass(' icon-spinner icon-spin green icon-remove red  icon-large');
                                    append.addClass('icon-asterisk');
                                }
                            });
                        })       
        }, 100);
        
        
        
        
});