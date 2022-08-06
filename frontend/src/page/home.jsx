import React from "react";
import Main from "../components/main/main";
import Log from "../components/auth";
import { UidContext } from "../AppContext";
import { useContext } from "react";

function Home() {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <Main />
      ) : (
        <div>
          <Log />
        </div>
      )}
    </div>
  );
}

export default Home;
