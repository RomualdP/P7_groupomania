import "../../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
// import { useSelector } from "react-redux";

export default function Post(post) {
  // const usersData = useSelector((state) => state.users.users);

  return (
    <div className="post shadow-1 rounded--box">
      <div className="post--heading">
        <div className="post--profil">
          <div className="profilPic-preview">
            <img
              src={`../images/16497682161691659369771131.jpg`}
              alt="profil"
            />
          </div>
          <div className="post--profil__textBloc">
            <div className="post--profil__name">
              Prénom
              <span> </span>
              Nom
            </div>
            <div className="post--profil__createdStamp">{post.createdAt}</div>
          </div>
        </div>
        <div className="post--tag">
          <span>Marketing</span>
        </div>
      </div>
      <div className="post--description">
        <p>{post.post.message}</p>
      </div>
      <div className="post--img">
        <img src={post.post.picture} alt="illustration du post" />
      </div>
      <div className="post--reaction">
        <div className="post--reaction__bloc">
          <span className="post--reaction__icon">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>0 J'aime</span>
        </div>
        <div className="post--reaction__bloc">
          <span className="post--reaction__icon">
            <FontAwesomeIcon icon={faComment} />
          </span>
          <span>0 commentaires</span>
        </div>
      </div>
      <div className="post--commentSection">
        {/* <!-- start of uniq comment  --> */}
        {/* <div className="post--comment">
            <div className="post--profil">
              <div className="profilPic-preview">
                <img src="../images/IMG_8517.jpg" alt="profil" />
              </div>
              <div className="post--profil__textBloc">
                <div className="post--profil__name">Romuald Piquet</div>
                <div className="post--profil__createdStamp">20h</div>
              </div>
            </div>
            <div className="post--comment__text">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              <span className="colorPrimary">
                <FontAwesomeIcon icon={faEdit} />{" "}
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          </div> */}
        {/* <!-- end of uniq comment --> */}
      </div>
    </div>
  );
}
