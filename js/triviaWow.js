var PREGUNTASXML;

/*--- Función onload para cargar todo los eventos y las llamadas a las funciones -----*/
window.onload = function () {

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
        footerExpandInfo(contact, contactTittle);
    });

    $("#footer2").on("click", function() {
        footerExpandInfo(about, aboutTittle);
    });

    $("#footer3").on("click", function() {
        footerExpandInfo(help, helpTittle);
    });

    $("#footer4").on("click", function() {
        footerExpandInfo(privacy, privacyTittle);
    });


    $("#navForm").fancybox({
        helpers : {
                title : {type:'inside'}
            },
        afterShow: function () {
            
            
            $("#mySubmit").on("click", function () {
                $.fancybox.close();
            });
        }
    });

    $("#puntuar").on("click", function() {
        puntuar();
    })
};

window.onbeforeunload = function() {
        return "Data will be lost if you leave the page, are you sure?";
  };

function cargarPreguntasXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
            PREGUNTASXML = xmlDoc.getElementsByTagName("pregunta");
            if($("body.randomXML").length > 0) {
            prepararPreguntasRandom();
            } else {
                prepararPreguntasXML();
            }
        }
    };
    xhttp.open("GET", "https://raw.githubusercontent.com/Juanan313/Formulario-Autocorrecion/master/js/triviaWow.xml", true);
    xhttp.send();


}

/* ----- Funcion tratar XML -----------*/

/* --- Prepara todas las preguntas ---*/
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
            default:
                console.log("default");
        }
    } $("#accordion").accordion();
}
/* --- Prepara 10 preguntas aleatorias ----*/
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
    $("#accordion").accordion();
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
    respuestas += "<label><input type='radio' name='pregunta' value='A' > " + textoRespuestas.find("A").text() + "</label><br/>";
    respuestas += "<label><input type='radio' name='pregunta' value='B' > " + textoRespuestas.find("B").text() + "</label><br/>";
    respuestas += "<label><input type='radio' name='pregunta' value='C' > " + textoRespuestas.find("C").text() + "</label><br/>";
    respuestas += "<label><input type='radio' name='pregunta' value='D' > " + textoRespuestas.find("D").text() + "</label><br/>";
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
    respuestas += "<label><input type='checkbox' name='pregunta' value='A' > " + textoRespuestas.find("A").text() + "</label><br/>";
    respuestas += "<label><input type='checkbox' name='pregunta' value='B' > " + textoRespuestas.find("B").text() + "</label><br/>";
    respuestas += "<label><input type='checkbox' name='pregunta' value='C' > " + textoRespuestas.find("C").text() + "</label><br/>";
    respuestas += "<label><input type='checkbox' name='pregunta' value='D' > " + textoRespuestas.find("D").text() + "</label><br/>";
    respuestas += "</form>";
    accordionPregunta.append(respuestas);

    $("#accordion").append("<h3>" + texto + "</h3>");
    $("#accordion").append(accordionPregunta);
}

/* ----- Comprobar puntuación -----*/

function puntuar() {
    var idPreguntas = [];
    $("#accordion form").each(function(i, k){
        idPreguntas.push(k.id);

    });
    console.log(idPreguntas);
}

function isCorrecta(id) {
    // probar alternativas 
    $("#accordion form #"+id+" input[name='pregunta']:checked").val();
}

function printarPuntos(puntos) {

};







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
    var contactTittle = "Contact Email"
    var about = "Todas las preguntas de esta página están relacionadas con el videojuego World of Warcraft"
    var aboutTittle = "Sobre esta página"
    var help = "Mmmm lo siento no lo he entendido bien, ¿para qué se supone que necesitas ayuda?"
    var helpTittle = "¿Ayuda?"
    var privacy = "Gran parte de el contenido de esta página no es de mi propieda y no ha sido utilizado con animo de lucro, tan solo con fines lúdicos."
    var privacyTittle = "Privacidad"

 
function footerExpandInfo(id, titulo) {
    
    // var dialogo = $("<div/>").attr("id", "dialog").html(id); 
    $("#dialogo").html(id).attr("tittle","Info Footer").dialog({
        title: titulo
    });    
    // alert(id);
}