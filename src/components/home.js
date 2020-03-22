import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import Search from "./search";
import PostList from "./postList";
import Loader from "./loader";

const Home = React.memo(() => {
  const [postList, setPostList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [renderList, setrenderList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    (async function fetchPost() {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPostList(response.data);
      const arr = response.data.slice(0, 5);
      response.data.length > arr.length && setHasMore(true);
      setrenderList(arr);
    })();
  }, []);

  const isLastArrived = useCallback(
    length => {
      const arr = [...postList].slice(0, length + 5);
      postList <= arr && setHasMore(false);
      setrenderList(arr);
    },
    [postList]
  );

  const getSearchKeyword = useCallback(value => {
    setSearchKeyword(value);
  }, []);

  return (
    <>
      <div
        id="home"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Search getSearchKeyword={getSearchKeyword} />
        <PostList
          renderList={renderList}
          searchKeyword={searchKeyword}
          Loader={Loader}
          hasMore={hasMore}
          isLastArrived={isLastArrived}
        />
      </div>
    </>
  );
});

export default Home;
