import React from "react";
import "./post.css";

function Post() {
  const handleClickAddNewPost = (e) => {
    e.preventDefault();
    console.log("ADDEU");
  };
  return (
    <div>
      <form className="form-post">
        <fieldset>
          <legend>New Post</legend>
          <textarea
            cols={60}
            rows={10}
            placeholder="utilize este campo para escrever seu post"
          />
          <button onClick={handleClickAddNewPost}>Adicionar</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Post;
