import React from "react";
import { useToken } from "../../contextAPI/tokenContext";
import { useData } from "../../contextAPI/dataContext";
import "./posts.css";
import api from "./../../services/api";
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
      .catch((err) => err.response);
  });
  React.useEffect(() => {
    if (token) {
      api
        .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setData(res.data))
        .catch((err) => err.response);
    }
  });

  const getFeeds = () => {
    return api
      .get("/feeds", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setData(res.data))
      .catch((err) => err.response);
  };
  const handleLike = (id, liked) => {
    if (!liked) {
      postLikedLoved(id, "like", true);
    } else {
      postLikedLoved(id, "like", false);
    }
  };
  const handleLove = (id, loved) => {
    if (!loved) {
      postLikedLoved(id, "love", true);
    } else {
      postLikedLoved(id, "love", false);
    }
  };
  const postLikedLoved = (id, type, bool) => {
    return api
      .post(
        "/reaction",
        {
          feedId: id,
          [type]: bool,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => getFeeds())
      .catch((err) => err.response);
  };
  const getDate = (d) => new Date(d).toLocaleDateString("pt-br");

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
                  {username} em {getDate(createdAt)}
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={() => handleLike(id, activeUserLikedIt)}>
                    {activeUserLikedIt ? (
                      <AiFillLike size="1.2em" className="center" />
                    ) : (
                      <AiOutlineLike size="1.2em" className="center" />
                    )}
                  </button>
                  <span>({likes})</span>
                  <button onClick={() => handleLove(id, activeUserLovedIt)}>
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
