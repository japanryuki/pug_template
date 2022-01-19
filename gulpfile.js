//plug-inインストールしたプラグインを定義
// gulpプラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
const packageImporter = require("node-sass-package-importer");
const sassGlob = require("gulp-sass-glob");
const sassPrefix = require("gulp-autoprefixer");

const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

const cleancss = require("gulp-clean-css");
const uglify = require("gulp-uglify");

const browserify = require("browserify");
const source = require("vinyl-source-stream");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
const pug = require("gulp-pug");
const autoprefixer = require("gulp-autoprefixer");
const webp = require("gulp-webp");
var fileInclude = require("gulp-file-include");

var paths = {
    root: "html/",
    scss: "scss/",
    pug: "pug/",
    html: "html/",
    cssSrc: "scss/**/*.scss",
    cssDist: "html/assets/css/",
    jsSrc: "js/**/*.js",
    jsDist: "html/assets/js/",
    imgSrcDir: "html/assets/img/",
    imgDstDir: "html/assets/img-webp/",
};

const { watch, series, task, src, dest, parallel } = require("gulp");

function scss() {
    return gulp.watch("scss/**/*.scss", function () {
        return gulp
            .src("scss/style.scss")
            .pipe(sassGlob())
            .pipe(
                sass({
                    outputStyle: "expanded",
                    importer: packageImporter({
                        extensions: [".scss", ".css"],
                    }),
                })
            )
            .pipe(sassPrefix())
            .on("error", sass.logError)
            .pipe(gulp.dest("css"));
    });
}

exports.scss = scss;

//Pug
gulp.task("pug", function () {
    return gulp
        .src(["pug/**/*.pug", "!pug/**/_*.pug"])
        .pipe(
            pug({
                pretty: true,
            })
        )
        .pipe(gulp.dest("html/"));
});

//JS Compress
task("js", function () {
    return src(paths.jsSrc).pipe(plumber()).pipe(uglify()).pipe(dest(paths.jsDist));
});

gulp.task("webp", function () {
    return src(paths.imgSrcDir + "*.{png,jpg,jpeg}")
        .pipe(webp())
        .pipe(gulp.dest(paths.imgDstDir));
});

// browser-sync
task("browser-sync", () => {
    return browserSync.init({
        server: {
            baseDir: paths.root,
        },
        port: 8080,
        reloadOnRestart: true,
    });
});

// browser-sync reload
task("reload", (done) => {
    browserSync.reload();
    done();
});

//watch
task("watch", (done) => {
    watch([paths.jsSrc], series("js", "reload"));
    watch([paths.imgSrcDir], series("webp", "reload"));
    watch([paths.pug], series("pug", "reload"));
    done();
});
task("default", parallel("watch", "browser-sync"));
