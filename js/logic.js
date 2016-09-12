  var config = {
    apiKey: "AIzaSyBqKwYSpaM7IygV4U-LurFV7zUw0M38zJ8",
    authDomain: "george2-97e75.firebaseapp.com",
    databaseURL: "https://george2-97e75.firebaseio.com",
    storageBucket: "george2-97e75.appspot.com",
  };
  firebase.initializeApp(config);


$(".mainArrivals").hide();

// alert("this file is attached");

var DB = firebase.database();

var train = "";
var city = "";
var time = 0;
var minutes = 0;



// ---------------------------------------------------------------

DB.ref().on("value", function(snapshot){

		train = snapshot.val().TRAIN;
		city = snapshot.val().CITY;
		time = parseInt(snapshot.val().TIME);
		minutes = parseInt(snapshot.val().MINUTES);

		console.log(train);
		console.log(city);
		console.log(time);
		console.log(minutes);


		// print to screen prepending my tboday in my table under my headings for the table
		var rowTemplate = "<tr><td>"+train+"</td><td>"+city+"</td><td>"+time+"</td><td>"+minutes+"</td></tr>";
 		$("#newTrain").prepend(rowTemplate);

	},

	function (errorObject) {

  	console.log("The read failed: " + errorObject.code);

});/*END of function snapshot*/

// ---------------------------------------------------------------

// Click Button changes what is stored in firebase
	$("#clickButton").on("click", function(){

		// Get inputs
		var trainName = $('#trainName').val().trim(); 
		var cityName = $('#destination').val().trim(); 
		var timeName = parseInt($('#time').val().trim()); 
		var minutesName = parseInt($('#frequency').val().trim()); 

		// Change what is saved in firebase
		// DB.ref().set({
		// 	TRAIN: trainName,
		// 	CITY: cityName,
		// 	TIME: timeName,
		// 	MINUTES: minutesName
		// });

		// Creates local "temporary" object for holding employee data
		var newTrain = {
			TRAIN: trainName,
			CITY: cityName,
			TIME: timeName,
			MINUTES: minutesName
	}

	// Uploads employee data to the database
	DB.push(newTrain);

		console.log(newTrain.TRAIN);
		console.log(newTrain.CITY);
		console.log(newTrain.TIME);
		console.log(newTrain.MINUTES);
		
// Hide Instruction and show the arival times
		$(".mainArrivals").show();
		$("#instructions").hide();

// Clear the form fields
		$('#trainName').val('');
		$('#destination').val('');
		$('#time').val('');
		$('#frequency').val('');

// Print to screen ?? Do I need to print anything?
	

	

		return false;

	});

// =================================================================
// function to create new table row with data
// My function was a failure
