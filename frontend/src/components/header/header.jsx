import "../../style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../../AppContext";
import Logout from "../auth/logout";

export default function Header() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <header>
      <div className="header--container">
        <div className="header--logo">
          <Link to="/">
            {" "}
            <img src="../images/icon-left-font.png" alt="logo" />
          </Link>
        </div>
        {uid ? (
          <nav>
            <Logout />
          </nav>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
