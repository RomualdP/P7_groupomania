module.exports.signUpErrors = (err) => {
  console.log(err.message);
  let errors = { email: "", password: "" };

  if (err.message.includes("email"))
    errors.email = "Format incorrect, d'utiliser votre adresse groupomania";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minium";

  return errors;
};
