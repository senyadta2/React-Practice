import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  todo: [],
  status: "idel",
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDO: (state, action) => {
      state.status = "pending";
      state.todo.push(action.payload);
      state.status = "completed";
    },
    deleteToDo: (state, action) => {
      console.log(action.payload);
      state.todo = state.todo.filter((data) => data.id !== action.payload);
    },
    editToDo: (state, action) => {
      const editToDo = state.todo.find((data) => data.id == action.payload.id);
      if(editToDo){
        editToDo.name  = action.payload.name;
      }
    },
  },
});

export const { addToDO, deleteToDo,editToDo } = toDoSlice.actions;
export default toDoSlice.reducer;
