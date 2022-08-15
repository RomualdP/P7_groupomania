import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UidContext } from "./AppContext";
import Home from "./page/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./feature/user.slice";
import { setAllUsersData } from "./feature/users.slice";
import ProfilPage from "./page/ProfilPage";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      axios({
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

  const getUserData = (uid) => {
    axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`).then((res) => {
      dispatch(setUserData(res.data));
    });
  };

  const getAllUsersData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}api/user/`).then((res) => {
      dispatch(setAllUsersData(res.data));
    });
  };

  useEffect(() => {
    getAllUsersData();
  });

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profil" element={<ProfilPage />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </UidContext.Provider>
  );
}

export default App;
