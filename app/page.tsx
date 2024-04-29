import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { getServerSession } from "next-auth";
import { SubmitButton } from "./components/submit-button";

export default async function Home() {
  const session = await getServerSession();
  async function postCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;

    const post = await db.post.create({
      data: {
        title: title,
        userId: userId,
      },
    });
    revalidatePath("/");
    return post;
  }

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

  async function postUpdate(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;

    const post = await db.post.update({
      where: {
        id: id,
      },
      data: {
        userId: userId,
        title: title,
      },
    });
    revalidatePath("/");
    return post;
  }

  const posts = await db.post.findMany();

  const loginUser = await db.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  return (
    <div className="max-w-lg mx-auto">
      {session !== null && (
        <Card>
          <CardHeader>
            <h4 className="font-bold text-large">Create a post</h4>
          </CardHeader>
          <CardBody>
            <form action={postCreate}>
              <input type="hidden" name="userId" defaultValue={loginUser?.id} />
              <Input type="text" name="title" label="Title" />
              <SubmitButton />
            </form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
