# Barnevakt ![Barnevakt](images/favicon-32x32.png)

### Live website: https://paulldev.github.io/milestone-project-2/

### Repository: https://github.com/paulldev/milestone-project-2

### Jamine testing suite: https://paulldev.github.io/milestone-project-2/jasmine-testing/

### Project wireframe and structure: https://github.com/paulldev/milestone-project-2/blob/master/wireframe-milestone-2.pdf

## Introduction

**NOTE:** Due to kid data protection laws, no real kid names are used in this project, and kid images are represented by a generic icon, not a picture.

**Barnevakt** is a web app designed for people who work with kids (ages 1-3) in kindergarten. Most kindergartens in Norway use a pen and a printed page to keep track of each kid's data. This web app will automate most tasks and make other tasks trivial. This will allow staff to work more efficiently and with less errors (eg. kid sleeping too long).

All code produced is my own. Any sources I used as a reference are included as a link in my code. All solutions are based on course material, official documentation, and lots of trial and error.

## UX

### Strategy Plane

> What are you aiming to achieve and for whom?

I want my web app to make the job easier for people who work in kindergartens.

I asked people who work with kidss about their routines and collaborated to build a mock-up to include the requested functionality and ease of use.

My goal is to create a web app that creates and uses objects and their associated methods. I also want to make it scalable so that a kindergarten can have multiple departments with multiple kids with minimal effort.

Since older people will mostly be using the app, there should be minimal inforation displayed for each kid on the list. The action button will be formatted to make it clear what action the user needs to take. The text information under each icon, the message area, the icons, the list order, and background colours in each list item should clearly describe the state of each kid and what actions can be taken with each kid.

Displaying the weather information allows staff to decide whether the kids should sleep inside or outside (based on temperature).

### Scope Plane

> Which features (based on information from the strategy plane) do you
> want to include in your design?

- **Portability:** In Norway, kids mostly sleep outside. The web app needs to be suitable for smaller devices such as mobiles and tablets.
- **Dynamic:** The list of kids should be dynamic. Kids that are due to be taken up should appear at the top of the list. Kids that have finished sleeping should disappear from the list.
  All information in the app is dynamic. The day and date is current, the weather information is current, the information for each kid that is displayed on screen matches the data stored in the data structure in main memory.

### Structure Plane

> How is the information structured and how is it logically grouped.

The web app will contain a single page to mimic the single, physical page staff are used to working with.

The main three objects used will be the **Kindergarten** object, the **Department** object, and the **Kid** object.
The **Kindergarten** object contains a departments array of **Department** objects.
Each **Department** object contain a kids array of **Kid** objects.
This data structure is kept in main memory and changes state as the user interacts with the app.

### Skeleton Plane

> How will our information be represented, and how will the user
> navigate to the information and features?

The information is represented as a list of kids. Each kid has information and icons. The action icons are clickable and provide a quick and easy way to update kid data and change the overall status of the list.

**Kindergarten object - Properties**

- **name:** the name of the kindergarten.
- **departments:** an array of Department objects.

**Department object - Properties**

- **name:** the name of the department.
- **kidsAwake:** the total number of kids that are awake in their pram, waiting to fall asleep.
- **kidsAsleep:** the total number of kids that are asleep in their pram.
- **dayStarted:** a boolean value (default set to false) used to keep track of whether the list of kids has been imported yet or not.
- **kids:** an array of Kid objects.

**Department object - Methods**

