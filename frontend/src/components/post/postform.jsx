import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperPlane } from "@fortawesome/pro-light-svg-icons";
import { useState, useRef } from "react";
import axios from "axios";
import { addPost } from "../../feature/post.slice";

export default function PostForm({ getAllPosts }) {
  const userData = useSelector((state) => state.user.user);
  const [message, setMessage] = useState();
  const [picture, setPicture] = useState();
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message || picture) {
      const postData = new FormData();
      postData.append("message", message);
      postData.append("picture", picture);
      postData.append("posterId", userData._id);

      axios
        .post(`${process.env.REACT_APP_API_URL}api/post`, postData)
        .then((res) => {
          console.log(res.data);
          dispatch(addPost(res.data));
          getAllPosts();
          formRef.current.reset();
          alert();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Veuillez saisir votre message");
    }
  };

  return (
    <div className="postform shadow-1 rounded--box">
      <div className="postform--heading">
        <div className="profilPic-preview">
          <img src={userData.picture} alt="" />
        </div>
        <p className="postform--grettings">
          Bonjour {userData.firstname}, quoi de neuf aujourd'hui ?
        </p>
      </div>
      <form action="post" onSubmit={handleSubmit} ref={formRef}>
        <textarea
          type="text"
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="postform--options">
          <label htmlFor="picture" className="postform--addpicture">
            <FontAwesomeIcon icon={faImage} size="xl" />
            <p>Ajouter une image</p>
            <input
              type="file"
              name="file"
              id="picture"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={(e) => setPicture(e.target.files[0])}
            />
          </label>
          <button type="submit" className="postform--submit">
            <FontAwesomeIcon icon={faPaperPlane} size="xl" />
            <p>Envoyer</p>
          </button>
        </div>
      </form>
    </div>
  );
}
