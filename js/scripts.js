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
  this.kids.push(
    new Kid(
      "Mathew",
      "Empty pram",
      "empty_pram.png",
      "Put baby in pram",
      "put_down.png",
      1,
      "Click to put baby in pram"
    )
  );
  this.kids.push(
    new Kid(
      "John",
      "Empty pram",
      "empty_pram.png",
      "Put baby in pram",
      "put_down.png",
      1,
      "Click to put baby in pram"
    )
  );
  this.refreshList();
};
//Department prototype
Department.prototype.refreshList = function(event) {
  //  console.log("REFRESHING LIST...");
  getHeaderData();
  getChildData();
};
//define Kid object (constructor function)
function Kid(
  name,
  status,
  statusImg,
  action,
  actionImg,
  maxSleepTime,
  message,
  putDownTime,
  sleepStartTime,
  sleepStopTime,
  takeUpTime,
  awakeDuration,
  sleepDuration
) {
  this.name = name;
  this.status = status;
  this.statusImg = statusImg;
  this.action = action;
  this.actionImg = actionImg;
  this.putDownTime = putDownTime; //time when kid was put in pram
  this.maxSleepTime = maxSleepTime; //maximum time kid should sleep for (given by parents)
  this.message = message; //message description
  this.sleepStartTime = sleepStartTime; //time when kid fell asleep
  this.sleepStopTime = sleepStopTime; //time when kid woke up
  this.takeUpTime = takeUpTime; //time when kid was taken out of pram
  this.awakeDuration = awakeDuration; //total time kid was awake (before sleeping)
  this.sleepDuration = sleepDuration; //total time kid was sleeping
}
Kid.prototype.putDown = function(event) {
  this.status = `${this.name} awake in pram`;
  this.statusImg = "emoji_baby_awake_in_pram.png";
  this.action = `Click when ${this.name} is asleep`;
  this.actionImg = "asleep_yet.png";
  this.putDownTime = new Date();
  this.message = `Click when ${this.name} is asleep.`;
  console.log("***** put down mathew at: ", this.putDownTime);
  activeDepartment.refreshList();
};
//Kid prototype
Kid.prototype.asleepYet = function(event) {
  this.status = `${this.name} is asleep`;
  this.statusImg = "emoji_baby_asleep.png";
  this.actionImg = "wait.png";
  this.sleepStartTime = new Date();
  this.takeUpTime = new Date();
  this.takeUpTime.setMinutes(this.takeUpTime.getMinutes() + this.maxSleepTime);
  this.action = `Take up ${this.name} ${getActionMinutes(this.takeUpTime)}`;
  this.message = `${this.name} is sleeping. You will be notified when it is time to wake ${this.name}`;
  activeDepartment.refreshList();
};
//Kid prototype
Kid.prototype.takeUp = function(event) {
  this.status = "Finished sleeping";
  this.statusImg = "emoji_baby_asleep.png";
  this.actionImg = "wait.png";
  this.sleepStopTime = new Date();
  this.action = `${this.name} is finished sleeping`;
  this.message = `${this.name} is finished sleeping.`;
  activeDepartment.refreshList();
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

//console.log("Create barnehage object.");
let barnehage = new Kindergarten(todayDateFormatted, 0, 20); //create a Kindergarten object instance
const activeKindergarten = barnehage; //set this Kindergarten object instance as the active kindergarten
let avdeling = new Department("Avdeling"); //create a Department object instance
activeKindergarten.departments.push(avdeling); //add this department to out current kindergarten
const activeDepartment = activeKindergarten.departments[0]; //set this Department object instance as the active department
//console.log("activeKindergarten", activeKindergarten);
//console.log("activeDepartment", activeDepartment);

//https://www.w3schools.com/jsref/met_win_setinterval.asp
setInterval(function() {
  console.log("===========================================");
  console.log("Timer function called");
  for (const kid of activeDepartment.kids) {
    let sleeping = Date.now() - kid.sleepStartTime; //length of time sleeping (milliseconds)

    //convert maxSleepTime from minutes to milliseconds
    if (sleeping > kid.maxSleepTime * 60000) {
      //     kid.status = `${kid.name} is asleep`;
      kid.statusImg = "emoji_baby_asleep.png";
      kid.action = `Take up ${kid.name} ${getActionMinutes(kid.takeUpTime)}`;
      kid.actionImg = "take_up.png";
      kid.message = `${kid.name} needs to be taken up.`;
      activeDepartment.refreshList();
    }
  }
}, 10000);

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", $.proxy(activeDepartment, "importList"));

$("#listContainer").on("click", ".actionIcon", activeDepartment, function(
  event
) {
  //  console.log("Listener: event data...", event.data);
  //  console.log("Listener: this...", this);
  let node = $(this)
    .parent()
    .parent();
  let index = node.index();
  //  console.log("index: ", index);
  let status = $(this)
    .find(".status")
    .text();
  //  console.log("**********************status: ", status);
  if (status == "Put baby in pram") {
    console.log("RUNNING PUTDOWN()");
    activeDepartment.kids[index].putDown();
  } else if (
    status == `Click when ${activeDepartment.kids[index].name} is asleep`
  ) {
    console.log("RUNNING ASLEEPYET()");
    activeDepartment.kids[index].asleepYet();
  }
}); //jQuery event listener

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
  //https://stackoverflow.com/questions/1027354/i-need-an-unordered-list-without-any-bullets
  data += `
  <ul class="list-unstyled">`;
  console.log("GETTING CHILD DATA:");
  for (const kid of activeDepartment.kids) {
    console.log("kid.message", kid.message);
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
      <div class="col-3 col-md-2 actionIcon">
        <div class="row text-center">
          <div class="col-12"><h4>Action</h4></div>
          <div class="col-12"><img src="./images/${kid.actionImg}" alt="Put baby down to sleep" /></div>
          <div class="col-12 status">${kid.action}</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12"><h4>Status</h4></div>
          <div class="col-12"><img src="./images/${kid.statusImg}" alt="Empty pram" /></div>
          <div class="col-12">${kid.status}</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12"><i class="fas fa-info-circle fa-3x"></i></div>
          <div class="col-12">more info...</div>
        </div>
      </div>
      <div class="col-12 text-center">${kid.message}</div>
    </div>
  </li>`;
  }
  data += `</ul >`;
  $("#listContainer").html(data);
}
function getActionMinutes(takeUpTime) {
  let timeReamaining = (takeUpTime - Date.now()) / 60000; //convert from milliseconds to minutes
  if (timeReamaining < 1) {
    return "now!";
  } else {
    return `in ${timeReamaining} mins`;
  }
}
