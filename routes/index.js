var express = require('express');
var passport = require('passport');
var userModel = require('./users');
var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(userModel.authenticate()));
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("HOME PAGE")
});

router.get('/register', (req , res ) => {
  res.render("register")
});

router.get('/login', (req , res ) => {
  res.render("login")
});

router.get('/chat', isLogged,async(req , rs) => {
  const Data = await userModel.findOne({
    username:req.session.passport.user
  })
  rs.render('chat',{username:Data.username,department:Data.department});
})

// router.get('/selectState',isLogged, (req ,res) => {
//   res.render('index');
// })

// router.post('/selectState',async(req , res) => {
//    const sel = await userModel.insertMany({})
//    res.send(sel);
// })

router.post('/register',( req , res) => {
  var userData = new userModel({
  username:req.body.username,
  department:req.body.department,
  password:req.body.password,
  pen:req.body.pen
  });

  userModel.register(userData , req.body.password)
  .then((registereduser) => {
    passport.authenticate("local")(req , res , () => {
      res.redirect('/chat');
    })
  })
});

router.post('/login', passport.authenticate('local',{
  successRedirect:'/chat',
  failureRedirect:'/register'
}),(req ,res ) => {});

router.get('/logout' , (req , res , next) => {
  req.logout((err) => {
    if (err) {return next(err); }
    res.redirect('/login');
    })
})

function isLogged(req , res , next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}

module.exports = router;
