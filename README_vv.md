
Steps in order to create the final project

1. Create  folder "Final-Project"

2. Create the Mongo DB and start it
   A. Create a folder 'data' on the ...\Final-Project\data
   B. Run the following command to start Mongo:
C:\"Program Files"\MongoDB\Server\3.4\bin\mongod.exe --dbpath C:\Users\bone\bscamp\Final-Project\data

3. Create the Package.JSON
   npm init
   yes to everything

3. Load the following in the project for NPM install
    npm i --save express body-parser cors mongoose

4. Install nodemon for continous restart and start so you don't have to run it
    npm install -g nodemon


5. Create a simple Schema of users models.js

   const mongoose = require('mongoose');
   const UsersSchema = new mongoose.Schema({
  
    // TODO: write your schema here
     firstName: String,
     lastName: String,
     email: String,
     createdAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model('Users', UsersSchema);



6. Create a app.js file and paste the following:

   // Do NOT modify this file; make your changes in server.js.
    const { server } = require('./server.js');
    server.listen(3000);

7. Create a server.js file and paste the following:

   const bodyParser = require('body-parser');
   const express = require('express');
   const mongoose = require('mongoose');
   const User = require('./models');

   const STATUS_USER_ERROR = 422;

   const server = express();
   // to enable parsing of json bodies for post requests
   server.use(bodyParser.json());

   const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ error: err });
  } else {
    res.json(err);
  }
};


const queryAndThen = (query, res, cb) => {
  query.exec((err, result) => {
    if (err) {
      sendUserError(err, res);
    } else {
      cb(result);
    }
  });
};

// GET
server.get('/users', (req, res) => {
	User.find({}, (err, data) => {
        if(err) throw err;
        res.json(data);
  });     
});


// POST
server.post('/users', (req,res) => {
	
	const {firstName, lastName, email} = req.body; 

     if (!firstName || !lastName || !email) {
        res.status(422);
        res.json('missing text or complieted field');
     return;
     }

     const user = new User(req.body);

   user.save((err, savedUser)=>{
     if (err) {
       res.status(500).json({ success: false, message: 'could not save the bear'});
     } else {
       res.status(201).json(savedUser);
     }
   });

});


module.exports = { server };


8. Modify in the Package.JSON file the startup (later)
    "scripts": {
    "start": "npm start app.js"
    "test": "eslint tests/*.js && eslint src/*.js && mocha -R nyan tests",
  },


9. run nodemon nodemon app.jsS







