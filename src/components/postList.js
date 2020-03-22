import React, { useEffect, useCallback, useState, useRef } from "react";
import { PostItem } from "./postItem";
import { Background } from "./partilce";
import "../statics/style.css";

const PostList = React.memo(
  ({ renderList, isLastArrived, searchKeyword, Loader, hasMore }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const observer = useRef();

    const loadMore = useCallback(
      node => {
        if (observer.current) observer.current.disconnect();
        if (!hasMore || loading || searching) return;
        observer.current = new IntersectionObserver(enteries => {
          if (enteries[0].isIntersecting) {
            setTimeout(() => {
              isLastArrived(list.length);
              setLoading(false);
            }, 1000);
            setLoading(true);
          }
        });
        if (node) observer.current.observe(node);
      },
      [hasMore, isLastArrived, loading, searching, list]
    );

    useEffect(() => {
      setList(renderList);
    }, [renderList]);

    useEffect(() => {
      setSearching(true);
      setList(
        renderList.filter(post =>
          post.title.toUpperCase().includes(searchKeyword.toUpperCase())
        )
      );
      searchKeyword.length === 0 && setSearching(false);
    }, [searchKeyword, renderList]);

    const render = useCallback(() => {
      return list.map((post, i) => {
        if (list.length === i + 1) {
          return (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              key={post.id}
              ref={loadMore}
            >
              <PostItem forwardRef={loadMore} key={post.id} post={post} />
            </div>
          );
        } else {
          return <PostItem key={post.id} post={post} />;
        }
      });
    }, [list, loadMore]);

    return (
      <div className="container">
        <Background />
        <div className="postList">
          {render()}
          <section>{loading && <Loader />}</section>
        </div>
      </div>
    );
  }
);

export default PostList;
