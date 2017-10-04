const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
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

// to enable the sessions
server.use(session({
  secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re'
}));


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


// EnsureLogin
// ##############################################
const ensureLogin = (req, res, next) => {
  const { userName } = req.session;
  console.log(`userName:${userName}`);
  if (!userName) {
    sendUserError('must be logged in', res);
    return;
  }

  User.findOne({ userName }, (err, user) => {
    if (err) {
      sendUserError(err, res);
      return;
    }

    if (!user) {
      sendUserError('must be logged in', res);
      return;
    }

    req.user = user;
    console.log('got user');
    next();
  });
};
// ################################################

// Login to validate the data SignIn/Login
server.post('/login', (req, res) => {
	const { userName, password } = req.body;

	if (!userName || !password) {
	   sendUserError('username and pasword are required', res);
	   return;
	}

    User.findOne( { userName }, (err, user) => {
        if (err) {
           sendUserError(err, res);
           return;
        }

        if (!user) {
           sendUserError('bad credentials', res);
	       return;
        }

        bcrypt.compare(password, user.passwordHash, (compareErr, valid) => {
            if (compareErr) {
                  sendUserError(compareErr, res);
	              return;
            }
        
            if (!valid) {
              sendUserError('bad credentials', res);
	          return;
            }

            req.session.userName = userName; // at the top
            res.json({ success: true });
        });
    }); 
});


// POST (username and Password Entry) Signup
server.post('/users',(req,res) => {
  
  const { userName, password } = req.body; 
   console.log(req.body);
 
   if (!userName || !password) {
      res.status(422);
      res.json('missing text or complieted field');
   return;
   }
 
   const hashedPassword = bcrypt.hash(password, BCRYPT_COST, (hashErr, newHash) => {
      if (hashErr) {
        sendUserError(hashErr, res);
        return;
      }

   const newUser = new User({userName, passwordHash:newHash});
    
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


// Restrict Acceess
const restrictAccess = (req, res, next) => {
  const path = req.path;
  if (/restricted/.test(path)) {
    if (!req.session.userName) {
      sendUserError('Must be logged in to access', res);
      return;
    }
  }
  next();
};

server.use(restrictAccess);



// Restricting Acesss to all of these until the username and password is valid!!!
// ######################################################################################################

// GET for User data
server.get('/users', ensureLogin,(req, res) => {
 User.find({}, (err, data) => {
     if (err) { 
        res.json({err});
        return;
     }
     res.json(data);
});     
});

// GET for Post data
server.get('/posts', ensureLogin,(req, res) => {
    Posts.find({}, (err, data) => {
        if (err) { 
           res.json({err});
           return;
        }
        res.json(data);
   });     
   });



// POST (Post Hash, Subject, Notes, Picture)
server.post('/posts', ensureLogin,(req,res) => {
 
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

// ####################################################################################################


module.exports = { server };