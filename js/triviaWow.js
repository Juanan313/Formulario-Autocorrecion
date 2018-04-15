// Constante en la que almacenamos los datos y sobre la que trabajaremos
var PREGUNTASXML;

/* ---- Se carga el evento beforeUnload en el ready para que solo se cargue en la páginas indicadas ---- */
$( document ).ready(function() {
    if (! $("body.home").length >0) {
        cargarBeforeUnload();
    }
});
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

/* ---- Mensaje al intentar recargar o cerrar la página -----*/
function cargarBeforeUnload () {
window.onbeforeunload = function (e) {
    var confirmationMessage = "Las preguntas respondidas de perderán, ¿estás seguro que quieres dejar la página?";
    e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    return confirmationMessage;
}
};


/* ---- AJAX -----*/
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
    var respuestasCorrectas = 0;
    $("#accordion form").each(function (i, k) {
        idPreguntas.push(k.id);

        var respuestaCorrecta = $(PREGUNTASXML[k.id]).find("RespuestaCorrecta").text()
        var respuestaUsuario = $("#accordion #" + k.id).serialize()

        if (isCorrecta(respuestaCorrecta, respuestaUsuario)) {
            respuestasCorrectas += 1;
            checkMarkerCorrect(k.id, respuestaUsuario);
        } else {
            checkMarkIncorrect(k.id, respuestaUsuario);
        }
        printarPuntos(respuestasCorrectas, idPreguntas);
    });
    
}

function isCorrecta(respuestaCorrecta, respuestaUsuario) { 
    
    return respuestaCorrecta == respuestaUsuario;

}

function checkMarkerCorrect(id, respuestaUsuario) {
    var respuestasUser = respuestaUsuario.split('&');
    $(respuestasUser).each(function (i, k) {
        respuestaProporcionada = respuestasUser[i].split('=')[1]
        $("#accordion form#0 [value='" + respuestaProporcionada + "']").closest("label").addClass('respuestaCorrecta')
    })

}

function checkMarkIncorrect(id, respuestaUsuario) {
    var respuestasUser = respuestaUsuario.split('&');
    $(respuestasUser).each(function (i, k) {
        respuestaProporcionada = respuestasUser[i].split('=')[1]
        $("#accordion form#0 [value='" + respuestaProporcionada + "']").closest("label").addClass('respuestaIncorrecta')
    })

}


/* ---- Muestra un dialogo con la puntuación obtenida -----*/

function printarPuntos(puntos, totalPreguntas) {
    var media = Math.trunc(puntos/totalPreguntas.length*10 );
    var mensaje;
    var img;
    if (puntos == totalPreguntas.length) {
        mensaje = "Has Acertado todas eres un crack!";
        img = "<img src='../img/brindis.jpg'>";
    } else if (puntos == 0){
        mensaje = "No has dado ni una macho!";
        img = "<img src='../img/Facepalm.png'>";
    }
    else if (media >= 5 && media < 10){
        mensaje = "Has acertado un buen par, no esta mal pero puedes mejorar";
        img = "<img src='../img/Tyrion.jpg'>"
    } else if (media < 5) {
        mensaje = "Lo has intentado la próxima vez mejor";
        img = "<img src='../img/crying.png'>"
    } 

    var contenido = $("<div/>").html("<h3>Tu puntuación es: "+puntos+"</h3>");
    contenido.append(mensaje);
    contenido.append(img);
    $("#dialogo").html(contenido).dialog({
        title: "Puntuación"
    });
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
    
    $("#dialogo").html(id).attr("tittle","Info Footer").dialog({
        title: titulo
    });    
}