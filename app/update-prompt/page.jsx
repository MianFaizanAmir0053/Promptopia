"use client";

import { Form } from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const updatePrompt = async () => {
      setSubmitting(true);
      try {
        const response = await fetch(`/api/prompt/${id}/`);
        if (response.ok) {
          const { prompt, tag } = await response.json();
          setPost({ prompt, tag });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    };
    if (id) updatePrompt();
  }, [id]);

  const savePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!id) return new Error("No Prompt Id");
      const res = await fetch(`/api/prompt/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      type={"Update"}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={savePrompt}
    ></Form>
  );
};

export default page;
