import "../../style.css";
import { useState } from "react";
import axios from "axios";
import LoginForm from "./loginform";

export default function SignupForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");
    const passwordCheckError = document.querySelector(".passwordCkeckError");

    passwordCheckError.innerHTML = "";

    if (password !== passwordCheck) {
      passwordCheckError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          email: email,
          password: password,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <LoginForm />
          <span> Enregistrement réussi, veuillez vous conntecter</span>
        </>
      ) : (
        <form action="" onSubmit={handleSignUp} className="login--form__modal">
          <label htmlFor="email"></label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="prenom.nom@groupomania.fr"
            className="login--form__input"
          />
          <div className="emailError"></div>
          <br />

          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="login--form__input"
          />
          <div className="passwordError"></div>
          <br />

          <input
            type="password"
            name="passwordCheck"
            id="passwordCheck"
            onChange={(e) => setPasswordCheck(e.target.value)}
            placeholder="Confirmation mot de passe"
            className="login--form__input"
          />
          <div className="passwordCkeckError"></div>
          <br />
          <input
            type="submit"
            className="login--form__button"
            value="Créer mon compte"
          />
        </form>
      )}
    </>
  );
}
