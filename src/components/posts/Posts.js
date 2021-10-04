import React from "react";
import { useToken } from "../../contextAPI/tokenContext";
import { useData } from "../../contextAPI/dataContext";
import "./posts.css";
import api from "./../../services/api";
import moment from "moment";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

function Posts() {
  const { token, setToken } = useToken();
  const { data, setData } = useData();

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
  });

  function handleLikeLove(id, type, liked, loved) {
    if (type === "like") {
      if (!liked) {
        postLikedLoved(id, type, true);
      } else {
        postLikedLoved(id, type, false);
      }
    } else {
      if (!loved) {
        postLikedLoved(id, type, true);
      } else {
        postLikedLoved(id, type, false);
      }
    }
  }
  function getFeeds() {
    api
      .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setData(response.data))
      .catch((error) => error.response);
  }
  function postLikedLoved(id, type, bool) {
    api
      .post(
        "/reaction",
        {
          feedId: id,
          [type]: bool,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => getFeeds())
      .catch((err) => console.log(err));
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
              activeUserLikedIt,
              activeUserLovedIt,
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
                  <button
                    onClick={() =>
                      handleLikeLove(
                        id,
                        "like",
                        activeUserLikedIt,
                        activeUserLovedIt
                      )
                    }
                  >
                    {activeUserLikedIt ? (
                      <AiFillLike size="1.2em" className="center" />
                    ) : (
                      <AiOutlineLike size="1.2em" className="center" />
                    )}
                  </button>
                  <span>({likes})</span>
                  <button
                    onClick={() =>
                      handleLikeLove(
                        id,
                        "love",
                        activeUserLikedIt,
                        activeUserLovedIt
                      )
                    }
                  >
                    {activeUserLovedIt ? (
                      <FcLike size="1.2em" className="center" />
                    ) : (
                      <AiOutlineHeart size="1.2em" className="center" />
                    )}
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
