import React from "react";
import Post from "../post/post";
import "../../style.css";
import PostForm from "../post/postform";
import Profil from "../profil/profil";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../feature/post.slice";
import { useEffect, useState } from "react";
import MostPopular from "../mostpopular/mostpopular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  const postData = useSelector((state) => state.post.post);
  const dispatch = useDispatch();
  const [openProfil, setOpenProfil] = useState(true);
  const postDataToSort = [...postData];
  const mostLikedPosts = postDataToSort
    .sort((a, b) => {
      return b.likers.length - a.likers.length;
    })
    .slice(0, 2);

  const getAllPosts = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
          dispatch(setAllPosts(res.data));
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 400) {
      setOpenProfil(false);
    }
  }, []);

  return (
    <main className="container">
      {openProfil ? <Profil /> : <div></div>}
      <div className="feed--post rounded--box shadow-1">
        {/* <!-- postform section  --> */}
        <PostForm getAllPosts={getAllPosts} />
        {/* <!-- end of postform section  --> */}

        {/* <!-- start of post  --> */}
        <div>
          {postData.map((post) => {
            return (
              <Post post={post} getAllPosts={getAllPosts} key={post._id} />
            );
          })}
        </div>

        {/* <!-- end of post  --> */}
      </div>
      <div>
        {/* <!-- start of MostPopularPosts --> */}

        <div className="mostpopular">
          {mostLikedPosts.map((post) => {
            return <MostPopular post={post} key={post._id} />;
          })}
        </div>

        {/* <!-- end of MostPopularPosts --> */}
      </div>
      <div>
        <div className="mobileNav--container">
          <span></span>
          <span className="postIcon">
            <a href="#postform">
              <FontAwesomeIcon icon={faCirclePlus} />
            </a>
          </span>
          <span>
            <FontAwesomeIcon
              icon={faUser}
              onClick={() => setOpenProfil(!openProfil)}
            />
          </span>
        </div>
      </div>
    </main>
  );
}
