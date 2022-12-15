---
layout: "../../layouts/BlogPost.astro"
title: 'Check Before You Burn Registration'
description: 'With the 2014-15 season right around the corner our agency pushed for a new and comprehensive amendment to improve the existing rule. This new push gave me a unique opportunity to work on something our agency hasn''t done before: develop and launch a user friendly questionnaire/registration hybrid that is completely and honestly to and for the general public.'
author: Asim
pubDate: 09/26/2014
tags: 'registration, process, cbyb, front-end, css3, asp, net'
thumbnail: design
background: cbybcover.jpg
---

Working at the Air District has not only opened my eyes to the totality of our San Joaquin valley air quality issues but also exposed me to a multitude of opportunities to work on some truly inspiring projects. Check Before You Burn isn't a new program to our valley but it certainty is one of the most important ones that continues to be a cornerstone in reducing air pollution during the fall and winter months. With the 2014-15 season right around the corner our agency pushed for a new and comprehensive amendment to improve the existing rule (Rule 4901).

This new push gave me a unique opportunity to work on something our agency hasn't done before: develop and launch a user friendly questionnaire/registration hybrid that is completely and honestly to and for the general public. I can't take all of the credit for this because my job was only 50% of the work, and I'm only discussing the design and functionality. The meat n' potatoes was developed by one of my talented colleagues, an ASP/.Net developer (brave and hardworking soul). Together, under careful and scrupulous watch of our directors, we developed an intuitive solution to a dubious problem: registering a wood-burning device, aka a fireplace.

Upon opening the registration you are prompted to answer a simple question:

![](/Media/blog/cbyb01.jpg)

Here is the pen for the progress tracker used in this project. Pretty straightforward with some minor "trickery." Eventually I'm going to do a quick write-up on a responsive progress tracker that I've put together during the duration of this project (nothing fancy, a simple show and hide of elements depending on your viewport size, however in this case everything had to be set in hard numbers due to our parent page structure). 

<p data-height="300" data-theme-id="0" data-slug-hash="moafz" data-default-tab="result" data-user="asimanov" class='codepen'>See the Pen <a href='http://codepen.io/asimanov/pen/moafz/'>Progress Tracker v1</a> by Asim (<a href='http://codepen.io/asimanov'>@asimanov</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

<hr style="border: 1px #ccc dashed; margin: 40px 0">

Depending on your answer to the above question and a couple questions to follow after you will either move on to the registration or be confronted with the following "error" messages. These aren't really errors but further guidance on where to go depending on your answers. 

![](/Media/blog/cbyb02.jpg)

<hr style="border: 1px #ccc dashed; margin: 20px 0 40px 0">

![](/Media/blog/cbyb03.jpg)

<hr style="border: 1px #ccc dashed; margin: 20px 0 40px 0">

![](/Media/blog/cbyb04.jpg)

If successful, and this should be no problem since the questions are very direct and only a few in number, you will be able to register your wood burning device. This process is fairly straightforward and only allows you to register 1 item. 

![](/Media/blog/cbyb05.jpg)

Once the information is complete and "save heater information" call to action has been made the form disables all of the fillable areas. If you would like to edit an entry you can simply select it in the entry table which would then auto-populate the above table (this only allows for edits, not new entries).  

![](/Media/blog/cbyb06.jpg)

Some homes have more than one device, some people have more than one home and therefore more than one device. How do we go about that if this information page only allows for one entry? Next to the now disabled "save heater information" button activates "Register Another Heater." Clicking this will restart the questionnaire which will help to determine if the other device that you're adding is eligible, and gather basic info as to what it is (first device could have been an insert, second could be a pellet stove). However, fear not if you wish to abandon this, just exist back to the registration and continue to the next step.

![](/Media/blog/cbyb07.jpg)

Naturally the next step in the process is gathering the individual information, to who the device(s) belong to. We wanted to place this step after the device information so that when adding a new device the logical loop wouldn't be broken since the questionnaire is the first step to the entire process... If personal information followed after the questions, adding another device would break the flow of the process. 

![](/Media/blog/cbyb08.jpg)

The review of the registration allows the user to make any edits if they wish to before providing their electronic signature and firing the registration off. 

![](/Media/blog/cbyb09.jpg)

And what kind of a registration process would this be without a tiny finish-line flag? :)

![](/Media/blog/cbyb11.jpg)

Due to our agency's awesome culture, [STAR](http://www.valleyair.org/board_meetings/gb/agenda_minutes/agenda/2014/may/studysession/presentations/08.pdf), I am able to write and make posts like this that allows me to examine my work and show off our newest advances. To learn more about the new Rule 4901 view the details [here](http://www.valleyair.org/rule4901), to proceed with the registration [jump right in!](http://www.valleyair.org/CBYBregistration).

Thanks for reading, until I write stuff &amp; things again, <a href="http://i.imgur.com/yjc1Ykq.gif" target="_blank">I'll catch you on the flip side.</a>