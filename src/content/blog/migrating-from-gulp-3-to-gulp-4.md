---
title: 'Migrating from Gulp 3 to Gulp 4'
pubDate: 04/25/2019
description: 'So I was updating some of my projects and noticed that Gulp has a new stable version...'
author: Asim
tags: 'npm, gulp, gulp 4, gulp 3'
thumbnail: dev
background: g3-g4-2.jpg
---

So I was updating some of my projects and noticed that Gulp has a new stable version... This can't be real! It hasn't happened in half a decade... When it comes to updating anything I tend to move cautiously and upgrade bit by bit, looking for breaking changes that may not be obviously documented with new releases or known issues. This time, because it's been so long without an official release (I'm not much of a betta tester, I know v4 has been out for a while in that realm) I just pulled the trigger and moved fast... Breaking everything. 

Outside of the obvious errors that are very well documented I had a little bit of a tough time moving the Gulp versions forward. I'm not going to sit here and talk about how smart and super meticulous I am. In fact, I had a hard time moving forward with some not so trivial things and at one point looked at moving my task managing needs and build tools to Webpack, or even Parcel.

Full disclosure, there's nothing wrong with Parcel and Webpack is definitely a super powerful tool able of all things... including inducing mental breakdowns during the most intermediate configs (I hear things are better now). 

### Old package.json
Here's the old package configuration. If you want to continue to run Gulp 3 this should work without a problem. The only edit I would make now is to take combine-mq out of dev dependencies. 

```json
{
  "name": "Valley-Air-Front-End-Library",
  "version": "3.4.3",
  "description": "SJVAPCD css library",
  "main": "dist/library.min.css",
  "repository": {
    "type": "git",
    "url": "/"
  },
  "keywords": [
    "scss",
    "library",
    "framework",
    "responsive",
    "sass",
    "valley air",
    "lightweight",
    "frontend"
  ],
  "author": {
    "name": "Valley-Air-District",
    "url": "/"
  },
  "private": true,
  "devDependencies": {
    "browser-sync": "^2.17.5",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-clean-css": "^3.0.4",
    "gulp-combine-mq": "^0.4.0",
    "gulp-csscomb": "^3.0.6",
    "gulp-csso": "^3.0.0",
    "gulp-load-plugins": "^1.1.0",
    "gulp-notify": "^3.0.0",
    "gulp-plumber": "^1.0.1",
    "gulp-rename": "~1.2.2",
    "gulp-sass": "^3.1.0",
    "gulp-size": "^2.0.0",
    "gulp-sourcemaps": "^2.6.0",
    "gulp-util": "^3.0.7"
  },
  "dependencies": {
    "natives": "^1.1.6"
  }
}
```

### Old gulpfile.js (Gulp 3.9.1)
Nothing crazy here, just typical v3 setup. The "default" function is used for dev in conjunction with browserSync in the "watch" task, build is just to get the minified CSS . 

```js
var gulp = require('gulp'),
$ = require('gulp-load-plugins')({pattern: ['gulp-*']}),
paths = {src: 'assets/src/', dist: 'assets/dist/', dev: 'assets/dev/', entry: 'entry.scss'};

var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');

// Error handling
// 
var onError = function (err) {
	$.notify.onError({
		title: "Gulp",
		subtitle: "Failure!",
		message: "Error: <%= error.message %>",
		sound: "Beep"
	})(err);
	this.emit('end');
};

// Default tasks
// 
gulp.task('default', function() {
	return gulp.src(paths.src+paths.entry)
	.pipe($.plumber({errorHandler: onError}))
	.pipe($.sourcemaps.init())
	.pipe($.sass({compress: false, outputStyle: 'expanded'}).on('error', $.util.log))
	.pipe($.autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe($.rename({
		basename: 'library'
	}))
	.pipe($.sourcemaps.write())
	.pipe(gulp.dest(paths.dev))
	.pipe($.size({title: 'Development', showFiles: true}))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// Build production ready sass
// 
gulp.task('build', function() {
	return gulp.src(paths.src+paths.entry)
	.pipe($.plumber({errorHandler: onError}))
	.pipe($.sass({compress: true, outputStyle: 'compressed'}).on('error', $.util.log))
	.pipe($.autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe($.combineMq({beautify: false}))
	.pipe($.csso())
	.pipe($.csscomb())
	.pipe(cleanCSS({keepSpecialComments: false, mediaMerging: true, roundingPrecision: 4, advanced: true, aggressiveMerging: true}))
	.pipe($.rename({
		basename: 'library',
		suffix: '.min'
	}))
	.pipe(gulp.dest(paths.dist))
	.pipe($.size({title: 'Production', showFiles: true}))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// Watch
// 
gulp.task('watch', ['browserSync', 'default'], function (){
  gulp.watch('assets/src/**/*.scss', ['default']); 
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('assets/content/library/*.md', browserSync.reload); 
  gulp.watch('assets/js/**/*.js', browserSync.reload);
  gulp.watch('*.json', browserSync.reload);
  gulp.watch('assets/*.json', browserSync.reload);
});

// Browser Refresh
// 
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '../'
    },
  })
})
```

