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
Department.prototype.importList = function (event) {
  dayStarted = true;
  this.kids.push(new Kid("Mathew", 2));
  this.kids.push(new Kid("John", 1));
  this.refreshList();
};
//Department prototype
Department.prototype.refreshList = function (event) {
  //  console.log("REFRESHING LIST...");
  getHeaderData();
  getChildData();
};
//define Kid object (constructor function)
function Kid(
  name,
  maxSleepTime,
  status,
  statusImg,
  action,
  actionImg,
  message,
  putDownTime,
  sleepStartTime,
  sleepStopTime,
  takeUpTime,
  awakeDuration,
  sleepDuration,
  rowClass
) {
  this.name = name;
  this.status = "Empty pram";
  this.statusImg = "empty_pram.png";
  this.action = "Put baby in pram";
  this.actionImg = "put_down.png";
  this.putDownTime = putDownTime; //time when kid was put in pram
  this.maxSleepTime = maxSleepTime; //maximum time kid should sleep for (given by parents)
  this.message = "Click to put baby in pram"; //message description
  this.sleepStartTime = sleepStartTime; //time when kid fell asleep
  this.sleepStopTime = sleepStopTime; //time when kid woke up
  this.takeUpTime = takeUpTime; //time when kid was taken out of pram
  this.awakeDuration = awakeDuration; //total time kid was awake (before sleeping)
  this.sleepDuration = sleepDuration; //total time kid was sleeping
  this.rowClass = "kid-awake";
}
Kid.prototype.putDown = function (event) {
  this.status = `${this.name} awake in pram`;
  this.statusImg = "emoji_baby_awake_in_pram.png";
  this.action = `Click when ${this.name} is asleep`;
  this.actionImg = "asleep_yet.png";
  this.putDownTime = new Date();
  this.message = `Click when ${this.name} is asleep.`;
  this.rowClass = "kid-awake";
  activeDepartment.kidsAwake++;
  //  console.log("***** put down mathew at: ", this.putDownTime);
  activeDepartment.refreshList();
};
//Kid prototype
Kid.prototype.asleepYet = function (event) {
  //  debugger;
  this.status = `${this.name} is asleep`;
  this.statusImg = "emoji_baby_asleep.png";
  this.actionImg = "wait.png";
  this.sleepStartTime = new Date();
  this.takeUpTime = new Date();
  this.takeUpTime.setMinutes(this.takeUpTime.getMinutes() + this.maxSleepTime);
  this.action = `Take up ${this.name} ${getActionMinutes(this.takeUpTime)}`;
  this.message = `${this.name} is sleeping. You will be notified when it is time to wake ${this.name}`;
  //  console.log("=======>> this.sleepStartTime: ", this.sleepStartTime);
  //  console.log("=======>> this.putDownTime: ", this.putDownTime);
  this.awakeDuration = Math.floor(
    (this.sleepStartTime - this.putDownTime) / 60000
  );
  activeDepartment.kidsAwake--;
  activeDepartment.kidsAsleep++;
  console.log("==>> awake duration", this.awakeDuration);
  activeDepartment.refreshList();
};
//Kid prototype
Kid.prototype.takeUp = function (event) {
  this.status = "Finished sleeping";
  this.statusImg = "empty_pram.png";
  this.actionImg = "empty_pram.png";
  this.sleepStopTime = new Date();
  this.action = `${this.name} is finished sleeping`;
  this.message = `${this.name} is finished sleeping.`;
  this.sleepDuration = Math.floor(
    (this.sleepStopTime - this.sleepStartTime) / 60000
  );
  activeDepartment.kidsAsleep--;
  console.log("==>> Slept for (mins): ", this.sleepDuration);
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
//https://www.w3schools.com/js/js_date_methods.asp
let todayDate = new Date();
let year = todayDate.getFullYear();
let month = months[todayDate.getMonth()];
let date = todayDate.getDate();
let day = days[todayDate.getDay() - 1];
let todayDateFormatted = `${day}</br>${date}. ${month} ${year}`;
let dayStarted = false;

var map;
function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}
let barnehage = new Kindergarten("Barnehage"); //create a Kindergarten object instance
const activeKindergarten = barnehage; //set this Kindergarten object instance as the active kindergarten
let avdeling = new Department("Avdeling", 0, 0); //create a Department object instance
activeKindergarten.departments.push(avdeling); //add this department to out current kindergarten
const activeDepartment = activeKindergarten.departments[0]; //set this Department object instance as the active department
//console.log("activeKindergarten", activeKindergarten);
//console.log("activeDepartment", activeDepartment);

