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
//Department prototype
Department.prototype.importList = function(event) {
  console.log("PROTOTYPE: event...", event.data);
  console.log("PROTOTYPE: this...", this);
  this.kids.push(new Kid("Mathew", "---", "---", "---", "---", "00:00"));
  this.kids.push(new Kid("John", "---", "---", "---", "---", "00:00"));
  getHeaderData();
  getChildData();
  console.log("barnehage status", this.kids);
};
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
//Kid prototype
Kid.prototype.putDown = function(event) {
  console.log("*********************************************************");
  //  console.log("putDown: event data...", event.data);
  console.log("putDown: this...", this);
  this.status = "Awake in pram";
  this.putDownTime = new Date();
  this.message = `Click 'Asleep?' when ${this.name} is asleep.`;
  console.log("status: ", activeKindergarten);
};

/*********************************************************************************START */
console.log("Create date.");
let months = [
  "Januar",
  "Februar",
  "Mars",
  "Apr",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember"
];
let days = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag"
];
let todayDate = new Date();
let todayDateFormatted = `${todayDate.getMonth()}.${
  months[todayDate.getMonth()]
} ${todayDate.getFullYear()}`;
let todayTime = todayDate.getTime();

console.log("Create barnehage object.");
let barnehage = new Kindergarten(todayDateFormatted, 0, 20); //create a Kindergarten object instance
const activeKindergarten = barnehage; //set this Kindergarten object instance as the active kindergarten
let avdeling = new Department("Avdeling"); //create a Department object instance
activeKindergarten.departments.push(avdeling); //add this department to out current kindergarten
const activeDepartment = activeKindergarten.departments[0]; //set this Department object instance as the active department

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", $.proxy(activeDepartment, "importList"));

/********************************************************************** Functions */
function getHeaderData() {
  let data = "";
  console.log("Testing for loop:");
  data += `
      <div class="row justify-content-center">
      <div class="col-4 col-md-2">
        <div class="row text-center">
          <div class="col-12">Date:</div>
          <div class="col-12">${todayDateFormatted}</div>
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
}
function getChildData() {
  let data = "";
  console.log("Testing for loop:");
  //https://stackoverflow.com/questions/1027354/i-need-an-unordered-list-without-any-bullets
  data += `
  <ul class="list-unstyled">`;

  for (const kid of barnehage.departments[0].kids) {
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
}
