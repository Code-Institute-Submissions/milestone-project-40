/***************************************************************** OBJECTS */
//define Kindergarten object (constructor function)
function Kindergarten(name) {
  this.name = name; //name of kindergarten
  this.departments = []; //array of Department objects
}
//define Department object (constructor function)
function Department(name, kidsAwake, kidsAsleep) {
  this.name = name; //name of department
  this.kidsAwake = kidsAwake;
  this.kidsAsleep = kidsAsleep;
  this.kids = []; //array of Kid objects
}
//define Kid object (constructor function)
function Kid(
  name,
  status,
  putDownTime,
  sleepStartTime,
  sleepStopTime,
  takeUpTime,
  sleepDuration
) {
  this.name = name;
  this.status = status;
  this.putDownTime = putDownTime; //time when kid was put in pram
  this.sleepStartTime = sleepStartTime; //time when kid fell asleep
  this.sleepStopTime = sleepStopTime; //time when kid woke up
  this.takeUpTime = takeUpTime; //time when kid was taken out of pram
  this.sleepDuration = sleepDuration; //total time kid was sleeping
}

/*********************************************************************************START */
console.log("Create date.");
let today = new Date(); //create a Date object
let todayFormatted = today.toDateString(); //formatted date

console.log("Create barnehage object.");
let barnehage = new Kindergarten(todayFormatted, 0, 20); //create a Kindergarten object

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", function() {}); //jQuery event listener

/********************************************************************** Functions */
