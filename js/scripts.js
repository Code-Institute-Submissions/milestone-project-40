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
  $("#appSummaryData").empty();
  $("#btnImportList").remove();
  getHeaderData();
  getChildData();
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
//Kid prototype (sets sleepStartTime)
Kid.prototype.sleeping = function() {};

/*********************************************************************************START */
console.log("Create date.");
let today = new Date(); //create a Date object
let todayFormatted = today.toDateString(); //formatted date

console.log("Create barnehage object.");
let barnehage = new Kindergarten(todayFormatted, 0, 20); //create a Kindergarten object

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").click(barnehage.importList); //jQuery event listener

/********************************************************************** Functions */
let getHeaderData = function() {
  let data = "";
  console.log("Testing for loop:");
  data += `
      <div class="row justify-content-center">
      <div class="col-4 col-md-2">
        <div class="row text-center">
          <div class="col-12">Date:</div>
          <div class="col-12">12-12-2020</div>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="row text-center">
          <div class="col-12">Awake:</div>
          <div class="col-12">20</div>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="row text-center">
          <div class="col-12">Asleep:</div>
          <div class="col-12">0</div>
        </div>
      </div>
    </div>
  `;
  $("#appSummaryData").html(data);
};

let getChildData = function() {
  let data = "";
  console.log("Testing for loop:");
  //https://stackoverflow.com/questions/1027354/i-need-an-unordered-list-without-any-bullets
  data += `
  <ul class="list-unstyled">`;

  for (const kid of barnehage.kids) {
    //data will be concatenated to form a list of kids
    data += `
  <li>
    <div class="row justify-content-center">
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12"><h4>Child</h4></div>
          <div class="col-12">Image</div>
          <div class="col-12">${kid.name}</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12"><h4>Action</h4></div>
          <div class="col-12"><img src="./images/emoji-baby-awake.png" alt="Baby emoji awake" /></div>
          <div class="col-12">Description</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12"><h4>Status</h4></div>
          <div class="col-12"><img src="./images/emoji-baby-asleep.png" alt="Baby emoji asleep" /></div>
          <div class="col-12">Description</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12">x</div>
          <div class="col-12">Info Image</div>
          <div class="col-12">more info...</div>
        </div>
      </div>
      <div class="col-12 text-center">Messages....</div>
    </div>
  </li>`;
  }
  data += `</ul >`;
  $("#listContainer").html(data);
};
