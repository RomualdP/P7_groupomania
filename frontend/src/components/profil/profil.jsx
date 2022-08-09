import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../feature/user.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/pro-light-svg-icons";
import { dateParser } from "../utils";
import axios from "axios";

export default function Profil() {
  const userData = useSelector((state) => state.user.user);
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState();
  const inputPosition = useRef();
  const dispatch = useDispatch();

  const editProfil = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("picture", file);
    data.append("position", inputPosition.current.value);

    await axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${userData._id}`, data)
      .then((res) => {
        console.log(res.data);
        dispatch(updateUserData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
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
          <span>{userData.position}</span>
          <br />
          <span>Membre du réseau depuis le :</span>
          <span>{dateParser(userData.createdAt)}</span>
          <span className="profil--editbutton">
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={(e) => setEdit(!edit)}
            />
          </span>

          {edit && (
            <form action="" onSubmit={editProfil}>
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
