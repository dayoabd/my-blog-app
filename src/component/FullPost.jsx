import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FullPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://blog-app-oeay.onrender.com/api/post/${id}`);
        const data = await res.json();
        console.log("Fetched post:", data); // 👀 check shape

        // Handle if backend sends { post: {...} } or array
        if (data.post) {
          setPost(data.post);
        } else if (Array.isArray(data)) {
          setPost(data[0]);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading post...</p>;
  }

  if (!post) {
    return <p className="text-center mt-20 text-red-500">Post not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          src={post.image || `https://picsum.photos/800/400?random=${post._id}`}
          alt={post.title}
          className="w-full h-60 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-600 leading-relaxed">{post.content}</p>
      </div>
    </div>
  );
}
