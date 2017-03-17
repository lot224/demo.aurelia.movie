import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';

import { build } from 'aurelia-cli';


// Requires npm install font-awesome --save
export function fontAwesomeStyles(){
    return gulp.src('node_modules\\font-awesome\\css\\*.min.css')
        .pipe(changedInPlace({ firstPass: true }))
        .pipe(gulp.dest('styles'))
        .pipe(gulp.src('node_modules\\font-awesome\\css\\font-awesome.min.css'))
        .pipe(build.bundle());
};

export function fontAwesomeFonts() {
    return gulp.src('node_modules\\font-awesome\\fonts\\*')
        .pipe(gulp.dest('fonts'))
}

// npm install bootstrap --save
export function bootstrap() {
    return gulp.src('node_modules\\bootstrap\\dist\\css\\*.min.css')
        .pipe(changedInPlace({ firstPass: true }))
        .pipe(gulp.dest('styles'))
        .pipe(gulp.src('node_modules\\bootstrap\\dist\\css\\*.min.css'))
        .pipe(build.bundle());
};