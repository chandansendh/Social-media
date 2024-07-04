import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost= () =>{
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    user_id:user._id,
    user_name:user.username,
    content: "",
    likes: 0,
  });
  const handelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPost({ ...post, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(
        "http://localhost:5000/api/post/createpost",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        }
      );
      const eCreate = await responce.json();
      console.log(eCreate);
      if (responce.ok) {
        setPost({
          user_id: user._id,
          user_name:user.username,
          content: "",
          likes: 0,
        });
        toast.success(eCreate.message);
        navigate("/yourpost");
      } else toast.error(eCreate.message);
    } catch (error) {
      console.log(error);
    }
  };
    return (
      <>
        <div className="form-main">
          <div className="form-container">
            <form className="form-create" onSubmit={handelSubmit}>
              <div className="form-group">
                <h1 for="textarea">Create Post</h1>
                <textarea
                  required=""
                  cols="50"
                  rows="10"
                  id="textarea"
                  name="content"
                  placeholder="Write your content"
                  onChange={handelInput}
                  value={post.content}
                ></textarea>
              </div>
              <button type="submit" className="form-submit-btn">
                Post
              </button>
            </form>
          </div>
        </div>
      </>
    );
}

export default CreatePost;