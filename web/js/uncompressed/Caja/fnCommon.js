//Función para la actualización masiva, que permite generar mensajes de espera mientras se realiza la actualización. 
function auditoria(vistaHtml, form) {
    $(".modalVer").html('');
    bootbox.dialog(vistaHtml, [{
            "label": "Ok",
            "class": "btn btn-mini btn-info"
        }

    ]);
}

function GestionCaja_CajaSinCerrar() {
    $(".cerrarCaja").on('click', function(e) {
        e.preventDefault();
        bootbox.hideAll();
        $(".modalSinCerrar").html('');
        $(".modalSinCerrar").load($(this).attr('href'), function(response, status, xhr) {
            $(".modalSinCerrar").html('');
            var vistaHtml = response;
            bootbox.dialog(vistaHtml, [{
                "label": "<i class='icon-arrow-left'></i> Volver",
                "class": "btn btn-mini btn-cerrar-caja",
                "callback": function() {
                    $(".modalSinCerrar").html('');
                    bootbox.hideAll();
                }
            }, {
                "label": "<i class='icon-save'></i> Grabar",
                "class": "btn btn-mini btn-success btn-cerrar-caja",
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
                            bootbox.dialog(cerrado, [{
                                "label": "Ok",
                                "class": "btn btn-mini btn-info",
                                "callback": function() {
                                    location.reload();
                                }
                            }]);
                        } else {
                            var cerrado = "" +
                                "<div class='alert alert-block alert-danger'>" +
                                "    <p>" +
                                "    <strong>Error al Cerrar Caja</strong>" +
                                "    <br>No cerró correctamente." +
                                "    </p>" +
                                "</div>";
                            bootbox.dialog(cerrado, [{
                                "label": "Ok",
                                "class": "btn btn-mini btn-info",
                                "callback": function() {
                                    location.reload();
                                }
                            }]);

                        }
                    });
                }
            }]);
        });
    });


}


function cargarSolicitudes(idTalonario) {
    var ruta = Routing.generate("Caja_Supervisor_MantenedorFolios");
    mostrarMensajeCargando();
    $.post(ruta, {
        idTalonario: idTalonario
    }, function(result) {
        // $('#tablaClientes').html('');
        $('#tablaTalonarios').html(result);
        ocultarMensajeNav();
    }).error(function(xhr, textStatus, errorThrown) {
        bootbox.dialog(xhr.responseText, [{
            "label": "<i class='icon-check-sign'></i> Aceptar",
            "class": "btn-info btn-mini",
            "callback": function() {}
        }]);
    });
}

//Función para la actualización masiva, que permite generar mensajes de espera mientras se realiza la actualización. 
function informacion(vistaHtml, form) {
    $(".modalVer").html('');
    bootbox.dialog(vistaHtml, [{
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini"
        }, {
            "label": "<i class='icon-download-alt'></i> Imprimir Excel",
            "class": "btn btn-mini btn-success btn-print",
            "callback": function() {
                $("#formInfoExcel").submit();
                tableToExcel('detallePagosCajeros', 'W3C Example Table');
                return false;
            }


        }

    ]);
}

function informacionPDF(vistaHtml, form) {
    $(".modalVer").html('');
    bootbox.dialog(vistaHtml, [{
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini"
        }, {
            "label": "<i class='icon-print'></i> Imprimir",
            "class": "btn btn-mini btn-success btn-print-InfoCaja",
            "callback": function() {
                $("#formInfoCajaDetalle").submit();

            }

        }

    ]);
}

function editar(vistaHtml, form) {
    //$("#formInfoCaja").closest('.modal').modal("hide");//FYIconsole.log('jajajajaa');
    $(".modalVer").html('');
    bootbox.dialog(vistaHtml, [{
        "label": "<i class='icon-arrow-left'></i> Volver",
        "class": "btn btn-mini"
    }, {
        "label": "<i class='icon-save'></i> Guardar",
        "class": "btn btn-mini btn-success btn-guardar-edit",
        "callback": function() {
            //                $('#divActualizacionMasiva').show();
            //                $('#tabla_titulo').hide();
            //                $('#table_report2').hide();
            $(".modalVer").html('');
            var action = $(form).attr('action');
            ////FYIconsole.log(action);
            var data = $(form).serializeArray();
            $.post(action, data, function(response) {
                if (response == "Editado") {
                    var editado = "" +
                        "<div class='alert alert-block alert-success'>" +
                        "    <p>" +
                        "    <strong><i class='icon-ok'></i> Editado Correctamente!</strong>" +
                        "    El objeto fue editado correctamente." +
                        "    </p>" +
                        "</div>";
                    bootbox.dialog(editado, [{
                        "label": "<i class='icon-ok'></i> Ok",
                        "class": "btn btn-mini",
                        "callback": function() {
                            location.reload();
                        }
                    }]);
                } else {
                    var vistaHtml = response;
                    //                        $('#divActualizacionMasiva').hide();
                    //                        $('#tabla_titulo').show();
                    //                        $('#table_report2').show();
                    //                        $(".modalVer").html('');
                    editar(vistaHtml, form);
                }
            });
        }
    }]);
}

