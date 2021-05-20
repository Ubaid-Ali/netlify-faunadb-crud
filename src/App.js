import React, { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState("");
  const [message, setMessage] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(`Submit Function`);
    fetch("/.netlify/functions/todo-create", {
      method: "post",
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
        console.log(`Data from server: `, JSON.stringify(data));
      });
  };

  console.log(`state`, state);
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <input type="submit" value="SUBMIT" />
        </form>
      </header>
    </div>
  );
}

export default App;
