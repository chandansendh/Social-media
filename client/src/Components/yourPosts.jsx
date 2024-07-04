import { useNavigate } from "react-router-dom";
import Card from "./Cards";
const YourPost = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="create-btn">
        <button className="Btn" onClick={() => navigate("/create")}>
          <div className="sign">+</div>

          <div className="text">Create</div>
        </button>
      </div>
      <div className="content-div">
        <Card event={false} />
      </div>
    </>
  );
};

export default YourPost;