import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faUserGroup,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import "../../style.css";

export default function Actionbar() {
  return (
    <div>
      <div className="actionbar rounded--box shadow-1">
        <div className="actionbar--bloc shadow-1 ">
          <span>
            <FontAwesomeIcon icon={faCirclePlus} />
          </span>
          <p>Nouveau post</p>
        </div>
        <div className="actionbar--bloc shadow-1 ">
          <span>
            <FontAwesomeIcon icon={faUserGroup} />
          </span>
          <p>Mes groupes</p>
        </div>
        <div className="actionbar--bloc shadow-1 ">
          <span>
            <FontAwesomeIcon icon={faBookOpen} />
          </span>
          <p>Infos utiles</p>
        </div>
      </div>
    </div>
  );
}
