import React, { useState } from "react";
import "./App.css";

import AddTodo from "./components/addTodo/addTodo";
import TodosList from "./components/todosList/todosList";
function App() {
  const [lastActivity, setLastActivity] = useState(""); //todo id

  return (
    <div className="App-container">
      <AddTodo setLastActivity={setLastActivity} />
      <TodosList
        lastActivity={lastActivity}
        setLastActivity={setLastActivity}
      />
    </div>
  );
}

export default App;
