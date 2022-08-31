const gulp = require('gulp');
const glob = require('glob');

/**
 * @typedef GulpFlags
 * @type {object}
 * @property {boolean} debug - debug build flag.
 */

/** @type GulpFlags */
const argv = require('yargs').argv;

/**
 * Gulp components initializations
 */
const gulpIf = require('gulp-if');
const gulpConcat = require('gulp-concat');
const lessCompiler = require('gulp-less');
const minifyCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');

/**
 * LESS wildcard compiler
 *
 * @param {string} source
 * @param {string} dest
 */
function compileLess(source, dest) {
    return gulp
        .src(source)
        .pipe(gulpIf(argv.debug, sourcemaps.init()))
        .pipe(lessCompiler())
        .pipe(gulpIf(argv.debug, sourcemaps.write('.')))
        .pipe(gulpIf(!argv.debug, minifyCss({ sourcemaps: false })))
        .pipe(gulp.dest(dest));
}

/**
 * Master file compiler
 * Takes CSS files compiled before and
 * concat them in css/master.css
 *
 * Supports source mappings.
 */
function buildMasterStyle() {
    return gulp
        .src([
            './css/normalize.css',
            './css/tooltipster.core.min.css',
            './css/tooltipster.bundle.min.css',
            './css/main.css',
            './css/stblack.css',
            './css/plyr.css',
            './css/pniframe.css',

            './components/**/*.css',
        ])
        .pipe(gulpIf(argv.debug, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpConcat('master.css'))
        .pipe(gulpIf(argv.debug, sourcemaps.write('.')))
        .pipe(gulpIf(!argv.debug, minifyCss({ sourcemaps: false })))
        .pipe(gulp.dest('./css'));
}

/**
 * Task to build LESS files into CSS.
 *
 * Use --debug flag to compress and omit
 * source maps.
 */
const buildCssStyles = () => compileLess('./css/*.less', './css');
const buildComponentStyles = () => compileLess('./components/**/*.less', './components');

/**
 * CSS and CSS.MAP wildcard purger
 *
 * @param {string} source path
 */
function purgeCssFiles(source) {
    function cleanFiles(files) {
        return gulp.src(files, {
            read: false,
            allowEmpty: true,
        }).pipe(clean());
    }

    return new Promise((resolve, reject) => {
        glob(source, (err, files) => {
            if (err) {
                reject(Error(err));
                return;
            }

            if (!files.length) {
                files = [source];
            }

            const rawFiles = files.map(f => f.replace(/\.(less|css)$/, ''));

            const cssFiles = rawFiles.map(f => `${f}.css`);
            const cssMapsFiles = rawFiles.map(f => `${f}.css.map`);

            const result = cleanFiles([...cssFiles, ...cssMapsFiles]);

            resolve(result);
        });
    });
}

exports.buildStyles = gulp.series([
    buildCssStyles,
    buildComponentStyles,
    buildMasterStyle,
]);
exports.buildStyles.displayName = 'build:styles';

/**
 * Task to clean CSS files.
 */
const cleanComponentStyles = gulp.series([
    () => gulp.src('./components/**/*.css', { allowEmpty: true }).pipe(clean()),
    () => gulp.src('./components/**/*.map', { allowEmpty: true }).pipe(clean()),
]);
const cleanMasterStyle = () => purgeCssFiles('./css/master.css');
const cleanCssStyles = () => purgeCssFiles('./css/*.less');

exports.cleanStyles = gulp.series([
    cleanComponentStyles,
    cleanMasterStyle,
    cleanCssStyles,
]);
exports.cleanStyles.displayName = 'clean:styles';
