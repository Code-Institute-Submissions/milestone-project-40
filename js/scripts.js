/***************************************************************** OBJECTS */
//define Kindergarten object (constructor function)
function Kindergarten(date, kidsAsleep, kidsAwake) {
  this.date = date; //todays date
  this.kidsAsleep = kidsAsleep; //total number of kids currently asleep
  this.kidsAwake = kidsAwake; //total number of kids currently awake
  this.kids = []; //array of Kid objects
}
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

/*********************************************************************************START */
console.log("Create date.");
let today = new Date(); //create a Date object
let todayFormatted = today.toDateString(); //formatted date

console.log("Create barnehage object.");
let barnehage = new Kindergarten(todayFormatted, 0, 20); //create a Kindergarten object

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", function() {
  barnehage.importList();
}); //jQuery event listener

/********************************************************************** Functions */
let getHeaderData = function() {
  let data = "";
  console.log("Testing for loop:");
  data += `
      <div class="row justify-content-center">
      <div class="col-4 col-md-2">
        <div class="row text-center">
          <div class="col-12">Date:</div>
          <div class="col-12">${todayFormatted}</div>
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
          <div class="col-12"><i class="fas fa-user-alt fa-3x"></i></div>
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
          <div class="col-12"><i class="fas fa-info-circle fa-3x"></i></div>
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
