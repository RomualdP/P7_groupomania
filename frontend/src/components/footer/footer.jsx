import "../../style.css";
import { useContext } from "react";
import { UidContext } from "../../AppContext";

export default function Footer() {
  return (
    <footer>
      <div className="footer--container">
        <div>
          <ul>
            <li>Mentions légales</li>
            <li>Tous droits réservés</li>
            <li>Conception CONNECT-E</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
