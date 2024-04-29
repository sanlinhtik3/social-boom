"use client";

import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";
import { DeleteIcon } from "../asset/icons/delete-icon";

export function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="mt-3"
      color="danger"
      isLoading={pending}
      isIconOnly
    >
      <DeleteIcon className="text-white" />
    </Button>
  );
}
