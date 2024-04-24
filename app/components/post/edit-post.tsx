"use client";

import { EditIcon } from "@/app/asset/icons/edit-icon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "@nextui-org/react";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Spinner /> : "update"}
    </Button>
  );
}

export default function EditPost({ post }: any) {
  const [isEdit, setEdit] = useState(false);

  async function postUpdate(formData: FormData) {
    const id = formData.get("id") as string;
    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;

    const res = await fetch("/api/post", {
      method: "PUT",
      body: JSON.stringify({ id, userId, title }),
    });

    if (res.ok) {
      alert("success");
    }
  }

  return (
    <>
      {isEdit && (
        <form action={postUpdate}>
          <input
            type="hidden"
            name="id"
            value={post.id}
            className="border p-3"
          />
          <Input name="title" defaultValue={post.title} className="w-full" />
          <SubmitButton />
        </form>
      )}

      {!isEdit && (
        <Button isIconOnly onClick={() => setEdit(true)}>
          <EditIcon />
        </Button>
      )}
    </>
  );
}
