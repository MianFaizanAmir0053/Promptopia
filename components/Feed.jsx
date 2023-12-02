"use client";

import { useEffect, useState } from "react";
import { PromptCard } from "./PromptCard";
import Image from "next/image";
import Cookies from "js-cookie";

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

const UserGridList = ({ data }) => {
  return (
    <div className="mt-16">
      <h1 className="font-bold text-2xl underline py-2 text-center">All Users</h1>
      {data.map((user) => (
        <div key={user._id} className="grid grid-cols-3 gap-2">


          <Image width={40} className="rounded-full my-3" height={40} src={user.image} alt={user.username} />

          <div className=" col-span-2 space-x-8 flex items-center">
            <h3 className="font-bold">{user.username}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
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
      {
        Cookies.get("isAdmin") && <UserGridList data={users} />
      }
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
