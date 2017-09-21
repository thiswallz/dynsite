var gulp = require('gulp'),
    argv = require('yargs').argv,
    connect = require('gulp-connect'),
    shell = require('gulp-shell'),
    mkdirp = require('mkdirp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    header = require('gulp-header'),
    d = new Date(),
    env = "DEV",
    df = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes(),
    headerComment = '/*Generated on:' + df + '*/';


var precorefiles = [
    './libs/vendor/jquery-1.11.2.min.js',
    './libs/vendor/angular.min.js',
    './libs/vendor/angular-route.min.js',
    './libs/vendor/angular-sanitize.min.js',
    './libs/vendor/angular-cookies.min.js',
    './libs/vendor/angular-uuid.js',
    './libs/vendor/angular-socialshare.min.js',
    './libs/vendor/bootstrap.min.js',
    './libs/vendor/ui-bootstrap-tpls-1.3.3.min.js',
    './libs/vendor/update-meta.min.js'
]
var corefiles = [
    './app/conf.js',
    './app/app.module.js',
    './app/app.route.js',
    './app/app.run.js',
    './app/controllers/paymentController.js',
    './app/common/config.js',
    './app/layout/home.js',
    './app/layout/home.controller.js',
    './app/layout/home.service.js',
    './app/components/aws/aws*.js',
    './app/components/channel/channel.js',
    './app/components/channel/channel.service.js',
    './app/components/authentication/authentication*.js',
    './app/components/collection/collection*.js',
    './app/components/payment/payment*.js',
    './app/components/login/login*.js',
    './app/common/directive/html.js',
    './app/common/filter/html.js',
    './app/common/service/validation.service.js',
    './app/common/service/style.service.js',
    './app/common/service/common.service.js',
    './app/common/service/util.service.js'
]


var precorefiles_editmode = [
    './libs/vendor/jquery-1.11.2.min.js',
    './libs/vendor/angular.min.js',
    './libs/vendor/angular-route.min.js',
    './libs/vendor/angular-sanitize.min.js',
    './libs/vendor/angular-cookies.min.js',
    './libs/vendor/angular-uuid.js',
    './libs/vendor/angular-socialshare.min.js',
    './libs/vendor/bootstrap.min.js',
    './libs/vendor/ui-bootstrap-tpls-1.3.3.min.js',
    './libs/vendor/fastclick.min.js',
    './libs/vendor/dom-drag.js',
    './libs/vendor/update-meta.min.js'
]
var corefiles_editmode = [
    './app/conf.js',
    './libs/vendor/customizerLibs.js',
    './libs/vendor/bcCustomize.min.js',
    './libs/vendor/modernizer_custom.js',
    './libs/vendor/chosen.jquery.min.js',
    './libs/vendor/chosen.js',
    './libs/vendor/trix.js',
    './libs/vendor/angular-trix.js',
    './app/app.module.js',
    './app/app.route.js',
    './app/controllers/paymentController.js',
    './app/common/config.js',
    './app/layout/home.js',
    './app/layout/home.controller.js',
    './app/layout/home.service.js',
    './app/components/aws/aws*.js',
    './app/components/channel/channel.js',
    './app/components/channel/channel.service.js',
    './app/components/authentication/authentication*.js',
    './app/components/collection/collection*.js',
    './app/components/custom/custom*.js',
    './app/components/payment/payment*.js',
    './app/components/login/login*.js',
    './app/common/directive/html.js',
    './app/common/filter/html.js',
    './app/common/service/validation.service.js',
    './app/common/service/style.service.js',
    './app/common/service/common.service.js',
    './app/common/service/util.service.js'
];



gulp.task('setProd', function() {
    env = "PROD";
});

gulp.task('setQA', function() {
    env = "QA";
});

gulp.task('distJsEditMode', function() {
    console.log("env: "+env)
    precorefiles_editmode.push.apply(precorefiles_editmode, [
        './libs/apiGateway-js-sdk-'+env+'/lib/axios/dist/axios.standalone.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/CryptoJS/rollups/hmac-sha256.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/CryptoJS/rollups/sha256.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/CryptoJS/components/hmac.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/CryptoJS/components/enc-base64.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/url-template/url-template.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/apiGatewayCore/sigV4Client.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/apiGatewayCore/apiGatewayClient.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/apiGatewayCore/simpleHttpClient.js',
        './libs/apiGateway-js-sdk-'+env+'/lib/apiGatewayCore/utils.js',
        './libs/apiGateway-js-sdk-'+env+'/apigClient.js'
    ]);
    precorefiles_editmode.push.apply(precorefiles_editmode, corefiles_editmode);
    return gulp.src(precorefiles_editmode)
        .pipe(concat('all.edit.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('distJsDev', function() {

    precorefiles.push.apply(precorefiles, corefiles);
    return gulp.src(precorefiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('distCssEditMode', function() {
    return gulp.src([

            './assets/css/fontImports.css',
            './assets/css/bootstrap.min.css',
            './assets/css/style.css',
            './assets/css/bcCustomize.css',
            './assets/css/chosen.min.css',
            './assets/css/trix.css',
            './assets/css/trix_custom.css'
        ])
        .pipe(concat('all.edit.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('distCss', function() {
    return gulp.src([

            './assets/css/fontImports.css',
            './assets/css/bootstrap.min.css',
            './assets/css/style.css'
        ])
        .pipe(concat('all.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-css', function() {
    return gulp.src('./assets/css/all.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(header(headerComment))
        .pipe(gulp.dest('./assets/css/'));
});


gulp.task('compress', function() {
    gulp.src('./dist/*.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(header(headerComment))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('cleanDist', function() {
    var thisTask = gulp.src('dist/*.js', { read: false }).pipe(clean());
    return thisTask;
});

var filesToMove = [
        './assets/css/fonts/**/*.*'
];
gulp.task('movingDist',[], function(){
  gulp.src(filesToMove, { base: './assets/css/' })
  .pipe(gulp.dest('dist'));
});

 
//main tasks (deploy)
gulp.task('deployDev', function(cb) { runSequence('cleanDist','movingDist', 'sass','distCss','distCssEditMode', 'minify-css', 'distJsDev','distJsEditMode', 'compress', function() { console.log('Deploy Finishing ... (timestamp: ' + df + ')'); }) });
gulp.task('deployProd', function(cb) { runSequence('setProd','cleanDist','movingDist', 'sass','distCss','distCssEditMode', 'minify-css', 'distJsDev','distJsEditMode', 'compress', function() { console.log('Deploy Finishing ... (timestamp: ' + df + ')'); }) });
gulp.task('deployQA', function(cb) { runSequence('setQA','cleanDist','movingDist', 'sass','distCss','distCssEditMode', 'minify-css', 'distJsDev','distJsEditMode', 'compress', function() { console.log('Deploy Finishing ... (timestamp: ' + df + ')'); }) });

//webserver
gulp.task('webserver', function() {
    connect.server();
});

//auto gen
gulp.task('cmmake', function() {
    var tfolder = argv.tfolder
    mkdirp('./template/'+tfolder, function (err) {
        if (err) console.error(err)
        else console.log('carpeta creada('+'./template/'+tfolder+')...')
    });
  })

  gulp.task('cp_template', function() {
    var tfolder = argv.tfolder
    gulp.src(["template/common/\._genout/**/*","template/common/\._genout/.**/.*"])
    .pipe(gulp.dest('./template/'+tfolder+"/"));
});

//Sass
var inputSass = './assets/css/*.scss';
var outputCss = './assets/css/';

gulp.task('sass', function() {
    return gulp
        // Find all `.scss` files from the `css/` folder
        .src(inputSass)

    .pipe(sass())

    // Write the resulting CSS in the outputCss folder
    .pipe(gulp.dest(outputCss))

    // Livereload sass
    .pipe(livereload());

});

gulp.task('watch', function() {
    livereload.listen();
    return gulp
        // Watch the inputSass folder for change,
        // and run `sass` task when something happens
        .watch(inputSass, ['sass'])
        // When there is a change,
        // log a message in the console
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

//default task
gulp.task('default', ['sass', 'watch', 'webserver']);
gulp.task('create_template', ['cmmake','cp_template']);
