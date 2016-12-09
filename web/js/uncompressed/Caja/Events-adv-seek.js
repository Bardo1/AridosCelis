    function  loadScriptBusquedaAvanzada() {
                            $("#ApellidoP, #ApellidoM").keypress(function(e) {
                                if (e.which === 13) {
                                    $(".alertaNoexiste").slideUp(300);
                                    Validainfo();
                                }
                            });

                            $("#ApellidoP, #ApellidoM").blur(function() {
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
                                $("#listapacienteform").show(500);
                                $("#listapacienteform").load(location.href + " #listapacienteform");
                                limpiaradv();
                            });

                            $("#Buscaradv").on('click', function() {
                                if ($("#ApellidoP").val() === '' && $("#ApellidoM").val() === '') {
                                    $("#errormsjadv").html('Debe Completar al menos un campo');
                                    accionerroradv();
                                } else {

                                    $("#listapacienteform").show(500);
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
                            });
                            /************************************/
                            /***                              ***/
                            /***   BuquedaAvanzada.html.twig  ***/
                            /***                              ***/
                            /************************************/
                            $("#btnBuscaAvanzadoPaciente").on('click', function(e) {
                                e.preventDefault();
                                // e.stopPropagatiofunction;
                                busquedaAvanzadaPaciente();
                                $("#resultadosBusquedaAvanzadaPaciente").show();
                            });

                            $("#btnLimpiaAvanzadoPaciente").on('click', function(e) {
                                $('.limpiarCampos').val('');
                                $("#resultadosBusquedaAvanzadaPaciente").hide();
                            });


                            $("#bSimple").on('click', function(e) {
                                $('.limpiarCampos').val('');
                                $("#resultadosBusquedaAvanzadaPaciente").hide();
                            });

                            $(".campoBusquedaAvanzado").on('keyup', function() {


                                var valor = $.trim($(this).val());
                                //var nombre = $.trim($("#busquedaAvanzadaPaciente_nombres").val());
                                //var ap1 = $.trim($("#busquedaAvanzadaPaciente_apPaterno").val());
                                //var ap2 = $.trim($("#busquedaAvanzadaPaciente_apMaterno").val());
                                // var valor2 = $.trim($(this).val().length));
                                if (valor.length == 0) {
                                    $(this).closest('td').find('.text-error').hide();

                                } else if (valor.length < 3) {

                                    $(this).closest('td').find('.text-error').show();
                                    $('#btnBuscaAvanzadoPaciente').attr('disabled', true);
                                    $('#btnLimpiaAvanzadoPaciente').attr('disabled', true);
                                }
                                else {

                                    $(this).closest('td').find('.text-error').hide();
                                    if ($("#error-nombres").is(':visible') || $("#error-apPaterno").is(':visible') || $("#error-apMaterno").is(':visible')) {
                                        $('#btnBuscaAvanzadoPaciente').attr('disabled', true);
                                        $('#btnLimpiaAvanzadoPaciente').attr('disabled', true);
                                    } else {
                                        $('#btnBuscaAvanzadoPaciente').attr('disabled', false);
                                        $('#btnLimpiaAvanzadoPaciente').attr('disabled', false);
                                    }
                                }

                            });

                        }
                        //funciones de acciones en pantalla, envian una reaccion un evento asociativo.    
                        function busquedaAvanzadaPaciente() {
                            // var bValidacion = validarAvanzadaFormulario();
                            ////FYIconsole.log(bValidacion);
                            //return;
                            //if(bValidacion = true)
                            //{
                            // //FYIconsole.log("busca1");
                            mostrarMensajeCargando();
                            var ruta = Routing.generate("Caja_vresultadoBusquedaAvanzadaPaciente");
                            // //FYIconsole.log(ruta);
                            var formulario = $("#busquedaAvanzadaPaciente").serializeArray();
                            $.post(ruta, formulario, function(result) {
                                $("#resultadosBusquedaAvanzadaPaciente").html(result);
                                $("#busquedaPacientesForm").slideUp(1000);
                                if ($('#busquedaAvanzadaPaciente_nombres').val() !== "") {
                                    $("#parametrosBusquedaResumenNombre").html("Nombres:" + " '" + $('#busquedaAvanzadaPaciente_nombres').val() + "' ");
                                }
                                if ($('#busquedaAvanzadaPaciente_apPaterno').val() !== "") {
                                    $("#parametrosBusquedaResumenApep").html("Apellido Paterno:" + " '" + $('#busquedaAvanzadaPaciente_apPaterno').val() + "' ");
                                }
                                if ($('#busquedaAvanzadaPaciente_apMaterno').val() !== "") {
                                    $("#parametrosBusquedaResumenApem").html("Apellido Paterno:" + " '" + $('#busquedaAvanzadaPaciente_apMaterno').val() + "' ");
                                }

                                // //FYIconsole.log("busca2");
                                $('.edit').on('click', function() {
                                    //funcion para ir a buscar al usuario una vez hecho click en su nombre completo
                                    ////FYIconsole.log("mamalo codigo rqlo");
                                    var idpaciente = $(this).closest('tr').attr('id');
                                    buscaUNusuarioporIdPersona(idpaciente);
                                    ////FYIconsole.log(idpaciente);
                                });
                                ocultarMensajeNav();
                            });
                            //}     
                        }
                        function validarAvanzadaFormulario() {

                            var bResultado = true;
                            var nombres = $.trim($("#buscarReservasPaciente_nombres").val());
                            var apPaterno = $.trim($("#buscarReservasPaciente_apPaterno").val());
                            var apMaterno = $.trim($("#buscarReservasPaciente_apMaterno").val());

                            if (nombres == "" && apPaterno == "" && apMaterno == "")
                            {
                                $("#buscarReservasPaciente_error").show();
                                return false;
                            } else {
                                $("#buscarReservasPaciente_error").hide();
                            }
                            return true;
                        }
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
                            $('#rebsol_hermesbundle_PagoType_comuna').val('').trigger('chosen:updated');
                            $("#rebsol_hermesbundle_PagoType_direccion").val("");
                            $("#rebsol_hermesbundle_PagoType_numero").val("");
                            $("#rebsol_hermesbundle_PagoType_resto").val("");
                            $(".permitidoTemp").html();
                            $("#inputInsumoBuscar").val("");
                            $("#inputPrestacionBuscar").val("");



                            $("#rebsol_hermesbundle_PrestacionType_prevision").val("");
                            $("#rebsol_hermesbundle_PrestacionType_convenio").val("");
                            $("#rebsol_hermesbundle_PrestacionType_plan").val("");
                            $("#rebsol_hermesbundle_PrestacionType_origenSelect").val("");
                            $("#rebsol_hermesbundle_PrestacionType_derivadoExterno").val("");

                            $('#derivadoExterno').hide();
                            $('#prestaciones').hide();
                            $('#rebsol_hermesbundle_PrestacionType_derivadoCheck').attr('checked', false);


                            $('#rebsol_hermesbundle_PrestacionType_prevision').val('').trigger('chosen:updated');
                            $('#rebsol_hermesbundle_PrestacionType_prevision').trigger("liszt:updated");

                            $('#rebsol_hermesbundle_PrestacionType_plan').val('').trigger('chosen:updated');
                            $('#rebsol_hermesbundle_PrestacionType_plan').trigger("liszt:updated");

                            $('#rebsol_hermesbundle_PrestacionType_convenio').val('').trigger('chosen:updated');
                            $('#rebsol_hermesbundle_PrestacionType_convenio').trigger("liszt:updated");

                            $('#rebsol_hermesbundle_PrestacionType_origenSelect').val('').trigger('chosen:updated');
                            $('#rebsol_hermesbundle_PrestacionType_origenSelect').trigger("liszt:updated");

                            $('#prestacionesTable').empty();
                            //$('#prestacionesTable').remove();
                            $('#total').empty();
                            $('#prestacionesTable').find('#total').remove();
                            $('#prestaciones').hide();
                            $('.btn-pre-pagar').hide();

                               $("#datosgarantia").hide();
                        $("#garantiaspan, #fechaspan, #usuariospan").empty();

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
                            $(".btn-volverEdit").hide();

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
                        
