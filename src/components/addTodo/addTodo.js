import React, { useState } from "react";

// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  TextField: {
    width: "80%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AddTodo = ({ setLastActivity }) => {
  const classes = useStyles();

  // ON-CHANGE STATE
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
      <form
        onSubmit={submitHandler}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.TextField}
          type="text"
          id="outlined-secondary"
          label="Type here"
          variant="outlined"
          color="primary"
          value={todo.title}
          onChange={(e) => {
            setTodo({ ...todo, title: e.target.value });
          }}
          required
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          AddTodo
        </Button>
      </form>
    </div>
  );
};

export default AddTodo;
