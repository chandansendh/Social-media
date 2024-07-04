import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Nav = () => {
    const { isLogIn } = useAuth();
  return (
    <>
      <div className="main-nav">
        <div className="nav-container">
          <div className="nav-ops">
            <NavLink to="/post" className="nav-options">Posts</NavLink>
            <NavLink to="/yourpost" className="nav-options">Your Posts</NavLink>
          </div>
          <div className="nav-btn">
            {isLogIn ? (
              <NavLink to="/logout">
                <button className="log-btn">Log Out</button>
              </NavLink>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
