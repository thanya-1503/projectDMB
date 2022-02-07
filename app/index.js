const CONFIG = require('./config/index') // Load config (environment)
const path = require("path");
const express = require("express");
var http = require("http");
const app = express();
const { v4: uuidv4 } = require('uuid');
var auth = require('./modules/userAccount/userAccount.ctrl');
var ret = require('./utils/response/index');
var load = require("express-load");
var ret = require('../app/utils/response/index');

async function setAuth(req, res, next) {
  try {
    console.log(req.originalUrl, 'originalUrl');
    if (
      req.originalUrl !== '/api/authLogin' &&
      req.originalUrl !== '/api/whereUserforgotpass' &&
      req.originalUrl !== '/api/sentemailOtp' &&
      req.originalUrl !== '/api/forgotpassword'&&
      req.originalUrl !== '/api/createAccount'&&
      req.originalUrl !== '/api/userAccount' &&
      req.originalUrl !== '/api/createFileImg'&&
      req.originalUrl !== '/api/checkCreateUser'

      // req.originalUrl !== '/api/v1/account-management/change-password'
    ) {
      console.log('if');
      let tokenDecode = await auth.authentication(req, res); // AUTHENTICATION
      //let tokenNew = req.headers['Authorization'];
      tokenNew = await auth.extendToken(tokenDecode, CONFIG.TIMEOUT_TOKEN); // RENEWAL TOKEN
      res.setHeader('Authorization', tokenNew); // SET TOKEN TO HEADER
      req.rawToken = tokenDecode.body;
      req.accountId = tokenDecode.body.id ? tokenDecode.body.id : 'accountId';
      req.username = tokenDecode.body.username ? tokenDecode.body.username : 'username';
      req.firstname = tokenDecode.body.firstname ? tokenDecode.body.firstname : 'firstname';
      req.type = tokenDecode.body.type ? tokenDecode.body.type : 'TYPE';
      req.name = tokenDecode.body.name ? tokenDecode.body.name : 'test';
      req.session_id = uuidv4();
    }
    next()
  } catch (error) {
    ret.responseError(req, res, error, '', '');
  }
}
app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000","http://www.recruitment.com/");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.all("/api/*", setAuth, function (req, res, next) {
  next();
});

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({
  limit: "50mb",
  extended: false,
  parameterLimit: 50000
}));
app.use(express.json({ limit: '50mb' }));

load("modules", {
  cwd: "app"
}).then("modules", {
  cwd: "app"
}).into(app);

var publicDir = require('path').join(__dirname, 'uploads');
app.use(express.static(publicDir));

app.use("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "dist/index.html"));
});

module.exports = app;

const server = http.createServer(app);
server.listen(CONFIG.PORT, function () {
  console.log("Listening on port [ " + CONFIG.PORT + " ]");
});

