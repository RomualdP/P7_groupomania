import React from "react";
import Main from "../components/main/main";
import Log from "../components/auth";
import { UidContext } from "../AppContext";
import { useContext } from "react";

function Home() {
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <Main />
      ) : (
        <div className="log--container">
          <Log />
        </div>
      )}
    </>
  );
}

export default Home;
