"use client";

import {
  deleteTodoAction,
  editTodoAction,
  toggleDoneTodoAction,
} from "@/app/actions";
import React, { SyntheticEvent, useState } from "react";
import Modal from "../Ui/Modal";
import { EditIcon } from "../Icons/EditIcon";
import { Switch } from "@headlessui/react";

interface Props {
  title: string;
  body: string;
  done: boolean;
  id: number | string;
}

function SingleTodo({ title, body, done, id }: Props) {
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [editDone, setEditDone] = useState(done);
  const [] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDone = async () => {
    try {
      await toggleDoneTodoAction(id, done);
    } catch (error) {}
  };
  const deleteTodo = async () => {
    try {
      await deleteTodoAction(id);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async () => {
    try {
      await editTodoAction(id, editTitle, editBody);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    editTodo();
    setIsOpen(false);
  };

  return (
    <article className="my-5 relative border border-gray-300 p-3 rounded-md">
      <p className="font-bold">{title}</p>
      <p>{body}</p>
      <p className="text-[12px] mt-5">
        click the below button to toggle the complete status of this todo
      </p>
      <button
        onClick={toggleDone}
        className={`${
          done ? "bg-green-300" : "bg-rose-300"
        } w-full py-3 rounded-md`}
      >
        {done ? "done" : "undone"}
      </button>
      <div className="absolute flex gap-3 items-center top-3 right-3">
        <button className="text-gray-700" onClick={() => setIsOpen(true)}>
          <EditIcon />
        </button>
        <button onClick={deleteTodo} className="text-rose-600 ">
          X
        </button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
        <button
          className="absolute top-3 right-3"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <form onSubmit={handleEdit} className="relative">
          <input
            onChange={(e) => setEditTitle(e.target.value)}
            name="title"
            value={editTitle}
            className="inline-blocke border border-gray-300 rounded-md p-3 mb-3"
          />
          <input
            onChange={(e) => setEditBody(e.target.value)}
            value={editBody}
            name="body"
            className="inline-blocke border border-gray-300 rounded-md p-3 mb-3"
          />
          <button className="bg-green-400 w-full py-3 rounded-md my-3">
            Edit
          </button>
        </form>
      </Modal>
    </article>
  );
}

export default SingleTodo;
