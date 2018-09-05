import gulp from 'gulp';
import sass from 'gulp-sass';
import globSass from 'gulp-sass-glob';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';

// Paths
const paths = {
  styles: {
    src: 'src/scss/app.scss',
    dest: 'dist/'
  },
  scripts: {
    src: 'src/scripts/app.js',
    dest: 'dist/'
  }
};

// Clean
export const clean = () => del([ 'dist' ]);

// Styles
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(globSass())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Scripts
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Watch
function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}
export { watchFiles as watch };

// Build
const build = gulp.series(clean, gulp.parallel(styles, scripts));
gulp.task('build', build);

export default build;
