"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function addTodoAction(formData: {
  title: string;
  body: string;
  done: boolean;
}) {
  await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  revalidatePath("/api/todos");
}

export async function deleteTodoAction(id: number | string) {
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
  revalidatePath("/api/todos");
}
export async function toggleDoneTodoAction(id: number | string, done: boolean) {
  console.log(done);
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ done: !done }),
  });
  revalidatePath("/api/todos");
}
export async function editTodoAction(
  id: number | string,
  title: string,
  body: string
) {
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, body }),
  });
  revalidatePath("/api/todos");
}
