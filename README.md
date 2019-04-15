# Train Scheduler

##Game Summary##

1. The Train Scheduler takes basic information about a train (train name, destination, initial train departure, frequency between trains ) and uses moment.js to format and help calculate time-dependent values like next train arrival time and minutes (from now) until that next train arrives.

2. Train Scheduler uses Google's Firebase realtime DB to persist data. On page load, the app runs a function to populate the DB instance with seed data. When a user enters information on a new train, the data goes to firebase before the app renders the info in the display. 

**Release Notes:**

1. App will load initial seed values to firebase database and seeds the display with data from seedDataArr. 

2. Currently, there is no validation to prevent duplicate entries. v2.0 will include validation.

3. Also, v 2.0 will improve time formating and will present a couple more fields (like Initial Train Departure Time) to give user more info

**Current Issues***
1. Working to fix a new bug where Frequency cannot have a value greater than 300 mins ifyou enter it when creating a new train. Does not occur when seeding database with info from the seedDataArr.

craig@simmons.name

[Github Repository for this application:](https://github.com/craigsimmons/trainwreck)

[My portfolio (which links to this app):](https://craigsimmons.github.io/Bootstrap-Portfolio/)