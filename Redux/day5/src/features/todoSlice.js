import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todo: []
}
const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addToDo:(state,action)=>{
            state.todo.push({name:action.payload});
        },
        removeToDo:(state,action)=>{
            state.todo = state.todo.filter(s => s.name != action.payload)
        },
        editToDo:(state,action)=>{
            console.log(action.payload)
            const todo = state.todo.find(s=>s.name == action.payload.name);
           todo.name = action.payload.edit

        }
    }
})
export const {addToDo,removeToDo,editToDo} = todoSlice.actions;
export default todoSlice.reducer;