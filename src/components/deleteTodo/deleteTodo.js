import React from "react";

const DeleteTodo = ({ id, setLastActivity }) => {
  const deleteTodo = () => {
    fetch(`/.netlify/functions/todo-delete`, {
      method: "post",
      body: JSON.stringify(id),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(`Todo Deleted: Successfully!`);
        setLastActivity(result);
      });
  };

  return <button onClick={deleteTodo}> x </button>;
};

export default DeleteTodo;
