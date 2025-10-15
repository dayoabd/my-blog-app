import React, { useState, useEffect } from "react";
import { FaPenNib, FaBookOpen, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHero, setShowHero] = useState(true); // 👈 controls the hero visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://blog-app-oeay.onrender.com/api/posts");
        const data = await res.json();
        setPosts(data);
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

  const handleStartReading = () => {
    setShowHero(false); // 👈 hides the hero section
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      {showHero && ( // 👈 only render if showHero = true
        <section className="bg-blue-600 text-white py-16 transition-all duration-500 ease-in-out">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2">
              <FaPenNib className="inline-block" />
              Welcome to MyBlog
            </h1>
            <p className="mt-4 text-lg md:text-xl text-blue-100">
              Share your thoughts, explore ideas, and connect with the world.
            </p>
            <button
              onClick={handleStartReading}
              className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Start Reading
            </button>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8 flex-col md:flex-row gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaBookOpen />
            Recent Posts
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
                  src={
                    post.image || `https://picsum.photos/400/200?random=${post._id}`
                  }
                  alt={post.title || "Blog post image"}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title || "Untitled Post"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {post.excerpt || post.content?.slice(0, 80) + "..."}
                </p>
                <button className="mt-4 flex items-center gap-2 text-blue-600 hover:underline">
                  Read More <FaArrowRight />
                </button>
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

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About MyBlog
          </h2>
          <p className="text-gray-600">
            MyBlog is a place where writers and readers come together. Share
            your stories, learn from others, and be inspired every day.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
      </footer>
    </div>
  );
}