function editarBono(vistaHtml, form) {
    //$("#formInfoCaja").closest('.modal').modal("hide");
    $(".modalBono").html('');
    bootbox.dialog(vistaHtml, [{
        "label": "<i class='icon-arrow-left'></i> Volver",
        "class": "btn btn-mini"
    }, {
        "label": "<i class='icon-save'></i> Guardar",
        "class": "btn btn-mini btn-success btn-guardar-edit",
        "callback": function() {
            //                $('#divActualizacionMasiva').show();
            //                $('#tabla_titulo').hide();
            //                $('#table_report2').hide();
            $(".modalBono").html('');
            var action = $(form).attr('action');
            ////FYIconsole.log(action);
            var data = $(form).serializeArray();
            $.post(action, data, function(response) {
                if (response == "Editado") {
                    var editado = "" +
                        "<div class='alert alert-block alert-success'>" +
                        "    <p>" +
                        "    <strong><i class='icon-ok'></i> Editado Correctamente!</strong>" +
                        "    El objeto fue editado correctamente." +
                        "    </p>" +
                        "</div>";
                    bootbox.dialog(editado, [{
                        "label": "<i class='icon-ok'></i> Ok",
                        "class": "btn btn-mini",
                        "callback": function() {
                            location.reload();
                        }
                    }]);
                } else {
                    var vistaHtml = response;
                    //                        $('#divActualizacionMasiva').hide();
                    //                        $('#tabla_titulo').show();
                    //                        $('#table_report2').show();
                    //                        $(".modalVer").html('');
                    editarBono(vistaHtml, form);
                }
            });
        }
    }]);
}

