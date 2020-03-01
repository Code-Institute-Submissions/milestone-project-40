/***************************************************************** OBJECTS */
//define Kindergarten object (constructor function)
function Kindergarten(date, kidsAsleep, kidsAwake) {
  this.date = date; //todays date
  this.kidsAsleep = kidsAsleep; //total number of kids currently asleep
  this.kidsAwake = kidsAwake; //total number of kids currently awake
  this.kids = []; //array of Kid objects
}
//Kindergarten prototype
Kindergarten.prototype.importList = function() {
  console.log("prototype importList");
  let kid1 = new Kid("Mathew", "---", "---", "---", "---", "00:00"); //create a kid object
  let kid2 = new Kid("Mark", "---", "---", "---", "---", "00:00"); //create a kid object
  let kid3 = new Kid("Luke", "---", "---", "---", "---", "00:00"); //create a kid object
  let kid4 = new Kid("John", "---", "---", "---", "---", "00:00"); //create a kid object
  barnehage.kids.push(kid1, kid2, kid3, kid4); //push the kid objects to the kids array
  console.log("barnehage status", barnehage);
};

//define Kid object (constructor function)
function Kid(
  name,
  putDownTime,
  sleepStartTime,
  sleepStopTime,
  takeUpTime,
  sleepDuration
) {
  this.name = name;
  this.putDownTime = putDownTime; //time when kid was put in pram
  this.sleepStartTime = sleepStartTime; //time when kid fell asleep
  this.sleepStopTime = sleepStopTime; //time when kid woke up
  this.takeUpTime = takeUpTime; //time when kid was taken out of pram
  this.sleepDuration = sleepDuration; //total time kid was sleeping
}
//Kid prototype (sets putDownTime)
Kid.prototype.putDown = function() {};
//Kid prototype (sets takeUpTime)
Kid.prototype.takeUp = function() {};
