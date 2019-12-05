var server = require('./lib/server');
var workers = require('./lib/workers');

var app = {};
// init function
app.init = function(){
// start server
server.init();

// start workers
workers.init();
};

// execute
app.init();

// export app
module.exports = app
