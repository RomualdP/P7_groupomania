import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
// import Actionbar from "../actionbar/actionbar";
// import MostPopular from '../mostpopular/mostpopular';
import Post from "../post/post";
import Info from "../info/info";
import "../../style.css";
import PostForm from "../post/postform";
import Profil from "../profil/profil";

import { useSelector } from "react-redux";

export default function Main() {
  const postData = useSelector((state) => state.post.post);

  return (
    <main className="container">
      <Profil />
      <div className="feed--post rounded--box shadow-1">
        {/* <!-- most popular section  --> */}
        <PostForm />
        {/* <!-- end of most popular section  --> */}

        {/* <!-- start of post  --> */}
        <div>
          {postData.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>

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
