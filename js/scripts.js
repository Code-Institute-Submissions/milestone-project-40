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
  event.data.departments[0].kids.push(
    new Kid("Mathew", "---", "---", "---", "---", "00:00")
  );
  event.data.departments[0].kids.push(
    new Kid("Mark", "---", "---", "---", "---", "00:00")
  );
  getHeaderData();
  getChildData();
  console.log("barnehage status", barnehage.departments[0].kids);
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
let today = new Date(); //create a Date object
let todayFormatted = today.toDateString(); //formatted date

console.log("Create barnehage object.");
let barnehage = new Kindergarten(todayFormatted, 0, 20); //create a Kindergarten object

let avdeling = new Department("Avdeling"); //create a Department object

barnehage.departments.push(avdeling);

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", barnehage, barnehage.departments[0].importList); //jQuery event listener

/********************************************************************** Functions */
function getHeaderData() {
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
