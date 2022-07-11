/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * App Variables
 */
var app = express();
const port = process.env.PORT || 8000;

//let token_secret = process.env.TOKEN_SECRET;
//let uname = process.env.APP_USER
// let pwd = process.env.APP_PASS
// let challenge_flag = process.env.CHANG_FLAG

let token_secret = "123";
let uname = "admin"
let pwd = "1234"
let challenge_flag = "flag{test_flag}"

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

/* 
 * Helpers
*/
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

/**
 * Routes Definitions
 */
// page defs

let main_page = '/admin/getFlag'
let failed = false;

app.get("/", (req, res) => {
  res.render("login", { title: "login" });
});

app.get('/login', (req, res) => {
  res.render("login", { title: "login", failed: failed});
});

app.post('/auth',(req,res) => {
  if (req.body['username']===uname && req.body['password']===pwd){
    failed = false;
    res.cookie('token', generateAccessToken({'user':req.body['username']}));
    res.redirect(main_page);
  } else {
    failed = true
    res.redirect('/login')
  }
});

app.get(main_page, (req, res) => {
  if (req.cookies.token !== undefined){
    if(validateJWT(req.cookies.token)){
      res.render('flag', {title: "flag", userName: jwt.decode(req.cookies.token, {complete: true}).payload.user,  flag: challenge_flag})  
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403)
  } 
});

/**
 * Server Activation
 */
app.listen(port, () => { console.log(`Listening to requests on http://localhost:${port}`); });
