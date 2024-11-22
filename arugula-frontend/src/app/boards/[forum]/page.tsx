"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import postData from "@/utils/postData";
import Link from "next/link";

// Type definitions for the data
interface Post {
  _id: string;
  content: string;
  createdAt: Date;
  userId: string;
}

interface Board {
  _id: string;
  name: string;
  description: string;
}

const page = () => {
  const params = useParams(); // Use `useParams` to get dynamic route params
  const forum = params.forum; // Extract the 'forum' param
  console.log(
    "Fetching data from URL:",
    `http://localhost:5000/api/boards/${forum}`,
  );
  const { data, isPending, error } = useFetch<{ board: Board; posts: Post[] }>(
    `http://localhost:5000/api/boards/${forum}`,
  );

  const [newPostTitle, setNewPostTitle] = useState<string>("");
  const [newPostContent, setNewPostContent] = useState<string>(""); // State for the new post content
  const [submitting, setSubmitting] = useState<boolean>(false); // State for form submission
  const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);
  // Handle new post submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPostContent.trim()) {
      alert("Post content cannot be empty.");
      return;
    }
    if (!newPostTitle.trim()) {
      alert("Post title cannot be empty.");
      return;
    }

    setSubmitting(true);

    try {
      // Use postData to send the new post
      const newPost = await postData<Post>(
        `http://localhost:5000/api/boards/${forum}/posts`,
        {
          title: newPostTitle,
          content: newPostContent,
          userId: "1",
        },
      );

      console.log("New post created:", newPost);

      // Clear the form
      setNewPostContent("");

      // Optionally, refetch posts or update the local state
    } catch (err: any) {
      console.error("Failed to create post:", err);
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Return JSX based on loading, error, or data state
  return (
    <div className="bg-gradient-to-b from-orange-100 to-orange-200 min-h-screen text-sm text-gray-900">
      <div className="text-center w-auto">
        <h1 className="text-5xl text-red-800 font-bold border-b border-black">
          /{forum}/
        </h1>
        <button
          className="text-lg font-bold"
          onClick={() => setShowSubmitForm(!showSubmitForm)}
        >
          [Start a New Thread]
        </button>
        {showSubmitForm && (
          <form
            className="flex flex-col bg-white max-w-md mx-auto border border-gray-300 space-y-4 mt-6"
            onSubmit={handleSubmit}
          >
            <input
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)} // Update newPostTitle here
              placeholder="Write your title here..."
              disabled={submitting}
            ></input>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write your post here..."
              rows={4}
              cols={50}
              disabled={submitting}
            ></textarea>
            <br />
            <button type="submit" disabled={submitting}>
              {submitting ? "Posting..." : "Post"}
            </button>
          </form>
        )}
      </div>
      {isPending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <div>
          <ul>
            {data.posts.map((post) => (
              <li
                key={post._id}
                className="border border-gray-400 p-4 bg-white rounded-md"
              >
                {post.content}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-bold">
                    <Link href={`/profile/${post.userId}`}>{post.userId}</Link>
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-800">{post.content}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default page;
