const gulp = require("gulp");

gulp.task("copy-html", function(){
    return gulp.src(["index.html", "goods_list.html", "goods_cont.html", "shop.html", "log.html", "register.html"])
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("images", function(){
    return gulp.src("*.{jpg, png, gif}")
    .pipe(gulp.dest("dist/img"))
    .pipe(connect.reload())
})

const sass = require("gulp-sass");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("sass", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("resetCss", function(){
    return gulp.src("reset.css")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("reset.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("goodsSass", function(){
    return gulp.src("stylesheet/goodsStyle.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("goodsStyle.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("goodsGlassSass", function(){
    return gulp.src("stylesheet/goodsContGlass.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("goodsContGlass.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("shopSass", function(){
    return gulp.src("stylesheet/shopStyle.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("shopStyle.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("logSass", function(){
    return gulp.src("stylesheet/logStyle.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("logStyle.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("registerSass", function(){
    return gulp.src("stylesheet/registerStyle.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("registerStyle.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("scripts", function(){
    return gulp.src(["*.js", "goodsContMain.js", "!gulpfile.js", "shop.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})


gulp.task("build", ["copy-html", "images", "sass", "resetCss", "goodsSass", "goodsGlassSass", "shopSass", "logSass", "registerSass", "scripts", "data"]);

gulp.task("watch", function(){
    gulp.watch(["index.html", "goods_list.html", "goods_cont.html", "shop.html", "log.html", "register.html"], ["copy-html"]);
    gulp.watch("*.{jpg, png, gif}", ["images"]);
    gulp.watch("stylesheet/index.scss", ["sass"]);
    gulp.watch("reset.css", ["resetCss"]);
    gulp.watch("stylesheet/goodsStyle.scss", ["goodsSass"]);
    gulp.watch("stylesheet/goodsContGlass.scss", ["goodsGlassSass"]);
    gulp.watch("stylesheet/shopStyle.scss", ["shopSass"]);
    gulp.watch("stylesheet/logStyle.scss", ["logSass"]);
    gulp.watch("stylesheet/registerStyle.scss", ["registerSass"]);
    gulp.watch(["*.js", "!gulpfile.js", "goodsContMain.js"], ["scripts"])
    gulp.watch(["*.json", "!package.json"], ["data"])
})

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    })
})

gulp.task("default", ["watch" ,"server"]);