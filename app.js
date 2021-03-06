var express        = require('express'),
    app            = express(),
    bodyparser     = require('body-parser'),
    mongoose       = require('mongoose'),
    flash          = require('connect-flash');
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override'),
    Campground     = require('./models/campground'),
    Comment        = require('./models/comment'),
    User           = require('./models/user'),
    seedDB         = require('./seeds');

//requiring routes
var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes      = require('./routes/index');
mongoose.connect("mongodb+srv://akshay:kiet1087@yelpcamp.sszyh.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});

//mongoose.connect("mongodb+srv://akshay:kiet1087@cluster0-sszyh.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seed the database
//seedDB();
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again mustang is the best car",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT, function(){
    console.log("you are connected to the node server");
});