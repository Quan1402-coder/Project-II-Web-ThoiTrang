const express = require('express')
const bodyParser = require('body-parser')
const initWebRoutes = require ('./WebBanHang-main/src/route/web');
var flash = require('express-flash');
var session = require('express-session')
const dotenv = require('dotenv').config()
const expressEjsExtend = require('express-ejs-extend')
  
let app = express();

//config app
app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("./WebBanHang-main/src/public"));
app.engine("ejs", expressEjsExtend);
app.set("view engine", "ejs");
app.set("views", "./WebBanHang-main/src/views")

initWebRoutes(app);

let port = process.env.PORT || 1011;


app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
  
})
