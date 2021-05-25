import React from "react";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

const DeleteTodo = ({ id, setAllTodos }) => {
  const deleteTodo = () => {
    fetch(`/.netlify/functions/todo-delete`, {
      method: "post",
      body: JSON.stringify(id),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(`Todo Deleted: Successfully!`);
        setAllTodos((state) => {
          return state.filter((t) => {
            return t.ref[`@ref`].id !== result.id;
          });
        });
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
