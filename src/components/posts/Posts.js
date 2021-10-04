import React from "react";
import "./posts.css";
import api from "./../../services/api";
import moment from "moment";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

function Posts() {
  const [token, setToken] = React.useState("");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    console.log("Entrou no 0000000");
    api
      .post(`/sign-in`, { username: "adfq", password: "421421" })
      .then((res) => setToken(res.data))
      .catch((error) => error.response);
  }, []);

  React.useEffect(() => {
    if (token) {
      console.log("Entrou no 123123123");
      api
        .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setData(response.data))
        .catch((error) => error.response);
    }
  }, [token]);

  function handleLike(id, type) {
    if (token) {
      if (type === "like") {
        api
          .post(
            "/reaction",
            {
              feedId: id,
              like: true,
              // love: false,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => getFeeds())
          .catch((err) => console.log(err));
      } else {
        api
          .post(
            "/reaction",
            {
              feedId: id,
              love: true,
              // like: false,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => getFeeds())
          .catch((err) => console.log(err));
      }
    }
  }

  function getFeeds() {
    api
      .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setData(response.data))
      .catch((error) => error.response);
  }

  return (
    <div className="all-posts">
      <h2>Posts</h2>
      <hr />
      {data
        ? data.map(
            ({
              id,
              content,
              likes,
              loves,
              createdAt,
              author: { username },
            }) => (
              <div className="a-post" key={id}>
                <p>{content}</p>
                <p>
                  {username} em{" "}
                  {moment(createdAt.slice(0, 10)).format("DD/MM/YYYY")}
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={() => handleLike(id, "like")}>
                    <AiOutlineLike size="1.2em" className="center" />
                  </button>
                  <span>({likes})</span>
                  <button onClick={() => handleLike(id, "love")}>
                    <AiOutlineHeart size="1.2em" className="center" />
                  </button>
                  <span>({loves})</span>
                </div>
              </div>
            )
          )
        : null}
    </div>
  );
}

export default Posts;
