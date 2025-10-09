// import React, { useState, useEffect } from "react";

// const Mypost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {


//     const fetchPosts = async () => {
//       setLoading(true);

//       const user = JSON.parse(localStorage.getItem("user")) || {};
//       console.log(user);
//       const userpostid = user.posts
//       const allposts = JSON.parse(localStorage.getItem("allposts")) || [];
//       const userposts = allposts.filter((post) => userpostid.includes(post.id));
//       setPosts(userposts); 
//       console.log(userpostid);
      
//       setPosts(userposts);
//       setLoading(false);
//     };

//     fetchPosts();
//   }, []);

//   const handleDelete = async (id) => {
//     const updatedPosts = posts.filter((p) => p.id !== id);
//     setPosts(updatedPosts);

//     const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
//     const newAllPosts = allPosts.filter((p) => p.id !== id);
//     localStorage.setItem("posts", JSON.stringify(newAllPosts));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600 text-lg">Loading your posts...</p>
//       </div>
//     );
//   }

//   if (posts.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600 text-lg">You haven’t created any posts yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8">📚 My Posts</h1>

//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white p-6 rounded-lg shadow-md mb-4"
//           >
//             {/* Show image if available */}
//             {post.image && (
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />
//             )}

//             <h2 className="text-2xl font-semibold">{post.title}</h2>
//             <p className="text-gray-700 mt-2 whitespace-pre-line">
//               {post.content}
//             </p>
//             <p className="text-sm text-gray-500 mt-2">👤 {post.username}</p>

//             <button
//               onClick={() => handleDelete(post.id)}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//             >
//               🗑 Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Mypost;