Credit to [Jatin Varlyani's post](https://levelup.gitconnected.com/how-to-setup-your-workflow-using-gulp-v4-0-0-5450e3d7c512) for getting me going on this, his thorough example on setting up a project with working browserSync was exactly what I needed to get over some basic issues. You'll see an example of an older gulpfile that had me stumped a bit moving forward. 

### New package.json
My package.json actually slimmed down. Throughout the process of migrating I decided to use less plugins as in the past it felt like it was a bit of an overkill for what I was trying to achieve: minified CSS files with some optimizations for production, and some extra info along with source map for dev. I've also run into some nasty issues with combineMq (matches media queries into one media query definition) in the past while working on the Valley Air app. Long story short it was trashing `@supports` right out of the build because it wanted to treat it as `@media`. One other major change is adding "gulp" to scripts, which is definied in the actual gulp file: set it up and just run "gulp" in the CLI.

```json
{
  "name": "ProjectGulp",
  "version": "0.0.1",
  "description": "Move SCSS projects from Gulp 3 to Gulp 4",
  "main": "dist/raketa.min.css",
  "scripts": {
    "start": "gulp"
  },
  "keywords": [],
  "author": {
    "name": "Anton Simanov",
    "url": "/"
  },
  "private": true,
  "license": "",
  "devDependencies": {
    "autoprefixer": "^9.5.1",
    "browser-sync": "^2.26.3",
    "cssnano": "^4.1.10",
    "gulp": "^4.0.0",
    "gulp-notify": "^3.2.0",
    "gulp-plumber": "^1.2.1",
    "gulp-postcss": "^8.0.0",
    "gulp-rename": "^1.4.0",
    "gulp-sass": "^4.0.2",
    "gulp-size": "^3.0.0",
    "gulp-sourcemaps": "^2.6.5",
    "rfs": "^8.0.4"
  }
}
```

### New gulpfile.js (Gulp 4)
So, here it is. It feels a little bit bigger but it does a much better job laying out what is actually happening than the old one did. I'm not going to go into detail about this file because I feel like the comments in the code guide you pretty well throughout the whole thing. One note I will mention though: tasks can't forward reference so define your functions before setting tasks, it sounds pretty straightforward but it needs to be said. 

```js
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    size = require("gulp-size"),
    browserSync = require("browser-sync").create();

// Error handling
// 
var onError = function (err) {
	notify.onError({
		title: "Gulp",
		subtitle: "You done messed up, AA-Ron!",
		message: "Error: <%= error.message %>",
		sound: "Beep"
	})(err);
	this.emit('end');
};

var paths = {
    styles: {
        src: "assets/src/**/*.scss",
        dest: "assets/dist"
    }
};

// Dev
// 
function dev() {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename: 'vad',
            suffix: '.dev'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(size({title: 'Dev', showFiles: true}))
        .pipe(browserSync.stream());
}

// Production
// 
function prod() {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({
            basename: 'vad',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(size({title: 'Prod', showFiles: true}))
        .pipe(browserSync.stream());
}

// A simple task to reload the page
// 
function reload() {
    browserSync.reload();
}

// Initialize browserSync
// 
function watch() {
    browserSync.init({
        server: {
            baseDir: "../"
        }
    });
    gulp.watch(paths.styles.src, dev);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('assets/content/library/*.md').on('change', browserSync.reload); 
    gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('*.json').on('change', browserSync.reload);
    gulp.watch('assets/*.json').on('change', browserSync.reload);
}

// Expose the tasks
// 
exports.watch = watch
exports.dev = dev;
exports.prod = prod;

// Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
// 
var build = gulp.parallel(dev, watch);
  
// Run `gulp` from cli
// 
gulp.task('default', build);
```

See the order by running "gulp --task" which is basically a nice little illustration of the gulpfile. 

![](/Media/blog/gulp-tasks.jpg)

That's it! Now either run "gulp" for dev and get to work or run "gulp prod" to ship. After all this hard work have a <span role="image" aria-label="hamburger">🍔</span> with your <span role="image" aria-label="soda">🥤</span>.