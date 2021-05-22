import React, { useEffect, useState } from "react";
import DeleteTodo from "../deleteTodo/deleteTodo";

// Api
export const TodoListFetcher = async () => {
  const response = await fetch("/.netlify/functions/read-all-todos");
  return await response.json();
};

//
const TodosList = ({ lastActivity, setLastActivity }) => {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    TodoListFetcher()
      .then((data) => {
        // console.log("Success TodoList", data.data[0].ref["@ref"].id);
        setAllTodos(data.data);
      })
      .catch((error) => console.log(`error`, error));
  }, [lastActivity]);
  return (
    <div>
      TodosList
      {
        <ul>
          {allTodos?.map((todo, key) => {
            const { title, completed } = todo.data;
            const { id } = todo.ref["@ref"];
            return (
              <li key={id} id={id}>
                <span>{title}</span> <span>{JSON.stringify(completed)}</span>{" "}
                <DeleteTodo id={id} setLastActivity={setLastActivity} />
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default TodosList;
