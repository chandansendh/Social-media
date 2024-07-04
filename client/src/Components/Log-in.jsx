import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogInData({
      ...logInData,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logInData),
      });
      const sData = await responce.json();
      if (responce.ok) {
        toast.success("Login Successful");
        setLogInData({
          email: "",
          password: "",
        });
        navigate("/post");
        storeTokenInLS(sData.token);
      } else {
        toast.error(sData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handelSubmit}>
          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Email"
              className="input"
              type="text"
              name="email"
              value={logInData.email}
              onChange={handelInput}
            />
          </div>

          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Password"
              className="input"
              type="password"
              name="password"
              value={logInData.password}
              onChange={handelInput}
            />
          </div>
          <button className="button-submit" type="submit">Sign In</button>
          <p className="p">
            Don't have an account?{" "}
            <span className="span">
              <NavLink to="/signup">Sign Up</NavLink>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default LogIn;
