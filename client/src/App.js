import Nav from './Components/Nav';
import {BrowserRouter, Route, Routes } from "react-router-dom"
import LogIn from './Components/Log-in';
import SignUp from './Components/Sign-up';
import { useAuth } from "./store/auth";
import Post from './Components/post';
import YourPost from './Components/yourPosts';
import { Logout } from './Components/logOut';
import CreatePost from './Components/createPost';


function App() {
  const {isLogIn}= useAuth();
  return (
    <>
      <BrowserRouter>
        {isLogIn ? <Nav /> : <></>}
        <Routes>
          <Route path="/" element={!isLogIn ? <LogIn /> : <Post />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post" element={<Post />} />
          <Route path="/yourpost" element={<YourPost />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
