import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchFile, postFile } from "./features/fileSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [count, setCount] = useState(0);
  const files = useSelector((state) => state.file);
  const status = useSelector((state) => state.status);
  console.log(status);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFile());
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postFile(value));
  };
  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          onChange={(e) => setValue({ ...value, name: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    
      {status == "loading " ? (
        <h1>Loading...</h1>
      ) : (
        files.map((file) => <li>{file.name}</li>)
      )}
    </>
  );
}

export default App;
