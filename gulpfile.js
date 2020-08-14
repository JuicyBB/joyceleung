var gulp = require('gulp'),
	rimraf = require('rimraf'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify-es').default,
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	runSequence = require('run-sequence'),
	realFavicon = require('gulp-real-favicon'),
	fs = require('fs'),
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
	responsive = require('gulp-responsive'),
	connect = require('gulp-connect');

var paths = {
	output: './docs/',
	input: './src/',
	npm: './node_modules/',
};

paths.jsVendor = paths.input + 'js/vendor/*.js';
paths.jsCustom = paths.input + 'js/*.js';
paths.sass = paths.input + 'scss/app.scss';
paths.img = paths.input + 'img/**/*.{jpg,jpeg,png,svg,gif}';
paths.webp = paths.input + 'img/**/*.{jpg,jpeg,png}';
paths.responsive = paths.input + 'img/**/*.{jpg,jpeg,png}';

paths.jsDistDir = paths.output + 'js';
paths.cssDistDir = paths.output + 'css';
paths.imgDistDir = paths.output + 'img';
paths.imgPlaceholderDistDir = paths.output + 'img/placeholders';

paths.css = paths.output + 'css/*.css';
paths.js = paths.output + 'js/*.js';
paths.minCss = paths.output + 'css/*.min.css';
paths.minJs = paths.output + 'js/*.min.js';
paths.html = paths.output + '*.html';

paths.concatJsDest = paths.output + 'js/app.min.js';
paths.concatCssDest = paths.output + 'css/app.min.css';
paths.optimizedImgDest = paths.output + 'img/*';

paths.allJs = [paths.npm + 'jquery/dist/jquery.js', paths.npm + 'micromodal/dist/micromodal.js', paths.npm + 'aos/dist/aos.js', paths.jsVendor, paths.jsCustom];

gulp.task('clean:js', function (cb) {
	rimraf(paths.concatJsDest, cb);
});
gulp.task('clean:css', function (cb) {
	rimraf(paths.concatCssDest, cb);
});
gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('sass', function () {
	return gulp.src(paths.sass).pipe(plumber()).pipe(sass()).pipe(autoprefixer()).pipe(gulp.dest(paths.cssDistDir));
});

gulp.task('scripts', function () {
	return gulp.src(paths.allJs).pipe(plumber()).pipe(concat('app.js')).pipe(gulp.dest(paths.jsDistDir));
});

gulp.task('min:js', function () {
	return gulp
		.src([paths.js, '!' + paths.minJs], { base: '.' })
		.pipe(concat(paths.concatJsDest))
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('.'))
		.pipe(connect.reload());
});
gulp.task('min:css', function () {
	return gulp
		.src([paths.css, '!' + paths.minCss])
		.pipe(plumber())
		.pipe(concat(paths.concatCssDest))
		.pipe(cssmin())
		.pipe(gulp.dest('.'))
		.pipe(connect.reload());
});
gulp.task('min', ['min:js', 'min:css']);

// Optimize images + WEBP Conversion
gulp.task('clean:img', function (cb) {
	rimraf(paths.optimizedImgDest, cb);
});
gulp.task('optimize:img', function () {
	return gulp
		.src(paths.img)
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest(paths.imgDistDir));
});
gulp.task('create:placeholders', function () {
	return gulp
		.src(paths.responsive)
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 4, progressive: true, smooth: 100}),
		],{ verbose: true }))
		.pipe(gulp.dest(paths.imgPlaceholderDistDir));
});
gulp.task('convert:webp', function () {
	return gulp.src(paths.webp).pipe(webp()).pipe(gulp.dest(paths.imgDistDir));
});
gulp.task('optimize-images', ['clean:img', 'optimize:img', 'convert:webp']);
gulp.task('create-placeholders', ['create:placeholders']);

gulp.task('build', function (done) {
	runSequence('clean', 'sass', 'scripts', 'min', 'optimize-images', function () {
		done();
	});
});

gulp.task('connect', function () {
	connect.server({
		livereload: true,
		root: paths.output,
		port: 8888,
	});
});

gulp.task('html', function () {
	gulp.src(paths.html).pipe(gulp.dest(paths.output)).pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', ['clean:css', 'sass', 'min:css']);
	gulp.watch('src/js/**/*.js', ['clean:js', 'scripts', 'min:js']);
	gulp.watch('src/img/**/*', ['optimize-images']);
	gulp.watch([paths.html], ['html']);
});

// RUN DEFAULT TASKS
gulp.task('default', ['build', 'connect', 'watch']);

// File where the favicon markups are stored
var FAVICON_DATA_FILE = paths.input + 'favicon/faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function (done) {
	realFavicon.generateFavicon(
		{
			masterPicture: paths.input + 'favicon/favicon.png',
			dest: paths.output + 'favicon',
			iconsPath: '/',
			design: {
				ios: {
					pictureAspect: 'noChange',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true,
					},
				},
				desktopBrowser: {
					design: 'raw',
				},
				windows: {
					pictureAspect: 'noChange',
					backgroundColor: '#da532c',
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false,
						},
					},
				},
				androidChrome: {
					pictureAspect: 'noChange',
					themeColor: '#ffffff',
					manifest: {
						display: 'standalone',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true,
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false,
					},
				},
			},
			settings: {
				scalingAlgorithm: 'Mitchell',
				errorOnImageTooSmall: false,
				readmeFile: false,
				htmlCodeFile: false,
				usePathAsIs: false,
			},
			markupFile: FAVICON_DATA_FILE,
		},
		function () {
			done();
		},
	);
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function () {
	return gulp
		.src([paths.output + '*.html'])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('favicon/'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function (done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
});
