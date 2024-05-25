import Link from "next/link";
import React from "react";

export default async function Page() {
  const url = "http://localhost:8000/api/blogs/posts?limit=10";
  const url1 = "https://dummyjson.com/posts?limit=10";
  const response = await fetch(url1);
  const data = await response.json();
  return (
    <main className="text-center pt-16 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">All Posts</h1>
      <ul>
        {/* {console.log(posts.data.blogs[0].title, "I am the datas")} */}

        {data.posts.map((post: any) => (
          <li key={post.id} className="mb-5">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );  
}