$(document).on('ready', function() {
    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    function EnviarFormularioAjax(vistaHtml, form) {
        $(".modalVer").html('');
        bootbox.dialog(vistaHtml, [{
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini"
        }, {
            "label": "<i class='icon-save'></i> Guardar",
            "class": "btn btn-mini btn-success",
            "callback": function() {
                mostrarMensajeGuardando();
                $(".modalVer").html('');
                var action = $(form).attr('action');
                var data = $(form).serializeArray();
                $.post(action, data, function(response) {
                    response = $.trim(response);
                    ocultarMensajeNav();
                    if (response == "Creado") {
                        var creado = "" +
                            "<div class='alert alert-block alert-success'>" +
                            "    <p>" +
                            "    <strong><i class='icon-ok'></i> Creado Correctamente!</strong>" +
                            "    El objeto fue creado correctamente." +
                            "    </p>" +
                            "</div>";
                        bootbox.dialog(creado, [{
                            "label": "Ok",
                            "class": "btn btn-mini btn-info",
                            "callback": function() {
                                location.reload();
                            }
                        }]);
                    } else if (response == "Vacio") {
                        bootbox.hideAll();
                        var editado = "" +
                            "<div class='alert alert-block alert-warning'>" +
                            "    <p>" +
                            "    <strong><i class='icon-ok'></i> No se encontraron Registros</strong>" +
                            "    Pruebe otro Rango de Fecha." +
                            "    </p>" +
                            "</div>";
                        bootbox.dialog(editado, [{
                            "label": "<i class='icon-ok'></i> Ok",
                            "class": "btn btn-mini",
                            "callback": function() {
                                location.reload();
                            }
                        }]);
                    } else if (response == "Editado") {
                        var editado = "" +
                            "<div class='alert alert-block alert-success'>" +
                            "    <p>" +
                            "    <strong><i class='icon-ok'></i> Editado Correctamente!</strong>" +
                            "    El objeto fue editado correctamente." +
                            "    </p>" +
                            "</div>";
                        bootbox.dialog(editado, [{
                            "label": "<i class='icon-ok'></i> Ok",
                            "class": "btn btn-mini",
                            "callback": function() {
                                location.reload();
                            }
                        }]);
                    } else {
                        var vistaHtml = response;
                        $(".modalVer").html('');
                        EnviarFormularioAjax(vistaHtml, form);
                    }
                });
            }
        }]);
    }
    //fin
    function EnviarFormularioAjaxEmpresa(vistaHtml, form) {
        $(".modalVer").html('');
        bootbox.dialog(vistaHtml, [{
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini"
        }, {
            "label": "<i class='icon-save'></i> Guardar",
            "class": "btn btn-mini btn-success",
            "callback": function() {
                $(form).submit();
                $('#carga_formulario').load(function() {
                    var iBody = $('#carga_formulario').contents().find('body').html();
                    if (iBody == 'Creado') {
                        bootbox.hideAll();
                        var creado = "" +
                            "<div class='alert alert-block alert-success'>" +
                            "    <p>" +
                            "    <strong><i class='icon-ok'></i> Creado Correctamente!</strong>" +
                            "    El objeto fue creado correctamente." +
                            "    </p>" +
                            "</div>";
                        bootbox.dialog(creado, [{
                            "label": "Ok",
                            "class": "btn btn-mini btn-info",
                            "callback": function() {
                                location.reload();
                            }
                        }]);
                    } else if (iBody == "Editado") {
                        bootbox.hideAll();
                        var editado = "" +
                            "<div class='alert alert-block alert-success'>" +
                            "    <p>" +
                            "    <strong><i class='icon-ok'></i> Editado Correctamente!</strong>" +
                            "    El objeto fue editado correctamente." +
                            "    </p>" +
                            "</div>";
                        bootbox.dialog(editado, [{
                            "label": "<i class='icon-ok'></i> Ok",
                            "class": "btn btn-mini",
                            "callback": function() {
                                location.reload();
                            }
                        }]);
                    } else if (iBody == "Vacio") {
                        bootbox.hideAll();
                        var editado = "" +
                            "<div class='alert alert-block alert-warning'>" +
                            "    <p>" +
                            "    <strong><i class='icon-ok'></i> No se encontraron Registros</strong>" +
                            "    Pruebe otro Rango de Fecha." +
                            "    </p>" +
                            "</div>";
                        bootbox.dialog(editado, [{
                            "label": "<i class='icon-ok'></i> Ok",
                            "class": "btn btn-mini",
                            "callback": function() {
                                location.reload();
                            }
                        }]);
                    } else {
                        var iFrameBody = $('#carga_formulario').contents().find('body').html();
                        $('.modal-body').html('');
                        $('.modal-body').html(iFrameBody);
                    }
                });
                return false;
            }
        }]);
    }
    // Inicio Crear
    $(".new").on('click', function(e) {
        e.preventDefault();
        mostrarMensajeCargando();

        $.post($(this).attr('href'), null, function(response) {
            $(".modalVer").html('');
            ocultarMensajeNav();
            EnviarFormularioAjax(response, '#new_form');
        });

        $(".modalVer").html('');

    });
    // Fin Crear
    // Inicio Crear Empresa
    $(".new_empresa").on('click', function(e) {
        e.preventDefault();
        mostrarMensajeCargando();
        $(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
            var vistaHtml = response;
            $(".modalVer").html('');
            ocultarMensajeNav();
            EnviarFormularioAjaxEmpresa(vistaHtml, '#new_form_empresa');
        });

        $(".modalVer").html('');

    });
    // Fin Crear Empresa
    // Inicio Editar
    $(".edit_empresa").on('click', function(e) {
        e.preventDefault();
        mostrarMensajeCargando();
        $(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
            var vistaHtml = response;
            ocultarMensajeNav();
            EnviarFormularioAjaxEmpresa(vistaHtml, '#edit_form_empresa');
        });
        $(".modalVer").html('');
    });
    // Fin Editar
    // Inicio Editar Empresa
    $(".edit").on('click', function(e) {
        e.preventDefault();
        mostrarMensajeCargando();
        $.post($(this).attr('href'), null, function(response) {
            $(".modalVer").html('');
            ocultarMensajeNav();
            EnviarFormularioAjax(response, '#edit_form');
        });
        $(".modalVer").html('');
    });
    // Fin Editar Empresa
    // Inicio Ver
    $(".show").on('click', function(e) {
        e.preventDefault();
        mostrarMensajeCargando();
        $(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
            // $(".modalVer").load($(this).attr('href'));
            var vistaHtml = response;
            ocultarMensajeNav();
            $(".modalVer").html('');
            bootbox.dialog(vistaHtml, [{
                "label": "Ok",
                "class": "btn btn-mini btn-info",
            }]);
        });
        $(".modalVer").html('');
    });
    // Fin Ver
    // Inicio Eliminar
    $(".delete").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<span id='span-msg-delete'>¿Estás Seguro?</span>", [{
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {}
        }, {
            "label": "Eliminar",
            "class": "btn btn-mini btn-danger",
            "callback": function() {
                mostrarMensajeEliminando()
                $('#divEliminandoObjeto').show();
                $('#table_report').hide();
                $('#table_report_wrapper').hide();
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "0") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    ocultarMensajeNav();
                    bootbox.dialog(div, [{
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "0") {
                                location.reload();
                            }
                            $('#divEliminandoObjeto').hide();
                            $('#table_report').show();
                            $('#table_report_wrapper').show();
                        }
                    }]);
                });
            }
        }]);
    });
    // Fin Eliminar


    // Inicio aprueba diferencia
    $(".aprueba").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<div class='alert alert-block alert-success'><span id='span-msg-delete'>¿Está seguro de autorizar la diferencia? </span></div>", [{
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {}
        }, {
            "label": "Autorizar",
            "class": "btn btn-mini btn-success",
            "callback": function() {
                mostrarMensajeGuardando()
                $('#divEliminandoObjeto').show();
                $('#table_report2').hide();
                $('#table_report_wrapper').hide();
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "1") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    ocultarMensajeNav();
                    bootbox.dialog(div, [{
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "1") {
                                location.reload();
                            }
                            $('#divEliminandoObjeto').hide();
                            $('#table_report').show();
                            $('#table_report_wrapper').show();
                        }
                    }]);
                });
            }
        }]);
    });
    // Fin aprueba diferencia

    // Inicio rechaza diferencia
    $(".rechaza").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<div class='alert alert-block alert-danger'><span id='span-msg-delete'>¿Está seguro de rechazar la diferencia? </span></div>", [{
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {}
        }, {
            "label": "Rechazar",
            "class": "btn btn-mini btn-danger",
            "callback": function() {
                mostrarMensajeGuardando()
                $('#divEliminandoObjeto').show();
                $('#table_report2').hide();
                $('#table_report_wrapper').hide();
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "4") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    ocultarMensajeNav();
                    bootbox.dialog(div, [{
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "4") {
                                location.reload();
                            }
                            $('#divEliminandoObjeto').hide();
                            $('#table_report').show();
                            $('#table_report_wrapper').show();
                        }
                    }]);
                });
            }
        }]);
    });
    // Fin aprueba diferencia

    // Inicio anula talonario
    $(".anula").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<span id='span-msg-delete'>¿Está seguro de anular el documento? </span>", [{
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {}
        }, {
            "label": "Anular",
            "class": "btn btn-mini btn-danger",
            "callback": function() {
                mostrarMensajeGuardando()
                $('#divEliminandoObjeto').show();
                $('#table_report').hide();
                $('#table_report_wrapper').hide();
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "2") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    ocultarMensajeNav();
                    bootbox.dialog(div, [{
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "2") {
                                location.reload();
                            }
                            $('#divEliminandoObjeto').hide();
                            $('#table_report').show();
                            $('#table_report_wrapper').show();
                        }
                    }]);
                });
            }
        }]);
    });
    // Fin anula talonario

    // Inicio aprueba diferencia
    $(".habilita").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<span id='span-msg-delete'>¿Está seguro de habilitar el documento? </span>", [{
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {}
        }, {
            "label": "Habilitar",
            "class": "btn btn-mini btn-success",
            "callback": function() {
                mostrarMensajeGuardando()
                $('#divEliminandoObjeto').show();
                $('#table_report').hide();
                $('#table_report_wrapper').hide();
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "3") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    ocultarMensajeNav();
                    bootbox.dialog(div, [{
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "3") {
                                location.reload();
                            }
                            $('#divEliminandoObjeto').hide();
                            $('#table_report').show();
                            $('#table_report_wrapper').show();
                        }
                    }]);
                });
            }
        }]);
    });
    // Fin aprueba diferencia

    // Inicio apertura de caja
    $(".abrirCaja").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<span id='span-msg-delete'>¿Está seguro de abrir la caja? </span>", [{
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {}
        }, {
            "label": "Abrir",
            "class": "btn btn-mini btn-success",
            "callback": function() {
                mostrarMensajeGuardando()
                $('#divEliminandoObjeto').show();
                $('#table_report2').hide();
                $('#table_report_wrapper').hide();
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "6" || respuesta.cod == "9") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    ocultarMensajeNav();
                    bootbox.dialog(div, [{
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "6" || respuesta.cod == "9") {
                                location.reload();
                            }
                            $('#divEliminandoObjeto').hide();
                            $('#table_report').show();
                            $('#table_report_wrapper').show();
                        }
                    }]);
                });
            }
        }]);
    });
    // Fin apertura de caja

});

function SumaSaldoVsMediosPago() {
    return;
}