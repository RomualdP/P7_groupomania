import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { timestampParser } from "../utils";
// import axios from "axios";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PostCommentEdit from "./postcommentedit";

export default function PostComment({ post, getAllPosts }) {
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.user.user);
  const [text, setText] = useState("");
  const formRef = useRef();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      let data = {
        commenterId: userData._id,
        text: text,
      };
      try {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}api/post/comment/${post._id}`,
          data
        );
        getAllPosts();
        formRef.current.reset();
      } catch (e) {
        console.log(e);
      }
    } else alert("Veuillez saisir votre commentaire");
  };
  return (
    <div className="post--commentSection">
      <form
        className="post--commentform"
        onSubmit={handleCommentSubmit}
        ref={formRef}
      >
        <div className="profilPic-preview">
          <img src={userData.picture} alt="your profil" />
        </div>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>

      {post.comments.length > 0 &&
        post.comments.map((comment) => {
          return (
            <div className="post--comment" key={comment._id}>
              <span className="split"> </span>
              <div className="post--profil">
                <div className="profilPic-preview">
                  <img
                    src={usersData
                      .map((user) => {
                        if (user._id === comment.commenterId)
                          return user.picture;
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
                          if (user._id === comment.commenterId)
                            return user.firstname;
                          else return null;
                        })
                        .join("")}{" "}
                      {usersData
                        .map((user) => {
                          if (user._id === comment.commenterId)
                            return user.lastname;
                          else return null;
                        })
                        .join("")}
                    </span>
                  </div>
                  <div className="post--profil__createdStamp">
                    {timestampParser(comment.timestamp)}
                  </div>
                </div>
              </div>
              <div className="post--comment__text">
                <p>{comment.text}</p>
                <PostCommentEdit
                  comment={comment}
                  post={post}
                  getAllPosts={getAllPosts}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
