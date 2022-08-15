import React from "react";
import Log from "../components/auth";
import { UidContext } from "../AppContext";
import { useContext } from "react";
import Profil from "../components/profil/profil";

function ProfilPage() {
  const uid = useContext(UidContext);

  return (
    <div className="profil--container">
      {uid ? (
        <Profil />
      ) : (
        <div>
          <Log />
        </div>
      )}
    </div>
  );
}

export default ProfilPage;
