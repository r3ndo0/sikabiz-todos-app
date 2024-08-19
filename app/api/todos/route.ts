import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const todos = await prisma.todo.findMany();
  //   const res = await request.json();
  //   console.log(todos);

  return NextResponse.json(todos);
}
export async function POST(request: Request) {
  const body = await request.json();
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      body: body.body,
      done: body.done,
    },
  });

  return NextResponse.json({ todo });
}
