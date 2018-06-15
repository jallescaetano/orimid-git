// adiciona os Modulos 
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); 




// Função Copilar Sass e adicionar o prefix
function compilaSass() {
  return gulp.src('css/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe( autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}
// tarefa init sass
gulp.task('sass', compilaSass);

// Juntar JS
function gulpJs() {
  return gulp
  .src('js/main/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
  
}

gulp.task('mainjs', gulpJs);


// Iniciar o Browser Sync
function browser() {
  browserSync.init (
    {
      server: {
        baseDir: "./"
      }
    }
  )
}
// Tarefa Borwser Sync
gulp.task('browser-sync', browser);

// Funça Watch do Gulp 
function watch() {
  gulp.watch('css/scss/*.scss', compilaSass);
  gulp.watch('js/main/*.js', gulpJs);
  gulp.watch('*.html').on('change', browserSync.reload);
  
}
// Inicia tarefa de watch
gulp.task('watch', watch);

// Tarefas padrão do Gulp
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));
