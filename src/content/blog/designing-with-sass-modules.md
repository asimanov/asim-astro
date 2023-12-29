---
title: 'Designing With Sass Modules'
pubDate: 12/22/2019
description: 'I don’t know if you’re ever struck with a great idea while you’re in the shower but it seems to happen to me more often than not these days. Between family life, work life, unpredictable issues with the house, kid getting sick, pets needing to go to the vet, babysitters falling ill, a whole myriad of priority problems arising seemingly out of the thin air; The free time that I used to have has shrunk down to maybe, possibly, a half hour a day.'
author: Asim
thumbnail: dev
background: placeholder.jpg
---

Earlier this year I was a little bit caught off guard when I read a very long and detailed post introducing Sass modules. If you haven't read it already and you author css with Sass, I urge you to get all caught up about this new feature by reading [this article](https://css-tricks.com/introducing-sass-modules/?target=_blank&rel=noopener,noreferrer "Introducing SASS Modules") which was expertly written by [Miriam Suzanne](https://twitter.com/mirisuzanne?target=_blank&rel=noopener,noreferrer "Mirriam Suzanne Twitter Profile")... Yes, new, for four years there's been a freeze on new features and well, it's all over!

Another important thing to note is that if you want to start learning Sass modules you'll need to update your dev enviroment to compile with Dart Sass, which is now the cononical implementation. I will write about my own experience on migrating from LibSass to Dart SASS a little later (probably next year).

This post isn't _exactly_ about using the Sass modules in all their glory. What I intend here is to show how the new Dart Sass version enabled me to change the way I structure my projects and propagate css custom props throughout my design systems. In the past I kept all of my configuration and component files in one place: "/src". Now that _@include_ is being phased out we are encouraged to use module way of doing things. By following the _new way_ I am now splitting all of my stuff up into multiple directories and pushing it all up to a single file at root. 

Example:

```html
src/
    ├── entry.scss
    ├── config/
    │    ├── index.scss
    │    ├── tools.scss
    │    └── links.scss
    └── init/
          ├── index.scss
          └── links.scss
```

What's happening here is that the **entry.scss** file brings in all of the things that are required to compile the final css file.

```scss
@use "config";
@use "init";
```

In the config and init directories we have **index.scss** which forwards all the things that end up in the entry and can be used throughout any other file in the structure.

```scss
@forward 'tools';
@forward 'links';
```

So now that we have the basic structure out of the way lets look at how the links are styled in our little design system.

**config/links.scss**

```scss
// [CONFIG: LINKS] //

@use 'tools';

// Link map
// 
$link-config: (
  'bg': 'transparent',
  'color': var(--set-color-base),
  'style-color': var(--set-color-secondary),
  'border': 2px solid var(--set-link-style-color),
);

// Create/assign css custom props from maps and expose
//  
:root {
    @include tools.tokens--($link-config, 'set-link-');
}
```

One of the things that is being forwarded from the config is tools which references [Sass Accoutrement by OddBird](https://www.oddbird.net/accoutrement/docs/?target=_blank&rel=noopener,noreferrer "SASS Accoutrement by OddBird"). The most versatile component of that set of tools is the ability to generate css custom props from Sass maps, which you see done at the end of that file.

Now we have the following css custom props.

```html
--set-link-bg: "transparent";
--set-link-color: var(--set-color-base);
--set-link-style-color: var(--set-color-secondary);
--set-link-border: 2px solid var(--set-link-style-color);
```

Now lets use these css variables.

**init/links.scss**

```scss
// [INIT: LINKS] //

@use 'config';

a {
  &:link,
  &:visited {
    --link-bg: var(--set-link-bg);
    --link-color: var(--set-link-color);
    --link-style-color: var(--set-link-style-color);
    --link-border: var(--set-link-border);

    text-decoration: none;
    display: inline-block;
    background: var(--link-bg);
    color: var(--link-color);
    border-bottom: var(--link-border);
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--link-style-color);
  }

  &[href*='://'] {
    &::after {
      content: '↗';
      font-size: 0.7em;
      font-weight: 400;
      display: inline-block;
      padding-left: 4rem;
    }
  }
}
```

So now we have a set of css custom props at root that we can use to theme, rewrite with js, without touching the element's own custom props. This is helpful when theming at a higher level like styling for dark mode or quickly configuring the design system to suit any design. There are many other files that I'm not showing here, like colors and typography, but this should give you an idea of what you can achieve with basic Sass modules and css custom props.

You can see a full file structure example at [Variable Design System repo](https://github.com/asimanov/variable-design-system?target=_blank&rel=noopener,noreferrer "Variable Design System GitHub repo")
Checkout the [demo for Variable Design System here](https://simanov.dev/vds/?target=_blank&rel=noopener,noreferrer "Variable Design System Demo")

Until I write about things and stuff again, I'll catch you on the flip side. 