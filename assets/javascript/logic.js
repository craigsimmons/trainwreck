$(document).ready(function() {

    // Initialize Firebase
    const config = {
        apiKey: 'AIzaSyD118q0POr_z2JpLxAxKmPz3ktND8INPa4',
        authDomain: 'trainwreck-d5656.firebaseapp.com',
        databaseURL: 'https://trainwreck-d5656.firebaseio.com',
        projectId: 'trainwreck-d5656',
        storageBucket: 'trainwreck-d5656.appspot.com',
        messagingSenderId: '939885648988'
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    var seedDataArr = [{
            name: 'Spirit of Seattle',
            destination: 'Toronto',
            start: '01:00',
            frequency: '360',
        },
        {
            name: 'Spirit of Oregon',
            destination: 'Miami',
            start: '06:15',
            frequency: '120',
        },
        {
            name: 'Sounder',
            destination: 'Tacoma',
            start: '05:00',
            frequency: '20',
        },
        {
            name: 'Six Thirty Two',
            destination: 'New Haven',
            start: '15:00',
            frequency: '300',
        },
    ]

    /* Global variables */

    var destination;
    var name;
    var start;
    var frequency;
    var trainNameStr;
    var trainDestinationStr;
    var startTimeStr;
    var frequencyRateStr;
    var dateAdded;
    var nextArrival;
    var minsAway;

    // Event handler for adding new trains
    $(document).on("submit", "#target-form", function(event) {
        event.preventDefault();
        addNewTrain();
    });

    // Event hndler for Firebase - when new child object added, get data
    database.ref().on('child_added', function(childSnapshot) {
        trainNameStr = childSnapshot.val().name;
        trainDestinationStr = childSnapshot.val().destination;
        startTimeStr = childSnapshot.val().start;
        frequencyRateStr = childSnapshot.val().frequency;
        console.log("****: " + childSnapshot.val());
        console.log("****: " + trainNameStr);
        console.log("****: " + trainDestinationStr);
        console.log("****: " + startTimeStr);
        console.log("****: " + frequencyRateStr);
        createHTML();
    });

    function seedData() {
        for (let i = 0; i < seedDataArr.length; i++) {
            trainNameStr = seedDataArr[i].name;
            trainDestinationStr = seedDataArr[i].destination;
            startTimeStr = seedDataArr[i].start;
            frequencyRateStr = seedDataArr[i].frequency;
            firebaseCall();
        }
    }
    seedData();

    function addNewTrain() {
        // Grabs user input from form. Use moment.js to format time
        trainNameStr = $('#train-input').val().trim();
        trainDestinationStr = $('#destination-input').val().trim();
        startTimeStr = moment($('#time-input').val().trim(), 'HH:mm').format("X");
        frequencyRateInt = $('#frequency-input').val().trim();
        clearData();
        firebaseCall();
    }

    function firebaseCall() {
        database.ref().push({
            name: trainNameStr,
            destination: trainDestinationStr,
            start: startTimeStr,
            frequency: frequencyRateStr,
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
        });
    }

    function clearData() {
        // Clears all of the text-boxes
        $('#train-input').val('');
        $('#destination-input').val('');
        $('#time-input').val('');
        $('#frequency-input').val('');
    }

    function createHTML() {
        timeCalc();
        newDataRow = $("<tr>").append(
            $('<td class="dynamic-name">').text(trainNameStr),
            $('<td class="dynamic-dest">').text(trainDestinationStr),
            $('<td class="dynamic-freq">').text('   ' + frequencyRateStr),
            $('<td class="dynamic-arrival">').text(nextArrival),
            $('<td class="dynamic-away">').text(minsAway),
        )
        $("#insert-here").append(newDataRow);
    }

    function timeCalc() {
        var convertedTime = moment(startTimeStr, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(convertedTime), "minutes");
        var timeModulo = diffTime % frequencyRateStr;
        minsAway = frequencyRateStr - timeModulo;
        nextArrival = moment().add(minsAway, "minutes");
        nextArrival = moment(nextArrival).format("HH:mm");
    }

});