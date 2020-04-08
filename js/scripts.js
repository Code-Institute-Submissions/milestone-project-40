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
  this.kids.push(new Kid("Tina", 4));
  this.kids.push(new Kid("Jane", 3));
  this.kids.push(new Kid("Mathew", 2));
  this.kids.push(new Kid("John", 1));
  this.refreshList();
};
//Department prototype
Department.prototype.refreshList = function (event) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  // console.log("SORTING ARRAY", activeDepartment);
  //sort array by priority and then by takeUpTime
  activeDepartment.kids.sort(function (a, b) {
    if (a.priority == b.priority) {
      return (a.takeUpTime - b.takeUpTime);
    } else {
      return (a.priority - b.priority);
    }
  });
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
  rowClass,
  priority,
  visibility,
  notified
) {
  this.name = name;
  this.status = "Empty pram";
  this.statusImg = "empty_pram.png";
  this.action = "Put baby in pram";
  this.actionImg = "put_down.png";
  this.putDownTime = ""; //time when kid was put in pram
  this.maxSleepTime = maxSleepTime; //maximum time kid should sleep for (given by parents)
  this.message = "Click to put baby in pram"; //message description
  this.sleepStartTime = ""; //time when kid fell asleep
  this.sleepStopTime = ""; //time when kid woke up
  this.takeUpTime = ""; //time when kid was taken out of pram
  this.awakeDuration = ""; //total time kid was awake (before sleeping)
  this.sleepDuration = ""; //total time kid was sleeping
  this.rowClass = "kid-awake";
  this.priority = 2; //determines where a kid is placed on our list
  this.visibility = "";
  this.notified = false;
}
Kid.prototype.putDown = function (event) {
  this.status = `${this.name} awake in pram`;
  this.statusImg = "emoji_baby_awake_in_pram.png";
  this.action = `Click when ${this.name} is asleep`;
  this.actionImg = "asleep_yet.png";
  this.putDownTime = new Date();
  this.message = `Click when ${this.name} is asleep.`;
  this.rowClass = "kid-waiting";
  this.priority = 3;
  activeDepartment.kidsAwake++;
  activeDepartment.refreshList();
  return activeKindergarten;
};
//Kid prototype
Kid.prototype.asleepYet = function (event) {
  this.status = `${this.name} is asleep`;
  this.statusImg = "emoji_baby_asleep.png";
  this.actionImg = "wait.png";
  this.sleepStartTime = new Date();
  this.takeUpTime = new Date();
  this.takeUpTime.setMinutes(this.takeUpTime.getMinutes() + this.maxSleepTime);
  this.action = `Take up ${this.name} ${getActionMinutes(this.takeUpTime)}`;
  this.message = `${this.name} is sleeping. You will be notified when it is time to wake ${this.name}`;
  this.awakeDuration = Math.floor(
    (this.sleepStartTime - this.putDownTime) / 60000
  );
  this.rowClass = "kid-asleep";
  this.priority = 4;
  activeDepartment.kidsAwake--;
  activeDepartment.kidsAsleep++;
  activeDepartment.refreshList();
  return activeKindergarten;
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
  this.rowClass = "";
  this.priority = 5;
  this.visibility = "hidden";
  activeDepartment.refreshList();
  return activeKindergarten;
};

/*********************************************************************************START */
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
  "Søndag",
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag"
];
//https://www.w3schools.com/js/js_date_methods.asp
let todayDate = new Date();
let year = todayDate.getFullYear();
let month = months[todayDate.getMonth()];
let date = todayDate.getDate();
let day = days[todayDate.getDay()];
let todayDateFormatted = `${date}. ${month} ${year}`;
let dayStarted = false;
let temperature = "";
let weatherIcon = "";

$.when(
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=58.85244&lon=5.73521&appid=71bb80548b219ca8d65f0acc15eb9551&units=metric")
).then(
  function (response) {
    let data = response;
    temperature = `${Math.round(data.main.temp)}°C`;
    weatherIcon = data.weather[0].icon;
  }, function (errorResponse) {
    if (errorResponse.status === 404) {
      console.log("Website not available at the moment");
    } else {
      console.log(errorResponse);
    }
  });

let barnehage = new Kindergarten("Barnehage"); //create a Kindergarten object instance
const activeKindergarten = barnehage; //set this Kindergarten object instance as the active kindergarten
let avdeling = new Department("Avdeling", 0, 0); //create a Department object instance
activeKindergarten.departments.push(avdeling); //add this department to out current kindergarten
const activeDepartment = activeKindergarten.departments[0]; //set this Department object instance as the active department

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
        kid.rowClass = "kid-takeup";
        kid.priority = 1;
        if ("vibrate" in navigator && !kid.notified) {
          // vibration API supported
          console.log("*****NOTIFICATION*****");
          navigator.vibrate(1000);
          kid.notified = true;
        }
      }
    }
  }
  //only refreshList if day has started (list has been imported)
  if (dayStarted) {
    activeDepartment.refreshList();
  }
}, 10000);

/***************************************************************** EVENT LISTENERS */
$("#btnImportList").on("click", $.proxy(activeDepartment, "importList"));

$("#listContainer").on("click", ".actionIcon", activeDepartment, function (
  event
) {
  let node = $(this)
    .parent()
    .parent()
    .parent();
  let index = node.index();
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
    $(`#listContainer ul li:nth-child(${index + 1})`).slideUp(function () {
      activeDepartment.kids[index].takeUp();
    });
  }
}); //jQuery event listener

/********************************************************************** Functions */
function getHeaderData() {
  let data = "";
  data += `
  <div class="container-fluid bg-info list-header">
    <div class="row justify-content-center">
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12">${day}</div>
          <div class="col-12">${todayDateFormatted}</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12">Awake:</div>
          <div class="col-12 awake-total">${activeDepartment.kidsAwake}</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12">Asleep:</div>
          <div class="col-12 asleep-total">${activeDepartment.kidsAsleep}</div>
        </div>
      </div>
      <div class="col-3 col-md-2">
        <div class="row text-center">
          <div class="col-12">Weather:</div>
          <div class="col-12"><img class="weather-widget__img" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="Weather Ganddal , NO" width="50" height="50">${temperature}</div>
        </div>
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
  for (const kid of activeDepartment.kids) {
    data += `
    <li ${kid.visibility}>
      <div class="container-fluid">
        <div class="row justify-content-center kid-row ${kid.rowClass}">
          <div class="col-3 col-md-2">
            <div class="row text-center">
            <div class="col-12"><h4>Child</h4></div>
            <div class="col-12"><i class="fas fa-user-alt fa-3x"></i></div>
            <div class="col-12">${kid.name}</div>
          </div>
        </div>
        <div class="col-3 col-md-2 actionIcon btn btn-outline-light">
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
        <div class="col-12 text-center message">${kid.message}</div>
        </div>
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