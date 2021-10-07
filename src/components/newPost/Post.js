import React from "react";
import { useToken } from "./../../contextAPI/tokenContext";
import { useData } from "../../contextAPI/dataContext";
import "./post.css";
import api from "./../../services/api";

function Post() {
  const { token } = useToken();
  const { setData } = useData();
  const [text, setText] = React.useState("");

  const handleClickAddNewPost = (e) => {
    e.preventDefault();
    if (text) {
      return api
        .post(
          "/feed",
          { content: text },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => alert("Comentário adicionado"))
        .catch((err) => alert("Algo deu errado, contatar o suporte"))
        .finally(() => {
          getFeeds();
          setText("");
        });
    }
    return alert("O campo do novo post não pode ser vazio!");
  };

  const getFeeds = () => {
    return api
      .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setData(res.data))
      .catch((err) => err.response);
  };

  return (
    <div>
      <form className="form-post">
        <textarea
          cols={60}
          rows={10}
          placeholder="utilize este campo para escrever seu post"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <button onClick={handleClickAddNewPost}>Adicionar</button>
      </form>
    </div>
  );
}

export default Post;
