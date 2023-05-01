import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import Restore from "./components/Auth/Restore";
import About from "./components/About";
import Profile from "./components/Profile";
import Questions from "./components/Questions";
import Question from "./components/Questions/Question";
import ProfileSettings from "./components/Profile/ProfileSettings";
import Post from "./components/Posts/Post";
import ResetPassword from "./components/Auth/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/restore" element={<Restore />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/" element={<>
          <Header />
          <main>          
            <Outlet />
          </main>
          <Footer />
        </>} >
          <Route path="posts" exact element={<Outlet />}>
            <Route path="" exact element={<Posts />} />
            <Route path=":id" exact element={<Post />}/>
          </Route>
          <Route path="about" exact element={<About />} />
          <Route path="profile" exact element={<Outlet />} >
            <Route path="" exact element={<Profile />}/>
            <Route path="settings" exact element={<ProfileSettings />} />
          </Route>
          <Route path="questions" exact element={<Outlet />} >
            <Route path="" exact element={<Questions />} />
            <Route path=":id" element={<Question />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
