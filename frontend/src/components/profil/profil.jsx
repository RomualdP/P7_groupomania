import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../feature/user.slice";
import { setAllUsersData } from "../../feature/users.slice";
import { dateParser } from "../utils";
import axios from "axios";
import cookie from "js-cookie";

export default function Profil() {
  // Redux hooks
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // form States
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState();

  const formRef = useRef();
  const inputPosition = useRef();

  const getAllUsersData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}api/user/`).then((res) => {
      dispatch(setAllUsersData(res.data));
    });
  };

  const editProfil = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("picture", file);
    data.append("position", inputPosition.current.value);

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/${userData._id}`,
        data
      );
      console.log(res);
      dispatch(updateUserData(res.data));
      getAllUsersData();
      formRef.current.reset();
      setEdit(!edit);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };
    if (window.confirm("Êtes-vous sûre de vouloir supprimer votre compte ?")) {
      try {
        await axios
          .delete(`${process.env.REACT_APP_API_URL}api/user/${userData._id}`)
          .then(() => removeCookie(`jwt`));
        window.location = "/";
      } catch (e) {
        console.log(e);
      }
    } else return;
  };

  return (
    <div className="profil--container">
      <div className="profil">
        <div className="profil--bloc shadow-1 rounded--box">
          <h3>
            {userData.firstname} {userData.lastname}
          </h3>
          <img src={userData.picture} alt="profil" />
          <h4>Poste :</h4>
          <span className="profil--bloc__info">{userData.position}</span>
          <br />
          <h4>Membre du réseau depuis le :</h4>
          <span className="profil--bloc__info">
            {dateParser(userData.createdAt)}
          </span>
          <span className="profil--editbutton">
            <img
              src="./images/icons/pen-to-square-light.svg"
              alt="ouvrir editer"
              onClick={(e) => setEdit(!edit)}
            />
            <img
              src="./images/icons/trash-light.svg"
              alt="supprimer compte"
              onClick={handleDelete}
            />
          </span>

          {edit && (
            <form action="" onSubmit={editProfil} ref={formRef}>
              <label htmlFor="inputPicture" className="inputPicture">
                <span>Changer la photo</span>
                <input
                  type="file"
                  id="inputPicture"
                  name="picture"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <input
                type="text"
                id="position"
                name="position"
                defaultValue={userData.position}
                ref={inputPosition}
              />
              <button type="submit">Envoyer</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
