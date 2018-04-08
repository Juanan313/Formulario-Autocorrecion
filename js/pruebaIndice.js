var PREGUNTASXML = [];

/*--- Función onload para cargar todo los eventos y las llamadas a las funciones -----*/
window.onload = function () {
    $(function () {
        $("#accordion").accordion();
    });
    cargarPreguntasXML();
    prepararPreguntasXML();

    $("#loadXml").on("clikc", function () {
        crearRadio(1);
    });
    $("#left").on("click", function () {
        closeSideBar();
    });
    $("#right").on("click", function () {
        openSideBar();
    });
};
    
    function cargarPreguntasXML (){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                parser = new DOMParser();
	            xmlDoc = parser.parseFromString(xhttp.responseText,"text/xml");
                PREGUNTASXML = $(xmlDoc).find("pregunta");
            }
        };
        xhttp.open("GET", "https://raw.githubusercontent.com/Juanan313/Formulario-Autocorrecion/master/js/triviaWow.xml", true);
        xhttp.send();
        
        
    }

    /* ----- Funcion tratar XML -----------*/

    function prepararPreguntasXML() {
        var numPreguntas = PREGUNTASXML.length;
        for (var i = 0; i < numPreguntas; i++) {

        var tipo = PREGUNTASXML[i].getElementsByTagName('Tipo')[0].innerHTML;

        switch (tipo) {
            case "Selección":
                crearRadio(i);
                break;
            case "Múltiple":
                crearCheck(i);
                break;
            case "selecttext":
                crearText(i);
            default:
                console.log("default");
            }
            console.log("------");
        }
    }

    
    function crearRadio(indice) {
        var pregunta = $(PREGUNTASXML.get(indice));
        var enunciado = $("<h3/>").html(pregunta.find('Enunciado').text());
        var accordionPregunta = $("<div/>").html(pregunta.find())
        return enunciado;
    }

    function crearCheck(indice) {
        
    }

    function crearText(indice) {
        
    }








    /*--- Abre y cierra la barra lateral ----*/
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
    /* --------------------------------------*/