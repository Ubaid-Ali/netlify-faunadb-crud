import React, { useState } from "react";

import TodoListFetcher from "../todosList/todosList";

const AddTodo = ({setLastActivity}) => {
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(`Submit Function`);
    fetch("/.netlify/functions/todo-create", {
      method: "post",
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Todo Added Successfully : `, JSON.stringify(data));
        setLastActivity(data.messageId)
      })
      .catch((error) =>
        console.log(`Somthing wrong when trying Add Todo`, error)
      );
  };

  // console.log(`todo`, todo);
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={todo.title}
          onChange={(e) => {
            setTodo({ ...todo, title: e.target.value });
          }}
        />
        <br />
        <input type="submit" value="Add Todo" />
      </form>
    </div>
  );
};

export default AddTodo;
