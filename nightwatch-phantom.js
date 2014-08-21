if(process.env.WEB_DRIVER_PORT == null){
    process.env.WEB_DRIVER_PORT = 4444;
}
var webdriverPort = process.env.WEB_DRIVER_PORT;

var fs = require('fs'),
	childProcess = require('child_process'),
	phantomjs = require('phantomjs'),
	mkdirp = require('mkdirp'),
	rimraf = require('rimraf');

var phantomJsProcess = null,
	nightwatchProcess = null;

rimraf.sync("reports/junit");
rimraf.sync("reports/screenshots");
mkdirp.sync("reports/junit");
mkdirp.sync("reports/screenshots");

//Allows phantomJS to accept requests without certifications
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

startPhantomJs();

function startPhantomJs(){
    var childArgs = [
      '--webdriver=' + webdriverPort,
      '--ignore-ssl-errors=yes'
    ]

    console.log("Starting phantomjs on port " + webdriverPort);
    phantomJsProcess = childProcess.spawn(phantomjs.path, childArgs);
    
    phantomJsProcess.stdout.on('data', function (data) {

      if(nightwatchProcess==null && data.toString().indexOf("running on port " + webdriverPort)!=0){

        console.log("Phantomjs is ready, starting nightwatch");
        nightwatchProcess = startNightwatch();
        nightwatchProcess.on('close', function (code) {
            console.log("Nightwatch is done, shutting down phantomjs");
            shutdownPhantomJs(phantomJsProcess);
            process.exit(code);
        });
      }
    });
    
    phantomJsProcess.stderr.on('data', function (data) {
      console.log('phantomjs stderr: ' + data);
    });
    
    return phantomJsProcess;
}

function shutdownPhantomJs(phantomJsProcess){
	console.log("shutting down phantomJS");
    phantomJsProcess.stdin.end(); //shut down phantomjs
    phantomJsProcess.kill()
}

function startNightwatch(){
    var argv =  process.argv;
    argv.shift();
    argv.shift();
    var nightwatchProcess = childProcess.fork('nightwatch', argv);
    
    return nightwatchProcess;
}
