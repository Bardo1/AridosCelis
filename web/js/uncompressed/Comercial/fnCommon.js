//Función para la actualización masiva, que permite generar mensajes de espera mientras se realiza la actualización.
function ActualizacionMasiva(vistaHtml, form) {
    $(".modalVer").html('');
    bootbox.dialog(vistaHtml, [
        {
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini"            
        },
        {
            "label": "<i class='icon-save'></i> Guardar",
            "class": "btn btn-mini btn-success",
            "callback": function() {
                $('#divActualizacionMasiva').show();
                $('#tabla_titulo').hide();
                $('#table_report2').hide();
                $(".modalVer").html('');
                var action = $(form).attr('action');
                var data = $(form).serializeArray();
                $.post(action, data, function(response) {
                    if (response == "Ajustado") {
                        location.reload();
                    } else {
                        var vistaHtml = response;
                        $('#divActualizacionMasiva').hide();
                        $('#tabla_titulo').show();
                        $('#table_report2').show();
                        $(".modalVer").html('');
                        ActualizacionMasiva(vistaHtml, form);
                    }
                });
            }
        }
    ]);
}

//Función que es utlizada para el envío de formularios desde el datatable
function EnviarFormularioAjax(vistaHtml, form) {
    $(".modalVer").html('');
    bootbox.dialog(vistaHtml, [
        {
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini"
        },
        {
            "label": "<i class='icon-save'></i> Guardar",
            "class": "btn btn-mini btn-success btn-recarga",
            "callback": function() {
                $(".modalVer").html('');
                var action = $(form).attr('action');
                var data = $(form).serializeArray();
                $.post(action, data, function(response) {
                    if (response == "Creado") {
                        var creado = "" +
                                "<div class='alert alert-block alert-success'>" +
                                "    <p>" +
                                "    <strong><i class='icon-ok'></i> Creado Correctamente!</strong>" +
                                "    El objeto fue creado correctamente." +
                                "    </p>" +
                                "</div>";
                        bootbox.dialog(creado, [
                            {
                                "label": "Ok",
                                "class": "btn btn-mini btn-info",
                                "callback": function() {
                                    location.reload();
                                }
                            }
                        ]);
                    } else if (response == "Editado") {
                        var editado = "" +
                                "<div class='alert alert-block alert-success'>" +
                                "    <p>" +
                                "    <strong><i class='icon-ok'></i> Editado Correctamente!</strong>" +
                                "    El objeto fue editado correctamente." +
                                "    </p>" +
                                "</div>";
                        bootbox.dialog(editado, [
                            {
                                "label": "Ok",
                                "class": "btn btn-mini btn-info",
                                "callback": function() {
                                    location.reload();
                                }
                            }
                        ]);
                    } else if (response == "Ajustado") {
                        location.reload();
                    } else {
                        var vistaHtml = response;
                        $(".modalVer").html('');
                        EnviarFormularioAjax(vistaHtml, form);
                    }
                });
            }
        }
    ]);
}


