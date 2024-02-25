---
title: 'Write CSS custom properties with JavaScript'
pubDate: 05/27/2021
description: 'One of the key features that I focused on for my little Variable Design System was the ability to set CSS custom properties with JavaScript. At the moment this is done with a simple function that I will go over in this post. For future development I am working on setting up a more structured way to interact with the codebase using json to configure almost any and all part of global css variable list.'
author: Asim
thumbnail: dev
background: /Media/blog/placeholder.jpg
---

One of the key features that I focused on for my little **Variable Design System** was the ability to set CSS custom properties with JavaScript. At the moment this is done with a simple function that I will go over in this post. For future development I'm working on setting up a more structured way to interact with the codebase using json to configure almost any and all part of global css variable list. Variable Design System isn't meant to be a "css in js" kind of setup, it's a light weight and minified css file that is driven by css custom properties... and thus it has a structure right out of the box that you can interact with.  

These custom props are all created and exposed when we compile SCSS. In a [previous post about this topic](https://antonsimanov.com/en/blog/designing-with-sass-modules "Designing With SASS Modules") I briefly covered how we can do that with the **new** Dart SASS implementation using SASS modules. In a nutshell we are now able to generate custom props using sass maps and exposing them up from config files to any scss file we desire... and further expose them to the root. Now I'm not proposing that we trash the root with custom props but if we are careful and only bring out useful variables that we'd like to have the ability to modify... then I think this process will work well for us in the long term. 

Here's an example of adding custom font to our font stack. The global css variables contain a place to add just that which will automatically plug them in front of the existing css variable font stack.

```css
:root {
    --add-font-sans: "";
    --add-font-serif: "";
    --add-font-mono: "";
    --set-font-serif: var(--add-font-serif),Georgia,Cambria,"Times New Roman",Times,serif;
    --set-font-sans: var(--add-font-sans),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --set-font-mono: var(--add-font-mono),Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
 ```
 
 Using JS we simply set the css custom property:
 
 ```js
function cssPropWrite() {
    document.documentElement.style
    .setProperty('--add-font-serif', 'Merriweather');
}
```

If set correctly this is what the DOM will show:

```css
Style Attribute {
    --add-font-serif: Merriweather;
}
```

An element will then inherit our updated font stack:

```css
body {
    font-family: var(--set-font-body);
}
```

`--set-font-body` is a combination of a couple css custom props that can be traced back.

```css
Style Attribute {
    --add-font-serif: Merriweather;
}

:root { 
    --set-font-serif: var(--add-font-serif),Georgia,Cambria,"Times New Roman",Times,serif;
    --set-font-body: var(--set-font-serif);
}
```

Here is the full list of available custom props that Variable Design System exposes to the root:

```css
:root {
    --add-font-sans: "";
    --add-font-serif: "";
    --add-font-mono: "";
    --set-font-size-xs: 16rem;
    --set-font-size-sm: calc(16rem + 0.25vw);
    --set-font-size-base: calc(16rem + 0.5vw);
    --set-font-size-md: calc(16rem + 1vw);
    --set-font-size-lg: calc(16rem + 1.5vw);
    --set-font-size-xl: calc(16rem + 2vw);
    --set-font-size-h1: calc(16rem + 3vw);
    --set-font-size-h2: calc(16rem + 2.5vw);
    --set-font-size-h3: calc(16rem + 2vw);
    --set-font-size-h4: calc(16rem + 1.5vw);
    --set-font-size-h5: calc(16rem + 1vw);
    --set-font-size-h6: calc(16rem + 0.5vw);
    --set-font-line-height: 1.7;
    --set-font-weight-light: 300;
    --set-font-weight-base: 400;
    --set-font-weight-heavy: 700;
    --set-font-letter-spacing: 0.5rem;
    --set-font-serif: var(--add-font-serif),Georgia,Cambria,"Times New Roman",Times,serif;
    --set-font-sans: var(--add-font-sans),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --set-font-mono: var(--add-font-mono),Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    --set-font-html: var(--set-font-serif);
    --set-font-body: var(--set-font-serif);
    --set-font-heading: var(--set-font-sans);
    --set-font-code: var(--set-font-mono);
    --set-color-primary: #005ea2;
    --set-color-primary-tint: #73b3e7;
    --set-color-primary-shade: #162e51;
    --set-color-secondary: #e41d3d;
    --set-color-secondary-tint: #f2938c;
    --set-color-secondary-shade: #8b1303;
    --set-color-base: #1b1b1b;
    --set-color-base-light: #a9aeb1;
    --set-color-base-tint: #dcdee0;
    --set-color-black: #000;
    --set-color-white: #fff;
    --set-color-green: #2e8540;
    --set-color-blue: #0071bc;
    --set-color-red: #e31c3d;
    --set-color-success: #4caf50;
    --set-color-error: #e74c3c;
    --set-color-info: #5bc0de;
    --set-color-warning: #f0ad4e;
    --set-color-body-bg: #fff;
    --set-color-body-text: #1b1b1b;
    --set-color-text-gray: #a9aeb1;
    --set-color-border-color: #ddd;
    --set-color-shadow-color: rgba(0,0,0,0.2);
    --set-color-form-base: #1b1b1b;
    --set-color-form-base-light: #a9aeb1;
    --set-color-form-base-tint: #dcdee0;
    --set-color-form-focus: #0050d8;
    --set-color-form-focus-tint: #d9e8f6;
    --set-color-form-error: #e31c3d;
    --set-color-form-error-tint: #f8dfe2;
    --set-color-form-success: #2e8540;
    --set-color-fb: #3b59b6;
    --set-color-tw: #4099ff;
    --set-color-pinterest: #cb2027;
    --set-color-skype: #12a5f4;
    --set-color-spotify: #81b71a;
    --set-color-instagram: #4e433c;
    --set-color-tumblr: #2b4964;
    --set-color-vimeo: #86b32d;
    --set-color-soundcloud: #f76600;
    --set-color-youtube: #f33;
    --set-color-linkedin: #4875b4;
    --set-color-flickr: #fe0883;
    --set-color-foursquare: #8fd400;
    --set-bp-min-xs: 320px;
    --set-bp-min-sm: 480px;
    --set-bp-min-md: 768px;
    --set-bp-min-lg: 992px;
    --set-bp-min-xl: 1200px;
    --set-bp-max-xs: 319.98px;
    --set-bp-max-sm: 479.98px;
    --set-bp-max-md: 767.98px;
    --set-bp-max-lg: 991.98px;
    --set-bp-max-xl: 1199.98px;
}
```

As you can see it's not too much but also not exactly a small list, an intermediate length in my opinion. 

You can see a full file structure example at [Variable Design System repo](https://github.com/asimanov/variable-design-system?target=_blank&rel=noopener,noreferrer "Variable Design System GitHub repo")
Checkout the [demo for Variable Design System here](https://simanov.dev/vds/?target=_blank&rel=noopener,noreferrer "Variable Design System Demo")

Until I write about things and stuff again, I'll catch you on the flip side. 