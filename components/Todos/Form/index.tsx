"use client";

import { addTodoAction } from "@/app/actions";
import { revalidatePath, revalidateTag } from "next/cache";
import React, { SyntheticEvent, useRef, useState } from "react";

function TodosForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // due to lack of time I skipped the proper validations using either RHF + ZOD or any Standard form handling procedure
    if (!title || !body) {
      setError(true);
      return;
    }
    try {
      await addTodoAction({ title, body, done });
      formRef.current?.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col p-5 items-center border border-gray-400 rounded-md gap-4"
    >
      <input
        placeholder="title"
        className="p-3 border w-full border-gray-300 rounded-md"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="body"
        className="p-3 border w-full border-gray-300 rounded-md"
        name="body"
        onChange={(e) => setBody(e.target.value)}
      />
      <label
        htmlFor="task-done"
        className="w-full flex cursor-pointer justify-between items-center border-y border-gray-400 py-3"
      >
        Completed
        <input
          id="task-done"
          type="checkbox"
          name="done"
          onChange={(e) => setDone(e.target.checked)}
        />
      </label>
      {error ? (
        <p className="text-rose-400">Fill in the required fields please</p>
      ) : null}
      <button className="bg-green-500 py-3 rounded-md w-full text-white">
        Add New
      </button>
    </form>
  );
}

export default TodosForm;
