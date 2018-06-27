
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
        




    
    


    ////click a rock paper or scissor////////
        $(document).on("click", "#RPScontainer", function(e,key){
          turns++
          e.preventDefault();
          var buttonValue=e.target.title; ////title is either rock paper or scissors//
          console.log(e.target.id)
          //e.target.css("color", "red");
          //$('#'+e.target.id).css("color", "red");
        // $('#'+e.target.id).css("background-color", "red");
          $('#'+e.target.id).css("background-image", "url('assets/images/"+buttonValue+".png')");
          dataRef.ref().once("value", function(snapshot) {
          // Log everything that's coming out of snapshot
           test="1";
          yourPlayer=="One"?(playerVal=0,oponent=1): (playerVal=1,oponent=0);
          //console.log(Object.keys(snapshot.val()));
          //console.log(snapshot.val()[Object.keys(snapshot.val())[playerVal]].PlayerOne.One.choice);
          console.log(yourPlayer);
          console.log(playerVal);
          var snap=snapshot
          console.log(Object.keys(snapshot.val())[oponent]);
          oponentKey=Object.keys(snapshot.val())[oponent];
          // if(oponentKey!="undefined"){

          // }
          dataRef.ref().child(`/${Object.keys(snapshot.val())[playerVal]}/${yourPlayerTxt+yourPlayer}/${yourPlayer}`).update({
            choice: buttonValue,
            turns: turns

           
        });
        //console.log(snap);
        
        //console.log(snap.val())
        console.log(yourPlayerTxt+yourPlayer);
        console.log(yourPlayer);
        player=yourPlayerTxt+yourPlayer
        
        console.log(snap.val()[Object.keys(snap.val())[playerVal]][player][yourPlayer]);
        console.log(snap.val()[Object.keys(snap.val())[playerVal]][player][yourPlayer][choice]);
        //console.log(snap.val()[Object.keys(snap.val())[oponent]][oponentPlayer][opNum][choice]);
        //console.log(snap.val()[Object.keys(snap.val())[0]].player.yourPlayer.choice);
          //console.log(snapshot.val()[Object.keys(snapshot.val())[0]][Player1]
          //console.log(snapshot.val()[Object.keys(snapshot.val())[0]][Player1]);
          //console.log(snapshot.val()[Object.keys(snapshot.val())[0]]["[Player1 1]"]);
          //console.log(snapshot.val()[Object.keys(snapshot.val())[0]][{Player1}]);
         
          // console.log(snapshot.val().PlayerIdS);
          // console.log(snapshot.val().wins);

          // Change the HTML to reflect
          // $("#name-display").text(snapshot.val().name);
          
          // $("#email-display").text(snapshot.val().email);
          // $("#age-display").text(snapshot.val().age);
          // $("#comment-display").text(snapshot.val().comment);

          // Handle the errors
        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
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
          playerPush=dataRef.ref().push({
            
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
    const key = snap.key 
    console.log(key);
    dataRef.ref().child(`/${key}/${yourPlayerTxt+yourPlayer}/${yourPlayer}`).update({
      PlayerId: key
     
  });
 })
}///end of snapshot function
)
return yourPlayer
}///end of writeData
}
)
