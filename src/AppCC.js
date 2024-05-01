import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:4000/posts"
});

class AppCC extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  getPosts = () => {
    api
      .get("/")
      .then((res) => {
        this.setState({posts:res.data});
        console.log("Data fitched!")
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  deletePost = async(id)=>{
    let data =await api.delete(`/${id}`)
    this.getPosts();
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              <div>
                <button onClick={()=>{this.deletePost(post.id)}}>Delete</button>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AppCC;
