var util = require('util');
var events = require('events');

var debug = false;

function WaitForPageLoad() {
  events.EventEmitter.call(this);
  this.expectedValue = 'Page [Objects] loaded correctly';
  this.startTimer = null;
  this.cb = null;
  this.ms = null;
  this.abortOnFailure = false;
  this.rescheduleInterval = 300; //ms
  this.protocol = require('../node_modules/nightwatch/lib/selenium/protocol.js')(this.client);
}

util.inherits(WaitForPageLoad, events.EventEmitter);

WaitForPageLoad.prototype.command = function(milliseconds, cb) {
  var self = this;

  this.startTimer = new Date().getTime();
  this.cb =  function() {};
  
  // support for a custom message
  this.message = null;
  
  this.rescheduleInterval = 1000
  this.ms = milliseconds;
  this.checkPageLoaded();
  return this;
};


WaitForPageLoad.prototype.pageLoaded = function(result, now) {
  var defaultMsg = 'Page loaded after %t milliseconds.';
  return this.pass(result, defaultMsg, now - this.startTimer);
};


WaitForPageLoad.prototype.pageNotLoaded = function(result, now) {
  if (now - this.startTimer < this.ms) {
    // JS wasn't found, schedule another check
    this.reschedule();
    return this;
  }

  var defaultMsg = 'Timed out while waiting for page to be loaded for %t milliseconds.\n\tUrl: ' + result.value.url;
  return this.fail(false, 'Page [Objects] NOT loaded correctly', this.expectedValue, defaultMsg);
};


/*!
 * Reschedule the checkPageLoaded
 */
WaitForPageLoad.prototype.reschedule = function(method) {
  var self = this;
  method = method || 'checkPageLoaded';

  setTimeout(function() {
    self[method]();
  }, this.rescheduleInterval);
};

WaitForPageLoad.prototype.complete = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.push(this);
  this.cb.apply(this.client.api, args);
  this.emit('complete');
  return this;
};

WaitForPageLoad.prototype.pass = function(result, defaultMsg, timeMs) {
  this.message = this.formatMessage(defaultMsg, timeMs);
  this.client.assertion(true, null, null, this.message, this.abortOnFailure);
  return this.complete(result);
};

WaitForPageLoad.prototype.fail = function(result, actual, expected, defaultMsg) {
  this.message = this.formatMessage(defaultMsg);
  this.client.assertion(false, actual, expected, this.message, this.abortOnFailure);
  return this.complete(result);
};

WaitForPageLoad.prototype.checkPageLoaded = function() {
  var self = this;

  this.protocol.execute( function() {
    return {
      jquery : typeof window.$
    }

  }, [], function(result) {
    


    var res = result.value,
        now = new Date().getTime(),
        passing = false;

        if (debug) {
          console.log(res);
        };

    if (res.jquery !== "undefined") {
      passing = true;
    }


    if (passing === true)  {
      console.log(result)
      return self.pageLoaded(result, now);
    
    } else {
       return self.pageNotLoaded(result, now);
    }
   
  });
  
};


WaitForPageLoad.prototype.formatMessage = function (defaultMsg, timeMs) {
  
  var message = defaultMsg || this.message,
      time = timeMs || this.ms;

  return String(message).replace('%t', time);

};



module.exports = WaitForPageLoad;
