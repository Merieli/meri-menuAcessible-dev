const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const paths = {
  root: "./src",
  sass: "./src/assets/sass",
  css: "./src/assets/css",
  js: "./src/assets/js",
};

/**
 * Compile sass files into css and autoprefixer
 * @returns {*}
 */
function processSass() {
  return gulp
    .src(`${paths.sass}/**/*.scss`)
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest(paths.css));
}

/**
 * Watch any changes
 */
function watchFiles(cb) {
  gulp.watch(`${paths.sass}/**/*.scss`, processSass, cb);
}

exports.default = gulp.series(processSass, watchFiles);
