---
title: 'Happy Meal'
description: 'Here''s my amateur attempt at a coke, burger, and fries. So what you''re looking at here are a bunch of shapes made and awkwardly slapped together with CSS.'
author: Asim
pubDate: 09/06/2014
tags: 'CSS, drawing, SCSS, shapes'
thumbnail: dev
background: placeholder.jpg
---

One afternoon I was hungry and waiting for a burger. A colleague of mine asked if I can make him a sandwich out of CSS, I've been solving a lot of our problems with straight CSS for a couple weeks now. I was up to the challenge, since I've seen this done a bunch of times on Codepen I decided to throw my own CSS drawing together. Now, I'm not a rockstar when it comes to some crazy CSS wizardry that's out there regarding making full on compositions that quite frankly look like my old illustrations (which are done in the comfort of Illustrator). Here's my amateur attempt at a coke, burger, and fries.   

<p data-height="450" data-theme-id="0" data-slug-hash="xqfvC" data-default-tab="result" data-user="asimanov" class='codepen'>See the Pen <a href='http://codepen.io/asimanov/pen/xqfvC/'>xqfvC</a> by Asim (<a href='http://codepen.io/asimanov'>@asimanov</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
(For best mobile viewing open the actual Pen)

So what you're looking at here are a bunch of shapes made and awkwardly slapped together with CSS. In essence that's all that it really takes, however a lot of people throw CSS animations and some JS to make things interesting. I'm not quite there yet, below is a comical example of where I'm at with CSS "drawing".

The HTML, could be cleaner.

```html
<div class="sandwich">
  <span class="bun"></span>
  <span class="lettuce"></span>
  <span class="tomato"></span>
  <span class="cheese"></span>
  <span class="meat"></span>
  <span class="bun bottom"></span>
</div> 
```

And the CSS, if you look through the code in Codepen above you'll notice that I've reached my limit to "drawing" with pseudo-elements.

```scss
.sandwich {
  margin: 0 auto;
  padding-top: 27%;
  
  .bun {
    background-image: linear-gradient(orange, darkorange);
    width: 120px;
    height: 25px;
    border-radius: 90px 90px 0 0;
    margin: 0 auto;
    display: block;
    border-bottom: 4px solid orange;
    }
  
    .bottom {
        border-radius: 0 0 90px 90px !important;
        border-top: 4px solid darkorange;
        border-bottom: none;
      }
    
    .lettuce {
      background: YellowGreen;
      width: 140px;
      height: 5px;
      border-radius: 100px;
      margin: 0 auto;
      display: block;
    }
  
    .tomato {
      @extend .lettuce;
      background: OrangeRed;
      width: 120px;
      height: 10px;
    }
  
    .cheese {
      @extend .lettuce;
      background: Gold;
      height: 8px;
    }
  
    .meat {
      @extend .lettuce;
      background: FireBrick;
      height: 20px;
    }
}
```

CSS isn't new to me, but "drawing" with it is. I find doing these little exercises helpful in developing how I think about structure, positioning, and how much really is possible when you begin to apply more complex solutions outside of their intended use.

Thanks for reading, until I write stuff &amp; things again, <a href="http://i.imgur.com/yjc1Ykq.gif" target="_blank">I'll catch you on the flip side.</a>
