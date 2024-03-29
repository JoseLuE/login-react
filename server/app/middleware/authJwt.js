const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models/user.model");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send({
          message: "User not found!"
        });
      }

      req.userId = user._id;
      req.roles = decoded.roles;
      next();
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error"
      });
    }
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Admin Role!"
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error"
    });
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Moderator Role!"
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error"
    });
  }
};

isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator" || roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error"
    });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;