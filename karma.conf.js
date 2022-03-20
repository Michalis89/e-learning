// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-jasmine-matchers'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-spec-reporter')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/e-learning'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' },
            ],
            fixWebpackSourcePaths: true,
            check: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80
                }
            }
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["ChromeHeadless"],
        singleRun: true,
        restartOnFileChange: true,
        reporters: ['dots', 'spec', 'coverage'],
        specReporter: {
            maxLogLines: 5, // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false, // do not print information about failed tests
            suppressPassed: true, // do not print information about passed tests
            suppressSkipped: true, // do not print information about skipped tests
            showSpecTiming: false, // print the time elapsed for each spec
            failFast: false // test would finish with error when a first fail occurs.
        },
        customLaunchers: {
            MyHeadlessChrome: {
                base: "Chrome",
                flags: [
                    "--headless",
                    "--disable-gpu",
                    "--remote-debugging-port-9876"
                ]
            }
        },
    });
};