import "../../style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UidContext } from "../../AppContext";
import Logout from "../auth/logout";

export default function Header() {
  const uid = useContext(UidContext);

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
