const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoConfig = require("./app/config/db.config");
const app = express();
const db = require("./app/models");
const { signup, signin } = require("./app/controllers/auth.controller");

const Role = db.role;
console.log("Jose: MONGODB_URI:", mongoConfig.MONGODB_URI);


// Conexión a MongoDB Compass
mongoose.connect(mongoConfig.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
    //initial(); descomentar cuando es la primera vez que se usa
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
    process.exit();
  });


  var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    name: "user"
  });

  Role.create({
    name: "moderator"
  });

  Role.create({
    name: "admin"
  });
}
