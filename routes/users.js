var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')

router.post('/signin', function(req, res, next){

  db.signIn(req.body)
  .then(function(agent){
    let hash = agent.password
    let myPlaintextPassword = req.body.password
    //Use bcrypt to log in
    // Load hash from your password DB.
    bcrypt.compare(myPlaintextPassword, hash, function(err, response) {
      // res == true
      if (response) {
        //Route to /Assignment
        res.redirect('/Assignment')
      } else {
        res.render('index', { title: 'gClassified', message: 'Incorrect login. Contents will self destruct' })
      }
    });
  })
})

router.post('/signup', function(req,res,next){
  //Use bcrypt to Sign Up
  let myPlaintextPassword = req.body.password
  bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
    // Store hash in database
    db.signUp(hash, req.body)
    .then(function(agent){
      if (agent[0].password === req.body.password) {
        res.render('index', { title: 'gClassified', message: 'Password Must Be Hashed. Government Secrets are at Stake!' })
      }
      else {
        res.render('index', { title: 'gClassified', message: 'Sign Up Successful' })
      }
    })
  });
})

module.exports = router
