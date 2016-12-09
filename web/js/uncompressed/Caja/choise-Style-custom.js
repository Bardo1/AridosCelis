/* 
 * Tool to incorporate a style to Select
 */
function choisestyle_comuna() {
    //OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
    //carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).

            $("#rebsol_hermesbundle_PagoType_comuna").addClass("chosen-select");
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Comuna"});
        }

        function choisestyle_campos_prevision() {
    //OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
    //carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).
    if(idReservaAtencion){}else{
            $("#rebsol_hermesbundle_PrestacionType_prevision").addClass("chosen-select");
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Prevision"});
            $("#rebsol_hermesbundle_PrestacionType_convenio").addClass("chosen-select");
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Convenio"});
            $('#rebsol_hermesbundle_PrestacionType_convenio').prop('disabled', true).trigger("liszt:updated");

           // $('#rebsol_hermesbundle_PrestacionType_origenSelect').addClass("chosen-select");
           // $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Profesional"});
            
            $('#rebsol_hermesbundle_PrestacionType_derivadoSelect').addClass("chosen-select");
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Profesional"});

            $("#rebsol_hermesbundle_PrestacionType_plan").addClass("chosen-select select-plan");
            $("#rebsol_hermesbundle_PrestacionType_plan").chosen({width: "215px",
                allow_single_deselect: true, no_results_text: "No se ha encontrado Plan, disable_search_threshold: 2"
            });
            $('#rebsol_hermesbundle_PrestacionType_plan').prop('disabled', true).trigger("liszt:updated");
            }
        }
              function choisestyle_campos_previsionReserva() {
    //OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
    //carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).
           
            $("#rebsol_hermesbundle_PrestacionType_convenio").addClass("chosen-select");
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Convenio"});

            //$('#rebsol_hermesbundle_PrestacionType_origenSelect').addClass("chosen-select");
            //$(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Profesional"});
           

            $("#rebsol_hermesbundle_PrestacionType_plan").addClass("chosen-select select-plan");
            $("#rebsol_hermesbundle_PrestacionType_plan").chosen({width: "215px",
                allow_single_deselect: true, no_results_text: "No se ha encontrado Plan, disable_search_threshold: 2"
            });
        }
   function choisestyle_campos_prevision_api1() {
    //OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
    //carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).

          
            $("#rebsol_hermesbundle_PrestacionType_convenio").addClass("chosen-select");
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Convenio"});
            $('#rebsol_hermesbundle_PrestacionType_prevision').prop('readOnly', true).trigger("liszt:updated");

           // $('#rebsol_hermesbundle_PrestacionType_origenSelect').addClass("chosen-select");
           // $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Profesional"});
           

            $("#rebsol_hermesbundle_PrestacionType_plan").addClass("chosen-select select-plan");
            $("#rebsol_hermesbundle_PrestacionType_plan").chosen({width: "215px",
                allow_single_deselect: true, no_results_text: "No se ha encontrado Plan"
            });
        }
        function choisestyle_campos_profesionales() {
    //OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
    //carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).
            $('#rebsol_hermesbundle_PrestacionType_derivadoSelect').addClass("chosen-select");
            $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Profesional"});
        }

        function choisestyle_campos_origen() {
    //OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
    //carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).
         //   $('#rebsol_hermesbundle_PrestacionType_origenSelect').addClass("chosen-select");
         //   $(".chosen-select").chosen({width: "215px", no_results_text: "No se ha encontrado Origen"});
        }

        function choisestyle_campo_plan() {
    //OBSERVACION: debe ejecutarse despues de haber cargado la comuna en una consulta, pues, se escribe sobre la respuesta de DB en el campo, y deja como vacia, la solución fue cargarla con un DELAY(), despues de
    //carga comuna  en el input, esta es funcion pasiregioncomunaBuscaconId(comuna).

            $("#rebsol_hermesbundle_PrestacionType_plan").addClass("chosen-select select-plan");
            $("#rebsol_hermesbundle_PrestacionType_plan").chosen({width: "215px",
                allow_single_deselect: true, no_results_text: "No se ha encontrado Plan"
            });
            $('#rebsol_hermesbundle_PrestacionType_plan').prop('disabled', false).trigger("liszt:updated");

        }


