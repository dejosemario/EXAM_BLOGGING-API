import Link from "next/link";
import React from "react";

export default async function PostsList() {
    await new Promise((resolve) =>setTimeout(resolve, 1000));
  const url = "http://localhost:8000/api/blogs/posts";
  // const url1 = "https://dummyjson.com/posts?limit=10";
  const response = await fetch(url);
  const post = await response.json();
  return (
    <ul>
      {/* {console.log(posts.data.blogs[0].title, "I am the datas")} */}

      {post.data.blogs.map((post: any) => (
        <li key={post.id} className="mb-5">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
