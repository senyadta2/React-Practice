import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, removeToDo,editToDo } from "./features/todoSlice";
function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);
  const [value, setValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addToDo(value));
  };

  const handleDelete = (name) => {
    console.log(name);
    dispatch(removeToDo(name));
  };
  // const [edit,setEdit] = useState();
  const handleEdit=(name)=>{
    const edit = prompt("Enter edit text");
    dispatch(editToDo({name,edit}))
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text"
        />
        <button type="submit">Submit</button>
      </form>
      <div style={{ width: "full", height: "100vh", backgroundColor: "red" }}>
        {todos.map((todo, i) => (
          <li key={i}>
            <span>{todo.name}</span>
            <span onClick={(e) => handleDelete(todo.name)}>Delte</span>
            <span onClick={(e) => handleEdit(todo.name)}>Edit</span>
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
