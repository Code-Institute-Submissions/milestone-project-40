# Barnevakt ![Barnevakt](favicon-32x32.png)

### Live website: https://paulldev.github.io/milestone-project-2/

### Repository: https://github.com/paulldev/milestone-project-2

## Introduction

**Barnevakt** is a web app designed for people who work with infants in kindergarten. Most kindergartens in Norway use a pen and a printed page to keep track of each infant's data. This web app will automate most tasks and make other tasks trivial. This will allow staff to work more efficiently and with less errors (eg. child sleeping too long).

## UX

### Strategy Plane

> What are you aiming to achieve and for whom?

I want my web app to make the job easier for people who work in kindergartens.

I asked people who work with infants about their routines and collaborated to build a mock up to include the requested functionality and ease of use.

### Scope Plane

> Which features (based on information from the strategy plane) do you
> want to include in your design?

- **Portability:** In Norway, infants mostly sleep outside. The web app needs to be suitable for smaller devices such as mobiles and tablets.
- **Dynamic:** The list of children should be dynamic. Infants that are next to be taken up should appear at the top of the list. Infants that have finished sleeping should disappear from the list.
- **Offline functionality:** The core functionality of the web app should be able offline.

### Structure Plane

> How is the information structured and how is it logically grouped.

The web app will contain a single page.

The two main objects will be the _Kindergarten_ object and the _Kid_ object.

The Kindergarten object contains:

- kids array (an array of Kid objects)

The Kid object contains:

-

### Skeleton Plane

> How will our information be represented, and how will the user
> navigate to the information and features?

The information is represented as a list of kids. Each kid has properties and buttons. The buttons provide a quicka nd easy way to update kid data and change the overall status of the list.

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

The finished product will be a clean, enjoyable, responsive, easy to navigate website

## Features

#### Overview

The web app uses Bootstrap. I wanted to show knowledge about many Bootstrap features, but only if they fitted into the design of the website. I used the official documentation (https://getbootstrap.com/docs/4.1/getting-started/introduction/) for inspiration, tutorials, code snippets, class references. I made a consious effort to make everything as responsive as possible, using mostly relative units, and utilizing the Bootstrap grid system.
Where appropriate, I overrode classes to attain my desired results. DevTools was extensively used for this purpose.

#### Home page > Navigation bar

The navigation is located at the top of each page and uses Bootstrap's navbar. I wanted the navbar to be collapsable on smaller devices.
Since white text is the main font colour throughout the website, I decided that a dark themed navbar was most suitable. This dark colour at the top of the page is matched with the dark background of the footer. The entire home page is nicely sandwiched between these two dark elements.
I added a red line hover effect (Hover.css https://ianlunn.github.io/Hover/) to the menu items to introduce a subtle use of colour from the norwegian flag (red). Although red is a striking colour, I used it sparingly because it also has negative meanings (warning, danger, delete, etc). I had to override the hvr-underline-from-center class to achieve the desired effect.
After experimenting with different menu alignments, I decided to align it on the right side of the navbar.
I added icons (from Font Awesome) to each menu item to add visual meaning beside the text.

#### Homepage > Connect With Us

This section contains links to our social media. They just link to the homepages of each social media website.
The images are Font Awesome icons which were custom styled. I got the relevant colour hex codes from https://brandpalettes.com/.
Each icons has a hover effect from the hover.css library (https://ianlunn.github.io/Hover/).
The Connect With Us section will only appear on the homepage, not on the other pages. This is a deliberate decision.

#### Start Learning page

This section contains a brief description and the list of our words to learn. There are just three words to show how the list would work. There would be too much code duplication, and too much time used, to add more words.
Each english word/sentence is represented by a blue background. Each norwegian translation is represented by a red background. Once again, this ties into the colours found in the norwegian flag.
I originally wanted the audio played by clicking a speaker icon, but I found that too difficult without using javascript. Instead, I settled for using the **audio** element. This was too large, so I applied minimal styling to reduce the size (https://catswhocode.com/html-audio-tag/)
When moving to smaller devices, the column containing the chevron will disappear and the word > translation will be vertical instead of horizontal. This was my preferred way for dealing with this complex layout. The background colours also help separate the two different languages as they sit on top of each other.

#### Book A Session page

This section starts with a brief description, followed by a form that the user has to fill out to book a tutor session.
Keeping everything centered was challenging because of the way the labels behaved. Eventually I had to use fixed widths on my labels and corresponding elements and that enabled me to keep everything centered (including the labels).
I didn't like the original date picker element, so I found a better one that matched my other elements styling better (https://codepen.io/maheshambure21/pen/VYJQYG)

#### Contact Us page

Keeping with my website centered theme, this contact form is centered and responsive.
I wanted to use Font Awesome icons to label each input. I got inspiration from the official documentation (https://getbootstrap.com/docs/4.0/components/input-group/).

## Future features to implement

-

## Technologies used

| Name | Type | Site url | Why use it? |

| :------ |:------- | :---- |

| HTML5 | Language | https://www.w3.org/TR/html52/ | To structure the website |

| CSS3 | Language | https://www.w3.org/Style/CSS/Overview.en.html | To style and layout the website |

| Bootstrap | Framework | https://getbootstrap.com/ | To make layout easier |

| Font awesome | Toolkit | https://fontawesome.com/ | To use vector icons and social logos |

| Hover.css | Library | https://ianlunn.github.io/Hover/ | To use hover effects |

| Croppola | Tool | https://croppola.com/ | To crop my images |

| Reduce Images | Tool | https://www.reduceimages.com/ | To reduce the size of my images |

| Favicon Generator | Tool | https://realfavicongenerator.net | To general favicons for website |

| Real favicon generator | Tool | https://realfavicongenerator.net | To generate favicons from an image |

## Testing

-

## Deployment

All development was done locally using vscode as the IDE. Regular commits were made locally, which were then pushed to GitHub.

The project is hosted on **GitHub Pages** at the following url: https://paulldev.github.io/milestone-project-1/
The project **repository** is located at the following url:
https://github.com/paulldev/milestone-project-1

## Credits

### Media

Emoji baby awake:
https://www.needpix.com/photo/1276460/emoticon-baby-emojis-child-bebe

## Acknowledgements

Special thanks to my mentor, Aaron Sinnott. I appreciated his insight, advice, and his time.
I would also thank the staff members I interviewed for taking time to show me their current system and to talk to me about features that they desired. I would also like to thank them for testing the app at work.
