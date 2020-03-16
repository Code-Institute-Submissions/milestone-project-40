/***************************************************************** OBJECTS */
//define Kindergarten object (constructor function)
function Kindergarten(name, departments = []) {
  //https://stackoverflow.com/questions/50032748/using-an-array-inside-a-constructor-using-javascript
  this.name = name; //name of kindergarten
  this.departments = departments; //array of Department objects
}
//define Department object (constructor function)
function Department(name, kidsAwake, kidsAsleep, kids = []) {
  this.name = name; //name of department
  this.kidsAwake = kidsAwake;
  this.kidsAsleep = kidsAsleep;
  this.kids = kids; //array of Kid objects
}
//define Kid object (constructor function)
function Kid(
  name,
  status,
  putDownTime,
  sleepStartTime,
  sleepStopTime,
  takeUpTime,
  awakeDuration,
  sleepDuration
) {
  this.name = name;
  this.status = status;
  this.putDownTime = putDownTime; //time when kid was put in pram
  this.sleepStartTime = sleepStartTime; //time when kid fell asleep
  this.sleepStopTime = sleepStopTime; //time when kid woke up
  this.takeUpTime = takeUpTime; //time when kid was taken out of pram
  this.awakeDuration = awakeDuration; //total time kid was awake (before sleeping)
  this.sleepDuration = sleepDuration; //total time kid was sleeping
}

/*********************************************************************************START */
console.log("Create date.");
let today = new Date(); //create a Date object
let todayFormatted = today.toDateString(); //formatted date

console.log("Create barnehage object.");
let barnehage = new Kindergarten("Barnehage"); //create a Kindergarten object
console.log(barnehage);
barnehage.departments.push(new Department("Avdeling", 20, 0)); //add a department
console.log(barnehage);

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", importList); //jQuery event listener

/********************************************************************** Functions */
function importList() {
  barnehage.departments[0].kids.push(new Kid("Paul")); //add a Kid
  barnehage.departments[0].kids.push(new Kid("John")); //add a Kid
  console.log(barnehage);
}
