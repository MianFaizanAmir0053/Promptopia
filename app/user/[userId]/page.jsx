"use client";

import { useState } from "react";
import { Profile } from "@components/Profile";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const page = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const params = useParams();
  const userId = params.userId;

  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${userId}/prompts`);
    const data = await res.json();
    setPosts(data);
    setUser(data[0].creator.username);
  };

  useEffect(() => {
    if (userId) fetchPosts();
  }, []);

  return (
    <Profile
      name={user || "User"}
      desc={`Welcome to ${user || "User"}'s profile`}
      data={posts}
    />
  );
};

export default page;
