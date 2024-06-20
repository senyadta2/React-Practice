import { useId, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { list } from "postcss";
import { addToDO, deleteToDo, editToDo } from "./features/toDoSlice";
import { v4 } from "uuid";
function App() {
  const [count, setCount] = useState(0);
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  console.log(todos);
  const id = useId();
  const [data, setData] = useState({
    id: "",
    name: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleToDo = (e) => {
    e.preventDefault();
    console.log(e);
    const newData = {
      ...data,
      id: v4(),
    };
    dispatch(addToDO(newData));

    setData({
      id: "",
      name: "",
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteToDo(id));
  };

  const handleEdit = (eid) => {
    const text = prompt("enter the text");
    if (text) {
      console.log(text);
      dispatch(editToDo({ id: eid, name: text }));
    }
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleToDo}
          action=""
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            value={data.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter to do"
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <div>
        <ul>
          {todos.map((todo, i) => (
            <li key={i}>
              <span>{todo.name}</span>
              <span
                onClick={(e) => handleDelete(todo.id)}
                style={{ marginLeft: "100px" }}
              >
                delete
              </span>
              <span
                onClick={(e) => {
                  handleEdit(todo.id);
                }}
                style={{ marginLeft: "100px" }}
              >
                Edit
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
