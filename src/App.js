import React, { useState } from "react";
import "./App.css";

// Import Components
import AddTodo from "./components/addTodo/addTodo";
import TodosList from "./components/todosList/todosList";
import NavBar from "./components/navBar/navBar";

function App() {
  const [lastActivity, setLastActivity] = useState(""); //todo id
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="App-container">
      <NavBar />
      <p className="header-text">
        This application is using React for the frontend, Netlify Functions for
        API calls, and FaunaDB as the backing database.
      </p>
      <AddTodo setLastActivity={setLastActivity} />
      <TodosList
        lastActivity={lastActivity}
        setLastActivity={setLastActivity}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

export default App;
