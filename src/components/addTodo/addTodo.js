import React, { useState } from "react";

const AddTodo = ({ setLastActivity }) => {
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(`New todo is going to add`);
    fetch("/.netlify/functions/todo-create", {
      method: "post",
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Todo Added: Successfully!`);
        setLastActivity(data.messageId);
      })
      .catch((error) =>
        console.log(`Somthing wrong when trying Add Todo`, error)
      );
  };

  // RETRUN
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
