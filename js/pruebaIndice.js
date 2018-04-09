var PREGUNTASXML;

/*--- Función onload para cargar todo los eventos y las llamadas a las funciones -----*/
window.onload = function () {
    $(function () {
        $("#accordion").accordion();
    });
    cargarPreguntasXML();




    // $("#loadXml").on("clikc", function () {
    //     crearRadio(1);
    // });
    $("#left").on("click", function () {
        closeSideBar();
    });
    $("#right").on("click", function () {
        openSideBar();
    });
};

function cargarPreguntasXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
            PREGUNTASXML = xmlDoc.getElementsByTagName("pregunta");
            prepararPreguntasXML()
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
            case " Selección ":
                crearRadio(i);
                break;
            case " Múltiple ":
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
    var pregunta = PREGUNTASXML[indice];
    var texto;
    texto = $(pregunta).find("Enunciado").text();

    var enunciado = $("<h3/>").append("texto");
    var accordionPregunta = $("<div/>").html("Elija una posible respuesta: ")
    var respuestas = "<form id='" + indice + "'>";
    var textoRespuestas = $(pregunta).find("Respuestas");
    respuestas += "<input type='radio' name='pregunta' value='a' checked> <label>" + textoRespuestas.find("A").text() + "</label><br/>";
    respuestas += "<input type='radio' name='pregunta' value='b' > <label>" + textoRespuestas.find("B").text() + "</label><br/>";
    respuestas += "<input type='radio' name='pregunta' value='c' > <label>" + textoRespuestas.find("C").text() + "</label><br/>";
    respuestas += "<input type='radio' name='pregunta' value='d' > <label>" + textoRespuestas.find("D").text() + "</label><br/>";
    respuestas += "</form>";
    accordionPregunta.append(respuestas);

    $("#accordion").append("<h3>" + texto + "</h3>");
    $("#accordion").append(accordionPregunta);
}

function crearCheck(indice) {
    var pregunta = PREGUNTASXML[indice];
    var texto;
    texto = $(pregunta).find("Enunciado").text();

    var enunciado = $("<h3></h3>").append("texto");
    var accordionPregunta = $("<div/>").html("Elija todas las posibles respuestas que considere: ")
    var respuestas = "<form id='" + indice + "'>";
    var textoRespuestas = $(pregunta).find("Respuestas");
    respuestas += "<input type='checkbox' name='pregunta' value='a' > <label>" + textoRespuestas.find("A").text() + "</label><br/>";
    respuestas += "<input type='checkbox' name='pregunta' value='b' > <label>" + textoRespuestas.find("B").text() + "</label><br/>";
    respuestas += "<input type='checkbox' name='pregunta' value='c' > <label>" + textoRespuestas.find("C").text() + "</label><br/>";
    respuestas += "<input type='checkbox' name='pregunta' value='d' > <label>" + textoRespuestas.find("D").text() + "</label><br/>";
    respuestas += "</form>";
    accordionPregunta.append(respuestas);

    $("#accordion").append("<h3>" + texto + "</h3>");
    $("#accordion").append(accordionPregunta);
}

function crearText(indice) {
    console.log("todavia no esta lista");
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