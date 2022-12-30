---
layout: "../../layouts/BlogPost.astro"
title: 'Happy New Date Range!'
description: 'Sometimes you make a mistake. Sometimes you make that same mistake in more than one place. Sometimes you make an amateur mistake that you wish that you would have caught before starting a New Year selebration... You just simply made a mental error months ago that resulted in a week of appology and 15 miinutes of office hours fixing the one thing you were so sure that you had solved once and for all. Sometimes you just messed up and will forever remember that "sometimes".'
author: Asim
pubDate: 01/13/2017
tags: 'js, date, range, mistake, goofed, dev, cbyb, forecast, aqa, json, xml'
thumbnail: dev
background: placeholder.jpg
---

Sometimes you make a mistake. Sometimes you make that same mistake in more than one place. Sometimes you make an amateur mistake that you wish that you would have caught before starting a New Year selebration... You just simply made a mental error months ago that resulted in a week of appology and 15 minutes of office hours fixing the one thing you were so sure that you had solved once and for all. Sometimes you just messed up and will forever remember that "sometimes". 

January 1, 2017 was that "sometimes" for me. I did indeed make my way into the office to correct that problem this very day. I did spend much of the following week explaining what had happened and what I failed to do over and over again to my collegues. Lastly, I'm still left wondering how I let this one slip through. Nevertheless, I am the one who <a href="http://i.imgur.com/daLlJjg.jpg" target="_blank">"done goofed"</a>. I learned from my mistake and so should you.

When you have a date range that spans over a year change you should, most definitely, remember to make an exception for that. The problem is simple: 

* Show specific stuff between the month of November and the month of February. 
* Don't show that specific stuff any other month.

Your initial date range is probably something like this:

```html
10/01/yyyy - 03/01/yyyy
```

```js
// Define our variables
// 
// current date and current year
var currentDate = new Date(); 
var currentYear = new Date().getFullYear(); 
// min and max variables
var minDate = new Date('10/31/' + currentYear); 
var maxDate = new Date('03/01/' + currentYear);

// Set our Date Range
//
// start of range 
if (currentDate >= minDate && currentDate <= maxDate ){ 
  $("#condition1").show(); 
  $("#condition2").hide();  
// end of range  
} else { 
  $("#condition1").hide(); 
  $("#condition2").show(); 
}
```

That's all well and good if the months fall in the same year but they don't so you simply adjust for the next year as follows:

```html
10/01/yyyy - 03/01/yyyy+1
```

```js
// Define our variables
//
// current date and current year
var currentDate = new Date(); 
var currentYear = new Date().getFullYear();
// next year variable 
var nextYear = new Date().getFullYear()+1;
// min and max variables 
var minDate = new Date('10/31/' + currentYear); 
var maxDate = new Date('03/01/' + nextYear);

// Set our Date Range
// 
// start of range 
if (currentDate >= minDate && currentDate <= maxDate ){ 
  $("#condition1").show(); 
  $("#condition2").hide(); 
// end of range   
} else { 
  $("#condition1").hide(); 
  $("#condition2").show(); 
}
```

<a href="https://nkayesel.files.wordpress.com/2013/06/no-its-not.gif?w=500&h=281" target="_blank">It's not that simple</a> because the months falling in the *next* year are now out of range. Initially I failed to do that simple step and stopped at adding "+1" to the date range causing the "specific stuff" to not show on the first of the new year. Enter the exception:

```html
01/01/yyyy - 03/01/yyyy
```

```js
// Define our variables
//
// current date and current year
var currentDate = new Date(); 
var currentYear = new Date().getFullYear();
// next year variable  
var nextYear = new Date().getFullYear()+1;
// min and max variables  
var minDate = new Date('10/31/' + currentYear + ', 4:00:00 PM'); 
var maxDate = new Date('03/01/' + nextYear);
// exception min and max variables
var minDateException = new Date('01/01/' + currentYear); 
var maxDateException = new Date('03/01/' + currentYear); 

// Set our Date Range
//
// start of range  
if (currentDate >= minDate && currentDate <= maxDate ){ 
  $("#condition1").show(); 
  $("#condition2").hide();  
// the exception to our range
} else if (currentDate >= minDateException && currentDate <= maxDateException ){ 
  $("#condition1").show(); 
  $("#condition2").hide(); 
// end of range 
} else { 
  $("#condition1").hide(); 
  $("#condition2").show(); 
}
```

