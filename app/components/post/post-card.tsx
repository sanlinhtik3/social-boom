import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import EditPost from "./edit-post";
import { Button } from "@nextui-org/button";
import { DeleteIcon } from "@/app/asset/icons/delete-icon";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Avatar } from "@nextui-org/avatar";
import { getServerSession } from "next-auth";
import { DeleteButton } from "../delete-button";

type PostProps = {
  title: string;
  id: string;
  userId: string;
  user: any;
};

async function postDelete(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;

  const post = await db.post.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
  return post;
}

export async function PostCard({ post }: { post: PostProps }) {
  const session = await getServerSession();
  const loginUser = await db.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  return (
    <>
      <div className="mt-5">
        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <Avatar name="Junior" />
              <div className="text-xl font-bold">{post?.user?.name}</div>
            </div>

            <div className="bg-slate-50 mt-3 p-3 rounded-2xl">
              <div className="">{post.title}</div>

              {loginUser?.id === post?.userId && (
                <div className="grid grid-rows-2 mt-3">
                  <EditPost post={post} />

                  <div>
                    <form action={postDelete}>
                      <input
                        type="hidden"
                        name="id"
                        value={post.id}
                        className="border p-3"
                      />
                      <DeleteButton />
                    </form>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
