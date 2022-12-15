---
layout: "../../layouts/BlogPost.astro"
title: 'Copy to Clipboard'
description: 'A few years ago I finally figured out that "mailto:" was deprecated by (almost) all browsers. This is embarassing because I should be on top of such things BUT in my defense I deal with that link-style all over the place. If you''re supporting ancient browsers such as IE9 this is a none-issue but we live in the-almost year of 2020 and should correct old habits as they ripen.'
author: Asim
pubDate: 05/04/2018
tags: 'js, dev, javascript, mail, link, ahref'
thumbnail: dev
background: placeholder.jpg
---

A few years ago I finally figured out that "mailto:" was deprecated by (almost) all browsers. This is embarassing because I should be on top of such things BUT in my defense I deal with that link-style all over the place. If you're supporting ancient browsers such as IE9 this is a none-issue but we live in the-almost year of 2020 and should correct old habits as they ripen.  

Personally if I see an email link, I expect my email client to fire up when I hit that link... That is the UI pattern that I'm accustomed to; However, that is not the case with modern browsers. I get it, a browser should obviously limit amount of stuff it can do for security reasons... It defenetely shouldn't have permissions to fire-up local software and execute a "send to this addres" action. 

It's still a pain in the rear to explain that to someone very accustomed to this type of UI pattern: why something that "used to be" is simply "not how it works anymore." So, I thought of this solution which happens to be widely documented and quite frankly elegant in my opinion:

```js
function copyEmail() {
  var copyText = document.querySelector('.copyEmail');
  copyText.select();
  document.execCommand("Copy");
  alert("Copied to clipboard: " + copyText.value);
}
```

The markup:

```html
<li>
    <input type="text" value="anton.simanov@gmail.com" class="copyEmail" style="z-index:-100; opacity:0; position:absolute;">
    <a href="#" onclick="copyEmail()"><i class="fa fa-envelope-o" title="Copy to clipboard"></i></a>
</li>
```

Resulting in this:

![](/Media/blog/screenshot.JPG)