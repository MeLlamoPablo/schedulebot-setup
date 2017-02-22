"use strict";

const gulp     = require("gulp")
	, apidoc   = require("gulp-apidoc")
	, babel    = require("gulp-babel")
	, babelify = require("babelify")
	, bsfy     = require("browserify")
	, buffer   = require("vinyl-buffer")
	, concat   = require("gulp-concat")
	, fs       = require("fs")
	, plumber  = require("gulp-plumber")
	, rename   = require("gulp-rename")
	, tap      = require("gulp-tap")
	, ts       = require("gulp-typescript")
	, uglify   = require("gulp-uglify")
	, source   = require("vinyl-source-stream")
;

const tsc = ts.createProject("./tsconfig.json");

gulp.task("js-dev", () => {
	return bsfy({
		entries: "./lib/client/index.js",
		extensions: [".js"],
		debug: true,
		insertGlobals: true
	})
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(tap(file => {

			// Materialize needs to be inserted outside the bundle to be global
			let materialize = fs.readFileSync(
				"./node_modules/materialize-css/dist/js/materialize.min.js", "utf-8"
			);

			let newFile = file.contents.toString("utf-8") + "\n" + materialize;

			file.contents = new Buffer(newFile, "utf-8");

		}))
		.pipe(rename("index.js"))
		.pipe(gulp.dest("./public/js/"));
});

gulp.task("js", () => {
	return bsfy({
		entries: "./lib/client/index.js",
		extensions: [".js"],
		debug: true,
		insertGlobals: true
	})
		.transform(babelify, { presets: ["es2015"] })
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(tap(file => {

			// Materialize needs to be inserted outside the bundle to be global
			let materialize = fs.readFileSync(
				"./node_modules/materialize-css/dist/js/materialize.min.js", "utf-8"
			);

			let newFile = file.contents.toString("utf-8") + "\n" + materialize;

			file.contents = new Buffer(newFile, "utf-8");

		}))
		.pipe(rename("index.js"))
		.pipe(gulp.dest("./public/js/"));
});

gulp.task("css", () => {
	return gulp.src([
		"./node_modules/materialize-css/dist/css/materialize.min.css",
		"./views/css/styles.css"
	])
		.pipe(plumber())
		.pipe(concat("styles.css"))
		.pipe(gulp.dest("./public/css"));
});

gulp.task("fonts", () => {
	return gulp.src([
		"./node_modules/materialize-css/fonts/**/*"
	])
		.pipe(plumber())
		.pipe(gulp.dest("./public/fonts"));
});

gulp.task("static", ["js", "css", "fonts"]);

gulp.task("typescript", () => {
	return gulp.src(["./lib/**/*.ts", "./typings/**/*.d.ts"])
		.pipe(plumber())
		.pipe(tsc())
		.pipe(gulp.dest("./server/"))
});

gulp.task("docs", done => {
	apidoc({
		config: ".",
		src: "./lib",
		dest: "./docs"
	}, done);
});

gulp.task("default", ["typescript", "docs", "static"]);

gulp.task("watch", () => {
	gulp.watch("./lib/client/**/*.js", ["js-dev"]);
	gulp.watch("./views/css/**/*.css", ["css"]);
});