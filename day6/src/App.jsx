import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, add, deleteTodo,completeToDo } from "./todoSlice";
const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const [todo, setToDo] = useState({
    name: "",
    complete: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add(todo));
  };
  useEffect(() => {
    dispatch(get());
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteTodo(id));
  };

  const handleComplete = (id, complete) => {
    console.log(id);
    console.log(complete);
    dispatch(completeToDo({id,value:!complete}));
  };

  return (
    <div>
      <h1>Add</h1>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={(e) => setToDo({ ...todo, name: e.target.value })}
          type="text"
          placeholder="Enter the task"
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        <h1>All To Do</h1>
        <table style={{ border: "1px solid black", width: "100%" }}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
          {todos?.length > 0 ? 
            todos?.map((data, i) => (
              <tr style={{ textAlign: "center" }} key={i}>
                <td>{i + 1}</td>
                <td>{data.name}</td>
                <td onClick={(e) => handleComplete(data.id, data.complete)}>
                  {data.complete == true ? "True" : "False"}
                </td>
                <td onClick={(e) => handleDelete(data.id)}>Delete</td>
              </tr>
            )) : (
              <tr>
                <td>No todos</td>
              </tr>
            )}
        </table>
      </div>
    </div>
  );
};

export default App;
