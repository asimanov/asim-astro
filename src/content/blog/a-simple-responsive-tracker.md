---
title: 'A Simple Responsive Progress Tracker'
description: 'About a week ago I posted a quick synopsis on the last major project that I''ve been working on, Check Before You Burn Registration. In that article I mentioned that I would put up a quick write up about a responsive progress tracker that I thought up while working on the registration. Overall I believe that this is a very simple and effective way to get the most out of a progress trackbar.'
author: Asim
pubDate: 10/08/2014
tags: 'registration, process, tracker, responsive, design, adaptive, cbyb, front-end, css3'
thumbnail: dev
background: /Media/blog/placeholder.jpg
---

About a week ago I posted a quick synopsis on the last major project that I've been working on, Check Before You Burn Registration. In that article I mentioned that I would put up a quick write up about a responsive progress tracker that I thought up while working on the registration. Since the CBYB Registration project specs were pretty rigid, pun intended (fixed dimensions), I wasn't concerned with making it super adaptable. However, building a tracker to begin with got me thinking of how we could possibly achieve a rough responsive flow without removing too much information and conveying just the gist of what a progress tracker is really all about.
 
Working from the bottom up, smallest viewport size selection to the largest, I figured that the basic information that would be very obvious and useful to the user is, "Where the hell are am I in this process?" You could argue that actually naming the steps matters but in my opinion a basic set of icons, or even simpler, a sequence of numbers that leads from start to finish (ex: 1,2,3...) is all that it takes.
 
This idea is demonstrated in the pen bellow. Fairly basic stuff but have a look at the css and the html. You'll notice that the numbers wrapped in `<em>` don't appear initially, and they shouldn't, once we begin to size down our window the text wrapped in `<span>` disappears and the numbers appear.  

<p data-height="400" data-theme-id="0" data-slug-hash="KlGbD" data-default-tab="result" data-user="asimanov" class='codepen'>See the Pen <a href='http://codepen.io/asimanov/pen/KlGbD/'>Responsive Progress Tracker</a> by Asim (<a href='http://codepen.io/asimanov'>@asimanov</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Overall I believe that this is a very simple and effective way to get the most out of a progress trackbar. A lot of times this is all thrown out at smaller dimensions and the whole process that the trackbar is attached to is changed, and there's absolutely nothing wrong with that. This example illustrates a simple show-n-hide method that scales very well and open to further tinkering (throw some JS at this and it'll get interesting). 

Thanks for reading, until I write stuff &amp; things again, <a href="http://i.imgur.com/yjc1Ykq.gif" target="_blank">I'll catch you on the flip side.</a>
