const express = require("express");
const logger = require("morgan");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose")
const cors = require("cors");
const session = require("express-session");
const seedingUsers = require("./seeds/users");
require("dotenv").config();

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");


let app = express();

mongoose.connect('mongodb://localhost:27017/fb-api', {useNewUrlParser:true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!')
});

// seedingUsers();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));

app.use("/", indexRoutes);
app.use("/api/users", userRoutes);


app.listen(port, () => {
    console.log(`its running on ${port}`)
})

