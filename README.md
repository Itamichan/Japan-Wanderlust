# JapanWanderlust

A live demo can be found [here](http://www.japanwanderlust.com)

![WebsiteLogo](https://japan-wanderlust.s3.eu-north-1.amazonaws.com/static/images/readme/logo-readme.png)

## Introduction

JapanWanderlust is a web page which makes possible for the users to get the best travel offers to Japan based on attractions that they had selected as well as additional details (such as duration, price etc.)

The main purpose of the web page is to make possible to connect the Travel Agencies and the Potential Customers which usually prefers to plan a travel trip by themselves.
BY having the freedom to choose specific destinations as well as their budget limit and travel preferences the users will get an travel package offer which will match their wishes the best. If the user decides that they are not interested in the offers they still can have all their attractions saved in a convenient "Trip". Which they can revisit and tailor made as many times as they wish. 

### Actions that can be taken on the web page
* **Non registered user**:
    * Browse through all different attractions which can be visited in Japan.
* **Registered user**:
    * Create, Edit or Remove Trips.
    * Add or remove different Attractions to their Trip.
    * Get best matching offers from the Travel Agencies based on their choices.

## Table of Content

1. [UX](#ux)
    * [Goals](#goals)
        * [JapanWanderlust goal](#japanwanderlust-goal)
        * [Business goals](#business-goals)
        * [Customer goals](#customer-goals)
    * [User Stories](#user-stories)
        * [The game designer](#the-game-designer)
      
    * [Minimum Viable Product](#minimum-viable-product)
    * [Design](#design)
        * [Colors](#colors)
        * [Font](#font)
    * [Wireframes](#wireframes)
2. [Features](#features)
    * [Existing Features](#existing-features)
    * [Features left to implement](#features-left-to-implement)
    * [Features left to implement after testing](#features-left-to-implement-after-testing)
3. [Technologies Used](#technologies-used)
    * [Languages](#languages)
    * [Libraries](#libraries)
    * [Tools](#tools)
    * [React in detail](#react-in-detail)
4. [Testing](#testing)
5. [Deployment](#deployment)
    * [Version control on GitHub](#version-control-on-github)
    * [Deployment to AWS](#deployment-to-aws)
    * [Deployment to Heroku](#deployment-to-heroku)
    * [How to run this project locally](#how-to-run-this-project-locally)
6. [Credits](#credits)
    * [Media](#media)
    * [Acknowledgements](#acknowledgements)
        * [Deployment scripts](#deployment-scripts)
        * [Pages used for Inspiration](#pages-used-for-inspiration)
        * [Pages used for information](#pages-used-for-information)
7. [Disclaimer](#disclaimer)

## UX

### Goals

#### JapanWanderlust goal

The main goal of the JapanWanderlust is  to allow the potential traveler to get in contact with the best suited Travel Agency in order to travel to Japan.

**Target audience is:**
* People 18 years old and above.
* People interested in Japan culture and scenery. 
* People who want to have a tailor made trip plan.
* Travel Agencies who want to reach the market of people who tend to plan their trips by themselves.

#### Business goals

* Create a platform that allows the potential customer to get in contact with the best suited Travel Agency.
* Have well structured database.
* Have an attractive design of the web page.
* Have user friendly experience on the page.
* Collaborate with Travel Agencies which are willing to provide their travel packages information.


#### Customer goals

* **Users**:
    * Get a tailored made traveling plan.
    * Potentially get a travel package that will suit their needs the best.
    * They want to find a large variety of travel destinations to Japan.
    * Possibility to contact he Travel Agency if they are interested in the received offer.
    
* **Travel Agency**:
    * Sell their travel packages to Japan.
    * Get information regarding users' travel preferences in order to update or create new travel packages.

Both business and customer goals are addressed through user stories.

### User Stories

#### User category: _The User_

* As a user, I want to see the available attractions in Japan so that I can choose which one I would like to visit.
* As a user, I want to be able to save the attractions which I like so that I can have a comprehensive list of my desired destinations.
* As a user, I want to update my profile so that my personal information is correct.
* As a user, I want to be able to search an attraction base on a specific category, so that I can easier find the information in which I am interested.
* As a user, I want to create a profile, so that I can save the destinations I like.
* As a user, I want to be able to contact the Travel Agency, so that I can let the know that I am interested in their offer.

#### User category: _The UX Designer_
* As a UX designer, I want to track user behaviour so that I can improve the user experience.
    * As a UX designer, I want to track the user behaviour so that I can identify the possible user confusion.
    * As a UX designer, I want to find which parts are not accessed by the user so that I can suggest a better architecture of the page.    
    
#### User category: _The Travel Agency_
* As a Travel Agency, I want to integrate my database with the web page, so that the user can get suggestions about our package deals.
* As a Travel Agency, I want to know which attractions are popular, so that I can decide if I want to change our travel packages or optimise them.
* As a Travel Agency, I want that the user receives our offers and contact information so that they contact us.
        
#### User category: _The Business Owner_
* As a business owner, I want that our web page looks attractive so that people are motivated to spend time on it.
* As a business owner, I want to work with a lot of Travel Agencies, so that we get a high profit.
* As a business owner, I want to have a comprehensive list of destinations, so that the user can find whatever they need.
* As a business owner, I want to provide sufficient information about an attraction so that the user would have all the information that they need in order to decide if they would like to go or not.

### Minimum Viable Product

Taking in consideration all the user stories, their importance and viability of their implementation at the moment certain value and complexity levels have been attributed to the user stories.
 
* Due to limited period of time the Travel Agency related user stories are not implemented in our MVP. 
    * As consequence the offer email that the user gets from the Travel Agency is not based on a real database or matching mechanism.
    * The offer email contains a placeholder message.
    
[User Stories evaluation](../JapanWanderlust/readme-related-documents/user-stories.md)

### Design

#### Colors

Following colors have been used:
* `#1db394` - medium aquamarine
* `#17917a` - darker version of the initial aquamarine
* `#D5A618` - dark gold
* `#CD9E18` - darker version of the initial gold
* `#333333` - less intense black
* `#ffffff` - white
* `rgba(98, 108, 105, 0.58)` - light grey, with transparency
* `rgba(82, 92, 89, 0.59)` - dark grey, with transparency

The stand out color for this web page is medium aquamarine. The color was inspired from the player's character which has a aquamarine color. This choice allows to have a constant color which the player can recognise. We also avoid to use a non related color to the game which can create potential confusion.

The variations of gold and grey were used for the level buttons. This was necessary in order to denote the availability of a level or if it was already completed.

The black color was used as a background on which the game is placed. It is supposed to not attract to much attention to itself since we do not care about this space and in a commercial version of the game it would be covered with adds.

#### Font

The used Font for this project is **Eczar** with the font weight: 
* 500 - for most of the text.
* 600 - for headers.

The [Eczar](https://fonts.google.com/specimen/Eczar) font was chosen due to its slight ancient style. It fits well with the game's concept.

### Wireframes

Blue in the Maze's wireframes are made both for mobile and desktop view. The wireframes were done in [figma](https://www.figma.com/). 

Link to wireframes for mobile can be found [here](https://www.figma.com/file/S4Awi2Wc8RJ8zjWNNuRLQ3/game-mobile?node-id=0%3A1).

Link to wireframes for desktop can be found [here](https://www.figma.com/file/DaQhx72fCc1FgdEFQX6Dr7/game-desktop?node-id=0%3A1).

In case the links to the wireframes don't work please find the pictures [here](../../WebstormProjects/blue-in-the-maze/readme-related-documents/wireframes).

## Features

### Existing Features

* **The Game**
    * Represents a dynamic area of the web page which makes possible to start the game,choose a level and enjoy the game itself.
        * Addresses issue #2, #5, #7, #10, #12, #15.
    * Has two constant buttons: "Home" button and "Rules" button. The first one ensures that the player can go back to the initial start screen. While the second button provides the story of the game and how to play it.
        * Addresses issue #1, #14.
    * A timer appears when the selected level starts. The timer serves as an indicator of how much time the player needed to complete the level or triggers the losing condition (from level 3 onwards) if the player runs out of time.
        * Addresses issue #4, #16.
    * Control buttons are added while playing the chosen level if the device type is detected as "mobile" or "tablet."
        * Addresses issue #10.
    * Graduate access to the levels - at the beginning the player can play only the first level. Access to the next level is allowed only on passing the current level.
        * Addresses issue #5, #6.

* **Footer**
    * Provides the links which makes possible to contact the game owner as well as to see their Github account or LinkedIn.

### Features left to implement

* **Leader-board** - User Story #8, at the moment it has a low value. Will be implemented if after a reevaluation of priorities it will get a higher value.
* **Winning points** - User Story #7, at the moment we have only the final time as a parameter which indicates how well the user performed. Use story #7 has a high complexity therefore it will be implemented at a later stage.
* **Landscape mode** - the possibility to play the game in landscape mode will be added in a future update.

### Features left to implement after testing

* **New characters** - as per user review suggestion.
* **Final scene with Blue meeting the human** - as per user review suggestion.
* **Improve levels' difficulty** - in order to have more challenging levels.
* **Improve game's design** - in order to have more visually attractive game.
* **Improve web page's speed on mobile** - in order to have more visually attractive game.
  
## Technologies Used

### Languages

* HTML - more precisely this project uses JSX which is a JavaScript extension and allows us to write "HTML" alike code in React.
* Java Script - served as the base language for this project.
* CSS - used for styling the HTML code.
* [Sass](https://sass-lang.com/) - Sass was used in order to write an easier css. It allowed to create variables, mixins and create for loops.
* [Python](https://www.python.org/) - a small python script in order to deploy the project to AWS and Heroku.

### Libraries

* [React](https://reactjs.org/) - the entire project was built in React.
* [react-device-detect](https://www.npmjs.com/package/react-device-detect) - used for conditional rendering of content depending on which type of device the user has.
* [reactstrap](https://reactstrap.github.io/) - used for the modal Rules window.
* [prop-types](https://www.npmjs.com/package/prop-types) - used to ensure that the correct data type is passed to the component.
* [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) - used for social media icons.
* [Google Fonts](https://fonts.google.com/) - used for the Eczar font.

### Tools

* [WebStorm](https://www.jetbrains.com/webstorm/) - used as local IDE for this project.
* [Git](https://git-scm.com/) - used for version control.
* [Figma](https://www.figma.com/) - used for creation of wireframes.
* [favicon.io](https://favicon.io/) - used for creation of the fav icon for the web page.
* [GIMP](https://www.gimp.org/) - used as image editor.
* [Tinyjpg](https://tinyjpg.com/) - used for image compression.
* [Am I Responsive](http://ami.responsivedesign.is/) - used for testing purposes as well as to create the image displaying the web page on different devices.
* [Google Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - used for testing and debugging.
* [Google Analytics](https://analytics.google.com/) - used for user testing purposes.
* [Hotjar](https://www.hotjar.com/) - used for user testing purposes.
* [PageSpeed insights](https://developers.google.com/speed/pagespeed/insights/) - used for testing the loading speed of the site.
* [AWS](https://aws.amazon.com/s3/?nc=sn&loc=0) - used to store and retrieve project's data.
* [Heroku](https://id.heroku.com/) - The live page is hosted on Heroku.

### React in detail

This project was entirely built in React, which as a result has a directory structure different then the classic projects built only in HTML and JavaScript.

**The distinctive points are:**
* The project is divided in components.
    * As a rule each component directory will contain a JS file and a scss file which is related to it.
    * Two main components present in the project are:
        * Layout - which incorporates subcomponents related to the web page's look.
        * MazeContainer - which incorporates all the components related to the game itself as well as the custom hook "useMaze" which is responsible for the most of the controller part of the data.
* The final index.html is placed in the public folder and has only one root div. This div renders the App.js which represents our main JavaScript file.
* The project uses "real" HTML in an limited amount. The most HTML alike code is written with JSX. 

## Testing

Testing information can be fond [here](../../WebstormProjects/blue-in-the-maze/readme-related-documents/testing/testing.md).

## Deployment

This web page was locally developed in WebStorm and pushed to the remote repository - GitHub. The live page is hosted on AWS and Heroku. 

### Version control on GitHub

In order to connect the local IDE to GitHub I used the command `git remote add origin` and added the link to the remote repository: `https://github.com/Itamichan/Blue-in-the-maze.git`

My main local branch is `master` which I deployed as `origin/master` to GitHub.

**Used commands during version control:**
* `git add .` - to add the files to the staging area.
* `git commit -m "text message here"` - to commit the files.
* `git push origin master` - to push to origin master branch on GitHub.
* `git status` - was extensively used in order to see the current status of the files.

### Deployment to AWS

This project is stored on AWS. If you would like to also deploy your project to AWS then execute the following steps:

1. Go to [AWS](https://aws.amazon.com/) and create there an account. Choose Amazon Free Teer option in order to benefit the free version.
2. Go to "Services" and search for "S3".
3. Access "S3" and create a bucket there with "Create bucket" button. You can call it `maze-game`.
4. Under "Permissions" ensure that you set the access to public in order to be able to access the bucket's content.
5. Now you can add all your files related to the project into the bucket. You can do this by clicking "Upload" button. **Or** you can upload all the files in an automatic way by using python scripts.
    * I chose to upload them automatically with the help of the scripts written by [sheepsy90](https://github.com/sheepsy90). Since the scripts are not written by me I will not go into describing them. For your general knowledge the used python files are:
        * build.py
        * deploy.py
        * Additionally, you can use a shell script where you would store the values of your AWS credentials - This file should be added to .gitignore file and never deployed to GitHub to not expose the access credentials.
    * If you want to deploy the code in an automated way [here](https://www.freecodecamp.org/news/automated-deployment-in-aws-5aadc2e708a9/) is a good online resource.
6. Now your project is deployed to AWS.
    * Since the files on AWS are stored in a specific format in order to be able to access your web page you will need to additionally deploy your project to Heroku. Please look below how to do this.

### Deployment to Heroku

In order to serve our project which is saved on AWS we need a web server. In our case we chose to host on Heroku.
To deploy Blue in the Maze to Heroku, take the following steps:

1. Create a `requirements.txt` file and add inside `requests flask gunicorn` for the python dependencies.
2. Create `server.py` file that will contain the end point. It will handle our request deliver of index page.
3. Create a `Procfile` file and add inside `web: gunicorn -w 2 server`. This file tells Heroku which processes need to be available. In our example we need a web server that runs our server.
4. Create a new app on the [Heroku website](https://dashboard.heroku.com/apps) by clicking the "New" button in your dashboard. Give it a name and set the region to Europe.
5. Select "Deploy" > "Deployment method" and select GitHub.
6. Confirm the linking of the Heroku app to the correct GitHub repository.
7. Select "Settings" > "Reveal Config Vars".
8. Set the following config vars:

    **Key**: AWS_INDEX_URL 

    **Value**: here you put the link to your index.html file from AWS
        
    * The link you will find on opening the index.html file in your bucket (maze-game).
9. Enable the web worker on Heroku.
    * Go to "Resources" > under Free Dynos choose to edit your dyno - turn it on and confirm it.
10. In the heroku dashboard, click "Deploy" > "Manual Deployment" and make sure the master branch is selected, then click "Deploy Branch".
11. The site is now successfully deployed.
12. To find the link to your web page go to "Settings" > "Domains".
13. Additionally, you can add the Papertrail add-ons which will help you with future debugging on Heroku. You will find it in "Resources" > under "Add-ons".

### How to run this project locally

In order to be able to run the project locally uou need to have an IDE with the following installed dependencies:
    
* [npm v.6.13.7](https://www.npmjs.com/)
* [nodejs v12.14.1](https://nodejs.org/en/)
* [React v16.12.0](https://reactjs.org/)
* [Ruby Sass 3.7.4](https://sass-lang.com/)

Optionally:
* [reactstrap v8.4.1](https://reactstrap.github.io/) - for the modal "Rules" window
* [react-fontawesome v0.1.8](https://github.com/FortAwesome/react-fontawesome) - for the social media icons
* [prop-types](https://www.npmjs.com/package/prop-types) - for data type check

**Clone this project from GitHub:**

* Go to [Blue-in-the-Maze](https://github.com/Itamichan/Blue-in-the-maze) GitHub repository.
* Click on "Clone or download" green button.
* Copy the URL to the repository.
* Open the terminal in your local IDE.
* Choose the working directory where you would like to have the cloned repository.
* Type git clone, and add the URL you copied from Github: `git clone https://github.com/Itamichan/Blue-in-the-maze.git`
* Press Enter and your local clone will be created.
    * If you do not want to deploy the project to AWS and Heroku remove all the related files to this process.
* Run `npm install` and `npm run` in order to run the project.
* Now you are good to go.

## Credits

### Content

All content on the web page was written by me.

### Media

**Game tiles resources:**
* [Kenney.nl](https://opengameart.org/content/platformer-art-complete-pack-often-updated)

### Acknowledgements

#### Deployment scripts

All scripts which made possible to store the project to AWS and deploy it to Heroku was written by [sheepsy90](https://github.com/sheepsy90).

#### Pages used for Inspiration

* [JavaScript: Amazing Maze Game](https://www.the-art-of-web.com/javascript/maze-game-large/)
* [Maze game by Henry Morgan](https://codepen.io/rayrayxvv/pen/gaVjRN)
* [HTML5 and JS Maze Game by Thomas Daniels](https://www.codeproject.com/Articles/577080/Create-an-HTML-and-JavaScript-Maze-Game-with-a-ti)
* Inspiration resources for writing this README file:
    * [AJGreaves](https://github.com/AJGreaves/familyhub)
 
#### Pages used for information

* [W3schools](https://www.w3schools.com/)
* [W3C](https://www.w3.org/)
* [CSS-Tricks](https://css-tricks.com/)
* [MDN web docs](https://developer.mozilla.org/)

## Disclaimer

**This web page was created for educational purpose only.** 