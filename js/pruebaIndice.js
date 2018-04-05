window.onload = function() {
    $( function() {
        $( "#accordion" ).accordion();
      } );
      cargarPreguntasXML();
    };
    
    
    function cargarPreguntasXML() {
        $.ajax({
            type: "GET",
            url: "https://rawgit.com/Juanan313/Formulario-Autocorrecion/master/js/triviaWow.xml",
            contentType: "application/json; charset=utf-8",
            dataType: "xml",
            success: function (data) {
                PREGUNTASXML = data;
    
            },
            error: function (e) {
                console.log(e.responseText);
                alert("Error al procesar la petición AJAX de Preguntas.");
            }
        }); 
    }