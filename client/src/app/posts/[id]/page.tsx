
export default async function Page({ params }: { params: { id: string } }) {
  console.log("emeka")
  console.log(params.id, "I am the params")
   
  const response = await fetch(`http://localhost:8000/api/blogs/posts/${params.id}`);
  const post = await response.json();
  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="max-w-[700px] mx-auto">{post.body}</p>
     </main>
  );
}
