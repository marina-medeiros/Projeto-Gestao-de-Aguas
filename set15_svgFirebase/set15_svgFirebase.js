const firebaseConfig = {
  apiKey: "AIzaSyAGWOafTIwWe_0r9HV60v_p36CA4o-bSQ4",
  authDomain: "teste---esp8266.firebaseapp.com",
  databaseURL: "https://teste---esp8266-default-rtdb.firebaseio.com",
  projectId: "teste---esp8266",
  storageBucket: "teste---esp8266.appspot.com",
  messagingSenderId: "686708854493",
  appId: "1:686708854493:web:c4ece2715b686c3c439534",
  measurementId: "G-LN70JDHN17"
};
/*
function time()
{
today=new Date();
h=today.getHours();
m=today.getMinutes();
s=today.getSeconds();
document.getElementById('txt').innerHTML=h+":"+m+":"+s;
setTimeout('time()',500);
}
*/

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function(){
  var database = firebase.database();
  var estadoValBomba;
  var estadoValDreno;
  

  //-----------PEGA OS VALORES DO FIREBASE-----------------------
  database.ref().on("value", function(snap){
    estadoValBomba = snap.val().estadoValBomba;
    if(estadoValBomba == 0){
      $("#estadoValBombaTxt").text("Desligada");
    } else {
      $("#estadoValBombaTxt").text("Ligada");
    }
  });
  database.ref().on("value", function(snap){
    estadoValDreno = snap.val().estadoValDreno;
    if(estadoValDreno == 0){
      $("#estadoValDrenoTxt").text("Desligada");
    } else {
      $("#estadoValDrenoTxt").text("Ligada");
    }
  });
  database.ref().on("value", function(snap){
    estadoBomba = snap.val().estadoBomba;
    if(estadoBomba == 0){
      $("#estadoBombaTxt").text("Desligada");
    } else {
      $("#estadoBombaTxt").text("Ligada");
    }
  });
  
  /*
  database.ref().on("value", function(snap){
    segundosValDreno = snap.val().segundosValDreno;
    $("#segundosValDrenoTxt").text("Segundos ligada: " + segundosValDreno);
  });
  database.ref().on("value", function(snap){
    contagemValBomba = snap.val().contagemValBomba;
    $("#segundosValBombaTxt").text("Quantas vezes foi ligada: " + contagemValBomba);
  });
  */
  
  //-----------ATUALIZA NO FIREBASE a partir de clicks nos objetos ----------------------------
  $(".botaoValBomba").click(function(){
    var firebaseRef = firebase.database().ref().child("estadoValBomba");
    var firebaseRef2 = firebase.database().ref().child("tempoValBomba");
    tempo = new Date();
    h = tempo.getHours();
    m = tempo.getMinutes();
    s = tempo.getSeconds();
    if(estadoValBomba == 1){
      firebaseRef.set(0);
      estadoValBomba = 0;
      firebaseRef2.set(h + ':' + m + ':' + s);
      $("#tempoValBomba").text(h + ':' + m + ':' + s);
      estadoBomba = 0;
    } else {
      firebaseRef.set(1);
      estadoValBomba = 1;
      firebaseRef2.set(h + ':' + m + ':' + s);
      $("#tempoValBomba").text(h + ':' + m + ':' + s);
    }
  });

  $(".botaoValDreno").click(function(){
    var firebaseRef = firebase.database().ref().child("estadoValDreno");
    var firebaseRef2 = firebase.database().ref().child("tempoValDreno");
    tempo = new Date();
    h = tempo.getHours();
    m = tempo.getMinutes();
    s = tempo.getSeconds();
    if(estadoValDreno == 1){
      firebaseRef.set(0);
      estadoValDreno = 0;
      firebaseRef2.set(h + ':' + m + ':' + s);
      $("#tempoValDreno").text(h + ':' + m + ':' + s);
    } else {
      firebaseRef.set(1);
      estadoValDreno = 1;
      firebaseRef2.set(h + ':' + m + ':' + s);
      $("#tempoValDreno").text(h + ':' + m + ':' + s);
    }
  });

  $(".botaoBomba").click(function(){
    var firebaseRef = firebase.database().ref().child("estadoBomba");
    var firebaseRef2 = firebase.database().ref().child("tempoBomba");
    tempo = new Date();
    h = tempo.getHours();
    m = tempo.getMinutes();
    s = tempo.getSeconds();
    if(estadoValBomba == 1){
      if(estadoBomba == 1){
        firebaseRef.set(0);
        estadoBomba = 0;
        firebaseRef2.set(h + ':' + m + ':' + s);
        $("#tempoBomba").text(h + ':' + m + ':' + s);
      } else {
        firebaseRef.set(1);
        estadoBomba = 1;
        firebaseRef2.set(h + ':' + m + ':' + s);
        $("#tempoBomba").text(h + ':' + m + ':' + s);
      }
    } else {
      if(estadoBomba == 1){
        firebaseRef.set(0);
        estadoBomba = 0;
        firebaseRef2.set(h + ':' + m + ':' + s);
        $("#tempoBomba").text(h + ':' + m + ':' + s);
      }if(estadoBomba == 0){
        window.alert("Válvula de subida desligada");
      }
    }
  });

  
  //-----------Muda as cores------------------


  database.ref().on("value", function(snap){
    estadoValDreno = snap.val().estadoValDreno;
    if(estadoValDreno == 0){
      $("#valDreno").attr("fill","#bfbf00"); 
        $("#aguaDreno").attr("stroke","#7f3f00");
    } else {
      $("#valDreno").attr("fill","#ff5e00");
        $("#aguaDreno").attr("stroke","#5B9BA2");
    }
  });

  database.ref().on("value", function(snap){
    estadoValBomba = snap.val().estadoValBomba;
    if(estadoValBomba == 0){
      $("#valBomba").attr("fill","#bfbf00"); 
        $("#aguaBomba").attr("stroke","#7f3f00");
    } else {
      $("#valBomba").attr("fill","#ff5e00");
        $("#aguaBomba").attr("stroke","#5B9BA2");
    }
  });

  database.ref().on("value", function(snap){
    estadoBomba = snap.val().estadoBomba;
    if(estadoBomba == 0){
      $("#bomba").attr("fill","#bfbf00");
    } else {
      $("#bomba").attr("fill","#ff5e00");
    }
  });

  /*
  $(function(){
    $(".botaoValBomba").click(function(){
      if(estadoValBomba == 1){
        $("#valBomba").attr("fill","#ff5e00");
        $("#aguaBomba").attr("stroke","#5B9BA2");
      } else {
        $("#valBomba").attr("fill","#bfbf00");   
        $("#aguaBomba").attr("stroke","#7f3f00");
      }
    });
  });
  */
});