window.onload = function() {
    $( function() {
        $( "#accordion" ).accordion();
      } );
      cargarPreguntasXML();

    $("#left").on("click",function(){
        closeSideBar();
    })
    $("#right").on("click",function(){
        openSideBar();
    })
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

    function closeSideBar() {
        element = document.getElementById("xsocial");
        element.style.display = "none";
        button = document.getElementById("right");
        button.style.display = "block";
    }
    
    function openSideBar() {
        element = document.getElementById("xsocial");
        element.style.display = "block";
        button = document.getElementById("right");
        button.style.display = "none";
    }