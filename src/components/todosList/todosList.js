import React, { useState } from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

// component
import DeleteTodo from "../deleteTodo/deleteTodo";
import UpdateTodo from "../updateTodo/updateTodo";

// material ui css
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

// Main Component Start
const TodosList = ({ allTodos, setAllTodos }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);

  const handleCompleted = (todo_id) => () => {
    const currentIndex = checked.indexOf(todo_id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(todo_id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  // Main Component Return
  return (
    <div>
      <List className={classes.root}>
        {allTodos.map((todo) => {
          const { title } = todo.data;
          const { id } = todo.ref["@ref"];
          const labelId = `checkbox-list-label-${id}`;

          return (
            <ListItem
              key={id}
              role={undefined}
              dense
              button
              onClick={handleCompleted(id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={title} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <UpdateTodo id={id} title={title} setAllTodos={setAllTodos} />
                </IconButton>
                <IconButton edge="end" aria-label="comments">
                  <DeleteTodo id={id} setAllTodos={setAllTodos} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodosList;
