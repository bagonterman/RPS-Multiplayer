$(document).ready(function () {
  function buildNewGame() {
    $("#RPScontainer").html(`<div id="rock" title="Rock"></div>
  <div id="paper" title="Paper"></div>
  <div id="scissors" title="Scissors"></div><div id='message'></div>`);
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
  var turns = 0;
  var NUM_PLAYERS = 2;

  ////////////////////making a listener///////////////////
  function runOn(wins) {
    var watcher = dataRef.ref();
    watcher.once("value", function (snapshot) {
      myWins = snapshot.val().PlayerOne.One.wins;
      myTurns = snapshot.val().PlayerOne.One.turns;
      myLosses = snapshot.val().PlayerOne.One.losses;
      myChoice = snapshot.val().PlayerOne.One.choice;
      otherWins = snapshot.val().PlayerTwo.Two.wins;
      otherTurns = snapshot.val().PlayerTwo.Two.turns;
      otherLosses = snapshot.val().PlayerTwo.Two.losses;
      otherChoice = snapshot.val().PlayerTwo.Two.choice;
      console.log(myChoice + "  " + otherChoice);
      if (
        (myChoice == "Rock" && otherChoice == "Paper") ||
        (myChoice == "Paper" && otherChoice == "Scissors") ||
        (myChoice == "Scissors" && otherChoice == "Rock")
      ) {
        $("#wins").text(wins++);
        dataRef
          .ref()
          .child(`/PlayerOne/One`)
          .update({
            losses: losses,
            wins: wins++
          });
        dataRef
          .ref()
          .child(`/PlayerTwo/Two`)
          .update({
            wins: wins++,
            losses: losses
          });
        $("#" + myChoice.toLowerCase()).css(
          "background-image",
          "url('assets/images/" + myChoice.toLowerCase() + "_Red.png')"
        );
        console.log("you won");
      } else if (
        (myChoice == "Paper" && otherChoice == "Rock") ||
        (myChoice == "Rock" && otherChoice == "Scissors") ||
        (myChoice == "Scissors" && otherChoice == "Paper")
      ) {
        $("#losses").text(losses++);
        dataRef
          .ref()
          .child(`/PlayerOne/One`)
          .update({
            wins: wins++,
            losses: losses
          });
        dataRef
          .ref()
          .child(`/PlayerTwo/Two`)
          .update({
            wins: wins++,
            losses: losses
          });
        $("#" + otherChoice.toLowerCase()).css(
          "background-image",
          "url('assets/images/" + otherChoice.toLowerCase() + "_Red.png')"
        );
        console.log("you lost");
      } else {
        var tie = "tie";
        console.log(tie);
      }

      //console.log(otherWins);
      $("#wins").text(wins);
      $("#losses").text(losses);
      $("#turns").text(turns);
    });
  }

  ////click a rock paper or scissor////////
  $(document).on("click", "#RPScontainer", function (e, key) {
    turns++;
    e.preventDefault();
    var buttonValue = e.target.title; ////title is either rock paper or scissors//
    $("#" + e.target.id).css(
      "background-image",
      "url('assets/images/" + buttonValue + ".png')"
    );
    dataRef
      .ref()
      .once(
        "value",
        function (snapshot) {
          test = "1";
          yourPlayer == "One"
            ? ((playerVal = 0),
              (oponent = 1),
              (opPlayer = "PlayerTwo"),
              (opNum = "Two"))
            : ((playerVal = 1),
              (oponent = 0),
              (opPlayer = "PlayerOne"),
              (opNum = "One"),
              runOn(wins));
          oponentKey = Object.keys(snapshot.val())[oponent];
          console.log("snapshot for wins" + snapshot.val().PlayerOne.One.wins);
          dataRef
            .ref()
            .child(`/${yourPlayerTxt + yourPlayer}/${yourPlayer}`)
            .update({
              choice: buttonValue,
              turns: turns,
              wins: wins++
              // wins: wins
            });

          // Handle the errors
        },
        function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }
      )
      .then(snap => {
        myWins = snap.val()[yourPlayerTxt + yourPlayer][yourPlayer].wins;
        myTurns = snap.val()[yourPlayerTxt + yourPlayer][yourPlayer].turns;
        myLosses = snap.val()[yourPlayerTxt + yourPlayer][yourPlayer].losses;
        $(".outcome").html(`<p>wins: <span id="wins">${myWins}</span><br>
          losses: <span id="losses">${myLosses}</span><br>
          turns: <span id="turns">${myTurns}</span></p>`);
      });
  }); ////end of rps click

  // Capture Button Click
  $("#send.btn.btn-primary").on("click", function (event) {
    event.preventDefault();
    name = $("#player")
      .val()
      .trim();
    writeData(dataRef); ///Sets up the users data base
    $(this).attr("disabled", true);
  });

  ///write in the text area and have it show on both users/////
  $("textarea").keypress(function (event) {
    writeTextArea(event);
  });

  dataRef.ref().on("child_changed", snapshot => {
    try {
      playerOneChoice = snapshot.val().One.choice;
      console.log(playerOneChoice);
      // ;
    } catch (err) { }
    try {
      playerTwoChoice = snapshot.val().Two.choice;
      console.log(playerOneChoice);
      console.log(playerTwoChoice);

      if (
        (playerOneChoice == "Rock" && playerTwoChoice == "Paper") ||
        (playerOneChoice == "Paper" && playerTwoChoice == "Scissors") ||
        (playerOneChoice == "Scissors" && playerTwoChoice == "Rock")
      ) {
        //////Player two wins///////
        $("#" + playerOneChoice.toLowerCase()).css(
          "background-image",
          "url('assets/images/" + playerOneChoice.toLowerCase() + "_Red.png')"
        );
        $("#wins").text(snapshot.val().Two.wins);
        // background-image:none
        console.log("Player Two won");
      } else if (
        (playerOneChoice == "Paper" && playerTwoChoice == "Rock") ||
        (playerOneChoice == "Rock" && playerTwoChoice == "Scissors") ||
        (playerOneChoice == "Scissors" && playerTwoChoice == "Paper")
      ) {
        ////Player one wins///////////////
        $("#" + playerTwoChoice.toLowerCase()).css(
          "background-image",
          "url('assets/images/" + playerTwoChoice.toLowerCase() + "_Red.png')"
        );
        console.log("Player Two lost");
      } else {
        var tie = "tie";
        console.log(tie);
      }
    } catch (err) { }
    if (snapshot.val().message) {
      $("textarea").val(snapshot.val().message); ////Writes a messages/////
    }
  });

  function writeTextArea() {
    var key = window.event.keyCode;
    //console.log(key)
    // If the user has pressed enter
    if (key === 13) {
      //console.log(key);
      whatIwrote = $(
        "#exampleFormControlTextarea1.form-control.rounded-0"
      ).val();
      console.log(whatIwrote);
      dataRef
        .ref()
        .once("value")
        .then(
          function (snapshot) {
            //var playerExists=snapshot.val();
            console.log(dataRef.ref());
            messageUpdate = dataRef
              .ref()
              //.set({
              .update({
                messages: {
                  message: whatIwrote
                }
              })
              // messages:{
              //   message:$("textarea").value
              //   messages:{
              //     messages:$("textarea").value
              // }
              //})
              .then(snap => {
                // console.log(snap);
                // console.log(snap.val().messages.message);
                // $("#exampleFormControlTextarea1.form-control.rounded-0").append(
                //   yourPlayer + "  " + snapshot.val().messages.message
                // );
              });
          } ///end of snapshot function
        );
      //return false;
    } else {
      return true;
    }
  }

  function writeData(dataRef) {
    dataRef
      .ref()
      .once("value")
      .then(
        function (snapshot) {
          var playerExists = snapshot.val();
          if (playerExists == null) {
            yourPlayer = "One";
            // key="";
            firstKeyOnSecond = "";
          } else {
            firstKeyOnSecond = Object.keys(snapshot.val())[0];
            //   var key = Object.keys(snapshot.val())[0];
            //   var key2 = Object.keys(snapshot.val())[1];
            //  console.log(key2);
          }
          playerPush = dataRef
            .ref()
            .update({
              [yourPlayerTxt + yourPlayer]: {
                [yourPlayer]: {
                  choice: choice,
                  losses: losses,
                  name: name,
                  wins: wins,
                  turns: turns,
                  PlayerIdS: firstKeyOnSecond
                }
              }
            })
            .then(snap => {
              //   const key = snap.key
              //   console.log(key);
              //   dataRef.ref().child(`/${key}/${yourPlayerTxt+yourPlayer}/${yourPlayer}`).update({
              //     PlayerId: key
              // });
            });
        } ///end of snapshot function
      );
    /////////////////////////

    return yourPlayer;
  } ///end of writeData
});
