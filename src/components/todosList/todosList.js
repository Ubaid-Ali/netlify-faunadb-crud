import React, { useEffect, useState } from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

// component
import DeleteTodo from "../deleteTodo/deleteTodo";

// material ui css
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

// Api
export const TodoListFetcher = async () => {
  const response = await fetch("/.netlify/functions/read-all-todos");
  return await response.json();
};

//
const TodosList = ({ lastActivity, setLastActivity }) => {
  const [allTodos, setAllTodos] = useState([]);

  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (todo_id) => () => {
    const currentIndex = checked.indexOf(todo_id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(todo_id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    TodoListFetcher()
      .then((data) => {
        // console.log("Success TodoList", data.data[0].ref["@ref"].id);
        setAllTodos(data.data);
      })
      .catch((error) => console.log(`error`, error));
  }, [lastActivity]);

  console.log(`checked`, checked)
  return (
    <div>
      <List className={classes.root}>
        {allTodos.map((todo) => {
          const { title, completed } = todo.data;
          const { id } = todo.ref["@ref"];
          const labelId = `checkbox-list-label-${id}`;

          return (
            <ListItem
              key={id}
              role={undefined}
              dense
              button
              onClick={handleToggle(id)}
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
                  <EditRoundedIcon />
                </IconButton>
                <IconButton edge="end" aria-label="comments">
                  <DeleteTodo id={id} setLastActivity={setLastActivity} />
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
