
$( document ).ready(function() {


function buildNewGame(){
  $( "#RPScontainer" ).html( `<div id="rock" title="Rock"></div>
  <div id="paper" title="Paper"></div>
  <div id="scissors" title="Scissors"></div>`);
}


buildNewGame();



  
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDOktNr4DCqyCxGzyPVigGs3OYrKh-vB1w",
      authDomain: "rocks-and-scissors.firebaseapp.com",
      databaseURL: "https://rocks-and-scissors.firebaseio.com",
      projectId: "rocks-and-scissors",
      storageBucket: "",
      messagingSenderId: "487417289879"
    };
    firebase.initializeApp(config);
    var dataRef = firebase.database();
        var players = "";
        var yourPlayer = "Two";
        var yourPlayerTxt = "Player";
        var losses = 0;
        var playerName = "";
        var wins = 0;
        var choice = "";
        var turns=0;
        var NUM_PLAYERS = 2;
        

////////////////////making a listener///////////////////
function runOn(){
var watcher = dataRef.ref();
watcher.once('value', function(snapshot) {
  //console.log(snapshot.val());
  //console.log(snapshot.val()[yourPlayerTxt+yourPlayer][yourPlayer].choice);
  //console.log(snapshot.val()[opPlayer][opNum].choice);
  //myWins=snapshot.val()[PlayerOne][One].wins;

  myWins=snapshot.val().PlayerOne.One.wins;
  myTurns=snapshot.val().PlayerOne.One.turns;
  myLosses=snapshot.val().PlayerOne.One.losses;
  myChoice=snapshot.val().PlayerOne.One.choice;
  otherWins=snapshot.val().PlayerTwo.Two.wins;
  otherTurns=snapshot.val().PlayerTwo.Two.turns;
  otherLosses=snapshot.val().PlayerTwo.Two.losses;
  otherChoice=snapshot.val().PlayerTwo.Two.choice;
  console.log(myChoice+"  "+otherChoice);
  if((myChoice=="Rock"&&otherChoice=="Paper")||(myChoice=="Paper"&&otherChoice=="Scissors")||(myChoice=="Scissors"&&otherChoice=="Rock")){
    $("#wins").text(wins++);
    dataRef.ref().child(`/PlayerOne/One`).update({
      losses: losses
    });
    dataRef.ref().child(`/PlayerTwo/Two`).update({
      wins: wins
    });
    $('#'+myChoice.toLowerCase()).css("background-image", "url('assets/images/"+myChoice.toLowerCase()+"_Red.png')");
    console.log("you won");
  }
  else if((myChoice=="Paper"&&otherChoice=="Rock")||(myChoice=="Rock"&&otherChoice=="Scissors")||(myChoice=="Scissors"&&otherChoice=="Paper")){
    $("#losses").text(losses++);
    dataRef.ref().child(`/PlayerOne/One`).update({
      wins: wins
    });
    dataRef.ref().child(`/PlayerTwo/Two`).update({
      losses: losses
    });
    $('#'+otherChoice.toLowerCase()).css("background-image", "url('assets/images/"+otherChoice.toLowerCase()+"_Red.png')");
    console.log("you lost");
  }
  else{
    var tie="tie";
    console.log(tie);
  }

  //console.log(otherWins);
  $("#wins").text(wins);
  $("#losses").text(losses);
  $("#turns").text(turns);

  // $( ".outcome" ).html( `<p>wins: <span id="wins">${myWins}</span><br>
  //         losses: <span id="losses">${myLosses}</span><br>
  //         turns: <span id="turns">${myTurns}</span></p>`);
  //updateStarCount(postElement, snapshot.val());
});
}


    
    


    ////click a rock paper or scissor////////
        $(document).on("click", "#RPScontainer", function(e,key){
          turns++;
          e.preventDefault();
          var buttonValue=e.target.title; ////title is either rock paper or scissors//
          //console.log(e.target.id)
          //e.target.css("color", "red");
          //$('#'+e.target.id).css("color", "red");
        // $('#'+e.target.id).css("background-color", "red");
          $('#'+e.target.id).css("background-image", "url('assets/images/"+buttonValue+".png')");
          dataRef.ref().once("value", function(snapshot) {
          // Log everything that's coming out of snapshot
           test="1";
          yourPlayer=="One"?(playerVal=0,oponent=1,opPlayer="PlayerTwo",opNum="Two"): (playerVal=1,oponent=0,opPlayer="PlayerOne",opNum="One",runOn());
          //console.log(Object.keys(snapshot.val()));
          //console.log(snapshot.val()[Object.keys(snapshot.val())[playerVal]].PlayerOne.One.choice);
          // console.log(yourPlayer);
          // console.log(playerVal);
          var snap=snapshot
          //console.log(Object.keys(snapshot.val())[oponent]);
          oponentKey=Object.keys(snapshot.val())[oponent];
          // if(oponentKey!="undefined"){

          // }
          // dataRef.ref().child(`/${Object.keys(snapshot.val())[playerVal]}/${yourPlayerTxt+yourPlayer}/${yourPlayer}`).update({
            dataRef.ref().child(`/${yourPlayerTxt+yourPlayer}/${yourPlayer}`).update({
            choice: buttonValue,
            turns: turns
        });
        // console.log(snap.val()[yourPlayerTxt+yourPlayer][yourPlayer].choice);
        // console.log(snap.val()[opPlayer][opNum].choice);
        // console.log(snap.val()[Object.keys(snap.val())[playerVal]][player][yourPlayer].choice);/////works
        // console.log(snap.val()[Object.keys(snap.val())[oponent]][opPlayer][opNum].choice);/////works


          // Handle the errors
        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }).then((snap) => {
          //console.log(snap.val()[yourPlayerTxt+yourPlayer][yourPlayer].choice);
          //console.log(snap.val()[opPlayer][opNum].choice);
          myWins=snap.val()[yourPlayerTxt+yourPlayer][yourPlayer].wins;
          myTurns=snap.val()[yourPlayerTxt+yourPlayer][yourPlayer].turns;
          myLosses=snap.val()[yourPlayerTxt+yourPlayer][yourPlayer].losses;
          $( ".outcome" ).html( `<p>wins: <span id="wins">${myWins}</span><br>
          losses: <span id="losses">${myLosses}</span><br>
          turns: <span id="turns">${myTurns}</span></p>`);
          //   const key = snap.key 
          //   console.log(key);
          //   dataRef.ref().child(`/${key}/${yourPlayerTxt+yourPlayer}/${yourPlayer}`).update({
          //     PlayerId: key
             
          // });
         });



        //dataRef = dataRef.getInstance().getReference("turns");
        
      
      
        });  ////end of rps click

    // Capture Button Click
    $("#send.btn.btn-primary").on("click", function(event) {
      event.preventDefault();
      name = $("#player").val().trim();
      writeData(dataRef);
      $(this).attr("disabled", true);
      });
    
    function writeData(dataRef){
      dataRef.ref().once("value")
      .then(function(snapshot) {
        var playerExists=snapshot.val();
        if(playerExists==null){
          yourPlayer="One";
          // key="";
           firstKeyOnSecond="";

        }
        else{
          firstKeyOnSecond= Object.keys(snapshot.val())[0];
        //   var key = Object.keys(snapshot.val())[0];
        //   var key2 = Object.keys(snapshot.val())[1];
        //  console.log(key2);
        }
          playerPush=dataRef.ref().update({
            
          [yourPlayerTxt+yourPlayer]:{
          [yourPlayer]:{
          choice: choice,
          losses: losses,
          name: name,
          wins: wins,
          turns:turns,
          PlayerIdS:firstKeyOnSecond

          }
        }
        
  }).then((snap) => {
  //   const key = snap.key 
  //   console.log(key);
  //   dataRef.ref().child(`/${key}/${yourPlayerTxt+yourPlayer}/${yourPlayer}`).update({
  //     PlayerId: key
     
  // });
 })
}///end of snapshot function
)
/////////////////////////


return yourPlayer
}///end of writeData
}
)
