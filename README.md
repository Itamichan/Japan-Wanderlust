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

* As a user, I want to see the available attractions in Japan so that I can choose which one I would like to save in my Trip.
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
    
[User Stories evaluation](readme-related-documents/user-stories.md)

### Design
#### Colors

Following colors have been used:
* ![#dc3545](https://via.placeholder.com/15/dc3545/000000?text=+) `#dc3545`
* ![#c53242](https://via.placeholder.com/15/c53242/000000?text=+) `#c53242`
* ![#272727](https://via.placeholder.com/15/272727/000000?text=+) `#272727`
* ![#908C8C](https://via.placeholder.com/15/908C8C/000000?text=+) `#908C8C`

The main color for this project is a coral red. The reason for using this color is that red is one of characteristic color when somebody thinks about Japan. 
Considering that many tourists associate Japan with the sakura blooming season we opted for a milder red color which will bring to the user's memory the warm color of the cherry flowers.

The black color and it's lighter variations was used for background coloring and creation of a contrast between the bright red and the calm black.

#### Font

The used Fonts for this project are: 
* [Nightshade](https://fonts.google.com/specimen/Jim+Nightshade) 
* [Open Sans](https://fonts.google.com/specimen/Open+Sans) with the font weight: 
    * 400 - for most of the text.
    * 700 - for headers and text emphasis.

* The **Nightshade** resembles with text written by brush. An activity for which Japan is also widely known. It brings an extra flavour for our web page.
* The **Open Sans** is a simple text font which helps to have a high readability of text in comparison with the Nightshade font.

### Wireframes

JapanWanderlust wireframes are made both for mobile and desktop view. The wireframes were done in [figma](https://www.figma.com/). 

Link to wireframes for mobile can be found [here](https://www.figma.com/file/TmivYvD8GdO46bEO9f67hH/JapanWanderlust---mobile?node-id=0%3A1).

Link to wireframes for desktop can be found [here](https://www.figma.com/file/01cdiPdgTEbWHtGcvtBILu/Japan-Wanderlust---desktop?node-id=0%3A1).

## Features

### Existing Features

#### Elements present on every page

* **Navigation bar** - Has a `fixed` position in order to ensure that the user can access it at any time.
    * **JapanWanderlust** logo in the left corner which serves as a link to go back to the landing page.
    * Links that can be accessed are placed on the right side.

* **Footer**
    * Provides the links which makes possible to contact JapanWanderlust as well as to see their Github account or LinkedIn.

#### Home page

* **Attractions** - presents all available destinations in Japan. On the right side we have a "Filter menu" (which toggles on mobile) which allows to any user to filter the results based on:
    * City
    * Category - which includes: Shrine, Onsen, Temple, Park etc.
    * Price - where the user can indicate a price limit as access fee to different attractions.
    
* **User Trip Banner** - if the user is logged in they see the banner which allows to the user to start working on their "Trip".
    * Dynamically shows the number of existing attraction in the trip.
    * Provides the main details regarding their Trip.
    * Allows to edit the Trip.
    * User can click "Get an offer now!" button and they will receive an email with Travel Package suggestion.
    
* **User Trips** - every signed in user can see all their existing trips in one place. They can choose to add new trips there or delete existing.
    * On selection of a trip the user will see the detailed information of the trip which they can choose to edit.
    * In their trip they can see all the attractions they added. The can choose to see more information about the attraction or remove it.

### Features left to implement

* **Travel Agency** - all the user stories related to the Travel Agencies would need to be implemented in future sprints.
* **Email Offers** - after implementing the Travel Agency user stories we would be able to send real best matching travel suggestions to the users.
* **Toggle TripBanner** - considering that it takes a lot of visual space it will be a good user experience to be able to minimise it if the user doesn't need it at the moment.

### Features left to implement after testing

* **Timeouts** - for a better user experience we should ad timeouts to all axios requests.
* **Confirmation window** - when the user decides to delete a Trip or Attraction.
* **Heart icon on InfoCard** - currently the logged in user can not add an attraction to their trip from the InfoCard.
* **Get a paid version of Heroku** - at the moment we are unable to have an SSL certificate because we are using a free version of Heroku.
* **Improve page's loading speed** - currently the speed on the mobile is ranked at 72.
  
## Technologies Used

### Languages

* HTML - more precisely this project uses JSX which is a JavaScript extension and allows us to write "HTML" alike code in React.
* Java Script
* [Python](https://www.python.org/)
* CSS
* [Sass](https://sass-lang.com/) - Sass was used in order to write an easier css. It allowed to create variables and mixins.
* SQL


### Libraries

* **Front-End**
    * [React](https://reactjs.org/) - the entire project was built in React.
    * [react-redux](https://github.com/reduxjs/react-redux) - used for creation of global states.
    * [react-routing](https://reacttraining.com/react-router/web/guides/quick-start) - used for creation of page routes.
    * [axios](https://github.com/axios/axios) - used for HTTP requests to our back-end API.
    * [react-device-detect](https://www.npmjs.com/package/react-device-detect) - used for conditional rendering of content depending on which type of device the user has.
    * [reactstrap](https://reactstrap.github.io/) - used for the modal Rules window.
    * [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) - used for icons.
    * [Google Fonts](https://fonts.google.com/) - used for the Nightshade and Open Sans fonts.
    * [react-notify-toast](https://www.npmjs.com/package/react-notify-toast) - used to inform the user on success or failure of certain actions.

* **Back-End**
     * [flask](https://flask.palletsprojects.com/en/1.1.x/) - used for creation of the web framework
     * [gunicorn](https://gunicorn.org/) - used for our workers for Heroku.
     * [pyJWT](https://pyjwt.readthedocs.io/en/latest/) - used for creation of Authentication Token on Login.
     * [dataclasses](https://docs.python.org/3/library/dataclasses.html) - python classes to store states.
     * [requests](https://requests.readthedocs.io/en/master/) - allows us to do HTTP requests in python.
     * [SendGrid](https://app.sendgrid.com/) - we consumed the SendGrid API in order to send welcome and offer emails to the users.
     * [APIDOC](https://apidocjs.com/) - used to create API documentation for our back-end
     
* **Database**
    * [psycopg2](https://pypi.org/project/psycopg2/) - python library for PostgreSQL.

### Tools

* [WebStorm](https://www.jetbrains.com/webstorm/) - used as local IDE for the front-end of this project.
* [PyCharm](https://www.jetbrains.com/pycharm/) - used as local IDE for the back-end of this project.
* [DataGrip](https://www.jetbrains.com/datagrip/) - used for local visualisation of our database.
* [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) - used as our main database based on PostgreSQL.
* [Heroku Papertrail](https://elements.heroku.com/addons/papertrail) - used for debugging.
* [PostgreSQL](https://www.postgresql.org/) - used locally in DataGrip.
* [Git](https://git-scm.com/) - used for version control.
* [Figma](https://www.figma.com/) - used for creation of wireframes.
* [favicon.io](https://favicon.io/) - used for creation of the fav icon for the web page.
* [GIMP](https://www.gimp.org/) - used as image editor.
* [Tinyjpg](https://tinyjpg.com/) - used for image compression.
* [Google Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - used for testing and debugging.
* [PageSpeed insights](https://developers.google.com/speed/pagespeed/insights/) - used for testing the loading speed of the site.
* [AWS](https://aws.amazon.com/s3/?nc=sn&loc=0) - used to store and retrieve project's data.
* [Heroku](https://id.heroku.com/) - for hosting of our project.
* [Travis](https://travis-ci.org/) - used for testing of our back-end code.

### React in detail

This project's front-end was entirely built in React, which as a result has a directory structure different then the classic projects built only with HTML and JavaScript.

**The distinctive points are:**
* The project is divided in components.
    * As a rule each component directory will contain a JS file and a scss file which is related to it.
    * The most important components present in the project are:
        * AttractionsContainer - which includes the most code related to the attractions and their filters.
        * Navigation - which includes our navbar but also all the personal pages related to the user.
        * TripBanner - is responsible for all the interaction of the user with the chosen Trip.
* The final index.html is placed in the public folder and has only one root div. This div renders the App.js which represents our main JavaScript file.
* The project uses "real" HTML in an limited amount. The most HTML alike code is written with JSX. 

## Testing

Testing information can be fond [here](readme-related-documents/testing.md).

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