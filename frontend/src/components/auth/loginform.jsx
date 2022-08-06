import "../../style.css";
import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const errorMessage = document.querySelector(".error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        console.log(response.data.error);
        if (response.data.error) {
          errorMessage.innerHTML = response.data.error;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form action="" onSubmit={handleLogin} className="login--form__modal">
      <div className="error"></div>
      <label htmlFor="email"></label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="login--form__input"
      />
      <label htmlFor="password"></label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Mot de passe"
        className="login--form__input"
      />
      <input
        type="submit"
        className="login--form__button"
        value="Se connecter"
      />
    </form>
  );
}
