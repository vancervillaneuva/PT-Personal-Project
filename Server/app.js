 // Do NOT modify this file; make your changes in server.js.
 const mongoose = require('mongoose');
 const { server } = require('./server.js');
 const port = 5000;
 
 mongoose.Promise = global.Promise;
 const connect = mongoose.connect(
   'mongodb://localhost/data', 
   { useMongoClient: true }
 );
 
 
 server.listen(port);
 console.log(`Server Listening on ${port}`);