//console.log("Weather is: ", weather.summary);

//https://www.w3schools.com/jsref/met_win_setinterval.asp
setInterval(function () {
  console.log("=========Timer============");
  for (const kid of activeDepartment.kids) {
    let sleeping = Date.now() - kid.sleepStartTime; //length of time sleeping (milliseconds)
    if (kid.status == `${kid.name} is asleep`) {
      kid.action = `Take up ${kid.name} ${getActionMinutes(kid.takeUpTime)}`;

      if (sleeping > kid.maxSleepTime * 60000) {
        //convert maxSleepTime from minutes to milliseconds
        kid.action = `Take up ${kid.name} ${getActionMinutes(kid.takeUpTime)}`;
        kid.actionImg = "take_up.png";
        kid.statusImg = "emoji_baby_asleep.png";
        kid.message = `${kid.name} needs to be taken up.`;
      }
    }
  }
  //  console.log("=======>> Refreshing from timer", barnehage);
  if (dayStarted) {
    activeDepartment.refreshList();
  }
}, 10000);
setInterval(function () {
  console.log("=======API Timer==========");
  if (dayStarted) {
    activeDepartment.refreshList();
  }
}, 30000);

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", $.proxy(activeDepartment, "importList"));

$("#listContainer").on("click", ".actionIcon", activeDepartment, function (
  event
) {
  let node = $(this)
    .parent()
    .parent();
  let index = node.index();
  //  console.log(">>>>>>>>>>> index: ", index);
  //  console.log(">>>>>>>>>>> node: ", node.html());
  let statusText = node.find(".status").text();
  if (statusText == "Empty pram") {
    console.log("<- putDown() ->");
    activeDepartment.kids[index].putDown();
  } else if (
    statusText == `${activeDepartment.kids[index].name} awake in pram`
  ) {
    console.log("<- asleepYet() ->");
    activeDepartment.kids[index].asleepYet();
  } else if (statusText == `${activeDepartment.kids[index].name} is asleep`) {
    console.log("<- takeUp() ->");
    activeDepartment.kids[index].takeUp();
  }
}); //jQuery event listener

/********************************************************************** Functions */
function getHeaderData() {
  let data = "";
  //  console.log("Testing for loop:");
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
          <div class="col-12">${activeDepartment.kidsAwake}</div>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="row text-center">
          <div class="col-12">Asleep:</div>
          <div class="col-12">${activeDepartment.kidsAsleep}</div>
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
  //console.log("GETTING CHILD DATA:");
  for (const kid of activeDepartment.kids) {
    //console.log("kid.message", kid.message);
    //data will be concatenated to form a list of kids
    data += `
  <li>
    <div class="row justify-content-center kid-row ${kid.rowClass}">
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
          <div class="col-12 action">${kid.action}</div>
        </div>
      </div>
      <div class="col-3 col-md-2 statusIcon">
        <div class="row text-center">
          <div class="col-12"><h4>Status</h4></div>
          <div class="col-12"><img src="./images/${kid.statusImg}" alt="Empty pram" /></div>
          <div class="col-12 status">${kid.status}</div>
        </div>
      </div>
      <div class="col-3 col-md-2 more-info">
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
  let timeReamaining = Math.ceil((takeUpTime.getTime() - Date.now()) / 60000); //convert from milliseconds to minutes
  if (timeReamaining < 1) {
    return "now!";
  } else {
    return `in ${timeReamaining} mins`;
  }
}
