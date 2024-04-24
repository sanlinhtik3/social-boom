import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();

  const id = data.id;
  const userId = data.userId;
  const title = data.title;

  const post = await db.post.update({
    where: {
      id: id,
    },
    data: {
      userId: userId,
      title: title,
    },
  });

  return NextResponse.json({ message: "Success", result: post });
}
