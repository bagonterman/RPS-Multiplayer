      // var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
    // var firstName = snapshot.child("name/first").val(); // "Ada"
    // var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
    // var age = snapshot.child("age").val(); // null
   
   
   
   //playerExists=snapshot.child("1").exists();
    // if(playerExists){
    //   dataRef.ref().push({
    //     players:{
    //     [yourPlayer]:{
    //     choice: choice,
    //     losses: losses,
    //     name: name,
    //     wins: wins
        
    //       }
    //     }
        //dateAdded: firebase.database.ServerValue.TIMESTAMP

//       database.ref().on("value", function(snapshot) {

//       // Log everything that's coming out of snapshot
//       console.log(snapshot.val());
//       console.log(snapshot.val().name);
//       console.log(snapshot.val().email);
//       console.log(snapshot.val().age);
//       console.log(snapshot.val().comment);

//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);

//   // Handle the errors
// }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// });




/*function chooseRPS(){
  // Create an initial toDoCount variable
  var toDoCount = 0;

  //  On Click event associated with the add-to-do function
  $("#add-to-do").on("click", function(event) {
    event.preventDefault();

    // Get the to-do "value" from the textbox and store it a variable
    var toDoTask = $("#to-do").val().trim();
    var toDoItem = $("<p>");

    toDoItem.attr("id", "item-" + toDoCount);
    toDoItem.append(" " + toDoTask);

    // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
    // Give your button a data attribute called data-to-do and a class called "checkbox".
    // Lastly append the letter X inside.

    var toDoClose = $("<button>");

    toDoClose.attr("data-to-do", toDoCount);
    toDoClose.addClass("checkbox");
    toDoClose.append("✓");

    // Append the button to the to do item
    toDoItem = toDoItem.prepend(toDoClose);

    // Add the button and to do item to the to-dos div
    $("#to-dos").append(toDoItem);

    // Clear the textbox when done
    $("#to-do").val("");

    // Add to the toDoCount
    toDoCount++;
  });

  // When a user clicks a check box then delete the specific content
  // (NOTE: Pay attention to the unusual syntax here for the click event.
  // Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)
  $(document.body).on("click", ".checkbox", function() {

    // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
    var toDoNumber = $(this).attr("data-to-do");

    // Select and Remove the specific <p> element that previously held the to do item number.
    $("#item-" + toDoNumber).remove();
  })}})})*/