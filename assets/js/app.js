// Initialize Firebase
var config = {
    apiKey: "AIzaSyDkw3WSwqU_JrnvohtPikKgV8afgzJFyiQ",
    authDomain: "trainscheduler-a66ab.firebaseapp.com",
    databaseURL: "https://trainscheduler-a66ab.firebaseio.com",
    projectId: "trainscheduler-a66ab",
    storageBucket: "trainscheduler-a66ab.appspot.com",
    messagingSenderId: "173126377112"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var destination;
var frequency;
var firstTime;
var TIME_FORMAT = "HH:mm";
var nextArrival;
var minutesAway;



$("#submit").on("click", function(event) {

    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTime = $("#firstTime").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency, 
        firstTime: firstTime
    });
    $("#trainForm").clear();

});

database.ref().on("child_added", function(snapshot) {
   
    var DBTime = moment(snapshot.val().firstTime, TIME_FORMAT);
    var DBFrequency = snapshot.val().frequency;
    
    var timeDifference = moment().diff(DBTime, 'minutes');
    var remainder = timeDifference % DBFrequency;
    
    minutesAway = DBFrequency - remainder;
    nextArrival = moment().add(minutesAway, 'minutes').format("hh:mm a");
    console.log(nextArrival);
    
    
    

    $("#tableOutput").append("<tr><td scope='col'>" + snapshot.val().trainName + "</td>" +
    
    "<td scope='col'>" + snapshot.val().destination + "</td>" +
    "<td scope='col'>" + snapshot.val().frequency + "</td>" +
    "<td scope='col'>" + nextArrival + "</td>" +
    "<td scope='col'>" + minutesAway + "</td></tr>"
    );

   


}), function(errorObject) {
    console.log("The read failed: " + errorObject.code);
};