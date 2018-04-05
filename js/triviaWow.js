window.onload = function(){

};

// function loadXMLDoc() {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         myFunction(xmlhttp);
//       }
//     }
//     xmlhttp.open("GET", "triviaWow.xml", true);
//     xmlhttp.send();
//   }

//   function myFunction(xml) {
//     var i;
//     var xmlDoc = xml.responseXML;
//     console.log(xmlDoc);
//     var enunciado = "";
//     var form = "";
//     var x = xmlDoc.getElementsByTagName("pregunta");
//     for (i = 0; i <x.length; i++) { 
//       enunciado += "<h3>"+x[i].getElementsByTagName("Enunciado").nodeValue+"</h3><br/>";
//       /*form += '<input type="radio" name="pregunta" value="'+i+'" checked><label>' +
//       x[i].getElementsByTagName("Repuestas")[i].childNodes[0].nodeValue +
//       "</label>";*/
//     }
//     document.getElementById("demo").innerHTML = enunciado;
// }

