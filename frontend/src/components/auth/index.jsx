import React, { useState } from "react";
import LoginForm from "./loginform";
import SignupForm from "./signupform";

function Log() {
  const [signUpModal, setSignUpModal] = useState(true);
  const [logInModal, setLogInModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setLogInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setLogInModal(true);
      setSignUpModal(false);
    }
  };
  return (
    <div>
      <div className="login">
        <div className="login--form shadow-1 rounded--box">
          <h2 className="login--heading colorTertiary">
            Bienvenue chez <span className="colorPrimary">Groupomania</span>
          </h2>
          <ul className="login--form__type">
            <li
              id="signup"
              onClick={handleModals}
              className={signUpModal ? "active--form" : null}
            >
              S'inscrire
            </li>
            <li
              id="login"
              onClick={handleModals}
              className={logInModal ? "active--form" : null}
            >
              Se connecter
            </li>
          </ul>
          {signUpModal && <SignupForm />}
          {logInModal && <LoginForm />}
        </div>
      </div>
    </div>
  );
}

export default Log;
