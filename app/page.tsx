"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/post");
      const { post } = await res.json();
      setPosts(post);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      fetchPosts();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Content"
        />
        <button type="submit">Add Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
