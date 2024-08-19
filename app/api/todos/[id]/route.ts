import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  //id was declared Int in db model and needs to be refactores to be a string , again because of lack of time has to be skipped
  const id = params.id;

  const deleteOne = await prisma.todo.delete({
    where: {
      id: +id,
    },
  });

  // const todos = await prisma.todo.findMany();
  //   const res = await request.json();
  //   console.log(todos);
  revalidatePath(`/api/todos/${id}`);

  return NextResponse.json({ deleteOne });
}
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  //id was declared Int in db model and needs to be refactores to be a string , again because of lack of time has to be skipped
  const id = params.id;

  const body = await request.json();

  const markedDone = await prisma.todo.update({
    where: {
      id: +id,
    },
    data: {
      done: body.done,
    },
  });
  revalidatePath(`/api/todos/${id}`);

  return NextResponse.json({ markedDone });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  //id was declared Int in db model and needs to be refactores to be a string , again because of lack of time has to be skipped
  const id = params.id;

  const body = await request.json();

  //   console.log(body);

  const editedTodo = await prisma.todo.update({
    where: {
      id: +id,
    },
    data: {
      title: body.title,
      body: body.body,
    },
  });
  revalidatePath(`/api/todos/${id}`);

  return NextResponse.json({ editedTodo });
}
