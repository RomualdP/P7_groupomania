import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, } from "@fortawesome/free-solid-svg-icons"
import { faHeart, faComment} from "@fortawesome/free-regular-svg-icons"
import '../../style.css';

export default function Post(props) {
  return (
    <div className="post shadow-1 rounded--box">
            <div className="post--heading">
                <div className="post--profil">
                    <div className="profilPic-preview">
                        <img src={`../images/${props.info.userpicture}`} alt="profil" />
                    </div>
                    <div className="post--profil__textBloc">
                        <div className="post--profil__name">{props.info.fristname}<span> </span>{props.info.lastname}</div>
                        <div className="post--profil__createdStamp">{props.info.createdstamp}</div>
                    </div> 
                </div>
                <div className="post--tag">
                    <span>{props.info.type}</span>    
                </div>
            </div>
            <div className="post--description">
                <p>{props.info.text}</p>
            </div>
            <div className="post--img">
                <img src={`../images/${props.info.picture}`} alt="illustration du post" />
            </div>
            <div className="post--reaction">
                <div className="post--reaction__bloc">
                    <span className="post--reaction__icon"><FontAwesomeIcon icon={faHeart} /></span>
                    <span>{props.info.numberoflikes} J'aime</span>
                </div>
                <div className="post--reaction__bloc">
                    <span className="post--reaction__icon"><FontAwesomeIcon icon={faComment} /></span>
                    <span>{props.info.numberofcomments} commentaires</span>
                </div>
            </div>
            <div className="post--commentSection">
                {/* <!-- start of uniq comment  --> */}
                <div className="post--comment">
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
                        <span className="colorPrimary"><FontAwesomeIcon icon={faEdit} /> <FontAwesomeIcon icon={faTrash} /></span>
                    </div>
                </div>
                {/* <!-- end of uniq comment --> */}
            </div>
    </div>
  );
}

