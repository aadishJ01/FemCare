import React, { useEffect } from "react";
import QuestionBox from "./QuestionBox";
import "./css/Feed.css";
import axios from "axios";
import Pagination from "./Pagination";

function Feed({postsProp, setPostsProp}) {
  useEffect(() => {
    axios
      .get("/api/questions")
      .then((res) => {
        res.data.reverse();
        setPostsProp(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="feed">
      <QuestionBox />
      <Pagination postsProp={postsProp}/>
    </div>
  );
}

export default Feed;
