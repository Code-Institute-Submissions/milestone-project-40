let result = {}; //test result to compare with
let names = [];
activeDepartment.kids.push(new Kid("Tina", 4));
activeDepartment.kids.push(new Kid("Jane", 3));
activeDepartment.kids.push(new Kid("Mathew", 2));
activeDepartment.kids.push(new Kid("John", 1));
//build fixed array of kid names to test
for (const kid of activeDepartment.kids) {
  names.push(kid.name);
};
console.log("**** STARTING PUTDOWN SECTION ****");
//************************************************************** putDown ******************** */
describe(`Kid object > putDown() method:`, function () {
  beforeEach(function () {
    if (activeDepartment.kids.length == 0) { //if there are no kids, you must push them into kids array
      //   console.log("--need to import kids before starting");
      activeDepartment.kids.push(new Kid("Tina", 4));
      activeDepartment.kids.push(new Kid("Jane", 3));
      activeDepartment.kids.push(new Kid("Mathew", 2));
      activeDepartment.kids.push(new Kid("John", 1));
      //build fixed array of kid names to test
      for (const kid of activeDepartment.kids) {
        names.push(kid.name);
      };
    }
  });
  afterEach(function () {
    //https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    activeDepartment.kids.length = 0; //empty array
  });
  //*****************************************************************************************************function */
  function testPutDown(originalNameIndex) {
    it(`${names[originalNameIndex]}'s properties should equal expected result`, function () {
      //arrange
      //https://www.codementor.io/@junedlanja/copy-javascript-object-right-way-ohppc777d
      let testObject = JSON.parse(JSON.stringify(activeDepartment));
      let originalName = names[originalNameIndex];
      let resultNameIndex = "";
      let passed = false;
      //act

      console.log("call putDown() using " + originalName);
      activeDepartment.kids[originalNameIndex].putDown();

      //get new nameIndex after list was sorted by putDown()
      for (let index = 0; index < activeDepartment.kids.length; index++) {
        if (originalName == activeDepartment.kids[index].name) {
          resultNameIndex = index; //index of original name in sorted list
        }
      }

      //assert
      let timeDiff = new Date() - activeDepartment.kids[resultNameIndex].putDownTime;
      if (activeDepartment.kids[resultNameIndex].status == `${names[originalNameIndex]} awake in pram`
        && activeDepartment.kids[resultNameIndex].statusImg == `emoji_baby_awake_in_pram.png`
        && activeDepartment.kids[resultNameIndex].action == `Click when ${names[originalNameIndex]} is asleep`
        && activeDepartment.kids[resultNameIndex].actionImg == `asleep_yet.png`
        && activeDepartment.kids[resultNameIndex].message == `Click when ${names[originalNameIndex]} is asleep`
        && (timeDiff < 10000 & timeDiff >= 0)
        && activeDepartment.kids[resultNameIndex].priority == 3) {
        passed = true;
      } else {
        passed = false;
      }
      expect(passed).toBe(true);
    });
    console.log("afterEach() being called?");
  }

  for (var originalNameIndex = 0; originalNameIndex < names.length; originalNameIndex++) {
    testPutDown(originalNameIndex);
  }
});
//test if order is correct
//putDown
//asleepYet
//takeUp
//test if new values are correct (including header)
//test number of children left
