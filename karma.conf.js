// Karma configuration
// Generated on Tue Mar 17 2015 19:40:13 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha'],
    files: [
        'bower_components/chai/chai.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'src/*.js',
        'test/chai-setup.js',
        'test/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
