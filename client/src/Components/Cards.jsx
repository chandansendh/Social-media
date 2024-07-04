import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Card = (props) => {
  const [allPost, setAllPost] = useState([]);
  const { posts, user, getPosts } = useAuth();
  const [likeHest, setLikeHest] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      if (props.event) {
        setAllPost(posts);
      } else {
        setAllPost(posts.filter((val) => val.user_id === user._id));
      }
    }
  }, [posts, user, props.event]);

  const handleClick = async (id,u_id) => {
    if (likeHest.indexOf(id) === -1 && u_id !== user._id) {
      setLikeHest([...likeHest, id]);
      const data = allPost.find((d) => d._id === id);
      data.likes++;

      try {
        const response = await fetch(
          "http://localhost:5000/api/post/createpost",
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        const sData = await response.json();
        if (response.ok) {
          toast.success("Thank you");
          getPosts();
        } else {
          toast.error(sData.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {allPost.map((val, ind) => (
        <div className="card" key={ind}>
          <div className="container">
            <div className="right">
              <div className="text-wrap">
                <h2 className="user-name">{val.user_name}</h2>
                <p>{val.content}</p>
              </div>
              <div className="button-wrap">
                <button
                  className="primary-cta"
                  onClick={() => handleClick(val._id, val.user_id)}
                >
                  <AiOutlineLike
                    className={
                      likeHest.indexOf(val._id) >= 0
                        ? "like-btn-active"
                        : "like-btn"
                    }
                  />
                </button>
                <span>{val.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
