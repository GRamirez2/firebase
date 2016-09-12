  var config = {
    apiKey: "AIzaSyBqKwYSpaM7IygV4U-LurFV7zUw0M38zJ8",
    authDomain: "george2-97e75.firebaseapp.com",
    databaseURL: "https://george2-97e75.firebaseio.com",
    storageBucket: "george2-97e75.appspot.com",
  };
  firebase.initializeApp(config);


$(".mainArrivals").hide();



var DB = firebase.database();


var train = "";
var city = "";
var time = 0;
var minutes = 0;
var nextArrival = 0;



// ---------------------------------------------------------------

// Click Button changes what is stored in firebase
	$("#clickButton").on("click", function(){

		// Get inputs
		var trainName = $('#trainName').val().trim(); 
		var cityName = $('#destination').val().trim(); 
		var timeName = parseInt($('#firstTrain').val().trim()); 
		var minutesName = parseInt($('#frequency').val().trim()); 

		// temp object for holding data
		var newTrain = {

			TRAIN: trainName,
			CITY: cityName,
			TIME: timeName,
			MINUTES: minutesName
			// ADDED: firebase.database.ServerValue.TIMESTAMP

		}

		DB.ref().push(newTrain);

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
		$('#firstTrain').val('');
		$('#frequency').val('');


// Don't refresh the page
		return false;

	

	});


// ---------------------------------------------------------------

DB.ref().on("child_added", function(childSnapshot){

		// console.log(childSnapshot.val());

		// =============moment.js begin===============//

		// var timeName = parseInt($('#firstTrain').val().trim()); 
		// var minutesName = parseInt($('#frequency').val().trim()); 
		// // console.log(timeName, minutesName);

		var timeConverted = moment(childSnapshot.val().TIME,"hh:mm").subtract(1,"year");
		console.log("line 86 "+timeConverted);

		/*current time
		var timeNow = moment();
		// console.log("current  time: " + moment(timeNow).format("hh:mm"))

		/*different between current time and first train*/
		var timeDif = moment().diff(moment(timeConverted), "minutes");
		console.log("difference in time: " + timeDif);

		var remainder = timeDif % childSnapshot.val().MINUTES;
		console.log("line 95 time apart" + remainder);

		/*time until next train, this is actually in minutes*/
		var NextTrainM = childSnapshot.val().MINUTES - remainder;
		console.log("line 101, Minutes till next train " + NextTrainM)

		/*have to convert minutes to "real time"*/
		var NextTrain = moment().add(NextTrainM, "minutes");
		console.log("line 105 arrival time: " + moment(NextTrain).format("hh:mm a"));

		var NextTrainFinal =  moment(NextTrain).format("hh:mm A")
		console.log("line 108" + NextTrainFinal);






		// =============moment.js END===============//

		var train = childSnapshot.val().TRAIN;
		var city = childSnapshot.val().CITY;
		var time = parseInt(childSnapshot.val().TIME);
		var minutes = parseInt(childSnapshot.val().MINUTES);

		console.log(train);
		console.log(city);
		console.log(time);
		console.log(minutes);


		// print to screen prepending my tboday in my table under my headings for the table
		var rowTemplate = "<tr><td>"+train+"</td><td>"+city+"</td><td>"+minutes+"</td><td>"+NextTrainFinal+"</td></tr>";
 		$("#newTrain").prepend(rowTemplate);

	},

	function (errorObject) {

  	console.log("The read failed: " + errorObject.code);

});/*END of function snapshot*/
