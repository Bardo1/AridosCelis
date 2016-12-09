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
                    //$('.t_Tooltip').remove();
                     $('.tooltip-from-element-a').each(function() {
                                                    var selector = '#' + $(this).data('tooltip-id');
                                                });
                    $(".modalVer").html('');
                    var action = $(form).attr('action');
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
                            bootbox.dialog(editado, [
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
    
    $(".editt").on('click', function(e) {
		e.preventDefault();
        $.post($(this).attr('href'), null, function(response) {
            EnviarFormularioAjax(response, '#formDir');
        });
	});
    
});