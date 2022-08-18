import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../feature/post.slice";
import { useEffect, useState } from "react";
import "../../style.css";

// Fetching module
import axios from "axios";

// Components

import Post from "../post/post";
import PostForm from "../post/postform";
import Profil from "../profil/profil";
import MostPopular from "../mostpopular/mostpopular";

export default function Main() {
  const postData = useSelector((state) => state.post.post);
  const dispatch = useDispatch();

  // States to manage infinite scroll
  const [count, setCount] = useState(5);
  const [loadPost, setloadPost] = useState(true);

  // Toggle on mobile version
  const [openProfil, setOpenProfil] = useState(true);

  // Copy and sort of the post array to display mostpopular post
  const postDataToSort = [...postData];
  const mostLikedPosts = postDataToSort
    .sort((a, b) => {
      return b.likers.length - a.likers.length;
    })
    .slice(0, 2);

  const getAllPosts = async (num) => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
          const array = res.data.slice(0, num);
          dispatch(setAllPosts(array));
        });
    } catch (e) {
      console.log(e);
    }
  };
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setloadPost(true);
    }
  };
  useEffect(() => {
    if (loadPost) {
      getAllPosts(count);
      setloadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPost]);

  useEffect(() => {
    if (window.innerWidth < 820) {
      setOpenProfil(false);
    }
  }, []);

  return (
    <main className="container">
      {/* A state has been added to the Profil component to manage toggle on mobile & tablet */}
      {openProfil ? <Profil /> : <div></div>}

      <div className="feed--post rounded--box shadow-1">
        {/* <!-- postform section  --> */}
        <PostForm getAllPosts={getAllPosts} />
        {/* <!-- end of postform section  --> */}

        {/* <!-- start of post  --> */}
        <div>
          {/* We are mapping on each post */}
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
        {/* Mobile action icons */}
        <div className="mobileNav--container">
          <span></span>
          <span className="postIcon">
            <a href="#postform">
              <img
                src="./images/icons/circle-plus-solid.svg"
                alt="ajouter un nouveau post"
              />
            </a>
          </span>
          <span className="profilIcon">
            <img
              src="./images/icons/user-light.svg"
              alt="profil utilisateur"
              onClick={() => setOpenProfil(!openProfil)}
            />
          </span>
        </div>
      </div>
    </main>
  );
}
