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

    argv         = require('yargs').argv,
    gulpif       = require('gulp-if'),
    uglify       = require('gulp-uglify'),
	server       = require('gulp-webserver'),
	runsSequence = require('run-sequence'),
    plumber      = require('gulp-plumber');

es6ify.traceurOverrides = {experimental: true};

// Browserify, transform and concat all javascript
gulp.task('scripts', function() {
	return browserify('./scripts/app.js')
		.add(es6ify.runtime)
		.transform(hbsfy)
		.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
		.bundle()
		.pipe(plumber())
		.pipe(source('app.js'))
		.pipe(streamify(concat('engine.js')))
		// uglify javascript in production
		.pipe(gulpif(argv.production, uglify()))
		.pipe(gulp.dest('build/js'))
		// don't livereload in production
		.pipe(gulpif(argv.dev, livereload()));
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
        .pipe(gulpif(argv.dev, livereload()));
		//.pipe(gulpif(!argv.production, livereload()))
});

// clean up target folder
gulp.task('clean', function() {
    return gulp.src(["build/*", "lib/*"], {read: false})
        .pipe(clean());
});

// clean up target folder
gulp.task('clean-lib', function() {
	return gulp.src(["lib/*"], {read: false})
		.pipe(clean());
});

// copy local index file to build folder
gulp.task('html', function() {
    return gulp.src('html/**')
        .pipe(gulp.dest('./build'))
        .pipe(gulpif(argv.dev, livereload()));
});

// copy local js sources to build folder
gulp.task('vendor', function() {
    return gulp.src([
        'scripts/vendor/*.*'
    ])
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./build/js/vendor'));
});


gulp.task('babel', function() {
	return gulp.src('scripts/**/*.js')
		.pipe(babel({
			presets: ['es2015', 'stage-2', 'stage-3'],
			plugins: ['es6-promise']
		}))
		.pipe(gulp.dest('lib/'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch('scripts/**', ['scripts']);
    gulp.watch('templates/**', ['scripts']);
	gulp.watch('stylesheets/**', ['stylesheets']);
	gulp.watch('html/**', ['html']);
    gulp.watch('scripts/vendor/**', ['vendor']);
});


gulp.task('serve', function () {
	gulp.run('vendor');
	gulp.run('scripts');
	gulp.run('html');
	gulp.run('stylesheets');
	gulp.src(['./build', './build/js'])
		.pipe(server({
			port: 9090,
			open: true,
			livereload: true,
			directoryListing: false
		}));
	return gulp.watch(['scripts/**', 'stylesheets/**', 'templates/**', 'html/**'], ['scripts', 'html', 'vendor', 'stylesheets']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['stylesheets', 'scripts', 'html', 'vendor', 'watch']);
//maven task, without watcher
gulp.task('maven', ['stylesheets', 'scripts', 'vendor', 'html']);