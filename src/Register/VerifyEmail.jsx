import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  // const {u}
  const userid = localStorage.getItem("user._id");
  // const userid = localStorage.getItem(user._id)
  const [status, setStatus] = useState("Verifying your email...");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          `https://blog-app-oeay.onrender.com/api/verify-email/${userid}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        console.log("Verification response:", data);

        if (response.ok) {
          setStatus("✅ Your email has been verified!");
          setVerified(true);
        } else {
          setStatus(data.message || "❌ Verification failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("❌ Something went wrong. Please try again.");
      }
    };

    verify();
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Email Verification
        </h2>
        <p className="text-gray-700 font-medium mb-4">{status}</p>

        {verified && (
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
