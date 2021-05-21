import React, { useState } from "react";
import "./App.css";

import AddTodo from "./components/addTodo/addTodo";
import TodosList from "./components/todosList/todosList";
function App() {

  const [lastActivity, setLastActivity] = useState("");

  return (
    <div className="App">
      <div className="App-header">
        <AddTodo setLastActivity={setLastActivity} />
        <TodosList lastActivity={lastActivity} setLastActivity={setLastActivity} />
      </div>
    </div>
  );
}

export default App;
