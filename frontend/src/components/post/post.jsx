import "../../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/pro-light-svg-icons";
import { faHeart, faComment } from "@fortawesome/pro-light-svg-icons";
import { faHeart as faSHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { timestampParser } from "../utils";
import PostComment from "./postcomment";
import axios from "axios";

export default function Post(post) {
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.user.user);
  const [isLiked, setIsLiked] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  useEffect(() => {
    if (post.post.likers.includes(userData._id)) {
      setIsLiked(true);
    }
  }, [isLiked, post.post.likers, userData._id]);

  const handleDelete = async (e) => {
    // e.preventDefault();
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/post/${post.post._id}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async (e) => {
    // e.preventDefault();
    let data = {
      id: userData._id,
    };

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}api/post/like/${post.post._id}`,
        data
      );
    } catch (e) {
      console.log(e);
    }
  };
  const handleUnlike = async (e) => {
    e.preventDefault();
    let data = {
      id: userData._id,
    };

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}api/post/unlike/${post.post._id}`,
        data
      );
      setIsLiked(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="post shadow-1 rounded--box" key={post.post._id}>
      <div className="post--heading">
        <div className="post--profil">
          <div className="profilPic-preview">
            <img
              src={usersData
                .map((user) => {
                  if (user._id === post.post.posterId) return user.picture;
                  else return null;
                })
                .join("")}
              alt="profil"
            />
          </div>
          <div className="post--profil__textBloc">
            <div className="post--profil__name">
              <span>
                {usersData
                  .map((user) => {
                    if (user._id === post.post.posterId) return user.firstname;
                    else return null;
                  })
                  .join("")}{" "}
                {usersData
                  .map((user) => {
                    if (user._id === post.post.posterId) return user.lastname;
                    else return null;
                  })
                  .join("")}
              </span>
            </div>
            <div className="post--profil__createdStamp">
              {timestampParser(post.post.createdAt)}
            </div>
          </div>
        </div>

        {(post.post.posterId === userData._id || userData.isAdmin) && (
          <div className="post--edit">
            <FontAwesomeIcon icon={faEdit} />
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          </div>
        )}
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
            {isLiked ? (
              <FontAwesomeIcon icon={faSHeart} onClick={handleUnlike} />
            ) : (
              <FontAwesomeIcon icon={faHeart} onClick={handleLike} />
            )}
          </span>
          <span>{post.post.likers.length}</span>
        </div>
        <div className="post--reaction__bloc">
          <span className="post--reaction__icon">
            <FontAwesomeIcon
              icon={faComment}
              onClick={() => setOpenComments(!openComments)}
            />
          </span>
          <span>{post.post.comments.length}</span>
        </div>
      </div>
      {openComments && <PostComment comments={post.post.comments} />}
    </div>
  );
}
