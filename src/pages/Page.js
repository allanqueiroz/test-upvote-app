import "./pages.css";

import Header from "./../components/header/Header";
import Post from "./../components/newPost/Post";
import Posts from "./../components/posts/Posts";

function Pages() {
  return (
    <div className="container">
      <Header />
      <Post />
      <Posts />
    </div>
  );
}

export default Pages;
