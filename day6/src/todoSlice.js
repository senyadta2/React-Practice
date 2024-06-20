import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos:[],
    status:"idel"
}

export const get =createAsyncThunk( "todo/get",async ()=>{
    const res = await fetch("https://to-do-for-public.onrender.com/");
    const data = await res.json();
    console.log(data);
    return data
})

export const add = createAsyncThunk("todo/add",async(value,{dispatch})=>{
    const res = await fetch("https://to-do-for-public.onrender.com/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(value)
    })
    const data = await res.json();
    console.log(data)
    dispatch(get())
    return data;
})

export const deleteTodo = createAsyncThunk("todo/delete",async(id,{dispatch})=>{
    const res = await fetch("https://to-do-for-public.onrender.com/"+id,{
        method:"DELETE"
    })
    // const text = await res.text();
    // const data = text ? JSON.parse(text) : {}; 
    dispatch(get())
    console.log(data)
    return data;
})


//{id,value} taking as parameter as similar to reducer where we put action.payload.id // action.payload.value
export const completeToDo = createAsyncThunk("todo/complete",async({ id, value },{dispatch})=>{
    const res = await fetch("https://to-do-for-public.onrender.com/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(value)  
    })
    const data = await res.json();
    dispatch(get())
    console.log(data)
    return data;
})

const todoSlice = createSlice({
    name:"todo",
    initialState,
    extraReducers:(builder)=>{
      builder
      .addCase(get.pending,(state)=>{
        state.status = "pending"
      })
      .addCase(get.fulfilled,(state,action)=>{
        state.status = "fulfilled"
        state.todos = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(get.rejected,(state)=>{
            state.status = "rejected"
      })
      .addCase(add.pending,(state)=>{
        state.status = "pending"
      })
      .addCase(add.fulfilled,(state,action)=>{
        state.todos = Array.isArray(action.payload) ? action.payload : []; 
      })
      .addCase(deleteTodo.pending,(state,action)=>{
        state.status = "pending"
      })
      .addCase(deleteTodo.fulfilled,(state,action)=>{
        state.status = "fulfilled"
      })
      .addCase(completeToDo.pending,(state)=>{
        state.status = "pending"
      })
      .addCase(completeToDo.fulfilled,(state,action)=>{
        state.status = "fulfilled"
      })
    }
})
export default todoSlice.reducer