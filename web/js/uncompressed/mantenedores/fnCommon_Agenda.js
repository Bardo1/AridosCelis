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
        bootbox.dialog(vistaHtml, [
        {
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini",
            "callback": function(){
                $('.tooltip-from-element-a').each(function() {
                    var selector = '#' + $(this).data('tooltip-id'); 
                });  
            }
        },
        {
            "label": "<i class='icon-save'></i> Guardar",
            "class": "btn btn-mini btn-success btn-save",
            "callback": function() {
                $('.tooltip-from-element-a').each(function() {
                    var selector = '#' + $(this).data('tooltip-id');
                });
                $(".modalVer").html('');
                var action = $(form).attr('action');
                if (form == '#add_form') {
                    var dataValores = $('.chk-grupos').find('input').serialize();
                    $('.widget-boxPerfil').each(function () {
                        var tabla       = arrTablas[$(this).data('id')];
                        var valoresAux  = tabla.$('.chk-perfil').serialize();
                        if (valoresAux != '') {
                            dataValores = dataValores+'&';
                            dataValores = dataValores+tabla.$('.chk-perfil').serialize();
                        };
                    });
                    dataValores = dataValores+'&fin=fin';
                    console.log(dataValores);
                    return false;
                } else {
                    var data = $(form).serializeArray();
                };
                $.post(action, data, function(response) {
                    if (response == "Creado") {
                        var creado = "" +
                        "<div class='alert alert-block alert-success'>" +
                        "    <p>" +
                        "    <strong><i class='icon-ok'></i> Creado Correctamente!</strong>" +
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
                        "    </p>" +
                        "</div>";
                        bootbox.dialog(editado, [
                        {
                            "label": "<i class='icon-ok'></i> Ok",
                            "class": "btn btn-mini",
                            "callback": function() {
                                location.reload();
                            }
                        }
                        ]); 
                    }else if (response == "Agregado") {
                        var agregado = "" +
                        "<div class='alert alert-block alert-success'>" +
                        "    <p>" +
                        "    <strong><i class='icon-ok'></i> Se ha agregado Correctamente!</strong>" +
                        "    </p>" +
                        "</div>";
                        bootbox.dialog(agregado, [
                        {
                            "label": "<i class='icon-ok'></i> Ok",
                            "class": "btn btn-mini",
                            "callback": function() {
                                location.reload();
                            }
                        }
                        ]);
                    }else {
                        var vistaHtml = response;
                        $(".modalVer").html('');
                        EnviarFormularioAjax(vistaHtml, form);
                    }
                });
            }
        }
        ]);
    }
    function EnviarFormularioAjaxGruposyPerfiles(vistaHtml, form) {
        $(".modalVer").html('');
        bootbox.dialog(vistaHtml, [
        {
            "label": "<i class='icon-arrow-left'></i> Volver",
            "class": "btn btn-mini",
            "callback": function(){
                $('.tooltip-from-element-a').each(function() {
                    var selector = '#' + $(this).data('tooltip-id'); 
                });
                location.reload();
            }
        },
        ]);
    }

    // Inicio Crear
    $(".new").on('click', function(e) {
        e.preventDefault();
        $(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
            $(".modalVer").html('');
            var vistaHtml = response;

            EnviarFormularioAjax(vistaHtml, '#form1');
        });
        $(".modalVer").html('');
    });
    // Fin Crear
    // Inicio Editar
    $(".edit").on('click', function(e) {
        e.preventDefault();
        $(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
            $(".modalVer").html('');
            var vistaHtml = response;
            EnviarFormularioAjax(vistaHtml, '#edit_form1');
        });
        $(".modalVer").html('');
    });
    // Fin Editar
     // Inicio Agregar
     $(".add").on('click', function(e) {
        e.preventDefault();
        $.post($(this).attr('href'), null, function(response) {
            $(".modalVer").html('');
            EnviarFormularioAjaxGruposyPerfiles(response, '#add_form');
        });

        $(".modalVer").html('');
    });
    // Fin Agregar

    
    
    // Inicio Ver
    $(".show").on('click', function(e) {
        e.preventDefault();
        $(".modalVer").load($(this).attr('href'), function(response, status, xhr) {
            // $(".modalVer").load($(this).attr('href'));
            $(".modalVer").html('');
            var vistaHtml = response;
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
        $(".modalVer").html('');
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<strong class='red'>ADVERTENCIA</strong>,<br><strong>Desactivará Usuario</strong>,<br>Esto, reflejará al Usuario <u>INACTIVO</u> en todo el sistema segun sus Perfiles.<br><br><span class='orange'><i class='light-orange icon-warning-sign icon-large '></i></span><br>- Se Desactivarán todas los atributos relacionados anteriormente a este usuario<br>- No podrá modificar ni actualizar datos de este usuario, mientras, esté en estado <u>INACTIVO</u><br>- Usuario <u>NO</u> tendrá acceso a sistema.<br><br>¿Desea Desactivar Usuario?", [
        {
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {
            }
        },
        {
            "label": "Desactivar",
            "class": "btn btn-mini btn-danger",
            "callback": function() {
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "3") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    bootbox.dialog(div, [
                    {
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "3") {
                                $(".modalVer").html('');
                                location.reload();
                            }
                        }
                    }
                    ]);
                });
            }
        }
        ]);
});
    // Fin 
    // 
     // Inicio Activar
     $(".reactivar-usuario").on('click', function(e) {
        $(".modalVer").html('');
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<strong class='green'>IMPORTANTE</strong>,<br><strong>Activará Usuario</strong>,<br>Esto, reflejará al Usuario <u>ACTIVO</u> en todo el sistema según Perfiles.<br><br><span class='orange'><i class='light-orange icon-warning-sign icon-large '></i></span><br>- Se Activarán todas las especialidades y grupos relacionados anteriormente a este usuario<br> - Edíte Especialidades de Usuario para actualizar activas e inactivas.<br> - Usuario tendrá acceso a sistema<br><br>¿Desea activar?", [
        {
            "label": "Cancelar",
            "class": "btn btn-mini",
            "callback": function() {
            }
        },
        {
            "label": "Activar",
            "class": "btn btn-mini btn-success",
            "callback": function() {
                $.post(href, function(response) {
                    var respuesta = $.parseJSON(response);
                    if (respuesta.cod == "6") {
                        var div = "<div class='alert alert-block alert-success'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    } else {
                        var div = "<div class='alert alert-block alert-danger'><p><strong><i class='icon-ok'></i> " + respuesta.msg + "</strong></p>";
                    }
                    bootbox.dialog(div, [
                    {
                        "label": "Ok",
                        "class": "btn btn-mini btn-info",
                        "callback": function() {
                            if (respuesta.cod == "6") {
                                $(".modalVer").html('');
                                location.reload();
                            }
                        }
                    }
                    ]);
                });
            }
        }
        ]);
});
    // Fin Activar
    
    //inicio usuario Administrador
    
    $(".user-administrador").on('click', function(e) {
        $(".modalVer").html('');
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<span class='blue'><i class='light-orange icon-warning-sign icon-large '> </i></span> <strong class='grey'> ATENCIÓN</strong>,<br><strong>Usuario en Sesión Actual</strong>,<br><u>No se puede desactivar</u> usuario con sesión activa en Sistema.", [
        {
            "label": "Ok",
            "class": "btn btn-mini btn-info",
            "callback": function() {
                $(".modalVer").html('');
            }
        }
        ]);
    });
    
    //Fin usuario administrador 
     //inicio Mantenedor sin datos

     $(".Mantenedor-sininfo").on('click', function(e) {
        $(".modalVer").html('');
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<span class='orange'><i class='light-orange icon-warning-sign icon-large '> </i></span> <strong class='grey'> ¡Importante!</strong>,<br>No podrá efectuar cambios en la edición de datos de Usuario/Profesional, mientras no regularice e ingrese datos en Mantenedor. ", [
        {
            "label": "Ok",
            "class": "btn btn-mini btn-info",
            "callback": function() {
                $(".modalVer").html('');
            }
        }
        ]);
    });

    //Fin Mantenedor sin dattos
    $(".user-desactivado").on('click', function(e) {
        $(".modalVer").html('');
        e.preventDefault();
        var href = $(this).attr('href');
        bootbox.dialog("<span class='blue'><i class='light-orange icon-warning-sign icon-large '> </i></span> <strong class='grey'> ATENCIÓN</strong>,<br><strong>Usuario Inactivo</strong>,<br>No tiene acceso a generar modificaciones en usuario con estado <u>INACTIVO</u>.", [
        {
            "label": "Ok",
            "class": "btn btn-mini btn-info",
            "callback": function() {
                $(".modalVer").html('');
            }
        }
        ]);
    });
    // Fin alertdesactivado
    
    
    
    
});