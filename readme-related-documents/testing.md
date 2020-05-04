# Testing

[back to README.md file](../README.md)

## Table of Content

1. [DevTools](#devtools)
2. [Manual Testing](#manual-testing)
3. [User testing](#user-testing)
    * [Peer-code-review](#peer-code-review)
    * [User review](#user-review)
4. [Google Analytics](#google-analytics)
5. [Hotjar](#hotjar)
    * [Heatmaps](#heatmaps)
    * [Recordings](#recordings)
6. [PageSpeed Insights](#pagespeed-insights)


## DevTools

Was used for:
* Testing the responsiveness of the web page.
    * As an outcome I adjusted the media queries on different occasions in order to ensure the proper placement on different screen sizes.
    * The game  is adjusting its size until the screen size is 600px after which it remains constant.
* Debugging - which allowed to identify wrongly applied scss as well as to see if the react components are working as expected. 

As a result the web page is responsive on different screen sizes and existing buggs are identified and addressed accordingly.

## Manual Testing

Was used:
* To test links' functionality.
* To assess the flow and intuitiveness of the content placement.
* To see web page's performance in different browsers, such as Chrome, Firefox and Safari.

## User testing

At the point when the web page was 95% done I put the link of the live web page on #peer-code-review channel on Slack. In the same time I sent it to several friends and acquaintances.

### Peer-code-review

I got only one comment which referred to the structural side of the project.

#### Suggested improvements:

* Avoid the use of underscore/ spaces for file or directory name - implemented.
* Remove the default provided files by React which are not used (ex: react logo) - implemented.

### User review

The general feedback was positive. Several people started a competition between them in order to see who can have the best time on different levels. This denoted that they were enjoying the game.

#### Suggested improvements:

* Control buttons were covered by the footer on screens with height bellow 320px. Therefore it was impossible to play - extra media query was added for these kind of screens. Now the buttons are available.
* Create new, different characters - added to future features to be implemented.
* Allow to move several spaces by continuously holding the arrow buttons - the need to press the button for every new move is an intentional requirement. Therefore, the suggested change will not be implemented.
* A player wanted to see how the main character actually meets a human (since this is Blue's initial goal) - added to future features to be implemented.
* The levels should be more complicated - the suggestion is partially addressed. A higher complexity can be added at a later stage. Suggestion is added to feature features to be implemented.
* Add a high score table so players can see how well they performed in comparison with other players - this feature already exists in the backlog and is suggested to be implemented in the future.
    
## Google Analytics

In order to address issue #13, Google Analytics plugin was added to the project before the live link was shared with #peer-code-review and other users.

Google Analytics serves as a good tool to receive more information about what devices/ browsers users are using.

This information can be used for future prioritization of features' implementation.

### Obtained data

* Top used device: Desktop (66.67%).
* Top used desktop browser: Chrome (71.43%).
* Top operating system for mobile: Android (69.23%).

Access the [link](images/google-analytics) to see the screenshots of the obtained data.

### Conclusion

From the gathered data we can conclude that for future releases we need to keep in mind  that our users primarily use such browsers as Chrome. As well, as that they prefer desktop devices to mobile.

The conclusion should be perceived with skepticism considering that at the moment only 34 new users visited the web page.

## Hotjar

As well as Google Analytics, Hotjar was added in order to track user behaviour.

Hotjar provides heatmaps and recordings of user behaviour. Such information is very useful to identify and resolve user confusions.

### Obtained data

#### Heatmaps

* Desktop - accessed 48 times
    * 30.07% of users clicked the start button.
    * 24.18% of users accessed the "Home" button.
    * 10.46% of users clicked the "Rules" button
* Mobile - accessed 199 times
    * 25.42% of users taped the start button.
    * 5.08% of users accessed the "Home" button.
    * 6.78% of users taped the "Rules" button
    
#### Recordings

* Users don't seem to have problems to use the game.
* The retention rate is not high. Most users play only until level 3.
* Some players try to play higher levels without clearing the previous levels.

Access the [link](images/hotjar) to see the screenshots of the obtained data.

#### Conclusion

* Heatmaps
    * The conversion rate from the start seems to be low - should consider to improve the game's graphics and style in order to be more appealing.
    * The game seems to be intuitive and the users don't really need the rules.
* Recordings
    * Only a small percentage of users go through all the levels - should consider to make the levels more challenging/ interesting.
    
The conclusion should be perceived with skepticism considering that it is based only on a small number of recordings.

## PageSpeed Insights

**Initial loading speed of the web page:**
* On mobile - 72
* On desktop - 98

**Opportunities for improvement:**
* Eliminate render-blocking resources- which will save 0.3s loading time

#### Conclusion

* Considering that the most users are on desktop no changes will be done at the moment - the performance should be improved during feature releases