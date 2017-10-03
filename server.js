const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
//const { User } = require('./models');
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
    console.log("went into get");
    
 User.find({}, (err, data) => {
     if (err) { 
         console.log('caused an error');
        res.json({err});
        return;
     }
     console.og('went fine');
     res.json(data);
});     
});


// POST
server.post('/users', (req,res) => {
 
 const {firstName, lastName, email} = req.body; 
  console.log(req.body);

  if (!firstName || !lastName || !email) {
     res.status(422);
     res.json('missing text or complieted field');
  return;
  }

  //const newUser = new User(req.body);
  const newUser = new User({firstName, lastName, email});
   
  newUser.save((err, user) => {
    if (err) {
     res.status(422);
     res.json({'Erro saving user to DB: ': err.message})
      return;
    }
    res.json(user);
  });


  //res.json('done');

//    user.save((err, savedUser)=>{
//    if (err) {
//      res.status(500).json({ success: false, message: 'could not save the bear'});
//      return;
//     } else {
//      //res.status(201).json(savedUser);
//      res.json('done');
//     }
//   });


//var promise = user.save();
//res.json('done');


});


// mongoose.Promise = global.Promise;
// const connect = mongoose.connect(
//   'mongodb://localhost/',
//   { useMongoClient: true }
// );


// connect.then(() => {
//     const port = 3000;
//     server.listen(port);
//     console.log(`Server Listening on ${port}`);
//   }, (err) => {
//     console.log('\n************************');
//     console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
//     console.log('************************\n');
//   });

module.exports = { server };