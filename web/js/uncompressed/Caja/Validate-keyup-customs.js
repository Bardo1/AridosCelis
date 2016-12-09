 function loadScriptvalidakeyup() {
                //Prevalidación para ingreso de datos en campos
                //Esto valida que pueda ingresarse alfanumericamente, todos los ID con esta caracteristica. AQUI

                $("#rebsol_hermesbundle_PagoType_nombrePnatural, #rebsol_hermesbundle_PagoType_apellidoPaterno, #rebsol_hermesbundle_PagoType_apellidoMaterno, #ApellidoP, #ApellidoM").bind("keypress", function(event) {
                    if (event.charCode !== 0) {
                        var regex = new RegExp("^[a-zA-ZñÑ]+$");
                        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                        if (!regex.test(key)) {
                            event.preventDefault();
                            return false;
                        }
                    }
                });
                //Este solo permite numeros, tampoco permite simbolos.
                $("#rebsol_hermesbundle_PagoType_fechaNacimiento, #rebsol_hermesbundle_PagoType_telefonoFijo, #rebsol_hermesbundle_PagoType_telefonoMovil, .saldoMedio, .Input_num").bind("keypress", function(event) {
                    if (event.charCode !== 0) {
                        var regex = new RegExp("^[0-9]+$");
                        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                        if (!regex.test(key)) {
                            event.preventDefault();
                            return false;
                        }
                    }
                });
                $("#rutdv, .val-rutdv").bind("keypress", function(event) {
                    if (event.charCode !== 0) {
                        var regex = new RegExp("^[0-9kK]+$");
                        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                        if (!regex.test(key)) {
                            event.preventDefault();
                            return false;
                        }
                    }
                });

            }

