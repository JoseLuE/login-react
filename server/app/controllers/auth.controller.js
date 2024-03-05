const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    //const savedUser = await user.save();

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      user.roles = [defaultRole._id];
    }

    await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).populate( "roles");
    console.log(`niciando sesion`)

    if (!user) {
      console.log("Usuario no valido")
      return res.status(404).send({ message: "User Not found." });
    }

    console.log("Usuario  valido")

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      console.log("Contraseña no valido")

      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    console.log("Contraseña  valido")
    const roles = user.roles.map(role => role.name) ;
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      expiresIn: 86400, // 24 hours
    });
    console.log(user.roles)
    //const authorities =
    //const authorities = user.roles.map((role) => "ROLE_" + role.toUpperCase());
    //const authorities = "ROLE_USER"
    const authorities = roles.map(role => "ROLE_" + role.toUpperCase());

    console.log(authorities)
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
