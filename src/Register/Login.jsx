import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("⚠️ Both email and password are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://blog-app-oeay.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        }
      );

      const data = await response.json();
      console.log("Login response:", response.status, data);

      if (response.ok) {
        toast.success("✅ Login successful!");

        if (data.token) {
          localStorage.setItem("authToken", data.token);
          // ✅ Save the whole user object in one key
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        navigate("/dashboard");
      } else {
        toast.error(data.message || "❌ Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.error("⚠️ Please enter your email.");
      return;
    }

    try {
      setForgotLoading(true);
      const response = await fetch(
        "https://blog-app-oeay.onrender.com/api/forget-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail.trim() }),
        }
      );

      const data = await response.json();
      console.log("Forgot password response:", response.status, data);

      if (response.ok) {
        toast.success("📧 Password reset link sent to your email!");
        setShowForgot(false);
        setForgotEmail("");
      } else {
        toast.error(data.message || "❌ Failed to send reset link.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("❌ Something went wrong. Try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Password input with toggle */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 mb-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Forgot password link */}
        <p
          onClick={() => setShowForgot(true)}
          className="text-blue-600 text-sm text-center cursor-pointer hover:underline mb-3"
        >
          Forgot Password?
        </p>

        {/* Back to signup button */}
        <button
          onClick={() => navigate("/All")}
          className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
        >
          ⬅ Back to Signup
        </button>

        {/* Forgot Password Modal */}
        {showForgot && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
              <h3 className="text-lg font-bold mb-3">Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleForgotPassword}
                disabled={forgotLoading}
                className="w-full py-2 mb-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
              <button
                onClick={() => setShowForgot(false)}
                className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
