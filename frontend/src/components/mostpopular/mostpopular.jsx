import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import "../../style.css";

export default function MostPopular({ post }) {
  const usersData = useSelector((state) => state.users.users);

  return (
    <a href={"#" + post._id} key={post._id}>
      <div className="mostpopular--card shadow-1">
        <div className="profilPic-preview corned">
          <img
            src={usersData
              .map((user) => {
                if (user._id === post.posterId) return user.picture;
                else return null;
              })
              .join("")}
            alt="profil"
          />
        </div>
        {post.picture ? (
          <img src={post.picture} alt="illustration du post" />
        ) : (
          <img src="./images/icon.png" alt="illustration du post" />
        )}

        <div className="mostpopular--card__description">
          <span>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{post.likers.length}</span>
          <p>{post.message}</p>
        </div>
      </div>
    </a>
  );
}
