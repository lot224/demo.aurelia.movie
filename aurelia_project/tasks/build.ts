import * as gulp from 'gulp';
import { fontAwesomeStyles, fontAwesomeFonts, bootstrap, bootstrapFonts} from './assets';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import copyFiles from './copy-files';
import {build} from 'aurelia-cli';
import * as project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS,
    copyFiles,
    fontAwesomeStyles,
    fontAwesomeFonts,
    bootstrap,
    bootstrapFonts
  ),
  writeBundles
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}
