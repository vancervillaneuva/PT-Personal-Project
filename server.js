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