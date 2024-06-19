"use server";

import { uploadImage } from "@/lib/coludinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  /**
   * @description it will only execute on server
   * in the end behind the scenes next js will cover everything on server
   */
  // normally we don't need this code but when you need to create server actions you need to use it.  const title = formData.get("title");
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
  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image Upload failed please try again later");
  }
  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath(
    "/",
    "layout"
  )
  redirect("/feed");

}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath(
    "/",
    "layout"
  ); /* by default next js caches agressively dynamically not 
 updating the status of like button so we have to manually tell next
  with this function which page change it will remove from caches and update data
  if you wanna all pages revalidate then use / and second argument layout */
}
