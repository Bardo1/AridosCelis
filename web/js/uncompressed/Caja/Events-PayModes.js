 var validaFormadePagoBonoElectronico = 0;

                           $(".Input_checkbox").click(function(event) {
                             
                             var a = $(this).attr('data-tipo');
                             // if($(".Input_checkbox[data-tipo='"+a+"']").parents().eq(2).find('.Input_checkbox_Bool').val() == 1){
                             if($(".Input_checkbox[data-tipo='"+a+"']").is(':checked')){
                              ///// SOLO BONo elECTRONICO O BONO MANUAL
                               // if(a == 'belectronico'){
                               //    $(".Input_checkbox[data-tipo='bmanual']").parent().hide();
                               //    $(".Input_checkbox[data-tipo='belectronico']").parent().show();
                               // }
                               // if(a == 'bmanual'){
                               //    $(".Input_checkbox[data-tipo='belectronico']").parent().hide();
                               //    $(".Input_checkbox[data-tipo='bmanual']").parent().show();
                               // }
                             }else{
                                  $(".Input_checkbox[data-tipo='bmanual']").parent().show();
                                  $(".Input_checkbox[data-tipo='belectronico']").parent().show();
                               
                                  $(".Input_checkbox[data-tipo='belectronico']").parent().show();
                                  $(".Input_checkbox[data-tipo='bmanual']").parent().show();
                             }
                              // 
                           });
 
                            function IniciamedioPago(Valor_Pagar) {
                                $(".sumaTotalMediosDePago").html(Valor_Pagar);
                                $(".SaldoTotalMediosDePago").html(Valor_Pagar);
                                $("#sumaTotal").html("");
                                $("#sumaTotal").html(Valor_Pagar);
                                SumaSaldoVsMediosPago();
                                $( ".Input_num, .Input_text, .val-rutdv, .Input_select" ).bind("keyup change", function(e) {
                                    SumaSaldoVsMediosPago(); 
                                    //FYIconsole.log("cada vez que presiona una tecla");
                                });
                              

                            }
                            function SumaSaldoVsMediosPago() {
                                var resultVal = 0;
                                var re;
                                
                                
                                if($('#sumaTotalMediosDePago:visible').length > 0){
                                $("#MediosDePago").find('.saldoMedio').each(function() {
                                    if ($(this).val().length > 0) {
                                        re = $(this).val();
                                        resultVal += parseFloat(re);
                                    }
                                });
                                        resultVal = removeComas($("#sumaTotalMediosDePago").text()) - resultVal;
                                        $("#SaldoTotalMediosDePago").html("").html(addCommas(resultVal));
                                           setTimeout(function(){
                                                    VerificaSaldoCero();
                                           },300);
                                   }

                               if($('#sumaTotalOtrosMedios:visible').length > 0){
                                $("#OtrosMedios").find('.saldoMedio').each(function() {
                                    if ($(this).val().length > 0) {
                                        re = $(this).val();
                                        resultVal += parseFloat(re);
                                    }
                                });
                                         resultVal = removeComas($("#sumaTotalOtrosMedios").text()) - resultVal;
                                        $("#SaldoTotalOtrosMedios").html("").html(addCommas(resultVal));
                                        setTimeout(function(){
                                                    VerificaSaldoCero();
                                           },300);
                                   }

                                VerificaSaldoCero();
                            }
                            //funcion en constante uso que valida si el monto es 0.00 o es distinto a 0.00 para proceder a pagar
                            function VerificaSaldoCero() {
                                
                             if($('#sumaTotalOtrosMedios:visible').length > 0){
                                var totalrestante = removeComas($("#SaldoTotalOtrosMedios").text());
                                if (totalrestante == 0) {
                                    // switch (totalrestante) { 
                                    // case 0:
                                    var count = 0;
                                   if($('input[class*=Input_num]:visible:input').length > 0){
                                       $('input[class*=Input_num]:visible:input').each(function() {
                                            if($(this).val().length  < 1){
                                                count = count +1;
                                               //   $(this).append("<div class='clearfix'></div><div class='red alert_Input_text'>Debe ingresar Información.</div>");
                                                   var append = $(this).closest(".input-append").children('span').children('i');
                                                    append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                   if($('input[class*=val-rutdv]:visible:input').length > 0){
                                       $('input[class*=val-rutdv]:visible:input').each(function() {
                                            if($(this).val().length  < 1){
                                              //    $(this).append("<div class='clearfix'></div><div class='red alert_Input_text'>Debe ingresar Rut.</div>");
                                                count = count +1;
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                     if($('input[class*=Input_text]:visible:input').length > 0){
                                       $('input[class*=Input_text]:visible:input').each(function() {
                                            if($(this).val().length  < 1){
                                                count = count +1;
                                              //  $(this).append("<div class='clearfix'></div><div class='red alert_Input_text'>Debe ingresar Información.</div>");
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                    if($('.Input_select:visible').length > 0){
                                      $('.Input_select:visible').each(function() {
                                            if($(this).val()  === "" || $(this).val()  === null || $(this).val()  == "" || $(this).val()  == null){
                                                count = count +1;
                                                  //$(this).append("<div class='clearfix'></div><div class='red alert_Input_select'>Debe seleccionar una opción.</div>");
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                    
                                    if( count == 0){
                                    $("#saldototalpagarOtros").removeClass('alert alert-danger').addClass('alert alert-block alert-success');
                                    $('.Input_select').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                    $('.Input_num').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                    $('.Input_text').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                   $('.val-rutdv').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                        
                                        $("#btn-pagar-Otros").show();
                                        $(".alerta_exceso").hide();
                                        $(".alerta_falta").hide();
                                    }else{
                                        $("#saldototalpagarOtros").removeClass('alert alert-block alert-success').addClass('alert alert-danger');
                                        $("#btn-pagar-Otros").fadeOut("slow");
                                        $(".alerta_falta").show();
                                    }
                                    //   break;
                                }
                                if (totalrestante < 0) {
                                    //case (totalrestante < 0):
                                    $("#saldototalpagarOtros").removeClass('alert alert-block alert-success').addClass('alert alert-danger');
                                    $("#btn-pagar-Otros").fadeOut("slow");
                                    $(".alerta_exceso").show();
                                    $(".alerta_falta").hide();
                                    //break;
                                }
                                if (totalrestante > 0) {
                                    //case (totalrestante > 0):
                                    $("#saldototalpagarOtros").removeClass('alert alert-block alert-success').addClass('alert alert-danger');
                                    $("#btn-pagar-Otros").fadeOut("slow");
                                    $(".alerta_falta").hide();
                                    $(".alerta_exceso").hide();
                                    // break;
                                }
                            
                                  }
                             if($('#sumaTotalMediosDePago:visible').length > 0){
                                var totalrestante = removeComas($("#SaldoTotalMediosDePago").text());
                                if (totalrestante == 0) {
                                    // switch (totalrestante) { 
                                    // case 0:
                                    var count = 0;
                                   if($('input[class*=Input_num]:visible:input').length > 0){
                                       $('input[class*=Input_num]:visible:input').each(function() {
                                            if($(this).val().length  < 1){
                                                count = count +1;
                                               //   $(this).append("<div class='clearfix'></div><div class='red alert_Input_text'>Debe ingresar Información.</div>");
                                                   var append = $(this).closest(".input-append").children('span').children('i');
                                                    append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                   if($('input[class*=val-rutdv]:visible:input').length > 0){
                                       $('input[class*=val-rutdv]:visible:input').each(function() {
                                            if($(this).val().length  < 1){
                                              //    $(this).append("<div class='clearfix'></div><div class='red alert_Input_text'>Debe ingresar Rut.</div>");
                                                count = count +1;
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                     if($('input[class*=Input_text]:visible:input').length > 0){
                                       $('input[class*=Input_text]:visible:input').each(function() {
                                            if($(this).val().length  < 1){
                                                count = count +1;
                                              //  $(this).append("<div class='clearfix'></div><div class='red alert_Input_text'>Debe ingresar Información.</div>");
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                    if($('.Input_select:visible').length > 0){
                                      $('.Input_select:visible').each(function() {
                                            if($(this).val()  === "" || $(this).val()  === null || $(this).val()  == "" || $(this).val()  == null){
                                                count = count +1;
                                                  //$(this).append("<div class='clearfix'></div><div class='red alert_Input_select'>Debe seleccionar una opción.</div>");
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.addClass('red');
                                            }else{
                                                  var append = $(this).closest(".input-append").children('span').children('i');
                                                 append.removeClass('red');
                                            }
                                          });
                                   }
                                    
                                    if( count == 0){
                                        //FYIconsole.log("es igual a 0");
                                    $("#saldototalpagar").removeClass('alert alert-danger').addClass('alert alert-block alert-success');
                                    $('.Input_select').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                    $('.Input_num').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                    $('.Input_text').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                   $('.val-rutdv').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                        $("#btn-pagar").show();
                                        $(".alerta_exceso").hide();
                                        $(".alerta_falta").hide();
                                    }else{
                                        $("#saldototalpagar").removeClass('alert alert-block alert-success').addClass('alert alert-danger');
                                        $("#btn-pagar").fadeOut("slow");
                                        $(".alerta_falta").show();
                                    }
                                    //   break;
                                }
                                if (totalrestante < 0) {
                                    //case (totalrestante < 0):
                                    //FYIconsole.log("es menor que 0");
                                    $("#saldototalpagar").removeClass('alert alert-block alert-success').addClass('alert alert-danger');
                                    $("#btn-pagar").fadeOut("slow");
                                    $(".alerta_exceso").show();
                                    $(".alerta_falta").hide();
                                    //break;
                                }
                                if (totalrestante > 0) {
                                    //case (totalrestante > 0):
                                    //FYIconsole.log("es mayor que 0");
                                    $("#saldototalpagar").removeClass('alert alert-block alert-success').addClass('alert alert-danger');
                                    $("#btn-pagar").fadeOut("slow");
                                    $(".alerta_falta").hide();
                                    $(".alerta_exceso").hide();
                                    // break;
                                }
                            }
                            
                            }
                    
                            //expande contrae tablas
                            function showTablas(num, tipo) {
                                if(tipo == 3 && validaFormadePagoBonoElectronico == 0 && $("#tabla_"+num).is(':hidden')){
                                  medioBonoElectronico(num, tipo);
                                
                                }
                                // else{
                                    
                                 // if($("#tabla_"+num+"_IMED").is(':visible')){
                                 //     $(".header-color-blue").parent().find("#tabla_"+num+"_IMED").parent().find('input:checked').attr('checked', false);  // <- vuelve a quedar desChequed mediante codigo el boton
                                 //     $("#tabla_"+num+"_IMED").slideUp();
                                 //     $('#tabla_' + num).slideUp();
                                 //     $('.class_' + num).val("");
                                 //     $('#rebsol_hermesbundle_MediosPagoType_medioPago_'+num).val(0);
                                 //    var aux_cant = $(".form_" + num).length;
                                 //    while (aux_cant > 0) {
                                 //        $('.tabla_' + num + '_' + aux_cant).empty().remove();
                                 //        var aux_cant = aux_cant - 1;
                                 //        $('.clonar_' + num + '_' + aux_cant).show();
                                 //    }
                                 //    $('.aux_mesage').hide;
                                    
                                 //    $('.Input_select').each(function() {
                                 //                var append = $(this).closest(".input-append").children('span').children('i');
                                 //                append.removeClass('red');
                                 //            });
                                 //    $('.Input_num').each(function() {
                                 //                var append = $(this).closest(".input-append").children('span').children('i');
                                 //                append.removeClass('red');
                                 //            });
                                 //      $('.Input_text').each(function() {
                                 //                var append = $(this).closest(".input-append").children('span').children('i');
                                 //                append.removeClass('red');
                                 //            });
                                 //      $('.val-rutdv').each(function() {
                                 //                var append = $(this).closest(".input-append").children('span').children('i');
                                 //                append.removeClass('red');
                                 //            });
                                    
                                 //    var append = $(this).closest(".input-append").children('span').children('i');
                                 //        append.removeClass('red');
                                    
                                 //    SumaSaldoVsMediosPago();
                                 //    validaFormadePagoBonoElectronico = 0;
                                 // }else{ 
                                     
                                if ($('#tabla_' + num).is(':visible')) {
                                    $('#tabla_' + num).slideUp();
                                    $('.class_' + num).val("");
                                    $('#rebsol_hermesbundle_MediosPagoType_medioPago_'+num).val(0);
                                    var aux_cant = $(".form_" + num).length;
                                    while (aux_cant > 0) {
                                        $('.tabla_' + num + '_' + aux_cant).empty().remove();
                                        var aux_cant = aux_cant - 1;
                                        $('.clonar_' + num + '_' + aux_cant).show();
                                    }
                                    $('.aux_mesage').hide;
                                    
                                    $('.Input_select').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                    $('.Input_num').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                      $('.Input_text').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                      $('.val-rutdv').each(function() {
                                                var append = $(this).closest(".input-append").children('span').children('i');
                                                append.removeClass('red');
                                            });
                                    
                                    var append = $(this).closest(".input-append").children('span').children('i');
                                        append.removeClass('red');
                                    
                                    SumaSaldoVsMediosPago();
                                    validaFormadePagoBonoElectronico = 0;
                                } else {
                                     $('#tabla_' + num).slideDown();
                                     $('#rebsol_hermesbundle_MediosPagoType_medioPago_'+num).val(1);
                                     $('.aux_mesage').hide;
                                     SumaSaldoVsMediosPago();
                                  }
                                // }
                              // }
                            }
                            
                            function Eliminar(id, cantidad) {
                                if (cantidad > 0) {
                                    $('.tabla_' + id + '_' + cantidad).empty().remove();
                                    $('#rebsol_hermesbundle_MediosPagoType_dinamico_'+id).val(cantidad);
                                    var cantidad = cantidad - 1;
                                    $('.clonar_' + id + '_' + cantidad).show();
                                    SumaSaldoVsMediosPago();

                                } else {
                                    return false;
                                }
                            }
 function camporutFormatDinamico(rut, aux) {
                                var rutTemp = rut.replace(/\./g, "");
                                var rut = rutTemp.replace(/-/g, "");
                                //  var rut = rutTemp.replace(/ /g, "");
                                var rut = reformatDinamico(rut);
                                $("#rebsol_hermesbundle_MediosPagoType_rut_" + aux).val(rut);
                            }
                            function reformatDinamico(rutsinformato) {
                                if (!rutsinformato) {
                                    var sRutFormateado = "";
                                    return sRutFormateado;
                                } else {
                                    var largo = rutsinformato.length;
                                    var r = rutsinformato.substr(0, largo - 1);
                                    var dv = rutsinformato.substr(largo - 1, largo);
                                    var Rut = r;
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
                            }
                            function preparaRutDinamico(rut) {

                                //prepara rut para la la consulta en controlador
                                var rutTemp = rut.replace(/\./g, "");
                                var rut = rutTemp.replace(/-/g, "");
                                var rut = rutTemp.replace(/ /g, "");
                                var largo = rut.length;
                                var r = rut.substr(0, largo - 1);
                                var dv = rut.substr(largo - 1, largo);
                                var rut = r + "-" + dv;

                                return rut;
                            }
                            function limpiarayapuntioDinamico(aux) {
                                $("#rebsol_hermesbundle_MediosPagoType_rut_" + aux).each(function() {
                                    var algo = $(this).val();
                                    var rrb1 = algo.replace(/\./g, "");
                                    $(this).val(rrb1);
                                });

                                $("#rebsol_hermesbundle_MediosPagoType_rut_" + aux).each(function() {
                                    var algo = $(this).val();
                                    var rrb1 = algo.replace(/-/g, "");
                                    $(this).val(rrb1);
                                });
                                $("#rebsol_hermesbundle_MediosPagoType_rut_" + aux).each(function() {
                                    var algo = $(this).val();
                                    var rrb1 = algo.replace(/ /g, "");
                                    $(this).val(rrb1);
                                });
                            }
                            function accionokDinamico(aux) {
                                var append = $("#rebsol_hermesbundle_MediosPagoType_rut_" + aux).closest(".input-append").children('span').children('i');
                                append.removeClass('icon-spinner icon-spin add-on dark-opaque icon-asterisk');
                                append.addClass('icon-ok icon-large green');
                                $("#errorrut_" + aux).slideUp();
                            }
                            function accionerrorDinamico(aux) {
                                var append = $("#rebsol_hermesbundle_MediosPagoType_rut_" + aux).closest(".input-append").children('span').children('i');
                                append.removeClass('icon-spinner icon-spin add-on dark-opaque green icon-asterisk');
                                append.addClass('icon-remove icon-large red');
                                //$("#rebsol_hermesbundle_MediosPagoType_rut_"+aux).val("");
                                $("#errorrut_" + aux).slideDown();
                            }                            