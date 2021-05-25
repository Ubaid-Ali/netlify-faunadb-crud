import React, { useState } from "react";

// Import Material-UI
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const UpdataTodo = ({ id, title, setLastActivity }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleClickOpenEditor = () => {
    setOpen(true);
  };

  const handleCloseEditor = (e) => {
    const saveButton = e.target.innerHTML;
    if (saveButton === "Save") {
      updateRequest();
    } else {
      console.log(`Cancel Update Todo`);
    }
    setOpen(false);
  };

  // API
  const updateRequest = () => {
    console.log(`Todo is going to Update!`);
    fetch("/.netlify/functions/todo-update", {
      method: "post",
      body: JSON.stringify({
        id,
        todo: { title: userInput, completed: false },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(`Todo Updated!`);
        setLastActivity(result);
      });
  };

  return (
    <>
      <EditRoundedIcon onClick={handleClickOpenEditor}></EditRoundedIcon>
      <Dialog
        open={open}
        onClose={handleCloseEditor}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Todo Editing Mode</DialogTitle>
        <DialogContent>
          <DialogContentText>This todo is about to change: <br /> {title}</DialogContentText>
          <TextField
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            autoFocus
            margin="dense"
            id="todo-title"
            label="text here"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditor} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseEditor} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdataTodo;
