import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/pro-light-svg-icons";
import { useSelector } from "react-redux";
import { timestampParser } from "../utils";
// import axios from "axios";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function PostComment({ comments }) {
  const usersData = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.user.user);

  //   const handleDeleteComment = async (e) => {
  //     e.preventDefault();

  //     try {
  //       await axios.delete(
  //         `${process.env.REACT_APP_API_URL}api/post/${comment._id}`
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  return (
    <div className="post--commentSection">
      <form className="post--commentform">
        <div className="profilPic-preview">
          <img src={userData.picture} alt="your profil" />
        </div>
        <input type="text" />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>

      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <div className="post--comment" key={comment._id}>
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

                <span className="post--edit">
                  <FontAwesomeIcon icon={faEdit} />{" "}
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
