import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
// import Actionbar from "../actionbar/actionbar";
// import MostPopular from '../mostpopular/mostpopular';
import Post from "../post/post";
import Info from "../info/info";
import postDB from "../../models/postDB";
import "../../style.css";
import PostForm from "../post/postform";
import Profil from "../profil/profil";

export default function Main() {
  const postInfos = postDB.map((info) => {
    return <Post key={info.id} info={info} />;
  });
  return (
    <main className="container">
      <Profil />
      <div className="feed--post rounded--box shadow-1">
        {/* <!-- most popular section  --> */}
        <PostForm />
        {/* <!-- end of most popular section  --> */}

        {/* <!-- start of post  --> */}
        {postInfos}
        {/* <!-- end of post  --> */}

        <div className="navArrow">
          <span>
            <FontAwesomeIcon icon={faCircleLeft} />
          </span>
          <span>
            <FontAwesomeIcon icon={faCircleRight} />
          </span>
        </div>
      </div>
      <div>
        <div className="info">
          {/* <!-- start of info card  --> */}
          <Info />
          <Info />
          {/* <!-- end of info card  --> */}
        </div>
      </div>
    </main>
  );
}
