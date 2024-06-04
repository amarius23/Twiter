const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const db = require("./db/db-conection");
db.connectDb();

const corsOptions = {
  origin: 'http://localhost:8085',
  optionsSuccessStatus:200,
}

const passport = require("passport")
const session = require("express-session")
const UserRouter = require("./routes/user")
const PostRouter = require("./routes/post");
const User = require("./models/user")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(session({secret:"my_secret_key",resave:false,saveUninitialized:false}))
app.use(passport.initialize());
app.use(passport.session());
app.use("/", UserRouter);
app.use("/api/posts", PostRouter);
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'my_secret_key_123',
};
 
passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, done) {
  console.log(jwtPayload)
  User.findById(jwtPayload.id).then(user => { 
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }).catch(err => { 
    return done(err, false);
  })
  
}));

app.use("/protected", passport.authenticate("jwt", { session: false }), (req,res) => {
  res.json({
    success: true,
    message:"this is the the jwt middleware"
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Catch-all middleware for unmatched routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
