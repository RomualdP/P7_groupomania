import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, updateUserData } from "../../feature/user.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/pro-light-svg-icons";
import { dateParser } from "../utils";
import axios from "axios";

export default function Profil() {
  const userData = useSelector((state) => state.user.user);
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState();
  const formRef = useRef();
  const inputPosition = useRef();
  const dispatch = useDispatch();

  const editProfil = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("picture", file);
    data.append("position", inputPosition.current.value);

    console.log(inputPosition.current.value);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/${userData._id}`,
        data
      );
      console.log(res);
      dispatch(updateUserData(res.data));
      formRef.current.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
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
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={(e) => setEdit(!edit)}
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
