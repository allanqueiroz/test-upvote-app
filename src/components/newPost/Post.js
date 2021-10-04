import React from "react";
import { useToken } from "./../../contextAPI/tokenContext";
import { useData } from "../../contextAPI/dataContext";
import "./post.css";
import api from "./../../services/api";

function Post() {
  const { token } = useToken();
  const [text, setText] = React.useState("");
  const { setData } = useData();

  const handleClickAddNewPost = (e) => {
    e.preventDefault();
    if (text) {
      api
        .post(
          "/feed",
          { content: text },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          getFeeds();
          setText("");
        });
    } else {
      alert("O campo do novo post não pode ser vazio!");
    }
  };
  function getFeeds() {
    api
      .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setData(response.data))
      .catch((error) => error.response);
  }

  return (
    <div>
      <form className="form-post">
        <fieldset>
          <legend>New Post</legend>
          <textarea
            cols={60}
            rows={10}
            placeholder="utilize este campo para escrever seu post"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleClickAddNewPost}>Adicionar</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Post;
