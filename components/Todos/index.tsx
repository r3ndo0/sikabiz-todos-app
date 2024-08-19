import React from "react";
import TodosForm from "./Form";
import SingleTodo from "./SingleTodo";

export interface Todo {
  title: string;
  body: string;
  done: boolean;
  id: string | number;
}

async function Todos() {
  const data = await fetch("http://localhost:3000/api/todos", {
    // caching strategy per case
    cache: "no-store",
    next: { tags: ["todos"] },
  });

  const todos = await data.json();

  return (
    <div className="max-w-[500px] m-auto">
      <TodosForm />
      {todos.map((t: Todo) => {
        return (
          <SingleTodo
            title={t.title}
            body={t.body}
            done={t.done}
            key={t.id}
            id={t.id}
          />
        );
      })}
    </div>
  );
}

export default Todos;
