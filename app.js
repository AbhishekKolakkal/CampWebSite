var express = require("express");
var app = express();
var seedDB = require("./seeds");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

var flash = require("connect-flash");
app.use(flash());

var commentRoutes = require("./routes/comments"),
  methodOverride = require("method-override"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/camp_site", {
  useNewUrlParser: true,
});
// mongoose.connect(
//   "mongodb://abhishek:pass123@ds133262.mlab.com:33262/go_camping",
//   { useNewUrlParser: true }
// );

var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

var Campground = require("./models/campground");

var Comment = require("./models/comments");

// seedDB();
app.use(methodOverride("_method"));

app.use(
  require("express-session")({
    secret: "Once again Rusty",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(commentRoutes);
app.use(indexRoutes);
app.use(campgroundRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("The Server Has Started at ", process.env.MONGO_URL);
});
