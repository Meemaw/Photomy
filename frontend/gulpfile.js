const gulp = require('gulp');
const run = require('gulp-run');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const template = require('gulp-template');
const clean = require('gulp-clean');

const ENVIRONMENTS = {
  DEV: 'dev',
  TEST: 'test',
  PROD: 'prod',
  TRAVIS: 'travis',
};

gulp.task('clean', function() {
  return gulp.src(['.env'], { read: false }).pipe(clean());
});

gulp.task('dev', function() {
  runSequence('clean', 'setDev');
});

gulp.task('setDev', () =>
  gulp
    .src('./templates/.env.template')
    .pipe(template({ env: ENVIRONMENTS.DEV }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./')),
);

gulp.task('test', function() {
  runSequence('clean', 'setTest');
});

gulp.task('setTest', () =>
  gulp
    .src('./templates/.env.template')
    .pipe(template({ env: ENVIRONMENTS.TEST }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./')),
);

gulp.task('setTravis', () =>
  gulp
    .src('./templates/.env.template')
    .pipe(template({ env: ENVIRONMENTS.TRAVIS }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./')),
);

gulp.task('setProd', () =>
  gulp
    .src('./templates/.env.template')
    .pipe(template({ env: ENVIRONMENTS.PROD }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./')),
);

gulp.task('prod', function() {
  runSequence('clean', 'setProd');
});

gulp.task('build', function() {
  return run('yarn build').exec();
});

gulp.task('default', ['dev']);
