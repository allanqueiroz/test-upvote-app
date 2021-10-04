import "./pages.css";

import Header from "./../components/header/Header";
import Post from "./../components/newPost/Post";
import Posts from "./../components/posts/Posts";
import Toast from "./../components/toast/Toast";

function Pages() {
  return (
    <div className="container">
      <Header />
      <hr />
      <Post />
      <Posts />
    </div>
  );
}

export default Pages;
