import React from "react";
import { createPost } from "@/action/actions";

export default function Page() {
  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Create Post</h1>
      <form
        action={createPost}
        className="flex flex-col max-w-[400px] mx-auto gap-2 my-10"
      >
        <input
          type="text"
          name="title"
          placeholder="Title for new post"
          className="border rounded px-3 outline-none h-10"
        />
        <textarea
          name="body"
          placeholder="Body for new post"
          className="border rounded px-3 outline-none py-2"
          rows={10}
          required
        />
        <button className="h-10 ounded bg-blue-500 px-5 rounded">Submit</button>
      </form>
    </main>
  );
}
