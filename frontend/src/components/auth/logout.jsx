import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/pro-light-svg-icons";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie(`jwt`))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <li onClick={logout}>
      <p>Se déconnecter</p>{" "}
      <span>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </span>
    </li>
  );
};

export default Logout;
