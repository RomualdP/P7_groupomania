import "../../style.css";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { timestampParser } from "../utils";
import PostComment from "./postcomment";
import axios from "axios";

export default function Post({ post, getAllPosts }) {
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.user.user);
  const [isLiked, setIsLiked] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const inputMessage = useRef();
  const [picture, setPicture] = useState();

  useEffect(() => {
    if (post.likers.includes(userData._id)) {
      setIsLiked(true);
    }
  }, [post.likers, userData._id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("picture", picture);
    data.append("message", inputMessage.current.value);

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
        data
      );
      getAllPosts();
      setEditPost(!editPost);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/post/${post._id}`
      );
      getAllPosts();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    let data = {
      id: userData._id,
    };

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}api/post/like/${post._id}`,
        data
      );
      getAllPosts();
      setIsLiked(true);
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
        `${process.env.REACT_APP_API_URL}api/post/unlike/${post._id}`,
        data
      );
      setIsLiked(false);
      getAllPosts();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className="post shadow-1 anchor rounded--box"
      key={post._id}
      id={post._id}
    >
      <div className="post--heading">
        <div className="post--profil">
          <div className="profilPic-preview">
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
          <div className="post--profil__textBloc">
            <div className="post--profil__name">
              <span>
                {usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.firstname;
                    else return null;
                  })
                  .join("")}{" "}
                {usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.lastname;
                    else return null;
                  })
                  .join("")}
              </span>
            </div>
            <div className="post--profil__createdStamp">
              {timestampParser(post.createdAt)}
            </div>
          </div>
        </div>

        {(post.posterId === userData._id || userData.isAdmin) && (
          <div className="post--edit">
            <img
              src="./images/icons/pen-to-square-light.svg"
              alt="edit"
              onClick={(e) => setEditPost(!editPost)}
            />
            <img
              src="./images/icons/trash-light.svg"
              alt="edit"
              onClick={handleDelete}
            />
          </div>
        )}
      </div>
      {editPost ? (
        <>
          <br />
          <form action="" onSubmit={handleEdit}>
            <textarea
              type="text"
              name="editMessage"
              id="editMessage"
              defaultValue={post.message}
              ref={inputMessage}
            />
            <div className="postform--options">
              <label htmlFor="editPicture" className="postform--addpicture">
                <img src="./images/icons/image-light.svg" alt="envoyer" />
                <p>Modifier l'image</p>
                <input
                  type="file"
                  name="file"
                  id="editPicture"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </label>
              <button type="submit" className="postform--submit">
                <img src="./images/icons/paper-plane-light.svg" alt="envoyer" />
                <p>Envoyer</p>
              </button>
            </div>
          </form>
          {post.picture && (
            <div className="post--img">
              <img src={post.picture} alt="illustration du post" />
            </div>
          )}
        </>
      ) : (
        <>
          {post.message && (
            <div className="post--description">
              <p>{post.message}</p>
            </div>
          )}

          {post.picture && (
            <div className="post--img">
              <img src={post.picture} alt="illustration du post" />
            </div>
          )}
          <div className="post--reaction">
            <div className="post--reaction__bloc">
              <span className="post--reaction__icon">
                {isLiked ? (
                  <img
                    src="./images/icons/heart-solid.svg"
                    alt="coeur plein"
                    onClick={handleUnlike}
                  />
                ) : (
                  <img
                    src="./images/icons/heart-light.svg"
                    alt="coeur vide"
                    onClick={handleLike}
                  />
                )}
              </span>
              <span>{post.likers.length}</span>
            </div>
            <div className="post--reaction__bloc">
              <span className="post--reaction__icon">
                <img
                  src="./images/icons/comment-light.svg"
                  alt="coeur vide"
                  onClick={() => setOpenComments(!openComments)}
                />
              </span>
              <span>{post.comments.length}</span>
            </div>
          </div>
          {openComments && (
            <PostComment post={post} getAllPosts={getAllPosts} />
          )}
        </>
      )}
    </div>
  );
}
