import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/posts",
});

function AppFC() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    api
      .get("/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []); // Empty dependency array ensures useEffect runs only once, equivalent to componentDidMount

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <h2
                style={{
                  backgroundColor: "#21f321",
                }}
              >
                {post.title}
              </h2>
              <p>{post.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppFC;
