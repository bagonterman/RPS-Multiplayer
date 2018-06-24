
$( document ).ready(function() {


function buildNewGame(){
  $( "#RPScontainer" ).html( `<div id="rock" title="Rock"></div>
  <div id="paper"></div>
  <div id="scissors"></div>`);
}


buildNewGame();

  $(document).on("click", "#RPScontainer", function(e){
    e.preventDefault();
    console.log(yourPlayer);
      //var buttonValue=e.target.value;
      var buttonValue=e.target.title;
      console.log(buttonValue);
      // dataRef.ref().child(myKey).child("quantity").setValue(String.valueOf(counterValue));
      //need to read the value of current player
      //need to read the value of opponent
      // evaluate values to determine if there was a winner
      //if there is a winner then image changes color to reflect who one
      //create another data entry for actual game wins 3 wins equals 1 game win


  });

  
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
        var yourPlayer = 2;
        var losses = 0;
        var playerName = "";
        var wins = 0;
        var choice = "";
     

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
        //playerExists=snapshot.child("1").exists();
        //playerExists=snapshot.val();
        var playerExists=snapshot.val();
        console.log(playerExists);
        //console.log(snapshot.length);
        if(playerExists==null){
          yourPlayer=1
        }
          dataRef.ref().push({
          players:{
          [yourPlayer]:{
          choice: choice,
          losses: losses,
          name: name,
          wins: wins
          }
        }
  });
}
)
return yourPlayer
}///end of writeData
}
)
