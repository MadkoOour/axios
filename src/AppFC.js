import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/posts/",
});

function AppFC() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    api
      .get("/")
      .then(res => {
        setPosts(res.data);
        //console.log("Data fitched!");
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const createPost = async () => {
    let res =await api.post("/", { id: "5", title: "Post 5", content: "Content of post 5" });
    setPosts([...posts,res.data]);
    //getPosts();
  };
  
  const deletePost = async (id) => {
    try {
      await api.delete(`/${id}`);
      // Filter out the deleted post from the posts state
      setPosts(posts.filter(post => post.id !== id));
      console.log("Post deleted:", id);
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // Empty dependency array ensures useEffect runs only once, equivalent to componentDidMount

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={createPost}>Add new one</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <button
              onClick={()=>{deletePost(post.id)}}
              >
                Delete
              </button>
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
