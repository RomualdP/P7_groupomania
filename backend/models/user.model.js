const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

var validateEmail = function (email) {
  var re = /^((?!\.)[a-zA-Z]+)\.((?!\.)[a-zA-Z]+)(@\groupomania)(\.fr)$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: [
        validateEmail,
        "Merci d'utiliser une adresse au format prenom.nom@groupomania.fr",
      ],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./images/default-avatar.jpeg",
    },
    position: {
      type: String,
      max: 1024,
      default: "Non renseigné",
    },
    following: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
