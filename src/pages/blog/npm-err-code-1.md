---
layout: "../../layouts/BlogPost.astro"
title: 'npm ERR! code 1'
description: 'Sometimes you get so busy with work and life that you just keep on truckin and forget to do some basic housekeeping like update node js, npm, drink water, take a shower, pickup your kid from school, etc. Just kidding I do at least most of those things, but I do get distracted and let my dev environment kinda sit for a while as is. If it aint broke, dont fix it, right? right!? Well, not entirely.'
author: Asim
pubDate: 09/09/2023
tags: 'Node, Node JS, NPM, npm, JS, Gulp, Gulpfile, Package'
thumbnail: dev
background: placeholder.jpg
--- 

<style>
    ul {
        list-style-type: initial; margin-left: 1em;
    }
</style>

Sometimes you get so busy with work and life that you just keep on truckin' and forget to do some basic housekeeping like update node js, npm, drink water, take a shower, pickup your kid from school, etc. Just kidding I do at least most of those things, but I do get distracted and let my dev environment kinda sit for a while as is. If it ain't broke, don't fix it, right? right!? Well, not entirely.  

## npm install error

```js
npm ERR! code 1
npm ERR! path E:\variable-design-system\node_modules\node-sass
npm ERR! command failed
npm ERR! command C:\WINDOWS\system32\cmd.exe /d /s /c node scripts/build.js
npm ERR! Building: C:\Program Files\nodejs\node.exe E:\variable-design-system\node_modules\node-gyp\bin\node-gyp.js rebuild --verbose --libsass_ext= --libsass_cflags= --libsass_ldflags= --libsass_library=
npm ERR! gyp info it worked if it ends with ok
npm ERR! gyp verb cli [
npm ERR! gyp verb cli   'C:\\Program Files\\nodejs\\node.exe',
npm ERR! gyp verb cli   'E:\\variable-design-system\\node_modules\\node-gyp\\bin\\node-gyp.js',
npm ERR! gyp verb cli   'rebuild',
npm ERR! gyp verb cli   '--verbose',
npm ERR! gyp verb cli   '--libsass_ext=',
npm ERR! gyp verb cli   '--libsass_cflags=',
npm ERR! gyp verb cli   '--libsass_ldflags=',
npm ERR! gyp verb cli   '--libsass_library='
npm ERR! gyp verb cli ]
npm ERR! gyp info using node-gyp@3.8.0
npm ERR! gyp info using node@18.17.1 | win32 | x64
npm ERR! gyp verb command rebuild []
npm ERR! gyp verb command clean []
npm ERR! gyp verb clean removing "build" directory
npm ERR! gyp verb command configure []
npm ERR! gyp verb check python checking for Python executable "python2" in the PATH
npm ERR! gyp verb `which` failed Error: not found: python2
npm ERR! gyp verb `which` failed     at getNotFoundError (E:\variable-design-system\node_modules\which\which.js:13:12)
npm ERR! gyp verb `which` failed     at F (E:\variable-design-system\node_modules\which\which.js:68:19)        
npm ERR! gyp verb `which` failed     at E (E:\variable-design-system\node_modules\which\which.js:80:29)        
npm ERR! gyp verb `which` failed     at E:\variable-design-system\node_modules\which\which.js:89:16
npm ERR! gyp verb `which` failed     at E:\variable-design-system\node_modules\isexe\index.js:42:5
npm ERR! gyp verb `which` failed     at E:\variable-design-system\node_modules\isexe\windows.js:36:5
npm ERR! gyp verb `which` failed     at FSReqCallback.oncomplete (node:fs:210:21)
npm ERR! gyp verb `which` failed  python2 Error: not found: python2
npm ERR! gyp verb `which` failed     at getNotFoundError (E:\variable-design-system\node_modules\which\which.js:13:12)
npm ERR! gyp verb `which` failed     at F (E:\variable-design-system\node_modules\which\which.js:68:19)        
npm ERR! gyp verb `which` failed     at E (E:\variable-design-system\node_modules\which\which.js:80:29)        
npm ERR! gyp verb `which` failed     at E:\variable-design-system\node_modules\which\which.js:89:16
npm ERR! gyp verb `which` failed     at E:\variable-design-system\node_modules\isexe\index.js:42:5
npm ERR! gyp verb `which` failed     at E:\variable-design-system\node_modules\isexe\windows.js:36:5
npm ERR! gyp verb `which` failed     at FSReqCallback.oncomplete (node:fs:210:21) {
npm ERR! gyp verb `which` failed   code: 'ENOENT'
npm ERR! gyp verb `which` failed }
npm ERR! gyp verb check python checking for Python executable "python" in the PATH
npm ERR! gyp verb `which` succeeded python C:\Python311\python.EXE
npm ERR! gyp ERR! configure error
npm ERR! gyp ERR! stack Error: Command failed: C:\Python311\python.EXE -c import sys; print "%s.%s.%s" % sys.version_info[:3];
npm ERR! gyp ERR! stack   File "<string>", line 1
npm ERR! gyp ERR! stack     import sys; print "%s.%s.%s" % sys.version_info[:3];
npm ERR! gyp ERR! stack                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
npm ERR! gyp ERR! stack SyntaxError: Missing parentheses in call to 'print'. Did you mean print(...)?
npm ERR! gyp ERR! stack
npm ERR! gyp ERR! stack     at ChildProcess.exithandler (node:child_process:419:12)
npm ERR! gyp ERR! stack     at ChildProcess.emit (node:events:514:28)
npm ERR! gyp ERR! stack     at maybeClose (node:internal/child_process:1091:16)
npm ERR! gyp ERR! stack     at ChildProcess._handle.onexit (node:internal/child_process:302:5)
npm ERR! gyp ERR! System Windows_NT 10.0.22621
npm ERR! gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "E:\\variable-design-system\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags=" "--libsass_library="
npm ERR! gyp ERR! cwd E:\variable-design-system\node_modules\node-sass
npm ERR! gyp ERR! node -v v18.17.1
npm ERR! gyp ERR! node-gyp -v v3.8.0
npm ERR! gyp ERR! not ok
npm ERR! Build failed with error code: 1
```

