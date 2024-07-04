import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const naviget = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignUpData({ ...signUpData, [name]: value });
    // console.log(name)
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(signUpData);
    try {
      const responce = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
      const r_msg = await responce.json();
      console.log(r_msg);
      if (responce.ok) {
        setSignUpData({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success(r_msg.message);
        storeTokenInLS(r_msg.token);
        naviget("/post");
      } else {
        toast.error(r_msg.message);
      }
    } catch (error) {
      console.log("register", error);
    }
  };
  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handleSignUp}>
          <div className="flex-column">
            <label>Name</label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your full name"
              className="input"
              type="text"
              name="username"
              onChange={handleInput}
              value={signUpData.username}
            />
          </div>
          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Email"
              className="input"
              type="text"
              name="email"
              onChange={handleInput}
              value={signUpData.email}
            />
          </div>
          <div className="flex-column">
            <label>Phone No.</label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your phone no."
              className="input"
              type="text"
              name="phone"
              onChange={handleInput}
              value={signUpData.phone}
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
              onChange={handleInput}
              value={signUpData.password}
            />
          </div>
          <button className="button-submit" type="submit">
            Sign Up
          </button>
          <p className="p">
            I have an account?{" "}
            <span className="span">
              <NavLink to="/">Log In</NavLink>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
