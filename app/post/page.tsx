import { db } from "@/lib/db";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { EditIcon } from "../asset/icons/edit-icon";
import { DeleteIcon } from "../asset/icons/delete-icon";
import { Button } from "@nextui-org/button";
import { revalidatePath } from "next/cache";
import { Input } from "@nextui-org/input";
import EditPost from "../components/post/edit-post";

export default async function Page() {
  const posts = await db.post.findMany();

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

  return (
    <>
      <h1>Posts</h1>

      <div>
        {posts.map((post) => (
          <div className="mt-5">
            <Card>
              <CardBody>
                <div>{post.title}</div>
                <div className="grid grid-rows-2">
                  <EditPost post={post} />
                  <form action={postDelete}>
                    <input
                      type="hidden"
                      name="id"
                      value={post.id}
                      className="border p-3"
                    />
                    <Button isIconOnly type="submit">
                      <DeleteIcon className="text-red-500" />
                    </Button>
                  </form>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