We, at this point, accounted for that but the month of February is a tricky one with all that <a href="http://i.imgur.com/uLVEt.gif" target="_blank">Leap Year business</a>. Lets modify our variables and try again:

```html
10/01/yyyy - (03/01/yyyy+1)-1
01/01/yyyy - (03/01/yyyy)-1
```

```js
// Define our variables
// 
// current date and current year
var currentDate = new Date(); 
var currentYear = new Date().getFullYear();
// next year variable  
var nextYear = new Date().getFullYear()+1;
// min and max variables   
var minDate = new Date('10/31/' + currentYear); 
var maxDate = new Date('03/01/' + nextYear);
// exception min and max variables
var minDateException = new Date('01/01/' + currentYear); 
var maxDateException = new Date('03/01/' + currentYear); 

// Modify our maxDate and maxDateException variables 
// 
maxDate.setDate(maxDate.getDate() - 1);
maxDateException.setDate(maxDateException.getDate() - 1);

// Set our Date Range
// 
// start of range 
if (currentDate >= minDate && currentDate <= maxDate ){ 
  $("#condition1").show(); 
  $("#condition2").hide(); 
// the exception to our range 
} else if (currentDate >= minDateException && currentDate <= maxDateException ){ 
  $("#condition1").show(); 
  $("#condition2").hide();
// end of range  
} else { 
  $("#condition1").hide(); 
  $("#condition2").show(); 
}
```

Just as I thought that we had this all wrapped up and ready to go I remembered that there was yet another <a href="http://i.imgur.com/e4Iz3iP.jpg" target="_blank">small step to take into account</a>: we want the date range to begin at a specific date *and* time. Thus, here is our final code:

```js
// Define our variables
// 
// current date and current year
var currentDate = new Date(); 
var currentYear = new Date().getFullYear();
// next year variable  
var nextYear = new Date().getFullYear()+1;
// min and max variables  
// add specific time when we want our date range to begin on 
var minDate = new Date('10/31/' + currentYear + ', 4:00:00 PM'); 
var maxDate = new Date('03/01/' + nextYear);
// exception min and max variables
var minDateException = new Date('01/01/' + currentYear); 
var maxDateException = new Date('03/01/' + currentYear); 

// Modify our maxDate and maxDateException variables 
// 
maxDate.setDate(maxDate.getDate() - 1);
maxDateException.setDate(maxDateException.getDate() - 1);

// Set our Date Range
// 
// start of range 
if (currentDate >= minDate && currentDate <= maxDate ){ 
  $("#condition1").show(); 
  $("#condition2").hide();
// the exception to our range  
} else if (currentDate >= minDateException && currentDate <= maxDateException ){ 
  $("#condition1").show(); 
  $("#condition2").hide(); 
// end of range 
} else { 
  $("#condition1").hide(); 
  $("#condition2").show(); 
}
```

To wrap it all up here is a pen that illustrates how our final date range script works. Adjust the date and/or time in the <span class="inline">testDate</span> variable to show and hide the <span class="inline">condition#</span> divs. For testing purposes I made sure to write some of the key variables to the document below the divs.

<p data-height="300" data-theme-id="0" data-slug-hash="EZVKwE" data-default-tab="js,result" data-user="asimanov" data-embed-version="2" data-pen-title="Date Range with Exception" class="codepen">See the Pen <a href="http://codepen.io/asimanov/pen/EZVKwE/">Date Range with Exception</a> by Asim (<a href="http://codepen.io/asimanov">@asimanov</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

"This is simple stuff folks! Make sure that you test and code review before and after releasing any new product and/or update." &mdash; said everyone who's ever failed to follow their own advice.

Thanks for reading, until I write stuff &amp; things again, <a href="http://i.imgur.com/yjc1Ykq.gif" target="_blank">I'll catch you on the flip side.</a>