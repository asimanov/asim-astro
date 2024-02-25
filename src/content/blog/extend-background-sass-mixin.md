---
title: 'Extend Background SASS Mixin'
description: 'Have you ever run into this problem? The footer is designed beautifull'
author: Asim
pubDate: 04/11/2017
tags: 'sass, scss, mixin, css, design'
thumbnail: design
background: /Media/blog/footer-bg.svg
---

Have you ever run into this problem? The footer is designed beautifully but you just don't have enough content in the body to push the stuff far enough down the page that the footer sits flush with the bottom of the browser (in desktop vieport)? Yea, I'm talking about that awkward white space right under your beatifully designed... design. 

The whitespace that you love and defend, day in and day out, it just sits there. It sits there mocking all of your effort and energy in fighting for its right to exist. The right to party. This particular white space has no right to party. Much more it has no right to even exist. It just sists there shouting "Hey! Look at me! Forget about that perfectly calculated, good looking, and fair desing above me... I'M JUST HERE AND I'M SUPER HARD TO LOOK AWAY FROM!" 

Such an asshat.

__To illustrate:__

![](/Media/blog/footer-bg.svg)

__Here's how I deal with it, and it's super simple:__

So you have your footer (add class or not, just use the same 'ol footer):

```html
<footer>
...
</footer>
```

Let's make sure that we have the box shadow mixin already in your stuff:

```scss
// Box Shadow
// 
@mixin box-shadow($value) {
    -webkit-box-shadow: $value;
    -moz-box-shadow: $value;
    box-shadow: $value;
}
```

Here's the mixin for our extended background:

```scss
// Extend the background of the bottom most element (footer) to eliminate
// white space if content is not sufficient to fill the viewport.
//
@mixin bgExtend($color) {
  &::after {
    content: "";
    @include box-shadow (0px 500px 0px 500px $color);
    display: block;
    width: 100%;
    position: absolute;
  }
}
```

And in your main scss:

```scss
footer {
  @include bgExtend(#000);
}
```

This simple mixin is how I get rid of that entitled white space at the bottom of my pages, if you have a better solution please let me know!  

Thanks for reading, until I write stuff &amp; things again, <a href="http://i.imgur.com/yjc1Ykq.gif" target="_blank">I'll catch you on the flip side.</a>
