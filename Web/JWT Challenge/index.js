const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

var app = express();
const port = process.env.PORT || 80;
const HOST = process.env.HOST || '0.0.0.0';

let token_secret = "CCH";
let adminUname = "admin"
let adminPWD = "e2$R9#4*tCe*"
let challenge_flag = "flag{4p1_4u7h0r154710n_15_h4rd}"
let guestUname = "guest"
let guestPWD = "password"
 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

function generateAccessToken(uname) {
  return jwt.sign(uname, token_secret, { expiresIn: '1800s' });
}

function validateJWT(tok){
  var decode = jwt.decode(tok, {complete: true})
  if (decode === null || decode  === undefined) { 
    return false 
  }

  if ((decode.header.alg).toLowerCase() === 'none'){
    return true
  } else {
    let v = 0;
    jwt.verify(tok, token_secret, (err) =>{
      if (err){
        console.log(err)
        v = 1;
      }
    })
    if (v === 1){
      return false
    } else {
      return true
    }
  }
}

let main_page = '/admin/getFlag'
let failed = false;

app.get("/", (req, res) => {
  res.render("login", { title: "login" });
});

app.get('/login', (req, res) => {
  res.render("login", { title: "login", failed: failed});
});

app.get('/guest', (req, res) => {
  if (validateJWT(req.cookies.token) && jwt.decode(req.cookies.token, {complete: true}).payload.user=="guest"){
    res.render("guest", {title: "Guests"});
  } else {
    res.redirect('/login')
  }
});

app.post('/auth',(req,res) => {
  if ((req.body['username']===adminUname && req.body['password']===adminPWD) || (req.body['username']===guestUname && req.body['password']===guestPWD)){
    failed = false;
    res.cookie('token', generateAccessToken({'user':req.body['username']}));
    if (req.body['username']==='admin'){
      res.redirect(main_page);
    } else {
      res.redirect('/guest');
    }
  } else {
    failed = true
    res.redirect('/login')
  }
});

app.get(main_page, (req, res) => {
  if (req.cookies.token !== undefined){
    if(validateJWT(req.cookies.token) && jwt.decode(req.cookies.token, {complete: true}).payload.user=="admin"){
      res.status(200).render('flag', {title: "flag", userName: jwt.decode(req.cookies.token, {complete: true}).payload.user, flag: challenge_flag})  
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  } 
});


app.get('/hint/1', (req, res) => {
  res.sendFile(path.join(__dirname, 'hint1.txt'))
})
app.get('/hint/2', (req, res) => {
  res.sendFile(path.join(__dirname, 'hint2.txt'))
})
app.get('/hint/3', (req, res) => {
  res.sendFile(path.join(__dirname, 'hint3.js'))
})

app.listen(port, () => { });
