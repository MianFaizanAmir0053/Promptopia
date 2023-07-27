"use client";

import { useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts?.filter((post) => {
          if (searchText === "") {
            return post;
          } else if (post?.prompt.includes(searchText)) {
            return post;
          } else if (post?.creator.username.includes(searchText)) {
            return post;
          } else if (post?.creator.email.includes(searchText)) {
            return post;
          } else if (post?.tag.includes(searchText)) {
            return post;
          }
        })}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
};