- **importList:** called when user clicks the 'import list' button.
- **refreshList:** displays and sorts the list of kids by priority, and then by the time they should be taken up at. This will keep kids with a high priority at the top of the list (eg. kids that have finished sleeping and need to be taken up). I will keep kids with a low priority at the bottom of the list (eg. kids that are sleeping and don't need to be taken up yet). This will save the user having to scroll through the list because all actionable items will be at the top of the list.

**Kid object - Properties**

- **name:** the name of the kid.
- **maxSleepTime:** the maximum time a kid should sleep for (given by parents of the kid).
- **status:** the text that appears under the status icon. It describes the current status of the kid (awake in pram, sleeping, ready to be taken up, etc).
- **statusImg:** the icon that visually describes the current status of the kid (awake in pram, sleeping, ready to be taken up, etc).
- **action:** the text that appears under the action icon. It describes what the button will do for the current kid (put down to sleep, click when asleep, take up, etc).
- **actionImg:** the icon that visually describes what clicking the button will do (put down to sleep, click when asleep, take up, etc).
- **message:** a short sentence which gives information about what the user might need to do.
- **putDownTime:** the time the kid was put into their pram (not asleep yet).
- **sleepStartTime:** the time the kid started sleeping at.
- **sleepStopTime:** the time the kid stopped sleeping at. This can be the same as the time the kid _should_ wake up at, or it can be an earlier time if the kid wakes up earlier than the time the kid _should_ sleep until.
- **takeUpTime:** the time the kid should be taken up at. This is set by the kid's parents so that they don't sleep too long.
- **awakeDuration:** how log it took the kid to fall asleep.
- **sleepDuration:** how long the kid was sleeping for.
- **rowClass:** a class which helps to visually show the user the status of each kid (eg. a red background is an urgent indicator that the kid needs to be taken up). Classes are: kid-awake, kid-waiting, kid-asleep, kid-takeup.
- **priority:** each kid has a priority number depending on their current status. This is first of two properties used to sort the list of kids.
- **visibility:** used to show or hide a kid from the list. Once a kid is taken up, the visibility will be set to 'hidden'.
- **notified:** a boolean value used to call the **vibration API** which will notify the user only when a kid needs to be taken up. The user will be notified once, then the boolean value will be set to true. This is to prevent multiple notifications.

**Kid object - Methods**

- **putDown**

  - sets kid status to 'kidname awake in pram'.
  - sets statusImg to 'emoji_baby_awake_in_pram.png'.
  - sets action to 'Click when kidname is asleep'.
  - sets actionImg to 'asleep_yet.png'.
  - sets putDownTime to the current time.
  - sets message to 'Click when kidname is asleep'.
  - sets rowClass to the 'kid-waiting' class.
  - sets priority to 3.
  - increments the kidsAwake value by one.
  - calls refreshList() to update and sort the list of kids.
  - returns the activeDepartment which can be used in Jasmine testing.

- **asleepYet**

  - sets status to 'kidname is asleep'.
  - sets statusImg to 'emoji_baby_asleep.png'.
  - sets actionImg to 'wait.png'.
  - sets sleepStartTime to current time.
  - sets takeUpTime to the time the kid should be taken up at. It is calculated by: takeUpTime + maxSleepTime.
  - sets action to 'Take up kidname in (time remaining) mins. The getActionMinutes function is called to determine the exact time. The app has a timer (setInterval) that will update this value every 10 seconds.
  - sets message to 'kidname is sleeping. You will be notified when it is time to wake kidname'.
  - sets awakeDuration to the amount of time the kid took to fall asleep. It is calculated by: sleepStartTime - putDownTime.
  - sets rowClass to 'kid-asleep' class.
  - sets priority to 4.
  - decrements kidsAwake value by one.
  - increments the kidsAsleep value by one.
  - calls refreshList() to update and sort the list of kids.
  - returns the activeDepartment which can be used in Jasmine testing.

- **takeUp**
  - sets status to 'Finished sleeping'.
  - sets statusImg to 'empty_pram.png'.
  - sets actionImg to 'empty_pram.png'.
  - sets sleepStopTime to current time.
  - sets action to 'kidname is finished sleeping'.
  - sets message to 'kidname is finished sleeping'.
  - sets sleepDuration to the amount of time the kid slept for. It is calculated by: sleepStopTime - sleepStartTime.
  - decrements kidsAsleep value by one.
  - sets rowClass to ''.
  - sets priority to 5.
  - sets visibility to 'hidden'.
  - calls refreshList() to update and sort the list of kids.
  - returns the activeDepartment which can be used in Jasmine testing.

### Surface Plane

> What will our finished product look like?

The finished product will be a clean, enjoyable, responsive, easy to use web app.

It will have a main header which will contain the current date, the total number of kids that are awake, the total number of kids that are asleep. It will also contain the current weather temperature (from **openweather's API**) so staff can decide whether to have the kids sleeping outside or inside.

The list of kids will have a **Child** section, which will have an icon to represent the kid, with the kid's name underneath.
There will be an **Action** section beside the kid section. This area will be a button that will perform several different actions, depending on the state of the kid (awake, sleeping, etc.). The icon and text will be dynamic and will change to reflect the current state of the kid.
There will be a **status** section beside the action section. This area will be to display information only, it will not be clickable. The icon and text will be dynamic and will change to reflect the current state of the kid.
There will be a **More info** section beside the status section. This area uses a Bootstrap accordion to show and hide extra information about the kid. Information contained inside this collapsed section is not important to the running of the program, and is therefore hidden by deault to avoid information overload to the user.

## Features

## Future features to implement

- connect app to a backend database to save the app's state. This persistent data could then be loaded, edited, saved, etc.
  Having a server backend would also allow us to use an email API that could send out emails to staff and parents.
- create a dropdown menu with several departments. By selecting a particular department, you would be setting that as the activeDepartment.
- Create a Settings tab where we could change notification settings (which parents want to receive emails and what information they want to receive), kid settings (how long they should sleeep, etc.), kindergarten settings (change the name, add/remove/rename departments, add/remove/rename kids, etc.).

## Technologies used

| Name                   | Type      | Site url                                                       | Why use it?                                                                           |
| :--------------------- | :-------- | :------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| HTML5                  | Language  | https://www.w3.org/TR/html52/                                  | To structure the website                                                              |
| CSS3                   | Language  | https://www.w3.org/Style/CSS/Overview.en.html                  | To style and layout the website                                                       |
| Javascript             | Language  | https://developer.mozilla.org/en-US/docs/Web/JavaScript        | To create responsive, interactive elements for web pages                              |
| jQuery                 | Library   | https://jquery.com/                                            | To make DOM traversal, manipulation, event handling, animation, and Ajax much simpler |
| Bootstrap              | Framework | https://getbootstrap.com/                                      | To make layout easier                                                                 |
| Font awesome           | Toolkit   | https://fontawesome.com/                                       | To use vector icons and social logos                                                  |
| Croppola               | Tool      | https://croppola.com/                                          | To crop my images                                                                     |
| Reduce Images          | Tool      | https://www.reduceimages.com/                                  | To reduce the size of my images                                                       |
| Real favicon generator | Tool      | https://realfavicongenerator.net                               | To generate favicons from an image                                                    |
| Gimp                   | Software  | https://www.gimp.org/                                          | To create custom icons                                                                |
| Vibration API          | API       | https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API | To vibrate the user's phone when it is time to take a kid up                          |
| OpenWeather API        | API       | https://openweathermap.org/                                    | To display current weather information to the user                                    |

## Testing

The Jasmine testing suite can be found at https://paulldev.github.io/milestone-project-2/jasmine-testing/.

The **putDown()** method of the Kid object is successfully tested. Other object method tests were done manually due to the complexity of the data structure and the complexity of testing an object status that is constantly changing. Upon completion of the course I intend to revisit my Jasmine testing suite to find a better solution that is easier to implement.

**Manual testing was recorded in the following table:**
From inside **DevTools > Sources > Watch**, we add each variable to be tested as we run the app.

| Test                                              | Actions                          | Test results                                                                                                                                                                                                                       | Result |
| :------------------------------------------------ | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Action: Put baby in pram                          | Click action icon for **Tina**   | Check all variables are correct: status, statusImg, action, actionImg, putDownTime, message, rowClass, priority, kidsAwake. Check if list is correctly sorted.                                                                     | Pass   |
| Action: Put baby in pram                          | Click action icon for **Jane**   | Check all variables are correct: status, statusImg, action, actionImg, putDownTime, message, rowClass, priority, kidsAwake. Check if list is correctly sorted.                                                                     | Pass   |
| Action: Put baby in pram                          | Click action icon for **Mathew** | Check all variables are correct: status, statusImg, action, actionImg, putDownTime, message, rowClass, priority, kidsAwake. Check if list is correctly sorted.                                                                     | Pass   |
| Action: Put baby in pram                          | Click action icon for **Jonn**   | Check all variables are correct: status, statusImg, action, actionImg, putDownTime, message, rowClass, priority, kidsAwake. Check if list is correctly sorted.                                                                     | Pass   |
| Action: Click when kid is asleep                  | Click action icon for **John**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStartTime, takeUpTime, message, awakeDuration, rowClass, priority, kidsAwake, kidsAsleep. Check if list is correctly sorted.                           | Pass   |
| Action: Click when kid is asleep                  | Click action icon for **Mathew** | Check all variables are correct: status, statusImg, action, actionImg, sleepStartTime, takeUpTime, message, awakeDuration, rowClass, priority, kidsAwake, kidsAsleep. Check if list is correctly sorted.                           | Pass   |
| Action: Click when kid is asleep                  | Click action icon for **Jane**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStartTime, takeUpTime, message, awakeDuration, rowClass, priority, kidsAwake, kidsAsleep. Check if list is correctly sorted.                           | Pass   |
| Action: Click when kid is asleep                  | Click action icon for **Tina**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStartTime, takeUpTime, message, awakeDuration, rowClass, priority, kidsAwake, kidsAsleep. Check if list is correctly sorted.                           | Pass   |
| Action: Take up child early (before notification) | Click action icon for **John**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |
| Action: Take up child early (before notification) | Click action icon for **Mathew** | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |
| Action: Take up child early (before notification) | Click action icon for **Jane**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |
| Action: Take up child early (before notification) | Click action icon for **Tina**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |

The next test are to check the timer functionality. Every minute the app is updated. We have given each child unrealistic sleep times of 1, 2, 3, and 4 minutes each. For this test we will click each kid until all of them have a status of sleeping. This will be the starting point for our tests. Then we will wait for five minutes.

| Test                                              | Actions                                | Test results                                                                                                                           | Result |
| :------------------------------------------------ | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Action: Take up child (wait for app notification) | Wait for **John's** status to change   | Check all variables are correct: status, statusImg, action, actionImg, message, rowClass, priority. Check if list is correctly sorted. | Pass   |
| Action: Take up child (wait for app notification) | Wait for **Mathew's** status to change | Check all variables are correct: status, statusImg, action, actionImg, message, rowClass, priority. Check if list is correctly sorted. | Pass   |
| Action: Take up child (wait for app notification) | Wait for **Jane's** status to change   | Check all variables are correct: status, statusImg, action, actionImg, message, rowClass, priority. Check if list is correctly sorted. | Pass   |
| Action: Take up child (wait for app notification) | Wait for **Tina's** status to change   | Check all variables are correct: status, statusImg, action, actionImg, message, rowClass, priority. Check if list is correctly sorted. | Pass   |

Now that all the kids are waiting to be taken up, it is time to re-run the test to take up each kid.

| Test                  | Actions                          | Test results                                                                                                                                                                                                                       | Result |
| :-------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Action: Take up child | Click action icon for **John**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |
| Action: Take up child | Click action icon for **Mathew** | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |
| Action: Take up child | Click action icon for **Jane**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |
| Action: Take up child | Click action icon for **Tina**   | Check all variables are correct: status, statusImg, action, actionImg, sleepStopTime, message, sleepDuration, rowClass, priority, kidsAsleep, visibility. Check if list is correctly sorted. Check that kid disappeared from list. | Pass   |

Testing the **Vibration API** works using Firefox on a mobile device, but not on Chrome. No other browsers were tested.

## Deployment

All development was done locally using vscode as the IDE. Regular commits were made locally, which were then pushed to GitHub.
When working on certain features, a new branch was created, which was then merged with the master branch after it was tested to be working.

The project is hosted on **GitHub Pages** at the following url: https://paulldev.github.io/milestone-project-2/
The project **repository** is located at the following url:
https://github.com/paulldev/milestone-project-2

## Credits

### Media

All media icons were created by me using Gimp.

## Acknowledgements

Special thanks to my mentor, Aaron Sinnott. I appreciated his insight, advice, and his time.
I would also thank the staff members I interviewed for taking time to show me their current system and to talk to me about features that they desired.