$(document).on('ready', function() {
    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
    
    // Inicio Crear
    $(".new").on('click', function(e) {
        e.preventDefault();
        $(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
            var vistaHtml = response;
            $(".modalVer").html('');
            EnviarFormularioAjax(vistaHtml, '#new_form');
        });
        $(".modalVer").html('');
    });
    // Fin Crear
        
    // Inicio Editar
    $(".edit").on('click', function(e) {
        e.preventDefault();
        $.post($(this).attr('href'), null, function(response) {
            var vistaHtml = response;
            EnviarFormularioAjax(vistaHtml, '#edit_form');
        }).error(function(xhr, textResponse, errorThrown) {
            xhr.textResponse;
        });
        
    });
    // Fin Editar
    
    // Inicio Ver
    $(".show").on('click', function(e) {
        e.preventDefault();
        $.post($(this).attr('href'), null, function(response) {
            var vistaHtml = response;
            bootbox.dialog(vistaHtml, [{
                    "label": "Ok",
                    "class": "btn btn-mini btn-info",
                }]);
        }).error(function(xhr, textResponse, errorThrown) {
            xhr.textResponse;
        });
        $(".modalVer").html('');
    });
    // Fin Ver
    
    // Inicio Ver Arancel
    $(".show-arancel").on('click', function(e) {
        e.preventDefault();
        $.post($(this).attr('href'), null, function(response) {
            var vistaHtml = response;
            bootbox.dialog(vistaHtml, [{
                    "label": "Ok",
                    "class": "btn btn-mini btn-info btn-showArancel",
                }]);
        }).error(function(xhr, textResponse, errorThrown) {
            xhr.textResponse;
        });
    });
    // Fin Ver Arancel
    
    // Inicio Eliminar
    var mensaje = "<div class='alert alert-warning'><strong>!</strong> ¿Está seguro? </div>";
    $(".delete").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog(mensaje, [
            {
                "label": "Cancelar",
                "class": "btn btn-mini",
                "callback": function() {

                }
            },
            {
                "label": "Eliminar",
                "class": "btn btn-mini btn-danger",
                "callback": function() {
                    //Estas tres primeras lineas, nos permiten mostrar el mensaje "Eliminando Plan..." mientras desaparece la tabla durante el proceso de eliminar un plan o un arancel
                    $('#divEliminandoObjeto').show();
                    $('#table_report').hide();
                    $('#table_report_wrapper').hide();

                    $.post(href, function(response) {
                        var respuesta = $.parseJSON(response);
                        if (respuesta.cod == "0") {
                            var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                        } else {
                            var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-remove'></i> " + respuesta.msg + "</strong></p>";
                        }
                        bootbox.dialog(div, [
                            {
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
                            }
                        ]);
                    });
                }
            }
        ]);
    });
    // Fin Eliminar
    
    // Inicio Eliminar
    var mensaje = "<div class='alert alert-warning'><strong>!</strong> ¿Está seguro? </div>";
    $(".eliminaArancel").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog(mensaje, [
            {
                "label": "Cancelar",
                "class": "btn btn-mini",
                "callback": function() {

                }
            },
            {
                "label": "Eliminar",
                "class": "btn btn-mini btn-danger",
                "callback": function() {
                    //Estas tres primeras lineas, nos permiten mostrar el mensaje "Eliminando Plan..." mientras desaparece la tabla durante el proceso de eliminar un plan o un arancel
                    $('#divEliminandoObjeto').show();
                    $('#table_reportx').hide();
                    $('#table_report_wrapper').hide();

                    $.post(href, function(response) {
                        var respuesta = $.parseJSON(response);
                        if (respuesta.cod == "0") {
                            var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                        } else {
                            var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-remove'></i> " + respuesta.msg + "</strong></p>";
                        }
                        bootbox.dialog(div, [
                            {
                                "label": "Ok",
                                "class": "btn btn-mini btn-info",
                                "callback": function() {
                                    if (respuesta.cod == "0") {
                                        location.reload();                                       

                                    }
                                    $('#divEliminandoObjeto').hide();
                                    $('#table_reportx').show();
                                    $('#table_report_wrapper').show();
                                }
                            }
                        ]);
                    });
                }
            }
        ]);
    });
    
    
    // Inicio Eliminar
    var mensaje = "<div class='alert alert-warning'><strong>!</strong> ¿Está seguro? </div>";
    $(".inactivarHorario").on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog(mensaje, [
            {
                "label": "Cancelar",
                "class": "btn btn-mini",
                "callback": function() {

                }
            },
            {
                "label": "Eliminar",
                "class": "btn btn-mini btn-danger",
                "callback": function() {
                    //Estas tres primeras lineas, nos permiten mostrar el mensaje "Eliminando Plan..." mientras desaparece la tabla durante el proceso de eliminar un plan o un arancel
                    $('#divInactivarHorario').show();
                    $('#tablaHorarios').hide();     

                    $.post(href, function(response) {
                        var respuesta = $.parseJSON(response);
                        if (respuesta.cod == "0") {
                            var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                        } else {
                            var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-remove'></i> " + respuesta.msg + "</strong></p>";
                        }
                        bootbox.dialog(div, [
                            {
                                "label": "Ok",
                                "class": "btn btn-mini btn-info",
                                "callback": function() {
                                    if (respuesta.cod == "0") {
                                        location.reload(); 
                                    }
                                     $('#divInactivarHorario').show();
                                     $('#tablaHorarios').hide();                                     
                                }
                            }
                        ]);
                    });
                }
            }
        ]);
    });
    
    
    
});
