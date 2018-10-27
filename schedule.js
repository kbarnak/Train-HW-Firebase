
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB4KzVlnyD1POgzI3DU7M9VtjyBJbLkC3w",
    authDomain: "traintimehw.firebaseapp.com",
    databaseURL: "https://traintimehw.firebaseio.com",
    projectId: "traintimehw",
    storageBucket: "traintimehw.appspot.com",
    messagingSenderId: "914131866921"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function () {


    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var firstTrain = $("#train-time-input").val().trim();
    var trnFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrn = {
        name: trnName,
        destination: trnDestination,
        firstT: firstTrain,
        frequency: trnFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrn);

    // Logs everything to console
    console.log(trnName.name);
    console.log(trnDestination.destination);
    console.log(firstTrain.firstT);
    console.log(trnFrequency.frequency);

    alert("New Train Time successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
    return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstT;
    var trnFrequency = childSnapshot.val().frequency;


    var timeArrival = firstTrain.split(":");

    var nextTrain = moment().hours(timeArrival[0]).minutes(timeArrival[1]);
    var maxMoment = moment.max(moment(), nextTrain);
    var tMinutes;
    var arrival;

    if (maxMoment === nextTrain) {
        arrival = nextTrain.format("HH:MM");
        tMinutes = nextTrain.diff(moment(), "minutes");
    } else {
        var differenceTime = moment().diff(nextTrain, "minutes");
        var tRemainder = differenceTime % trnFrequency;
        tMinutes = trnFrequency - tRemainder;
        arrival = moment().add(tMinutes, "m").format("HH:MM");
    }
    console.log("tMinutes:", tMinutes);
    console.log("arrival", arrival);

    $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + arrival + "</td><td>" + tMinutes + "</td></tr>");

});

//     // // Create the new row
//     // var newRow = $("<tr>").append(
//     //     $("<td>").text(trnName),
//     //     $("<td>").text(trnDestination),
//     //     $("<td>").text(trnFrequency),
//     //     $("<td>").text(arrival),
//     //     $("<td>").text(tMinus),
//     // );

//     // // Append the new row to the table
//     // $("#train-table > tbody").append(newRow);
// });








    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));