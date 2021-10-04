import React from "react";
import "./posts.css";
import api from "./../../services/api";
import moment from "moment";
import { BiLike } from "react-icons/bi";

function Posts() {
  const [token, setToken] = React.useState("");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    api
      .post(`/sign-in`, { username: "adfq", password: "421421" })
      .then((res) => setToken(res.data))
      .catch((error) => error.response);
  });

  React.useEffect(() => {
    if (token) {
      api
        .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setData(response.data))
        .catch((error) => error.response);
    }
  }, [token]);

  function handleLike() {
    alert("liked");
  }
  return (
    <div className="all-posts">
      <h2>Posts</h2>
      <hr />
      {data
        ? data.map(
            ({ content, likes, id, createdAt, author: { username } }) => (
              <div className="a-post" key={id}>
                <p>{content}</p>

                <p>
                  {username} em{" "}
                  {moment(createdAt.slice(0, 10)).format("DD/MM/YYYY")}
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={handleLike}>
                    <BiLike size="1.2em" className="center" />
                  </button>
                  <span>({likes})</span>
                </div>
              </div>
            )
          )
        : null}
    </div>
  );
}

export default Posts;
