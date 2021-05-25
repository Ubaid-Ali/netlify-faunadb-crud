import React, { useState, useEffect } from "react";
import "./App.css";

// Import Components
import AddTodo from "./components/addTodo/addTodo";
import TodosList from "./components/todosList/todosList";
import NavBar from "./components/navBar/navBar";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const TodoListFetcher = async () => {
      return fetch("/.netlify/functions/read-all-todos")
        .then((response) => response.json())
        .then((data) => {
          setAllTodos(data.data);
        })
        .catch((error) => {
          console.log(`error`, error);
        });
    };

    TodoListFetcher();
  }, []);

  return (
    <div className="App-container">
      <NavBar />
      <p className="header-text">
        This application is using React for the frontend, Netlify Functions for
        API calls, and FaunaDB as the backing database.
      </p>
      <AddTodo
        allTodos={allTodos}
        setAllTodos={setAllTodos}
      />
      <TodosList
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

export default App;
