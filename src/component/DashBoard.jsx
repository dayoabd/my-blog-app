import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBookOpen, FaArrowRight, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://blog-app-oeay.onrender.com/api/posts");
        const data = await res.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  const filteredPosts = posts.filter((post) =>
    post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  localStorage.setItem("allposts", JSON.stringify(posts));

  return (
    <div className="pt-16">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 shadow z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            MyBlog Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              <FaUserCircle className="inline mr-1" /> Profile
            </button>
            <button
              onClick={() => navigate("/create-post")}
              className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
            >
              <FaPlus className="inline mr-1" /> Create Post
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-8 flex-col md:flex-row gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaBookOpen />
            All Blog Posts
          </h2>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-gray-600">No posts found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.slice(0, visiblePosts).map((post) => (
              <div
                key={post._id}
                onClick={() => navigate(`/fullpost/${post._id}`)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer"
              >
                <img
                  src={post.image || `https://picsum.photos/400/200?random=${post._id}`}
                  alt={post.title || "Blog post image"}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title || "Untitled Post"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {post.excerpt || post.content?.slice(0, 80) + "..."}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      navigate(`/fullpost/${post._id}`);
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {visiblePosts < filteredPosts.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
      </footer>
    </div>
  );
}
