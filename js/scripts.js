//define Kindergarten object (constructor function)
function Kindergarten(date, kidsAsleep, kidsAwake) {
  this.date = date; //todays date
  this.kidsAsleep = kidsAsleep; //total number of kids currently asleep
  this.kidsAwake = kidsAwake; //total number of kids currently awake
  this.kids = []; //array of Kid objects
}
