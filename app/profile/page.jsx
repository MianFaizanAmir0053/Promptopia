"use client";

import { useState } from "react";
import { Profile } from "@components/Profile";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const page = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const fetchPosts = async (userId) => {
    if (!session?.user.id) {
      const res = await fetch(`/api/users/${userId}/prompts`);
      const data = await res.json();
      setPosts(data);
      return;
    }
    const res = await fetch(`/api/users/${session?.user.id}/prompts`);
    const data = await res.json();
    setPosts(data);
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const res = await fetch(`/api/prompt/${post._id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchPosts();
    }
  };
  useEffect(() => {
    if (session?.user.id) Cookies.set("userId", session?.user.id);

    const userId = Cookies.get("userId");

    console.log(userId);
    console.log(session?.user.id);
    if (session?.user.id || userId) fetchPosts(userId);
  }, []);

  return (
    <Profile
      name={"My"}
      desc={
        "Welcome to your personalized profile. Share your exceptional prompts and inspire others with the power of your imagination."
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
