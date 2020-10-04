const smartgrid = require('smart-grid');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-less');

const config = {
    src: './src',
    css: {
        watch: '/precss/**/*.less',
        src: '/precss/styles.less',
        dest: '/css'
    },
    html: {
        src: '/index.html'
    }
};

gulp.task('build', function () {
    gulp.src(config.src + config.css.src)
            .pipe(sourcemaps.init())
            .pipe(preproc())
            .pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            // .pipe(cleanCSS({
            //     level: 2
            // }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.src + config.css.dest))
            .pipe(browserSync.reload({
                stream: true
            }));
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.src + config.css.watch, ['build']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});

gulp.task('grid', function (done) {
    const settings = {
        columns: 24,
        offset: '10px',
        container: {
            maxWidth: '960px',
            fields: '30px'
        },
        breakPoints: {
            md: {
                width: "992px",
                fields: "20px"
            },
            sm: {
                width: "720px",
                fields: "10px"
            },
            xs: {
                width: "576px",
                fields: "5px"
            },
            xxs: {
                width: "380px",
                fields: "5px"
            }
        },
        oldSizeStyle: false,
        properties: [
            'justify-content'
        ]
    };

    smartgrid('./src/precss', settings);
    done();
});
