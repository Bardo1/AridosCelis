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
                }
            },
            {
                "label": "<i class='icon-unlock'></i> Desbloquear",
                "class": "btn btn-mini btn-success btn-save desblqouear_boton",
                "callback": function() {
                    //$('.t_Tooltip').remove();
                    var action = $(form).attr('action');
                    var href = $(this).attr('href');
                    $(".modalVer").html('');
                    
                    $.post(action, href, function(response) {
                        if (response == "activado") {
                            var activado = "" +
                                    "<div class='alert alert-block alert-success'>" +
                                    "    <p>" +
                                    "    <strong><i class='icon-ok'></i> Desbloqueado Correctamente!</strong>" +
                                    "    El usuario fue desbloqueado correctamente." +
                                    "    </p>" +
                                    "</div>";
                            bootbox.dialog(activado, [
                                {
                                    "label": "Ok",
                                    "class": "btn btn-mini btn-info",
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
    $(".unlockuser").on('click', function(e) {
        e.preventDefault();
        $.post($(this).attr('href'), null, function(response) {
            $(".modalVer").html('');
            EnviarFormularioAjax(response, '#unlock_form');
        });

        $(".modalVer").html('');
    });
    
     $(".tryfail-desactivado").on('click', function(e) {
        $(".modalVer").html('');
        e.preventDefault();
        var href = $(this).attr('href');
       bootbox.dialog("<span class='blue'><i class='light-orange icon-info-sign icon-large '> </i></span> <strong class='grey'> INFORMACIÓN</strong>,<br><strong>Usuario Vigente</strong>,<br>No tiene restricciones de acceso a sistema.", [
                            {
                                "label": "Ok",
                                "class": "btn btn-mini btn-info",
                                "callback": function() {
                                    $(".modalVer").html('');
                }
                            }
                        ]);
    });

});