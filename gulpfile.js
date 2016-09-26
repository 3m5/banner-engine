var gulp         = require('gulp'),
    browserify   = require('browserify'),
	babel        = require('gulp-babel'),
    clean        = require('gulp-rimraf'),
    es6ify       = require('es6ify'),
    hbsfy        = require('hbsfy'),
    source       = require('vinyl-source-stream'),
    streamify    = require('gulp-streamify'),
    concat       = require('gulp-concat'),
    gutil        = require('gulp-util'),
    livereload   = require('gulp-livereload'),

    less         = require('gulp-less'),
    autoprefixer = require('autoprefixer-core'),
    postcss      = require('gulp-postcss'),
    minify       = require('gulp-clean-css'),
	handlebars   = require('gulp-compile-handlebars'),
	rename       = require('gulp-rename'),

    argv         = require('yargs').argv,
    gulpif       = require('gulp-if'),
    uglify       = require('gulp-uglify'),
	server       = require('gulp-webserver'),
	runsSequence = require('run-sequence'),
    plumber      = require('gulp-plumber'),
	domain       = require('domain'),
	tap          = require('gulp-tap'),
	webpack      = require('webpack'),
	devserver    = require('webpack-dev-server'),
	gutil        = require('gulp-util');


es6ify.traceurOverrides = {experimental: true};

var config       = require('./webpack.config.js');

var webpackCompiler = webpack(config);

gulp.task('webpack-scripts', function () {
	webpackCompiler.run(function () {
	});
});

gulp.task('webpack-dev-server', function () {
	return new devserver(webpackCompiler, {
		contentBase: "./build",
		quiet:       true,
		inline:      true
	}).listen(9090, "0.0.0.0", function (err) {
		if (err) throw new util.PluginError("webpack-dev-server", err);
	});
});

// Convert, prefixize and concat all .less files
gulp.task('stylesheets', function() {
	gulp.src('stylesheets/main.less')
		.pipe(less())
		.on('error', gutil.log)
		.pipe(concat('engine.css'))
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions', 'android >= 2.3', '> 1%'],
			cascade: false
		})]))
		// minify css in production
		.pipe(gulpif(argv.production, minify()))
		.pipe(gulp.dest('build/css'))
		.pipe(gulp.dest('lib/css'))
		.pipe(gulpif(!argv.production, livereload()))
});

// clean up target folder
gulp.task('clean', function() {
    return gulp.src(["build/*", "lib/*"], {read: false})
        .pipe(clean());
});

// clean up target lib folder
gulp.task('clean-lib', function() {
	return gulp.src(["lib/*"], {read: false})
		.pipe(clean());
});

// copy local index file to build folder
gulp.task('html', function () {
	return gulp.src('./html/index.hbs')
		.pipe(handlebars(
			{
				show_dev_scripts: !argv.stage,
			},
			{
				batch:   [
					'./html'
				],
				helpers: {
					getText: function () {
					}
				}
			}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest("./build"))
		.pipe(gulpif(!argv.production, livereload()));
});

// copy local js sources to build folder
gulp.task('vendor', function () {
	return gulp.src(['node_modules/3m5-coco/lib/vendor/**'])
		.pipe(gulp.dest('./build/js/'))
		.pipe(gulpif(!argv.production, livereload()));
});

gulp.task('babel', function() {
	return gulp.src('scripts/**/*.js')
		.pipe(babel({
			presets: ['es2015', 'stage-2', 'stage-3'],
			plugins: ['es6-promise']
		}))
		.pipe(gulp.dest('lib/'));
});

gulp.task('compile', function() {
	runsSequence(['clean-lib'], ['babel', 'stylesheets']);
});

gulp.task('webpack-watch', function () {
	livereload.listen(10110);
	gulp.watch(['stylesheets/**/*.less'], ['stylesheets']);
	gulp.watch('html/**/*.hbs', ['html']);
	gulp.watch('templates/**/*.hbs', ['html']);
});


gulp.task('serve', ['webpack-watch', 'webpack-dev-server', 'html', 'stylesheets', 'vendor']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['serve']);
//maven task, without watcher
gulp.task('maven', ['webpack-scripts', 'stylesheets', 'webpack-scripts', 'vendor', 'html']);