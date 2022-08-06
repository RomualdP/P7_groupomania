import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UidContext } from "./AppContext";
import Home from "./page/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "./actions/user.actions";
import { setUserData } from "./feature/user.slice";
// import NewPost from "./components/newpost";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  const getUserData = (uid) => {
    axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`).then((res) => {
      console.log(res);
      dispatch(setUserData(res.data));
    });
  };

  useEffect(() => {
    const getToken = async () => {
      await axios({
        methode: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("No Token"));
    };
    getToken();
    if (uid) getUserData(uid);
  });
  return (
    <UidContext.Provider value={uid}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </UidContext.Provider>
  );
}

export default App;
