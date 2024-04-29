"use client";

import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "@nextui-org/skeleton";

export default function Navbar() {
  const { data, status } = useSession();

  return (
    <div className="flex justify-between items-center max-w-lg mx-auto border-b py-5 mb-5">
      {status === "loading" ? (
        <Skeleton className="w-12 rounded-lg h-5" />
      ) : (
        <h1>Socail Boom</h1>
      )}

      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Signin</Link>
      )}

      {status === "loading" ? (
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
      ) : (
        <>
          {status === "authenticated" && (
            <Dropdown>
              <DropdownTrigger>
                <Image
                  alt="nextui logo"
                  height={40}
                  src={data?.user?.image ?? ""}
                  width={40}
                  className="rounded-full"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="home">
                  <Link href="/">Home</Link>
                </DropdownItem>
                <DropdownItem key="post">
                  <Link href="/post">Post</Link>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  <Link href="/api/auth/signout">Sign out</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </>
      )}
    </div>
  );
}
