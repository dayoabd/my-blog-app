import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Register/Signup";
import All from "./component/All";
import VerifyInfo from "./Register/VerifyInfo";
import VerifyEmail from "./Register/VerifyEmail";
import Login from "./Register/Login";
import Profile from "./component/Profile";
import CreatPost from "./component/CreatePost";
import ResetPassword from "./Register/ResetPassword";
import DashBoard from "./component/DashBoard";
import Mypost from "./component/Mypost";
import EditProfile from "./component/EditProfile";
import FullPost from "./component/FullPost";
import Dashboard from "./component/DashBoard";

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
