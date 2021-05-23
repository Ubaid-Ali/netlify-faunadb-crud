import React from "react";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

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

  return (
    <DeleteForeverRoundedIcon onClick={deleteTodo}>
      {" "}
      x{" "}
    </DeleteForeverRoundedIcon>
  );
};

export default DeleteTodo;
