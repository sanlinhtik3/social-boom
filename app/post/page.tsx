import { db } from "@/lib/db";
import { PostCard } from "../components/post/post-card";
import { Suspense } from "react";
import PostCardLoading from "../components/PostCardLoading";

export default async function Page() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      userId: true,
      user: true,
    },
  });

  return (
    <>
      <h1>Posts</h1>

      {/* <pre className="mt-2 rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(posts, null, 2)}</code>
      </pre> */}
      <Suspense fallback={<h1>loading....</h1>}>
        <div className="mb-20">
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </div>
      </Suspense>
    </>
  );
}
