# Barnevakt ![Barnevakt](favicon-32x32.png)

### Live website: https://paulldev.github.io/milestone-project-2/

### Repository: https://github.com/paulldev/milestone-project-2

## Introduction

NOTE: Due to child data protection laws, no real child names are used in this project, and child images are represented by a generic icon, not a picture.

**Barnevakt** is a web app designed for people who work with infants (ages 1-3) in kindergarten. Most kindergartens in Norway use a pen and a printed page to keep track of each infant's data. This web app will automate most tasks and make other tasks trivial. This will allow staff to work more efficiently and with less errors (eg. child sleeping too long).

## UX

### Strategy Plane

> What are you aiming to achieve and for whom?

I want my web app to make the job easier for people who work in kindergartens.

I asked people who work with infants about their routines and collaborated to build a mock up to include the requested functionality and ease of use.

My goal is to create a web app that creates and uses objects and their associated methods. I also want to make it scalable so that a kindergarten could have multiple departments with multiple kids.

### Scope Plane

> Which features (based on information from the strategy plane) do you
> want to include in your design?

- **Portability:** In Norway, infants mostly sleep outside. The web app needs to be suitable for smaller devices such as mobiles and tablets.
- **Dynamic:** The list of children should be dynamic. Infants that are next to be taken up should appear at the top of the list. Infants that have finished sleeping should disappear from the list.

### Structure Plane

> How is the information structured and how is it logically grouped.

The web app will contain a single page.

The main three objects used will be the _Kindergarten_ object, the _Department_ object, and the _Kid_ object.
The _Kindergarten_ object contains a departments array of _Department_ objects.
Each _Department_ object contain a kids array of _Kid_ objects.
This structure is kept in main memory and changes state as the user interacts with the app.

### Skeleton Plane

> How will our information be represented, and how will the user
> navigate to the information and features?

The information is represented as a list of kids. Each kid has properties and buttons. The buttons provide a quick and easy way to update kid data and change the overall status of the list.

Kid data:

- Name
- Age
- Maximum length of time the infant can sleep (set by parents)
-

Infant methods:

- Put infant down
  - Start timer (how long it takes to fall asleep)
  - Toggle action icon
  - Set awake icon
- Infant falls asleep
  - Start timer (how long infant sleeps)
  - Toggle action icon
  - Set sleeping icon
- Infant awakens (by himself/herself)
- Infant awakens (by staff, because maximum sleeping time is reached)
- Infant is taken up

### Surface Plane

> What will our finished product look like?

The finished product will be a clean, enjoyable, responsive, easy to use web app.

It will have a main header which will contain the current date, the total number of kids that are awake, the total number of kids that are asleep. It will also contain the current weather temperature (from openweather's API) so staff can decide whether to have the children sleeping outside or inside.

The list of kids will have a child section, which will have an icon to represent the child.

## Features

#### Overview

The web app uses Bootstrap. I wanted to show knowledge about many Bootstrap features, but only if they fitted into the design of the website. I used the official documentation (https://getbootstrap.com/docs/4.1/getting-started/introduction/) for inspiration, tutorials, code snippets, class references. I made a consious effort to make everything as responsive as possible, using mostly relative units, and utilizing the Bootstrap grid system.
Where appropriate, I overrode classes to attain my desired results. DevTools was extensively used for this purpose.

#### Home page > Navigation bar

The navigation is located at the top of each page and uses Bootstrap's navbar. I wanted the navbar to be collapsable on smaller devices.

## Future features to implement

-

## Technologies used

| Name | Type | Site url | Why use it? |

| :------ |:------- | :---- |

| HTML5 | Language | https://www.w3.org/TR/html52/ | To structure the website |

| CSS3 | Language | https://www.w3.org/Style/CSS/Overview.en.html | To style and layout the website |

| Bootstrap | Framework | https://getbootstrap.com/ | To make layout easier |

| Font awesome | Toolkit | https://fontawesome.com/ | To use vector icons and social logos |

| Croppola | Tool | https://croppola.com/ | To crop my images |

| Reduce Images | Tool | https://www.reduceimages.com/ | To reduce the size of my images |

| Real favicon generator | Tool | https://realfavicongenerator.net | To generate favicons from an image |

## Testing

Testing with Jasmine was a challenge, because I was testing a dynamic list. The Kid object method putDown(), also contains a sorting feature which changes the list order. Therefore I couldn't directly compare

-

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
