import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PostCommentEdit({ comment, post, getAllPosts }) {
  const userData = useSelector((state) => state.user.user);
  const handleDeleteComment = async (e) => {
    e.preventDefault();
    const data = {
      commentId: comment._id,
    };
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}api/post/delete-comment/${post._id}`,
        data
      );
      getAllPosts();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {(comment.commenterId === userData._id || userData.isAdmin) && (
        <span className="post--edit">
          <img
            src="./images/icons/trash-light.svg"
            alt="supprimer commentaire"
            onClick={handleDeleteComment}
          />
        </span>
      )}
    </>
  );
}
