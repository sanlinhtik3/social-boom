"use client";

import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full mt-3"
      color="primary"
      isLoading={pending}
    >
      Create
    </Button>
  );
}