- The part of the error that's important: `npm ERR! code 1`
- This part is a red herring `npm ERR! path E:\variable-design-system\node_modules\node-sass`
    - There was no node-sass in package.json, no known dependencies that use it for anything else in the list, it's been deprecated for years.

This error ocurred after upgrading node.js to `v18.17.1` and running `npm install` or `npm i`

Typically I never install latest node.js and stick to stable release because I'd like to avoid these errors when possible, which is exactly what I did here. So it was a little confusing to be confronted with this show-stopping error.

**In the end the solution was to upgrade dependencies in package.json to latest versions:** 

- Delete `node_modules` dir & `package-lock.json`
- Install **npm-check-updates** globally 
    - <code>npm install -g npm-check-updates</code>
- Update dependencies 
    - <code>ncu -u</code> 
- Hold on to your buts and run `npm i` or `npm install`

Alternatively you could clean your package.json and install all of your dependencies one at a time. It takes longer to do it this way but it's the same concept, your dependencies are likely a major version behind to account for new stable node.js version.

## Goodbye Fibers

If it's been a while I also suggest getting rid of `Fibers` and updating your `gulpfile.js` to version 4. I've actually ran an old `gulpfile.js` with Gulp v4 before without issue, thought that was weird. Anyway, see the old and the new here, ***explanation of what was done at the end*** 👇. 

### old gulpfile.js

```js
'use strict';

var gulp = require("gulp"),
    sass = require("gulp-dart-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    size = require("gulp-size"),
    Fiber = require('fibers'),
    browserSync = require("browser-sync").create();

    // sass.compiler = require('dart-sass');

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
        dest: "assets/dist",
        productSrc: "product/src/**/*.css",
        productDest: "product/dist"
    }
};

// Dev
// 
function dev() {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass({fiber: Fiber}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename: 'variable',
            suffix: '.dev'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(size({title: 'Dev', showFiles: true}))
        .pipe(browserSync.stream());
}

// Production
// 
function build() {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass({fiber: Fiber}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({
            basename: 'variable',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(size({title: 'Build', showFiles: true}))
        .pipe(browserSync.stream());
}

// Product CSS
// 
function productBuild() {
    return gulp
        .src(paths.styles.productSrc)
        .pipe(plumber({errorHandler: onError}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.productDest))
        .pipe(size({title: 'productBuild', showFiles: true}))
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
    gulp.watch(paths.styles.productSrc, productBuild);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("assets/*.html").on('change', browserSync.reload);
    gulp.watch('assets/demo/*.html').on('change', browserSync.reload);
    gulp.watch('*.json').on('change', browserSync.reload);
    gulp.watch('assets/*.json').on('change', browserSync.reload);
}

// Expose the tasks
// 
exports.watch = watch;
exports.dev = dev;
exports.build = build;
exports.product = productBuild;

// Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
// 
var build = gulp.parallel(dev, productBuild, watch);
  
// Run `gulp` from cli
// 
gulp.task('default', build);
```

### new gulpfile.js

```js
'use strict';

const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const size = require("gulp-size");
const browserSync = require("browser-sync").create();

// Error handling
const onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "You done messed up, AA-Ron!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);
    this.emit('end');
};

const paths = {
    styles: {
        src: "assets/src/**/*.scss",
        dest: "assets/dist",
        productSrc: "product/src/**/*.css",
        productDest: "product/dist"
    }
};

// Dev
function dev() {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename: 'variable',
            suffix: '.dev'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(size({title: 'Dev', showFiles: true}))
        .pipe(browserSync.stream());
}

// Production
function build() {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({
            basename: 'variable',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(size({title: 'Build', showFiles: true}))
        .pipe(browserSync.stream());
}

// Product CSS
function productBuild() {
    return gulp
        .src(paths.styles.productSrc)
        .pipe(plumber({errorHandler: onError}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.productDest))
        .pipe(size({title: 'productBuild', showFiles: true}))
        .pipe(browserSync.stream());
}

// A simple task to reload the page
function reload() {
    browserSync.reload();
}

// Initialize browserSync
function watch() {
    browserSync.init({
        server: {
            baseDir: "../"
        }
    });
    gulp.watch(paths.styles.src, dev);
    gulp.watch(paths.styles.productSrc, productBuild);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("assets/*.html").on('change', browserSync.reload);
    gulp.watch('assets/demo/*.html').on('change', browserSync.reload);
    gulp.watch('*.json').on('change', browserSync.reload);
    gulp.watch('assets/*.json').on('change', browserSync.reload);
}

// Expose the tasks
exports.watch = watch;
exports.dev = dev;
exports.build = build;
exports.product = productBuild;

// Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
const buildTasks = gulp.parallel(dev, productBuild, watch);

// Run `gulp` from CLI
gulp.task('default', buildTasks);
```

### So what was done here 🧐

- Updated the task definitions to use Gulp 4's `gulp.series` & `gulp.parallel` for task execution
- The `Fiber` parameter was removed from the `sass` options
    - The `sass` task now calls the `sass()` function direcly without `Fibers` option
- Switched to `const` for defining variables 

**Had to do all of this because I wanted to spin up a new Astro JS project. I've got a few minutes, shouldn't take longer than that 😂💀😭**