
Steps in order to create the final project

1. Create  folder "Final-Project"

2. Create the Mongo DB and start it
   A. Create a folder 'data' on the ...\Final-Project\data
   B. Run the following command to start Mongo:
C:\"Program Files"\MongoDB\Server\3.4\bin\mongod.exe --dbpath C:\Users\bone\bscamp\Final-Project\Server\data

3. Create the Package.JSON
   npm init
   yes to everything

3. Load the following in the project for NPM install
    npm i --save express body-parser cors mongoose bcrypt

4. Install nodemon for continous restart and start so you don't have to run it
    npm install -g nodemon


5. Create a simple Schema of users models.js
// ###########################################
   const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const PostSchema = ({
    hash: String,
    subject: String,
    notes: String,
    image: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
  });

const User = mongoose.model('User', UserSchema);
const Posts = mongoose.model('Posts', PostSchema);
module.exports = {
  User,
  Posts,
};
// ############################################

6. Create a app.js file and paste the following:

  // Includes the Promise
  // ##########################################
     // Do NOT modify this file; make your changes in server.js.
 const mongoose = require('mongoose');
 const { server } = require('./server.js');
 const port = 3000;
 
 mongoose.Promise = global.Promise;
 const connect = mongoose.connect(
   'mongodb://localhost/data', 
   { useMongoClient: true }
 );
 
 
 server.listen(port);
 console.log(`Server Listening on ${port}`);
  // ##########################################

7. Create a server.js file and paste the following:
  // #############################################
    const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//const { User } = require('./models');
//const User = require('./models');

const { User, Posts } = require('./models');

const BCRYPT_COST = 11;
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

// GET for User data
server.get('/users', (req, res) => {
 User.find({}, (err, data) => {
     if (err) { 
        res.json({err});
        return;
     }
     res.json(data);
});     
});

// GET for Post data
server.get('/posts', (req, res) => {
    Posts.find({}, (err, data) => {
        if (err) { 
           res.json({err});
           return;
        }
        res.json(data);
   });     
   });


// POST (Email and Password Entry)
server.post('/users', (req,res) => {
    
    const { email, password } = req.body; 
     console.log(req.body);
   
     if (!email || !password) {
        res.status(422);
        res.json('missing text or complieted field');
     return;
     }
   
     const hashedPassword = bcrypt.hash(password, BCRYPT_COST, (hashErr, newHash) => {
        if (hashErr) {
          sendUserError(hashErr, res);
          return;
        }

     const newUser = new User({email, passwordHash:newHash});
      
     newUser.save((err, user) => {
       if (err) {
        res.status(422);
        res.json({'Erro saving user to DB: ': err.message})
         return;
       }
       res.json(user);
     });
     
   });
});

// POST (Post Hash, Subject, Notes, Picture)
server.post('/posts', (req,res) => {
 
 const {hash, subject, notes, image} = req.body; 
  console.log(req.body);

  if (!hash || !subject || !notes) {
     res.status(422);
     res.json('missing text or complieted field');
  return;
  }

  const newPost = new Posts({hash, subject, notes, email:'filp530@hotmail.com'});
   
  newPost.save((err, post) => {
    if (err) {
     res.status(422);
     res.json({'Erro saving user to DB: ': err.message})
      return;
    }
    res.json(post);
  });

});


// // POST (old)
// server.post('/users', (req,res) => {
 
//  const {firstName, lastName, email} = req.body; 
//   console.log(req.body);

//   if (!firstName || !lastName || !email) {
//      res.status(422);
//      res.json('missing text or complieted field');
//   return;
//   }

//   //const newUser = new User(req.body);
//   const newUser = new User({firstName, lastName, email});
   
//   newUser.save((err, user) => {
//     if (err) {
//      res.status(422);
//      res.json({'Erro saving user to DB: ': err.message})
//       return;
//     }
//     res.json(user);
//   });

// });


module.exports = { server };
  // #############################################

8. Modify in the Package.JSON file the startup (later)
    "scripts": {
    "start": "npm start app.js"
    "test": "eslint tests/*.js && eslint src/*.js && mocha -R nyan tests",
  },

9. run actual Server nodemon app.js







