"use server";

import { storePost } from "@/lib/posts";
import { redirect } from "next/dist/server/api-utils";

export async function createPost(prevState, formData) {
  /**
   * @description it will only execute on server
   * in the end behind the scenes next js will cover everything on server
   */
  // normally we don't need this code but when you need to create server actions you need to use it.

  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("Title is required...");
  }
  if (!image || image.size === 0) {
    errors.push("Image URL is required");
  }
  if (!content || content.trim() === 0) {
    errors.push("Content is required");
  }
  if (errors.length > 0) {
    return { errors };
  }
  await storePost({
    imageUrl: "",
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}
