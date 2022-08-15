import React from "react";
import Post from "../post/post";
import "../../style.css";
import PostForm from "../post/postform";
import Profil from "../profil/profil";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../feature/post.slice";
import { useEffect } from "react";
import MostPopular from "../mostpopular/mostpopular";

export default function Main(getAllUsersData) {
  const postData = useSelector((state) => state.post.post);
  const dispatch = useDispatch();
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

  return (
    <main className="container">
      <Profil getAllUsersData={getAllUsersData} />
      <div className="feed--post rounded--box shadow-1">
        {/* <!-- postform section  --> */}
        <PostForm getAllPosts={getAllPosts} />
        {/* <!-- end of postform section  --> */}

        {/* <!-- start of post  --> */}
        <div>
          {postData.map((post) => {
            console.log(post);
            return <Post post={post} getAllPosts={getAllPosts} />;
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
    </main>
  );
}
