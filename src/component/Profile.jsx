import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Get user object from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const name = user?.name || "No Name";
  const email = user?.email || "No Email";

  console.log(name);
  console.log(email);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Profile Page</h1>
      <p className="text-center mt-4">
        This is the profile page. More features coming soon!
      </p>

      <div className="mt-8 max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <p>
            <span className="font-semibold">Name: </span> {name}
          </p>
          <p>
            <span className="font-semibold">Email: </span> {email}
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-2xl mx-auto text-center gap-4 flex justify-center flex-wrap">
        <button
          onClick={() => navigate("/edit-profile")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>

        <button
          onClick={() => navigate("/Mypost")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          📚 My Posts
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login"); // redirect to login after logout
          }}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
