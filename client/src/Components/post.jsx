import { useNavigate } from "react-router-dom";
import Card from "./Cards";

const Post = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="create-btn">
        <button className="Btn" onClick={()=>navigate("/create")}>
          <div className="sign">+</div>

          <div className="text">Create</div>
        </button>
      </div>
      <div className="content-div">
      <Card event={true}/>
      </div>
    </>
  );
};

export default Post;
