var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category')
var inventoryRouter = require('./routes/inventory')
var itemRouter = require('./routes/item');
const authRouter = require('./routes/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      bcrypt.compare(password, user.password, (err, res)=>{
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
    } catch (err) {
      return done(err);
    };
  })
);
passport.serializeUser(function (user, done) {
  console.log(user)
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  };
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', authRouter)
app.use((req, res, next)=>{
  if(!req.user){
    return res.redirect('/auth/login')
  }
  next()
})
app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/inventory', inventoryRouter)
app.use('/item', itemRouter)


mongoose.set('strictQuery', false);
const connectionString = process.env.MongoDB_ur

main().catch(err => console.log(err))
async function main() {
  await mongoose.connect(connectionString)
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
