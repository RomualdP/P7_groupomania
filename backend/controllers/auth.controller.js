const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signUpErrors } = require("../utils/errors.utils");

const maxAge = 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const getFirstname = email.split(".")[0];
  const getLastname = email.split(".")[1].split("@")[0];

  const firstname =
    getFirstname.charAt(0).toUpperCase() + getFirstname.slice(1);
  const lastname = getLastname.charAt(0).toUpperCase() + getLastname.slice(1);

  try {
    const user = await UserModel.create({
      email,
      password,
      firstname,
      lastname,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(200)
          .send({ error: "Utilisateur inconnu ou mot de passe incorrect" });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(200)
              .send({ error: "Utilisateur inconnu ou mot de passe incorrect" });
          }
          const token = createToken(user._id);
          res.cookie("jwt", token, { httpOnly: true, maxAge });
          res.status(200).json({ user: user._id });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((err) => {
      res.status(401).send({ err });
    });
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
