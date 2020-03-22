import React from "react";
import "../statics/style.css";

const myStyles = () => {
  return {
    padding: "10px",
    margin: "10px"
  };
};

export const PostItem = React.memo(({ post }) => {
  return (
    <div className="postItem" style={myStyles()}>
      <p id="title" style={{ fontWeight: "bolder" }}>
        {post.title}
      </p>
      <p id="body">{post.body}</p>
    </div>
  );
});
