

function  loadScriptBusquedaRutDv() {
    
           
      /*
   $("#testEXE").on('click', function(e) { 

         var cerrado = "" +
                                    "<div class='alert alert-block alert-success'>" +
                                    "    <p>" +
                                    "    <strong><i class='icon-ok'></i>EJECUTA TEST</strong>" +
                                    "    y... debería abrir NOTEOAD" +
                                    "    </p>" +
                                    "</div>";
                            bootbox.dialog(cerrado, [
                                {
                                    "label": "Ok",
                                    "class": "btn btn-mini btn-info",
                                    "callback": function() {
                                        
                                        MyObject = new ActiveXObject( "WScript.Shell" )  
                                        function RunNotePad()   
                                        {  
                                           MyObject.Run("notepad.exe") ;  
                                       }  

        
                                        
                                    }
                                }
                            ]);

   });    
    
    */
                        //Acciones, Reacciones e interaccion en Pantalla
                        $("#rutdv").keypress(function(e) {
                            if (e.which === 13) {
                                $(".alertaNoexiste").slideUp(300);
                                ValidaRut();
                            }
                        });

                        $("#rutdv").keypress(function() {
                            if ($("#rutdv").val() !== '') {
                                $("#limpiar").fadeIn(1000);
                            }
                        });

                        $("#rutdv").blur(function() {
                            if ($("#rutdv").val() === '') {
                                $("#limpiar").fadeOut(1000);
                            }
                        });

                        $(".agregarnuevo").on('click', function() {
                            $("#pacienteform").slideDown(1000);
                            $(".alertaNoexiste").slideUp(900);
                            $("#busquedaPacientesForm").slideUp(1000);
                            $("#btnback").hide();
                            $("#volver-desde-formulario-paciente").show();
                            $(".btn-salvar").show();

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
                    }

                    //funciones de acciones en pantalla, envian una reaccion un evento asociativo.
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
                        $("#rutdv").each(function() {
                            var algo = $(this).val();
                            var rrb1 = algo.replace(/ /g, "");
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
                        $('#rebsol_hermesbundle_PagoType_comuna').val('').trigger('chosen:updated');
                        $('#rebsol_hermesbundle_PagoType_comuna').trigger("liszt:updated");
                        $("#rebsol_hermesbundle_PagoType_direccion").val("");
                        $("#rebsol_hermesbundle_PagoType_numero").val("");
                        $("#rebsol_hermesbundle_PagoType_resto").val("");
                        $("#rebsol_hermesbundle_PagoType_documento").val("");
                        $("#rebsol_hermesbundle_PagoType_numeroDocumento").val("");

                        
                        $(".campoBusquedaAvanzado").val("");
                        $("#inputInsumoBuscar").val("");
                        $("#inputPrestacionBuscar").val("");

                        $("#rebsol_hermesbundle_PrestacionType_prevision").val("");
                        $("#rebsol_hermesbundle_PrestacionType_convenio").val("");
                        $("#rebsol_hermesbundle_PrestacionType_plan").val("");
                        $("#rebsol_hermesbundle_PrestacionType_origenSelect").val("");
                        $("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val("");

                        $('#derivadoExterno').hide();
                        $('#rebsol_hermesbundle_PrestacionType_derivadoCheck').attr('checked', false);

                        $('#rebsol_hermesbundle_PrestacionType_prevision').val('').trigger('chosen:updated');
                        $('#rebsol_hermesbundle_PrestacionType_prevision').trigger("liszt:updated");

                        $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
                        $('#rebsol_hermesbundle_PrestacionType_plan').trigger("liszt:updated");

                        $('#rebsol_hermesbundle_PrestacionType_convenio').val('').trigger('chosen:updated');
                        $('#rebsol_hermesbundle_PrestacionType_convenio').trigger("liszt:updated");

                        $('#rebsol_hermesbundle_PrestacionType_derivadoSelect').val('').trigger('chosen:updated');
                        $('#rebsol_hermesbundle_PrestacionType_derivadoSelect').trigger("liszt:updated");
                        
                        $('#rebsol_hermesbundle_PrestacionType_origenSelect').val('').trigger('chosen:updated');
                        $('#rebsol_hermesbundle_PrestacionType_origenSelect').trigger("liszt:updated");

                        $('#prestacionesTable').empty();
                        //$('#prestacionesTable').remove();
                        $("#datosgarantia").hide();
                        $("#garantiaspan, #fechaspan, #usuariospan").empty();
                        $('#total').empty();
                        $('#prestacionesTable').find('#total').remove();
                        $('#prestaciones').hide();
                        $('.btn-pre-pagar').hide();

                        $(".permitidoTemp").html();

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
                        $("#alertaNoexiste").slideUp(1000);
                        $("#pacienteform").slideUp(1000);
                        $("#limpiaradv").hide();
                        $("#Buscaradv").show();
                        $("#limpiar").hide();
                        $("#Buscar").delay(300).fadeIn(400);
                        $(".mensajeErrorFormulario").hide();
                        //  $(". btn-volverEdit").hide();
                        $('#btn-Carga-DatosTratamiento').addClass("hidden");
                        $("#tituloTratamientoListadoServicio").html("");
                        esTratamiento = 0;
                        nuevoTratamiento = 0;
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
                  function validaDatosCompletos(fechad) {
                        if (!fechad) {
                            if (
                                    $("#rutdv2").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_rutPersona").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_nombrePnatural").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_apellidoMaterno").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_idSexo").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_fechaNacimiento").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_comuna").val() === '' ||
                                    $("#rebsol_hermesbundle_PagoType_direccion").val() === ''
                                    ) {
                            } else {
                                if (    $("#rebsol_hermesbundle_PagoType_telefonoMovil").val() === "" &&
                                        $("#rebsol_hermesbundle_PagoType_telefonoFijo").val() === "" &&
                                        $("#rebsol_hermesbundle_PagoType_telefonoTrabajo").val() === ""
                                        ) {
                                } else {
                                    $(".btn-salvar").hide();
                                    $(".btn-volver").hide();
                                    $(".alertaExisteFullDatos").slideDown(900);
                                }
                            }
                        }else{
                        }

                    }

                    function validaConstraint() {
                        if (($("#rutdv2").val() === '' || $("#rebsol_hermesbundle_PagoType_rutPersona").val() === '' || $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val() === '') &&
                            ($("#rutdv2").is(":visible") && !$("#rutdv2").is(":disabled"))) {
                            $(".rutdv2val").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_nombrePnatural").val() === '') {
                            $(".nombreval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '') {
                            $(".apepval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '') {
                            $(".apemval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_idSexo").val() == null) {
                            $(".sexoval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_fechaNacimiento").val() === '') {
                            $(".fechanval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_correoElectronico").val() === '') {
                            $(".emailval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_comuna").val() == null ) {
                            $(".comunaval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_direccion").val() === '' || $("#rebsol_hermesbundle_PagoType_numero").val() === '' || $("#rebsol_hermesbundle_PagoType_resto").val() === '') {
                            $(".direccionval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_telefonoMovil").val() === "" && $("#rebsol_hermesbundle_PagoType_telefonoFijo").val() === "" && $("#rebsol_hermesbundle_PagoType_telefonoTrabajo").val() === "") {
                            $(".fonoval").slideDown(500);
                        }

                        if (!$("#rebsol_hermesbundle_PagoType_numeroDocumento").is(":disabled") && 
                            $("#rebsol_hermesbundle_PagoType_numeroDocumento").val() === '' &&
                            $("#rebsol_hermesbundle_PagoType_numeroDocumento").is(":visible")) {
                            $(".numdocval").slideDown(500);
                        }
                        if (!$("#rebsol_hermesbundle_PagoType_documento").is(":disabled") && 
                            $("#rebsol_hermesbundle_PagoType_documento").val() === '' &&
                            $("#rebsol_hermesbundle_PagoType_documento").is(":visible")) {
                            $(".docval").slideDown(500);
                        }
                    }
                    
                    function validaConstraintApi() {
                        if ($("#rutdv2").val() === '' || $("#rebsol_hermesbundle_PagoType_rutPersona").val() === '' || $("#rebsol_hermesbundle_PagoType_digitoVerifivador").val() === '') {
                            $(".rutdv2val").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_nombrePnatural").val() === '') {
                            $(".nombreval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '') {
                            $(".apepval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_apellidoPaterno").val() === '') {
                            $(".apemval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_correoElectronico").val() === '') {
                            $(".emailval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_comuna").find(":selected").val() === '') {
                            $(".comunaval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_direccion").val() === '' || $("#rebsol_hermesbundle_PagoType_numero").val() === '' || $("#rebsol_hermesbundle_PagoType_resto").val() === '') {
                            $(".direccionval").slideDown(500);
                        }
                        if ($("#rebsol_hermesbundle_PagoType_telefonoMovil").val() === "" && $("#rebsol_hermesbundle_PagoType_telefonoFijo").val() === "" && $("#rebsol_hermesbundle_PagoType_telefonoTrabajo").val() === "") {
                            $(".fonoval").slideDown(500);
                        }
                    }