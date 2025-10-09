import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../src/Register/Signup";
import All from "../src/component/All";
import VerifyInfo from "../src/Register/VerifyInfo";
import VerifyEmail from "../src/Register/VerifyEmail";
import Login from "../src/Register/Login";
import Profile from "../src/component/Profile";
import CreatPost from "./component/CreatePost";
import ResetPassword from "../src/Register/ResetPassword";
import DashBoard from "../src/component/DashBoard";
import Mypost from "../src/component/Mypost";
import EditProfile from "../src/component/EditProfile";
import FullPost from "../src/component/FullPost";
import Dashboard from "../src/component/DashBoard";

function App() {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <Router>
      <Routes>
        <Route index element={<All />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/api/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fullpost/:id" element={<FullPost />} /> 
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/verify-info" element={<VerifyInfo />} />
        <Route path="/api/reset-password/:token" element={<ResetPassword />} />
        <Route path="/Mypost" element={<Mypost />} />
      </Routes>
    </Router>
  );
}

export default App;
