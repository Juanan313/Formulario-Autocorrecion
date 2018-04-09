var PREGUNTASXML;

/*--- Función onload para cargar todo los eventos y las llamadas a las funciones -----*/
window.onload = function () {
    $(function () {
        $("#accordion").accordion();
    });
    cargarPreguntasXML();




     $("#loadXml").on("click", function () {
        prepararPreguntasXML();
        $(".botonLoadXML").hide();
    });
    $("#left").on("click", function () {
        closeSideBar();
    });
    $("#right").on("click", function () {
        openSideBar();
    });

    $("#footer1").on("click", function() {
        footerExpandInfo(contact);
    });

    $("#footer2").on("click", function() {
        footerExpandInfo(About);
    });

    $("#footer3").on("click", function() {
        footerExpandInfo(Help);
    });

    $("#footer4").on("click", function() {
        footerExpandInfo(Privacy);
    });
};

function cargarPreguntasXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
            PREGUNTASXML = xmlDoc.getElementsByTagName("pregunta");
            prepararPreguntasRandom();
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

function prepararPreguntasRandom() {
    var numPreguntas = 10;
    var numRandom;
    var preguntas = [];
    var contador = 0;
    while (contador < numPreguntas) {
        numRandom = Math.floor(Math.random() * PREGUNTASXML.length);
        var tipo = PREGUNTASXML[numRandom].getElementsByTagName('Tipo')[0].innerHTML;
        if (preguntas.indexOf(PREGUNTASXML[numRandom]) != -1) {
            continue;
        } else {
        switch (tipo) {
            case " Selección ":
                crearRadio(numRandom);
                preguntas.push(PREGUNTASXML[numRandom]);
                contador = preguntas.length;
                continue;
            case " Múltiple ":
                crearCheck(numRandom);
                preguntas.push(PREGUNTASXML[numRandom]);
                contador = preguntas.length;
                continue;
            default:
                console.log("default");
        }
        contador = preguntas.length;
        console.log("------");
    }}
}

/*--- Crea Formulario tipo RadioButton, preguntas de respuesta única ---*/

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

/*--- Crea Formulario tipo Checkbox, preguntas de respuesta múltiple ---*/

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

/* ----- Comprobar puntuación -----*/

function puntuar() {
    
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
    /* ------------Info Footer---------------*/

    var contact = "juanan.pujals@gmail.com"
    var about = "Gran parte de la información mostrada en esta página ha sido extraida de páginas relacionada con el mismo juego como: \\n whttps://worldofwarcraft.com/es-es/ \\n  http://www.wowchakra.com/ \\n http://es.wowhead.com/"
    var help = "Mmmm lo siento no lo he entendido bien, ¿para qué se supone que necesitas ayuda?"
    var privacy = "Gran parte de el contenido de esta página no es de mi propieda y no ha sido utilizado con animo de lucro, tan solo con fines lúdicos."

 
function footerExpandInfo(id) {
    

    alert(id);
}    